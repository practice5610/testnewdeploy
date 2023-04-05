"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawalController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const withdrawal_specifications_1 = require("../specifications/withdrawal-specifications");
let WithdrawalController = class WithdrawalController {
    constructor(transactionRepository, currentUserGetter, response) {
        this.transactionRepository = transactionRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.WITHDRAWAL_CONTROLLER);
    }
    async create(transaction) {
        try {
            const now = moment_1.default().utc().unix();
            const data = await this.transactionRepository.create(Object.assign(Object.assign({}, transaction), { createdAt: now, updatedAt: now, type: globals_1.TransactionType.MERCHANT_WITHDRAWAL }));
            if (data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: data,
                });
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async count(incomingWhere) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            const whereBuilder = new repository_1.WhereBuilder();
            whereBuilder.eq('receiver.uid', currentUser.uid);
            if (incomingWhere)
                whereBuilder.impose(incomingWhere);
            const where = whereBuilder.build();
            const data = await this.transactionRepository.count(where);
            if (data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: data,
                });
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async find(incomingFilter) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            const filterBuilder = new repository_1.FilterBuilder(incomingFilter);
            const whereBuilder = new repository_1.WhereBuilder();
            const where = whereBuilder.eq('receiver.uid', currentUser.uid).build();
            if (currentUser.roles.includes(globals_1.RoleKey.Merchant)) {
                filterBuilder.impose(where);
            }
            filterBuilder.impose({ where: { type: globals_1.TransactionType.MERCHANT_WITHDRAWAL } });
            const filter = filterBuilder.build();
            const data = await this.transactionRepository.find(filter);
            if (data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: data,
                });
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id, incomingFilter) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            const filterBuilder = new repository_1.FilterBuilder(incomingFilter);
            const whereBuilder = new repository_1.WhereBuilder();
            const where = whereBuilder.eq('receiver.uid', currentUser.uid).build();
            if (currentUser.roles.includes(globals_1.RoleKey.Merchant)) {
                filterBuilder.impose(where);
            }
            filterBuilder.impose({ where: { type: globals_1.TransactionType.MERCHANT_WITHDRAWAL } });
            const filter = filterBuilder.build();
            console.log(filter);
            const data = await this.transactionRepository.findById(id, filter);
            if (data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: data,
                });
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, transaction) {
        try {
            const now = moment_1.default().utc().unix();
            await this.transactionRepository.updateById(id, Object.assign(Object.assign({}, transaction), { updatedAt: now }));
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant]),
    rest_1.post('/merchant-withdrawal', withdrawal_specifications_1.POSTMerchantWithdrawalSpecification),
    tslib_1.__param(0, rest_1.requestBody(withdrawal_specifications_1.POSTMerchantWithdrawalRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WithdrawalController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/merchant-withdrawal/count', withdrawal_specifications_1.GETMerchantWithdrawalCountSpecification),
    tslib_1.__param(0, rest_1.param.where(models_1.Transaction)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WithdrawalController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/merchant-withdrawal', withdrawal_specifications_1.GETMerchantWithdrawalSpecification),
    tslib_1.__param(0, rest_1.param.filter(models_1.Transaction)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WithdrawalController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/merchant-withdrawal/{id}', withdrawal_specifications_1.GETMerchantWithdrawalByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Transaction, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WithdrawalController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/merchant-withdrawal/{id}', withdrawal_specifications_1.PATCHMerchantWithdrawalByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(withdrawal_specifications_1.PATCHMerchantWithdrawalRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Transaction]),
    tslib_1.__metadata("design:returntype", Promise)
], WithdrawalController.prototype, "updateById", null);
WithdrawalController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository, Function, Object])
], WithdrawalController);
exports.WithdrawalController = WithdrawalController;
//# sourceMappingURL=withdrawal.controller.js.map