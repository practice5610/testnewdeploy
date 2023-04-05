"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantTransactionController = void 0;
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
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const profile_service_1 = require("../services/profile.service");
/**
 * @export
 * @class MerchantTransactionController
 * Controller for Merchant Transaction Operations.
 */
let MerchantTransactionController = class MerchantTransactionController {
    constructor(merchantTransactionRepository, currentUserGetter, response, merchantTransactionService, profileService) {
        this.merchantTransactionRepository = merchantTransactionRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.merchantTransactionService = merchantTransactionService;
        this.profileService = profileService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.MERCHANT_BILLING);
    }
    /**
     * Creates a transaction for inventory orders
     * @param {MerchantTransaction} merchantTransaction
     * @returns {(Promise<MerchantTransaction | Response>)}
     * @memberof MerchantTransactionController
     */
    async create(merchantTransaction) {
        const now = moment_1.default().utc().unix();
        const newMerchantTransaction = Object.assign(Object.assign({}, merchantTransaction), { createdAt: now, updatedAt: now, title: merchantTransaction.purchaseItem.itemName });
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const isMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
        if (isMerchant && currentUser.uid !== merchantTransaction.merchant.uid) {
            throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
        }
        const result = await this.merchantTransactionRepository.create(newMerchantTransaction);
        return result;
    }
    /**
     * Update merchant transactions statuses
     * @param {string} id Merchant Transaction id
     * @param {MerchantTransaction} merchantTransaction Merchant Transaction Data
     * @returns {(Promise<void | Response>)}
     * @memberof MerchantTransactionController
     */
    async updateById(id, merchantTransaction) {
        try {
            const result = await this.merchantTransactionService.updateMerchantTransaction(id, merchantTransaction);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            return this.response.status(500).send({ success: false, message: error }); //TODO: throw error here
        }
    }
    async updateList(list) {
        try {
            for (const trans of list) {
                const newTrans = {
                    status: trans.status,
                    type: trans.type,
                    updatedAt: moment_1.default().utc().unix(),
                };
                if (trans._id)
                    await this.merchantTransactionService.updateMerchantTransaction(trans._id, newTrans);
            }
            return { success: true };
        }
        catch (error) {
            this.logger.error(error);
            return { success: false, error: error.message };
        }
    }
    /**
     * Query for merchant transactions
     * @param {Filter<MerchantTransaction>} [filter]
     * @returns {Promise<MerchantTransaction[]>}
     * @memberof MerchantTransactionController
     */
    async find(
    //@ts-ignore
    filter) {
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const isMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
        if (isMerchant) {
            filter = Object.assign(Object.assign({}, filter), { where: {
                    and: [Object.assign({}, filter === null || filter === void 0 ? void 0 : filter.where), { 'merchant.uid': currentUser.uid }],
                } });
        }
        return this.merchantTransactionRepository.find(filter);
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/merchant-transaction', {
        responses: {
            '200': {
                description: 'Merchant Transaction Repository model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.MerchantTransaction } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.MerchantTransaction]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/merchant-transaction/{id}', {
        responses: {
            '204': {
                description: 'Marchant Transaction Item PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.MerchantTransaction]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/merchant-transaction', {
        responses: {
            '204': {
                description: 'Bulk merchant transaction order PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionController.prototype, "updateList", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/merchant-transaction', {
        responses: {
            '200': {
                description: 'Array of Merchant Transactions model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.MerchantTransaction } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.MerchantTransaction))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionController.prototype, "find", null);
MerchantTransactionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.MerchantTransactionRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.MerchantTransactionService)),
    tslib_1.__param(4, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MerchantTransactionRepository, Function, Object, services_1.MerchantTransactionService,
        profile_service_1.ProfileService])
], MerchantTransactionController);
exports.MerchantTransactionController = MerchantTransactionController;
//# sourceMappingURL=merchant-transactions.controller.js.map