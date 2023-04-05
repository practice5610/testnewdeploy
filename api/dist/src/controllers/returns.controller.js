"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnsController = void 0;
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
const returns_service_1 = require("../services/returns.service");
const Specification = tslib_1.__importStar(require("../specifications"));
const utils_1 = require("../utils");
let ReturnsController = class ReturnsController {
    constructor(response, returnService, currentUserGetter) {
        this.response = response;
        this.returnService = returnService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.RETURNS);
    }
    /**
     * POST a new Return Policy
     * @param policy new policy to add to database
     */
    async createPolicy(policy) {
        try {
            const response = await this.returnService.createReturnPolicy(policy);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * GET all the policies a merchant has or a specific policy by id
     */
    async getReturnPolicies(id) {
        try {
            const response = await this.returnService.getReturnPolicies(id);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * DELETE Policy by ID
     */
    async deleteById(id) {
        try {
            const response = await this.returnService.deleteById(id);
            if (response.success)
                return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
            utils_1.handleServiceResponseResult(response);
            throw new rest_1.HttpErrors.BadRequest(response.message);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * POST new Return Request
     */
    async createReturnRequest(returnRequest) {
        console.log('Made it to body');
        try {
            const response = await this.returnService.createReturnRequest(returnRequest);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * GET Return Requests by ID
     */
    async getReturnRequest(
    //@ts-ignore
    requestFilter) {
        var _a;
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const currentUserIsMember = currentUser.roles.includes(globals_1.RoleKey.Member);
            const currentUserIsMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
            const filterBuilder = new repository_1.FilterBuilder(requestFilter);
            if (currentUserIsMember) {
                filterBuilder.impose({ customerID: currentUser.uid });
            }
            else if (currentUserIsMerchant) {
                filterBuilder.impose({ merchantID: (_a = currentUser.store) === null || _a === void 0 ? void 0 : _a._id });
            }
            const filter = filterBuilder.build();
            const response = await this.returnService.getReturnRequest(filter);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * PATCH Return Request
     */
    async updateRequestById(id, returnRequest) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const result = await this.returnService.updateReturnRequest(id, returnRequest, currentUser);
            if (result.success)
                return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
            utils_1.handleServiceResponseResult(result);
            throw new rest_1.HttpErrors.BadRequest(result.message);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * POST Dispute
     */
    async createDispute(dispute) {
        try {
            const response = await this.returnService.createDispute(dispute);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * GET Dispute by ID
     */
    async getDisputeByID(id) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const currentUserIsAdmin = currentUser.roles.includes(globals_1.RoleKey.SuperAdmin) || currentUser.roles.includes(globals_1.RoleKey.Admin);
            const currentUserIsMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
            let filterValues = {};
            if (currentUserIsAdmin) {
                filterValues = {
                    or: [{ _id: id }, { 'returnRequest.merchantID': id }, { 'returnRequest.customerID': id }],
                };
            }
            else if (currentUserIsMerchant) {
                filterValues = {
                    or: [{ 'returnRequest.merchantID': id }],
                };
            }
            else {
                filterValues = {
                    or: [{ 'returnRequest.customerID': id }],
                };
            }
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder.where(filterValues).build();
            const response = await this.returnService.getDisputeByID(filter);
            const resultData = utils_1.handleServiceResponseResult(response);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * PATCH Dispute
     */
    async updateDisputeByID(id, dispute) {
        try {
            const result = await this.returnService.updateDispute(id, dispute);
            if (result.success)
                return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
            utils_1.handleServiceResponseResult(result);
            throw new rest_1.HttpErrors.BadRequest(result.message);
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
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/return/policy', Specification.POSTReturnPolicySpecifications),
    tslib_1.__param(0, rest_1.requestBody(Specification.POSTReturnPolicyRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "createPolicy", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Member]),
    rest_1.get('/return/policy/{id}', Specification.GETPolicySpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "getReturnPolicies", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('return/policy/{id}', Specification.DELPolicyByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "deleteById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.Member, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/return/requests', Specification.POSTReturnRequestSpecifications),
    tslib_1.__param(0, rest_1.requestBody(Specification.POSTReturnRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "createReturnRequest", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Member]),
    rest_1.get('/return/requests', Specification.GETReturnRequestSpecification),
    tslib_1.__param(0, rest_1.param.filter(models_1.ReturnRequestModel)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "getReturnRequest", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Merchant]),
    rest_1.patch('/return/requests/{id}', Specification.PATCHReturnRequestSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(Specification.PATCHReturnRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "updateRequestById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Merchant, globals_1.RoleKey.Member]),
    rest_1.post('return/disputes', Specification.POSTDisputeSpecifications),
    tslib_1.__param(0, rest_1.requestBody(Specification.POSTDisputeRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "createDispute", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Merchant, globals_1.RoleKey.Member]),
    rest_1.get('return/disputes/{id}', Specification.GETDisputeSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "getDisputeByID", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('return/disputes/{id}', Specification.PATCHDisputeSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(Specification.PATCHDisputeRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnsController.prototype, "updateDisputeByID", null);
ReturnsController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(1, loopback4_spring_1.service(returns_service_1.ReturnService)),
    tslib_1.__param(2, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [Object, returns_service_1.ReturnService, Function])
], ReturnsController);
exports.ReturnsController = ReturnsController;
//# sourceMappingURL=returns.controller.js.map