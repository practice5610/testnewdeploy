"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const services_1 = require("../services");
const specifications_1 = require("../specifications");
let BookingController = class BookingController {
    constructor(response, bookingService, storeService, currentUserGetter) {
        this.response = response;
        this.bookingService = bookingService;
        this.storeService = storeService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOKINGS);
    }
    async create(bookings) {
        try {
            if (!globals_1.isArray(bookings)) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.BookingResponseMessages.EMPTY_ARRAY);
            }
            const result = await this.bookingService.createBookings(bookings);
            if (result.success)
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
            //We should add to cart (make the booking) for valid ones, and return fail one with the reason to front end
            return this.response.status(400).send(result);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async count(
    //@ts-ignore
    where) {
        try {
            const counter = await this.bookingService.countBooking(where);
            if (counter)
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(counter);
            throw new rest_1.HttpErrors.BadRequest(constants_1.BookingResponseMessages.UNEXPECTED);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async find(
    //@ts-ignore
    filter) {
        var _a, _b;
        try {
            const filterBuilder = new repository_1.FilterBuilder(filter);
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            //Validation if current user is Member this GET only can return Bookings related to this current member.
            if (currentUser.roles.includes(globals_1.RoleKey.Member)) {
                filterBuilder.impose({ where: { memberUID: currentUser.uid } });
            }
            const allBookingResponse = await this.bookingService.findBookings(filterBuilder.build());
            if (!(allBookingResponse === null || allBookingResponse === void 0 ? void 0 : allBookingResponse.success) || !(allBookingResponse === null || allBookingResponse === void 0 ? void 0 : allBookingResponse.data))
                throw new rest_1.HttpErrors.BadRequest((allBookingResponse === null || allBookingResponse === void 0 ? void 0 : allBookingResponse.message) ? allBookingResponse.message
                    : constants_1.BookingResponseMessages.UNEXPECTED);
            const allBookingByID = allBookingResponse.data;
            const updatedBookings = [];
            for (const booking of allBookingByID) {
                if (!globals_1.isOffer(booking.item) && !globals_1.isProduct(booking.item)) {
                    this.logger.error(constants_1.BookingResponseMessages.INVALID_ITEM);
                    continue;
                }
                let requestedStoreID = '';
                if (globals_1.isProduct(booking.item) &&
                    booking.type === globals_1.BookingTypes.PRODUCT && ((_a = booking.item.store) === null || _a === void 0 ? void 0 : _a._id)) {
                    requestedStoreID = booking.item.store._id;
                }
                else if (globals_1.isOffer(booking.item) &&
                    booking.type === globals_1.BookingTypes.OFFER && ((_b = booking.item.product.store) === null || _b === void 0 ? void 0 : _b._id)) {
                    requestedStoreID = booking.item.product.store._id;
                }
                try {
                    const storeResponse = await this.storeService.findStoreById(requestedStoreID);
                    if (!(storeResponse === null || storeResponse === void 0 ? void 0 : storeResponse.success) || !storeResponse.data) {
                        this.logger.error(constants_1.StoreResponseMessages.INVALID_DATA);
                        continue;
                    }
                    const storeData = storeResponse.data; //Todo: use const store: StoreAddress = storeResponse.data
                    const store = {
                        _id: storeData._id,
                        companyName: storeData.companyName,
                        merchant: storeData.merchant,
                        country: storeData.country,
                        state: storeData.state,
                        city: storeData.city,
                        zip: storeData.zip,
                        number: storeData.number,
                        street1: storeData.street1,
                        street2: storeData.street2,
                        _geoloc: storeData._geoloc,
                    };
                    const updatedProduct = globals_1.isProduct(booking.item)
                        ? Object.assign(Object.assign({}, booking.item), { store: store }) // TODO: https://boomcarding.atlassian.net/browse/BW-1582
                        : Object.assign(Object.assign({}, booking.item.product), { store: store }); // TODO: https://boomcarding.atlassian.net/browse/BW-1582
                    const updateBooking = globals_1.isProduct(booking.item)
                        ? Object.assign(Object.assign({}, booking), { item: updatedProduct })
                        : Object.assign(Object.assign({}, booking), { item: Object.assign(Object.assign({}, booking.item), { product: updatedProduct }) }); // TODO: https://boomcarding.atlassian.net/browse/BW-1582
                    updatedBookings.push(updateBooking);
                }
                catch (error) {
                    this.logger.error(error);
                    continue;
                }
            }
            return this.response
                .status(200)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: updatedBookings });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    // WARNING: use this endpoint carefully it update items by bulk.
    async updateAll(booking, 
    //@ts-ignore
    where) {
        try {
            const now = moment_1.default().utc().unix();
            const bookingFieldToUpdate = Object.assign(Object.assign({}, booking), { updatedAt: now });
            const result = await this.bookingService.updateAllBookings(bookingFieldToUpdate, where);
            if (result === null || result === void 0 ? void 0 : result.success) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
            }
            throw new rest_1.HttpErrors.NotFound(constants_1.BookingResponseMessages.NOT_FOUND);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        var _a, _b;
        try {
            const bookingResponse = await this.bookingService.getBookingById(id);
            if (!(bookingResponse === null || bookingResponse === void 0 ? void 0 : bookingResponse.success) || !bookingResponse.data)
                throw new rest_1.HttpErrors.BadRequest(bookingResponse.message ? bookingResponse.message : constants_1.BookingResponseMessages.UNEXPECTED);
            const booking = bookingResponse.data;
            if (!globals_1.isOffer(booking.item) && !globals_1.isProduct(booking.item)) {
                this.logger.error(constants_1.BookingResponseMessages.INVALID_ITEM);
                throw new rest_1.HttpErrors.BadRequest();
            }
            let requestedStoreID = '';
            if (globals_1.isProduct(booking.item) &&
                booking.type === globals_1.BookingTypes.PRODUCT && ((_a = booking.item.store) === null || _a === void 0 ? void 0 : _a._id)) {
                requestedStoreID = booking.item.store._id;
            }
            else if (globals_1.isOffer(booking.item) &&
                booking.type === globals_1.BookingTypes.OFFER && ((_b = booking.item.product.store) === null || _b === void 0 ? void 0 : _b._id)) {
                requestedStoreID = booking.item.product.store._id;
            }
            const storeResponse = await this.storeService.findStoreById(requestedStoreID);
            if (!(storeResponse === null || storeResponse === void 0 ? void 0 : storeResponse.success) || !storeResponse.data) {
                this.logger.error(constants_1.StoreResponseMessages.INVALID_DATA);
                throw new rest_1.HttpErrors.BadRequest(constants_1.StoreResponseMessages.INVALID_DATA);
            }
            const storeData = storeResponse.data;
            const store = {
                _id: storeData._id,
                companyName: storeData.companyName,
                merchant: storeData.merchant,
                country: storeData.country,
                state: storeData.state,
                city: storeData.city,
                zip: storeData.zip,
                number: storeData.number,
                street1: storeData.street1,
                street2: storeData.street2,
                _geoloc: storeData._geoloc,
            };
            const updatedProduct = globals_1.isProduct(booking.item)
                ? Object.assign(Object.assign({}, booking.item), { store: store }) // TODO: https://boomcarding.atlassian.net/browse/BW-1582
                : Object.assign(Object.assign({}, booking.item.product), { store: store }); // TODO: https://boomcarding.atlassian.net/browse/BW-1582
            const updateBooking = Object.assign(Object.assign({}, booking), { item: updatedProduct }); // TODO: https://boomcarding.atlassian.net/browse/BW-1582
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'success', data: updateBooking });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, booking) {
        try {
            booking.updatedAt = moment_1.default().utc().unix();
            const response = await this.bookingService.updateBookingById(id, booking);
            if (response === null || response === void 0 ? void 0 : response.success)
                return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
            throw new rest_1.HttpErrors.BadRequest(response.message);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteById(id) {
        try {
            const response = await this.bookingService.deleteBookingById(id);
            if (response === null || response === void 0 ? void 0 : response.success)
                return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
            else
                throw new rest_1.HttpErrors.BadRequest(response.message);
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                throw new rest_1.HttpErrors.BadRequest(error.code);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/bookings', specifications_1.POSTBookingsSpecification),
    tslib_1.__param(0, rest_1.requestBody.array({ schema: rest_1.getModelSchemaRef(models_1.Booking, { exclude: ['_id', 'createdAt', 'updatedAt'] }) }, {
        description: 'an array of bookings',
        required: true,
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/bookings/count', specifications_1.GETBookingsCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Booking))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/bookings', specifications_1.GETBookingsSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Booking))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/bookings', specifications_1.PATCHBookingsFilteredSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.PATCHBookingsRequestBody)),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Booking))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "updateAll", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/bookings/{id}', specifications_1.GETBookingByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/bookings/{id}', specifications_1.PATCHBookingByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(specifications_1.PATCHBookingByIDRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/bookings/{id}', specifications_1.DELBookingByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BookingController.prototype, "deleteById", null);
BookingController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(1, loopback4_spring_1.service(services_1.BookingService)),
    tslib_1.__param(2, loopback4_spring_1.service(services_1.StoreService)),
    tslib_1.__param(3, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [Object, services_1.BookingService,
        services_1.StoreService, Function])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map