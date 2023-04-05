"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const email_service_1 = require("../services/email.service");
const purchase_service_1 = require("../services/purchase.service");
const money_1 = require("../utils/money");
let CheckoutController = class CheckoutController {
    constructor(offerRepository, productRepository, response, purchaseService, emailService) {
        this.offerRepository = offerRepository;
        this.productRepository = productRepository;
        this.response = response;
        this.purchaseService = purchaseService;
        this.emailService = emailService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.PURCHASES_SERVICE);
    }
    async create(bookings) {
        var _a, _b, _c;
        this.logger.info('\n\n\n===================================================');
        this.logger.debug('Bookings count:', bookings.length);
        if (bookings.length === 0) {
            throw new rest_1.HttpErrors.BadRequest(constants_1.CheckOutResponseMessages.BAD_REQUEST_NO_BOOKINGS);
        }
        for (const booking of bookings) {
            if (!booking.item) {
                console.error(globals_1.BookingTypes.OFFER
                    ? constants_1.CheckOutResponseMessages.BAD_REQUEST_MISSING_OFFER
                    : constants_1.CheckOutResponseMessages.BAD_REQUEST_MISSING_PRODUCT);
                throw new rest_1.HttpErrors.BadRequest(booking.type === globals_1.BookingTypes.OFFER
                    ? constants_1.CheckOutResponseMessages.BAD_REQUEST_MISSING_OFFER
                    : constants_1.CheckOutResponseMessages.BAD_REQUEST_MISSING_PRODUCT);
            }
            const isAnOffer = globals_1.isOffer(booking.item);
            const exists = isAnOffer
                ? await this.offerRepository.exists(booking.item._id)
                : await this.productRepository.exists(booking.item._id);
            // if (!exists) {
            //   const type: string = isAnOffer ? 'Offer' : 'Product';
            //   const msg: string = isAnOffer
            //     ? CheckOutResponseMessages.DELETED_OFFER
            //     : CheckOutResponseMessages.DELETED_PRODUCT;
            //   console.error(`${type}: ${booking.item._id}, Message: ${msg}`);
            //   return this.response.status(ServiceResponseCodes.SUCCESS).send({
            //     success: false,
            //     customer: null,
            //     customerEmail: null,
            //     failed: [booking],
            //     message: msg,
            //   });
            // }
        }
        this.logger.info('Check out requested by customer ID:', bookings[0].memberUID);
        try {
            const result = await this.purchaseService
                .purchase(bookings)
                .then((result) => {
                console.log('cehckkresult133', result);
                return result;
            })
                .catch((err) => {
                console.log('cehckkresulterr12', err);
                return err;
            });
            if (!result.success) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
            }
            this.logger.info('Check out success');
            if ((_a = result.checkedOut) === null || _a === void 0 ? void 0 : _a.length) {
                this.logger.debug(`At least one item checked out successfully`);
                this.logger.debug(`Will email customer ${(_b = result.customer) === null || _b === void 0 ? void 0 : _b.uid}`);
                this.logger.debug(`Will email to: ${result.customerEmail}`);
                const items = result.checkedOut
                    .map((booking) => `
          booking: ${globals_1.isOffer(booking.item)
                    ? booking.item.title
                    : globals_1.isProduct(booking.item)
                        ? booking.item.name
                        : ''} <br>
          price: ${globals_1.isOffer(booking.item)
                    ? money_1.fromMoney(booking.item.product.price)
                    : globals_1.isProduct(booking.item)
                        ? money_1.fromMoney(booking.item.price)
                        : ''} <br>
          ${globals_1.isOffer(booking.item) ? `cashback: ${booking.item.cashBackPerVisit}` : ''}
          `)
                    .join('<br>');
                if (result.customerEmail) {
                    await this.emailService.sendConfirmationToCustomer({
                        customer: result.customer,
                        subject: 'Purchase Confirmation',
                        customerEmail: result.customerEmail,
                        intro: 'You have purchased items!',
                        dictionary: { items },
                    });
                }
            }
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send(Object.assign(Object.assign({}, result), { customer: (_c = result === null || result === void 0 ? void 0 : result.customer) === null || _c === void 0 ? void 0 : _c.uid }));
        }
        catch (error) {
            this.logger.error('Check out error.', error);
            let diagnosticsData = null;
            let publicMessage = error;
            if (error.name === 'PurchaseError') {
                diagnosticsData = error.toJSON();
                publicMessage = error.publicMessage;
            }
            this.logger.debug(`Extra diagnostics data:`, diagnosticsData);
            const bookingsAttempted = bookings
                .map((booking) => {
                var _a;
                return `
        bookingID: ${booking._id}  <br>
        itemID: ${booking.item._id}  <br>
        isOffer?: ${globals_1.isOffer(booking.item)}  <br>
        price: ${globals_1.isOffer(booking.item)
                    ? money_1.fromMoney(booking.item.product.price)
                    : globals_1.isProduct(booking.item)
                        ? money_1.fromMoney(booking.item.price)
                        : ''}  <br>
        cashback: ${globals_1.isOffer(booking.item) ? money_1.fromMoney(booking.item.cashBackPerVisit) : 'n/a'}  <br>
        customerID: ${booking.memberUID}  <br>
        merchantID: ${booking.item.merchantUID}  <br>
        storeID: ${globals_1.isOffer(booking.item)
                    ? (_a = booking.item.product.store) === null || _a === void 0 ? void 0 : _a._id : globals_1.isProduct(booking.item) && booking.item.store
                    ? booking.item.store._id
                    : ''}
        `;
            })
                .join('<br>=================================<br>');
            this.logger.info(`Bookings Related to error:`, bookingsAttempted);
            const dictionary = {
                customer: bookings[0].memberUID,
                bookingsAttempted,
                diagnosticsData,
            };
            await this.emailService.sendAppError('Checkout Error', 'A customer had an error while attempting to check out. Related data below:', dictionary);
            this.logger.info(`Error Email sent`);
            return this.response.status(500).send({ success: false, message: publicMessage });
        }
    }
    async placeOrder(order) {
        try {
            console.log('checkworkingpalce', order);
            const purchaseResponse = await this.purchaseService.newPurchase(order);
            if (!purchaseResponse.success) {
                return this.response.status(400).send(purchaseResponse); //TODO: This should throw error
            }
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: purchaseResponse.message });
        }
        catch (error) {
            console.log('newerrorr', error);
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.GlobalResponseMessages.UNPROCESSABLE_PURCHASE);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/checkout', {
        responses: {
            '200': {
                description: 'Checks out bookings that are provided',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Transaction } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CheckoutController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/place-order'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CheckoutController.prototype, "placeOrder", null);
CheckoutController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OfferRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(purchase_service_1.PurchaseService)),
    tslib_1.__param(4, loopback4_spring_1.service(email_service_1.EmailService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OfferRepository,
        repositories_1.ProductRepository, Object, purchase_service_1.PurchaseService,
        email_service_1.EmailService])
], CheckoutController);
exports.CheckoutController = CheckoutController;
//# sourceMappingURL=checkout.controller.js.map