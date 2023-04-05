"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const offer_service_1 = require("./offer.service");
const product_service_1 = require("./product.service");
let BookingService = class BookingService {
    constructor(bookingRepository, productRepository, offerRepository, productService, offerService) {
        this.bookingRepository = bookingRepository;
        this.productRepository = productRepository;
        this.offerRepository = offerRepository;
        this.productService = productService;
        this.offerService = offerService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOKINGS);
    }
    /**
     * Creates bookings,
     * @param {(Booking[] | null)} bookings bookings contain booking information
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling this method.
     * @returns {Promise<BookingResult>}
     * @memberof BookingService
     */
    async createBookings(bookings, options) {
        try {
            this.logger.info('Starting bookings create request');
            // empty booking array or not existing verification.
            if (!(bookings === null || bookings === void 0 ? void 0 : bookings.length))
                return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.EMPTY_ARRAY);
            // variables.
            const newBookings = [];
            const updatedBookings = [];
            const invalidsBookings = [];
            // loop to each booking intended to create.
            for (const booking of bookings) {
                const itemIsOffer = globals_1.isOffer(booking.item);
                const itemIsProduct = globals_1.isProduct(booking.item);
                if (!itemIsOffer && !itemIsProduct)
                    return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.INVALID_ITEM);
                if (globals_1.isOffer(booking.item)) {
                    if (booking.type !== globals_1.BookingTypes.OFFER)
                        return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.INVALID_OFFER_TYPE);
                    const offerValidationResponse = await this.offerService.validateOffer(booking.item);
                    if (!offerValidationResponse.success)
                        return utils_1.APIResponseFalseOutput(offerValidationResponse.message);
                }
                if (globals_1.isProduct(booking.item)) {
                    if (booking.type !== globals_1.BookingTypes.PRODUCT)
                        return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.INVALID_PRODUCT_TYPE);
                    const productValidationResponse = await this.productService.validateProduct(booking.item);
                    if (!productValidationResponse.success)
                        return utils_1.APIResponseFalseOutput(productValidationResponse.message);
                }
                const newBooking = Object.assign({}, booking);
                let newVisitCount;
                const now = moment_1.default().utc().unix();
                let offer = undefined;
                let product;
                let itemSearchId;
                if (globals_1.isOffer(booking.item)) {
                    offer = await this.offerRepository.findById(booking.item._id);
                    itemSearchId = offer._id;
                    const expiration = offer.expiration;
                    if (now > expiration) {
                        this.logger.error(constants_1.BookingResponseMessages.OFFER_EXPIRED);
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.OFFER_EXPIRED,
                        });
                        continue;
                    }
                    if (booking.quantity > offer.maxQuantity) {
                        this.logger.error(constants_1.BookingResponseMessages.OFFER_EXCEEDED);
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.OFFER_EXCEEDED,
                        });
                        continue;
                    }
                    product = await this.productRepository.findById(booking.item.product._id);
                }
                else {
                    product = await this.productRepository.findById(booking.item._id);
                    itemSearchId = product._id;
                }
                const filterBuilder = new repository_1.FilterBuilder();
                const filter = filterBuilder
                    .where({
                    and: [
                        { memberUID: booking.memberUID },
                        { 'item._id': itemSearchId },
                        { status: globals_1.BookingStatus.ACTIVE },
                    ],
                })
                    .limit(1)
                    .build();
                const preExistingBookings = await this.bookingRepository.find(filter);
                this.logger.debug('Found pre existing bookings:', preExistingBookings);
                if (preExistingBookings.length) {
                    // update
                    const preExistingBooking = preExistingBookings[0];
                    const updatedPreExistingBooking = Object.assign({}, preExistingBooking);
                    if (updatedPreExistingBooking.status === globals_1.BookingStatus.ACTIVE) {
                        updatedPreExistingBooking.quantity += booking.quantity;
                    }
                    else {
                        updatedPreExistingBooking.quantity = booking.quantity;
                    }
                    if (globals_1.isOffer(booking.item)) {
                        newVisitCount = (preExistingBooking.visits || 0) + 1;
                        if ((offer === null || offer === void 0 ? void 0 : offer.maxVisits) !== undefined && newVisitCount > offer.maxVisits) {
                            this.logger.debug(constants_1.BookingResponseMessages.VISITS_EXCEEDED);
                            invalidsBookings.push({
                                booking: booking,
                                reason: constants_1.BookingResponseMessages.VISITS_EXCEEDED,
                            });
                            continue;
                        }
                        updatedPreExistingBooking.visits = newVisitCount;
                    }
                    if (product.quantity !== undefined &&
                        updatedPreExistingBooking.quantity > product.quantity) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.PRODUCT_EXCEEDED,
                        });
                        continue;
                    }
                    updatedPreExistingBooking.createdAt = now;
                    updatedPreExistingBooking.updatedAt = now;
                    updatedPreExistingBooking.status = globals_1.BookingStatus.ACTIVE;
                    updatedBookings.push(updatedPreExistingBooking);
                }
                else {
                    // create
                    if (product.quantity !== undefined && newBooking.quantity > product.quantity) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.PRODUCT_EXCEEDED,
                        });
                        continue;
                    }
                    newBooking.createdAt = now;
                    newBooking.updatedAt = now;
                    newBooking.visits = 1;
                    newBooking.status = globals_1.BookingStatus.ACTIVE;
                    newBookings.push(newBooking);
                }
            }
            let createdBookings = [];
            if (newBookings.length) {
                createdBookings = await this.bookingRepository.createAll(newBookings, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            }
            for (const updated of updatedBookings) {
                await this.bookingRepository.updateById(updated._id, updated, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            }
            return {
                success: true,
                message: constants_1.BookingResponseMessages.SUCCESS,
                data: { valids: [...createdBookings, ...updatedBookings], invalids: [...invalidsBookings] },
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    /**
     * Get Booking By Id,
     * @param {string} booking_id Booking ID related to MongoDB ObjectID
     * @returns {Promise<Booking>} Return a Booking entity by id, or rejected promise if not found.
     * @memberof BookingService
     */
    async getBookingById(booking_id) {
        try {
            const bookingData = await this.bookingRepository
                .findById(booking_id)
                .then((result) => {
                console.log('result', result);
                return result;
            })
                .catch((err) => {
                console.log('err1', err);
                return err;
            });
            if (bookingData)
                return { success: true, message: 'Success', data: bookingData };
            else
                return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.UNEXPECTED);
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    async findBookings(filter) {
        try {
            const allBookings = await this.bookingRepository.find(filter);
            if (allBookings) {
                return { success: true, message: 'Success', data: allBookings };
            }
            else {
                return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.UNEXPECTED);
            }
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    async updateAllBookings(data, where) {
        try {
            const response = await this.bookingRepository.updateAll(data, where);
            if (response.count > 0)
                return { success: true, message: 'Success', data: response };
            else
                return utils_1.APIResponseFalseOutput();
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    async updateBookingById(id, data) {
        try {
            await this.bookingRepository.updateById(id, data);
            return { success: true, message: 'Success' };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    async deleteBookingById(id) {
        try {
            await this.bookingRepository.deleteById(id);
            return { success: true, message: 'Success' };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    async countBooking(where) {
        try {
            const counter = await this.bookingRepository.count(where);
            if (counter)
                return { success: true, message: 'Success', data: counter };
            else
                return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.UNEXPECTED);
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
    /**
     * Validate Booking list
     * @param {Booking[]} bookingList an array of bookings
     * @return BookingValidationResult which contain two arrays for valids and invalids bookings.
     */
    async validateBookings(bookingList) {
        try {
            const validsBookings = [];
            const invalidsBookings = [];
            // Empty booking list validation.
            if (!(bookingList === null || bookingList === void 0 ? void 0 : bookingList.length)) {
                return utils_1.APIResponseFalseOutput(constants_1.BookingResponseMessages.EMPTY_ARRAY);
            }
            // Loop booking list to validate each one.
            for (const booking of bookingList) {
                try {
                    // Ensure booking id validation.
                    if (!booking._id) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.MISSING_ID,
                        });
                        continue;
                    }
                    // Query booking from db by id.
                    const dbBooking = await this.bookingRepository.findById(booking._id);
                    // Booking existence validation.
                    if (!dbBooking) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.NOT_FOUND,
                        });
                        continue;
                    }
                    // Booking item existence validation.
                    if (!dbBooking.item) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.ITEM_NOT_FOUND,
                        });
                        continue;
                    }
                    // Booking active validation.
                    if (dbBooking.status && dbBooking.status !== globals_1.BookingStatus.ACTIVE) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: `Booking status ${dbBooking.status}`,
                        });
                        continue;
                    }
                    // Double check type of booking.
                    const itemIsAnOffer = globals_1.isOffer(dbBooking.item);
                    if (itemIsAnOffer) {
                        const currentOffer = dbBooking.item;
                        // Valid Offer validation.
                        const isValidOffer = await this.offerService.validateOffer(currentOffer);
                        // Invalid offer catch.
                        if (!isValidOffer.success) {
                            invalidsBookings.push({
                                booking: booking,
                                reason: isValidOffer.message,
                            });
                            continue;
                        }
                        const dbProduct = await this.productRepository.findById(currentOffer.product._id);
                        if (dbBooking.quantity &&
                            dbProduct.quantity &&
                            dbProduct.quantity < dbBooking.quantity) {
                            invalidsBookings.push({
                                booking: booking,
                                reason: constants_1.BookingResponseMessages.PRODUCT_EXCEEDED,
                            });
                            continue;
                        }
                    }
                    // If is not an offer then is a product, product validation.
                    const isValidProduct = await this.productService.validateProduct(dbBooking.item);
                    if (!isValidProduct.success) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: isValidProduct.message,
                        });
                        continue;
                    }
                    const dbProduct = await this.productRepository.findById(dbBooking.item._id);
                    if (!dbProduct) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.ProductResponseMessages.INVALID,
                        });
                        continue;
                    }
                    if (dbBooking.quantity && dbProduct.quantity && dbProduct.quantity < dbBooking.quantity) {
                        invalidsBookings.push({
                            booking: booking,
                            reason: constants_1.BookingResponseMessages.PRODUCT_EXCEEDED,
                        });
                        continue;
                    }
                    // At this point the booking is valid.
                    validsBookings.push(booking);
                }
                catch (error) {
                    invalidsBookings.push({
                        booking: booking,
                        reason: constants_1.GlobalResponseMessages.UNEXPECTED,
                    });
                    continue;
                }
            }
            return {
                success: true,
                message: constants_1.BookingResponseMessages.VALIDATION_SUCCESS,
                data: {
                    valids: validsBookings,
                    invalids: invalidsBookings,
                },
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingService.prototype, "createBookings", null);
BookingService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BookingRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.OfferRepository)),
    tslib_1.__param(3, loopback4_spring_1.service(product_service_1.ProductService)),
    tslib_1.__param(4, loopback4_spring_1.service(offer_service_1.OfferService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BookingRepository,
        repositories_1.ProductRepository,
        repositories_1.OfferRepository,
        product_service_1.ProductService,
        offer_service_1.OfferService])
], BookingService);
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map