"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const authorization_2 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const specifications_1 = require("../specifications/");
let ShippingController = class ShippingController {
    constructor(response, shippingOrderRepository, shippingPolicyRepository, shippingBoxRepository, shippingService, currentUserGetter) {
        this.response = response;
        this.shippingOrderRepository = shippingOrderRepository;
        this.shippingPolicyRepository = shippingPolicyRepository;
        this.shippingBoxRepository = shippingBoxRepository;
        this.shippingService = shippingService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    /**
     * Validate an address and add it to shippo
     * @param address
     */
    async validate(address) {
        try {
            const res = await this.shippingService.validateAddress(address);
            if (!res.success || !(res === null || res === void 0 ? void 0 : res.data)) {
                // TODO: handleServiceResponseResult should be used here in the future and replace this
                throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
            }
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(res); // TODO: change to APIResponse format
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * get rates from specific packages to a specific destination
     *
     * @param body.addressTo the shippo id of the address
     * @param body.addressFrom the shippo id of the address
     * @param body.parcels a list of all parcels to ship
     * @param body.extra extra shipping options, like signature required
     * @param body.returnAll true if you want to return all rates
     * @param body.shipmentMethods a list of services to be included in the rates returned. If
     *                            this is set, ONLY the cheapest rate and the rates listed will be returned
     */
    async getRates(body) {
        var _a;
        try {
            const { shipToAddressId, shipFromAddressId, parcels, extra, returnAll, shipmentMethods } = body;
            const rates = await this.shippingService.getRates(shipToAddressId, shipFromAddressId, parcels, extra, returnAll, shipmentMethods);
            if (rates.success && ((_a = rates === null || rates === void 0 ? void 0 : rates.data) === null || _a === void 0 ? void 0 : _a.length)) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(rates);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * purchase a label and return the Shippo transaction object_id
     *
     * @param body.rate the rate to buy
     * @param body.purchaser the uid of the account paying for shipping
     * @param body.labelFileType the file type for the label. Default is set in Shippo settings
     *
     * @returns the _id of the new ShippingOrder
     */
    async purchase(body) {
        try {
            const { shippoRateId, purchaserId, labelFileType } = body;
            const transaction = await this.shippingService.purchase(shippoRateId, purchaserId, labelFileType);
            if (transaction.success && transaction.data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(transaction);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get full shippo transaction details for a given shippo transaction or ShippingOrder
     *
     * @param id the shippo_id of the transaction, or the _id of the ShippingOrder
     */
    async getTransaction(id) {
        var _a;
        try {
            const order = await this.shippingOrderRepository.find({
                where: { _id: id },
            });
            const transaction = await this.shippingService.getTransaction((order === null || order === void 0 ? void 0 : order.length) && ((_a = order[0]) === null || _a === void 0 ? void 0 : _a.shippo_id) ? order[0].shippo_id : id);
            if (transaction.success && (transaction === null || transaction === void 0 ? void 0 : transaction.data)) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(transaction);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get all labels for a given shippo transaction. There is usually only one
     * label per transaction but sometimes multiple parcels from the same sender can each have
     * a label within the same transaction
     *
     * @param id the shippo_id of the transaction
     */
    async getLabels(id) {
        var _a;
        try {
            const urls = await this.shippingService.getLabels(id);
            if (urls.success && ((_a = urls === null || urls === void 0 ? void 0 : urls.data) === null || _a === void 0 ? void 0 : _a.length)) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(urls);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Refund an unused label (transaction)
     *
     * @param transaction the shippo transaction to refund (shippo_id)
     */
    async refund(transaction) {
        try {
            const refund = await this.shippingService.refund(transaction);
            if (refund.success && (refund === null || refund === void 0 ? void 0 : refund.data)) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(refund);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (error.type === 'ShippoAPIError' &&
                error.detail.transaction.includes('Refund with this Transaction already exists.')) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.ShippingErrorMessages.REFUND_ALREADY_EXISTS);
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Estimate the cost of a shipping service level
     */
    async estimate(body) {
        var _a;
        const { parcel, shipmentMethod, to, from } = body;
        try {
            // the default addresses are the boom office in Weston to Tallahassee
            const response = await this.shippingService.getRates(to, from, [parcel], undefined, false, [shipmentMethod]);
            if (response.success && ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.length)) {
                const result = response.data.filter((res) => {
                    return res.service_token === shipmentMethod;
                });
                if (result === null || result === void 0 ? void 0 : result.length) {
                    return this.response
                        .status(constants_1.ServiceResponseCodes.SUCCESS)
                        .send({ success: true, message: 'Successful estimate', data: result[0].amount });
                }
            }
            throw new rest_1.HttpErrors.NotFound('Rate not found');
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * This gets a ShippingOrder document by id
     * @param id _id of the ShippingOrder
     */
    async getShippingOrder(id) {
        try {
            const order = await this.shippingOrderRepository.findById(id);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(order);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Post a new ShippingPolicy
     *
     * @param policy new policy to add to database
     */
    async createPolicy(policy) {
        try {
            const response = await this.shippingPolicyRepository.create(Object.assign(Object.assign({}, policy), { createdAt: moment_1.default().utc().unix(), updatedAt: moment_1.default().utc().unix() }));
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(response);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get a ShippingPolicy by id
     */
    async getShippingPolicy(id) {
        try {
            const policy = await this.shippingPolicyRepository.findById(id);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(policy);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get a ShippingPolicies
     */
    async findShippingPolicies(filter) {
        try {
            const policies = await this.shippingPolicyRepository.find(filter);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'Success', data: policies });
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * organize bookings into shipable groups and get rates for those groups
     */
    async checkout(body) {
        const { bookings, shipToAddressId } = body;
        try {
            const response = await this.shippingService.optimizeCart(bookings, shipToAddressId);
            if (response === null || response === void 0 ? void 0 : response.success) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(response);
            }
            throw new rest_1.HttpErrors.InternalServerError('Can not get rates at this time');
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Post a new Shipping Box
     *
     * @param box new shipping box to add to database
     */
    async createBox(box) {
        try {
            const response = await this.shippingBoxRepository.create(Object.assign(Object.assign({}, box), { createdAt: moment_1.default().utc().unix(), updatedAt: moment_1.default().utc().unix() }));
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'success', data: response });
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Get Shipping Box list
     *
     */
    async findBox(filter) {
        try {
            const response = await this.shippingBoxRepository.find(filter);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'success', data: response });
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/validate', specifications_1.POSTAddressValidationSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTAddressValidationRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "validate", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/rates', specifications_1.POSTGetRatesSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTGetRatesRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "getRates", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/purchase', specifications_1.POSTPurchaseRateSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTPurchaseRateRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "purchase", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/transaction/{id}', specifications_1.GETShippoTransactionSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "getTransaction", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/labels/{id}', specifications_1.GETShippingLabelsSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "getLabels", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/refund', specifications_1.POSTRefundShippingSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTRefundShippingRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "refund", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/estimate', specifications_1.POSTEstimateShippingSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTEstimateShippingRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "estimate", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/order/{id}', specifications_1.GETShippingOrderSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "getShippingOrder", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/policy', specifications_1.POSTShippingPolicySpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTShippingPolicyRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ShippingPolicy]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "createPolicy", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/policy/{id}', specifications_1.GETShippingPolicySpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "getShippingPolicy", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/policies', specifications_1.GETShippingPolicySpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.ShippingPolicy))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "findShippingPolicies", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/checkout', specifications_1.POSTShippingCheckoutSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTShippingCheckoutRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "checkout", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/shipping/box', specifications_1.POSTShippingBoxSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTShippingBoxRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.ShippingBox]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "createBox", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Merchant, globals_1.RoleKey.Member, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/shipping/box', specifications_1.GETShippingBoxSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.ShippingBox))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingController.prototype, "findBox", null);
ShippingController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ShippingOrderRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ShippingPolicyRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.ShippingBoxRepository)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.ShippingService)),
    tslib_1.__param(5, core_1.inject.getter(authorization_2.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [Object, repositories_1.ShippingOrderRepository,
        repositories_1.ShippingPolicyRepository,
        repositories_1.ShippingBoxRepository,
        services_1.ShippingService, Function])
], ShippingController);
exports.ShippingController = ShippingController;
//# sourceMappingURL=shipping.controller.js.map