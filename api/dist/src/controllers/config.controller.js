"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
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
const specifications_1 = require("../specifications");
const validateInventoryItemTypeValue = (config) => {
    if (config.type === globals_1.AdminConfigType.INVENTORY_TYPES) {
        Object.values(config.value).forEach((item) => {
            if (isNaN(item.count) || !item.count) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.ConfigResponseMessages.ERROR_COUNT_INVENTORY);
            }
        });
    }
    return true;
};
/**
 * @export
 * @class ConfigController
 * Controller for global configuration updates.
 */
let ConfigController = class ConfigController {
    constructor(configRepository, currentUserGetter, response) {
        this.configRepository = configRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.CONFIG_CONTROLLER);
    }
    async create(config) {
        try {
            const filterBuilder2 = new repository_1.FilterBuilder();
            const configFilter = filterBuilder2.where({ type: config.type }).build();
            const existingConfig = await this.configRepository.findOne(configFilter); // TODO: Review this filter, we can only have two items on the collection
            if (existingConfig) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.GlobalResponseMessages.CANNOT_CREATE_ALREADY_EXISTS);
            }
            validateInventoryItemTypeValue(config);
            const now = moment_1.default().utc().unix();
            const result = await this.configRepository.create(Object.assign(Object.assign({}, config), { createdAt: now, updatedAt: now }));
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
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const isMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
            let result;
            if (isMerchant) {
                const filterBuilder2 = new repository_1.FilterBuilder(filter);
                const configFilter = filterBuilder2
                    .where({
                    and: [Object.assign({}, (filter && filter.where)), { type: globals_1.AdminConfigType.INVENTORY_TYPES }],
                })
                    .build();
                result = await this.configRepository.find(configFilter);
            }
            else {
                result = await this.configRepository.find(filter);
            }
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
    async updateById(id, config) {
        try {
            validateInventoryItemTypeValue(config);
            const now = moment_1.default().utc().unix();
            await this.configRepository.updateById(id, Object.assign(Object.assign({}, config), { updatedAt: now }));
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
            const result = await this.configRepository.deleteById(id);
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
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
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/config', specifications_1.POSTConfigSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTConfigRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/config', specifications_1.GETConfigSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Config))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/config/{id}', specifications_1.PATCHConfigSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(specifications_1.PATCHConfigRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/config/{id}', specifications_1.DELConfigIdSpecifications),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "deleteById", null);
ConfigController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ConfigRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ConfigRepository, Function, Object])
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map