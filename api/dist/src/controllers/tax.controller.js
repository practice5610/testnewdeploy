"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const constants_2 = require("../constants");
const services_1 = require("../services");
const tax_service_1 = require("../services/tax.service");
const specifications_1 = require("../specifications");
const utils_1 = require("../utils");
let TaxController = class TaxController {
    constructor(response, currentUserGetter, profileService, bookingService, taxService) {
        this.response = response;
        this.currentUserGetter = currentUserGetter;
        this.profileService = profileService;
        this.bookingService = bookingService;
        this.taxService = taxService;
        this.logger = log4js_1.getLogger(constants_2.LoggingCategory.TAXES);
    }
    /**
     * Get all sales tax per item
     * @param item
     */
    async getTax(item) {
        const result = [];
        await Promise.all(item.map(async (data) => {
            var _a, _b;
            const targetBookingResponse = await this.bookingService.getBookingById(data.id);
            if (!targetBookingResponse.success || !targetBookingResponse.data) {
                throw new rest_1.HttpErrors.NotFound(targetBookingResponse.message);
            }
            const targetBooking = targetBookingResponse.data;
            const merchantProfile = await this.profileService.getProfile('SseaCdgh13R1MQWRKP3gXbQrbyl2', {
                requiredFields: ['contact', 'addresses', 'store', 'taxableNexus'],
                messageNoProfileFound: constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND,
            });
            // console.log('test2', merchantProfile);
            const merchantProfileData = utils_1.handleServiceResponseResult(merchantProfile);
            if (!merchantProfileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            // console.log('testcase22', merchantProfileData);
            const fromAddress = {
                address: utils_1.getComposedAddressFromStore(merchantProfileData.store),
                country: merchantProfileData.store.country,
                zip: merchantProfileData.store.zip,
                state: merchantProfileData.store.state,
                city: merchantProfileData.store.city,
            };
            let amount;
            if (globals_1.isProduct(targetBooking.item)) {
                amount = targetBooking.item.price;
            }
            else if (globals_1.isOffer(targetBooking.item)) {
                amount = (_b = (_a = targetBooking.item.product) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : globals_1.toMoney(0);
            }
            else {
                // If the booking is not an offer or a product we don't try calling the taxjar api
                result.push({ id: data.id, tax: globals_1.toMoney(0) });
                return;
            }
            if (!merchantProfileData.taxableNexus.some((nexus) => nexus.state === data.toAddress.state)) {
                const tax = globals_1.toMoney(0);
                result.push({ id: data.id, tax: tax });
                return; //if merchant doesn't have nexus toAddress, tax amount it's set to 0, and return async function to prevent extra call to taxjar API
            }
            const totalTaxesResponse = await this.taxService.getTotalTaxByProduct(fromAddress, data.toAddress, merchantProfileData.taxableNexus, amount);
            if (!totalTaxesResponse.success || !totalTaxesResponse.data) {
                this.logger.error('error', totalTaxesResponse.message);
                throw new rest_1.HttpErrors.BadRequest(totalTaxesResponse.message);
            }
            else {
                const tax = globals_1.toMoney(totalTaxesResponse.data.tax.amount_to_collect);
                result.push({ id: data.id, tax: tax });
            }
        }));
        // console.log('checkkk', result);
        return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
            data: result,
            success: true,
            message: 'Tax list',
        });
    }
    async setTaxableStates(nexus) {
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        await this.profileService.updateProfileById(currentUser.uid, {
            taxableNexus: nexus.map(({ country, state }) => ({ country, state })),
        });
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/getTaxableProduct'),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "getTax", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant]),
    rest_1.put('/setTaxableStates', specifications_1.PUTSetTaxableStatesSpecification),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], TaxController.prototype, "setTaxableStates", null);
TaxController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.BookingService)),
    tslib_1.__param(4, loopback4_spring_1.service(tax_service_1.TaxService)),
    tslib_1.__metadata("design:paramtypes", [Object, Function, services_1.ProfileService,
        services_1.BookingService,
        tax_service_1.TaxService])
], TaxController);
exports.TaxController = TaxController;
//# sourceMappingURL=tax.controller.js.map