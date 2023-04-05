"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const loopback4_ratelimiter_1 = require("../loopback4-ratelimiter");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const specifications_1 = require("../specifications");
let CategoryController = class CategoryController {
    constructor(categoryRepository, currentUserGetter, response) {
        this.categoryRepository = categoryRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.ACCOUNT);
    }
    async createCategory(category) {
        try {
            const now = moment_1.default().utc().unix();
            const result = await this.categoryRepository.create(Object.assign(Object.assign({}, category), { createdAt: now, updatedAt: now }));
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: result });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async countCategories(where) {
        try {
            const result = await this.categoryRepository.count(where);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: result });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async find(filter) {
        try {
            let currentUserIsAdminOrSuperAdmin = false;
            const currentUser = await this.currentUserGetter();
            if (!currentUser) {
                this.logger.debug(constants_1.GlobalResponseMessages.NO_CURRENT_USER_PUBLIC_PATH);
            }
            else if (currentUser.roles.includes(globals_1.RoleKey.Admin) ||
                currentUser.roles.includes(globals_1.RoleKey.SuperAdmin)) {
                currentUserIsAdminOrSuperAdmin = true;
            }
            const result = await this.categoryRepository.find(filter);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: result.map((item) => {
                    const { commissionRate } = item, values = tslib_1.__rest(item, ["commissionRate"]);
                    return Object.assign(Object.assign({}, values), (currentUserIsAdminOrSuperAdmin && { commissionRate }));
                }),
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        try {
            let currentUserIsAdminOrSuperAdmin = false;
            const currentUser = await this.currentUserGetter();
            if (!currentUser) {
                this.logger.debug(constants_1.GlobalResponseMessages.NO_CURRENT_USER_PUBLIC_PATH);
            }
            else if (currentUser.roles.includes(globals_1.RoleKey.Admin) ||
                currentUser.roles.includes(globals_1.RoleKey.SuperAdmin)) {
                currentUserIsAdminOrSuperAdmin = true;
            }
            const result = await this.categoryRepository.findById(id);
            const { commissionRate } = result, values = tslib_1.__rest(result, ["commissionRate"]);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: Object.assign(Object.assign({}, values), (currentUserIsAdminOrSuperAdmin && { commissionRate })),
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    // TODO: This route seems to be no needed, why to update many items at once?
    async updateAll(category, where
    //): Promise<Response<APIResponse<Count>>> { // For .status(ServiceResponseCodes.SUCCESS)
    ) {
        try {
            const now = moment_1.default().utc().unix();
            const result = await this.categoryRepository.updateAll(Object.assign(Object.assign({}, category), { updatedAt: now }), where);
            /*return (
              this.response
                .status(ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: APIResponseMessages.SUCCESS, data: result })
            );*/
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT); // TODO: Review if this is ok
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, category) {
        try {
            const now = moment_1.default().utc().unix();
            const result = await this.categoryRepository.updateById(id, Object.assign(Object.assign({}, category), { updatedAt: now }));
            /*return (
              this.response
                .status(ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: APIResponseMessages.SUCCESS, data: result })
            );*/
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT); // TODO: Review if this is ok
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    // TODO: This route seems to be no needed, we can use the path method for the same thing
    async replaceById(id, category) {
        try {
            const now = moment_1.default().utc().unix();
            const result = await this.categoryRepository.replaceById(id, Object.assign(Object.assign({}, category), { updatedAt: now }));
            /*return (
              this.response
                .status(ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: APIResponseMessages.SUCCESS, data: result })
            );*/
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT); // TODO: Review if this is ok
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
            const result = await this.categoryRepository.deleteById(id);
            /*return (
              this.response
                .status(ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: APIResponseMessages.SUCCESS, data: result })
            );*/
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT); // TODO: Review if this is ok
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
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/categories', specifications_1.POSTCategoriesSpecification) // TODO: should be changed to /category ??
    ,
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTCategoriesRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "createCategory", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/categories/count', specifications_1.GETCategoryCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Category))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "countCategories", null);
tslib_1.__decorate([
    loopback4_ratelimiter_1.ratelimit(false),
    authorization_1.authorize([globals_1.RoleKey.All, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/categories', specifications_1.GETCategoriesSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Category))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/categories/{id}', specifications_1.GETCategoriesIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/categories', specifications_1.PATCHCategoriesSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.PATCHCategoriesRequestBody)),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Category))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateAll", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/categories/{id}', specifications_1.PATCHCategoriesIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(specifications_1.PATCHCategoriesIdRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.put('/categories/{id}', specifications_1.PUTCategoriesIdSpecifications),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(specifications_1.PUTCategoriesIdRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "replaceById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/categories/{id}', specifications_1.DELCategoriesIdSpecifications),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "deleteById", null);
CategoryController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.CategoryRepository, Function, Object])
], CategoryController);
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map