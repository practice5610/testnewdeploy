"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
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
const utils_1 = require("../utils");
let StoreController = class StoreController {
    constructor(storeRepository, productRepository, offerRepository, reviewRepository, response, searchEngineService, profileService, currentUserGetter) {
        this.storeRepository = storeRepository;
        this.productRepository = productRepository;
        this.offerRepository = offerRepository;
        this.reviewRepository = reviewRepository;
        this.response = response;
        this.searchEngineService = searchEngineService;
        this.profileService = profileService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.STORE_CONTROLLER);
    }
    async create(store) {
        var _a;
        try {
            // THIS VALIDATION RESTRICT MERCHANTS TO ONLY 1 STORE. THIS LOGIC NEED TO BE CHANGE.
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder
                .where({ 'merchant.uid': (_a = store.merchant) === null || _a === void 0 ? void 0 : _a.uid })
                .limit(1)
                .build();
            const existingStore = await this.storeRepository.find(filter);
            if (existingStore.length) {
                throw new rest_1.HttpErrors.NotAcceptable(constants_1.StoreResponseMessages.CURRENT_MERCHANT_HAS_STORE);
            }
            const now = moment_1.default().utc().unix();
            const newStore = Object.assign(Object.assign({}, store), { createdAt: now, updatedAt: now });
            const result = await this.storeRepository.create(newStore);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            if (Object.values(constants_1.StoreResponseMessages).includes(error.message)) {
                throw error;
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async count(
    //@ts-ignore
    where) {
        try {
            const count = await this.storeRepository.count(where);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: 'Stores has been count successfully',
                data: count,
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async find(
    //@ts-ignore
    filter) {
        try {
            const filterBuilder = new repository_1.FilterBuilder();
            const fieldsFilter = filterBuilder
                .fields({ pin: false })
                .build();
            const result = await this.storeRepository.find(Object.assign(Object.assign({}, filter), fieldsFilter));
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        try {
            let returnPin = false;
            const currentUser = await this.currentUserGetter();
            if (currentUser) {
                try {
                    if (currentUser.roles.includes(globals_1.RoleKey.Merchant)) {
                        const profile = await this.profileService.getProfile(currentUser.uid, {
                            requiredFields: ['store'],
                        });
                        const profileData = utils_1.handleServiceResponseResult(profile);
                        if (!profileData)
                            throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
                        returnPin = profileData.store._id === id;
                    }
                }
                catch (error) {
                    this.logger.warn('No matching merchant user found on stores request. Will not return pin with result');
                }
            }
            const filterBuilder = new repository_1.FilterBuilder();
            const fieldsFilter = filterBuilder
                .fields({ pin: false })
                .build();
            const result = await this.storeRepository.findById(id, returnPin ? undefined : fieldsFilter);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteById(id) {
        var _a;
        try {
            const existingStore = await this.storeRepository.findById(id);
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            // If current user is a Merchant, then he only can delete his own Stores.
            if (currentUser.roles.includes(globals_1.RoleKey.Merchant) &&
                ((_a = existingStore === null || existingStore === void 0 ? void 0 : existingStore.merchant) === null || _a === void 0 ? void 0 : _a.uid) !== currentUser.uid) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            if (existingStore.objectID) {
                const indexResult = await this.searchEngineService.delete(existingStore.objectID);
                if (!indexResult.success) {
                    throw new rest_1.HttpErrors.BadRequest(indexResult.message);
                }
            }
            await this.storeRepository.deleteById(id);
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
        }
        catch (error) {
            this.logger.error(error);
            if (Object.values(constants_1.GlobalResponseMessages).includes(error.message) ||
                Object.values(constants_1.ProfileResponseMessages).includes(error.message)) {
                throw error;
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateStoreById(incomingStore, id) {
        var _a;
        try {
            const now = moment_1.default().utc().unix();
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const currentStore = await this.storeRepository.findById(id);
            // If current user is a Merchant, then he only can update his own Stores.
            if (currentUser.roles.includes(globals_1.RoleKey.Merchant) &&
                ((_a = currentStore === null || currentStore === void 0 ? void 0 : currentStore.merchant) === null || _a === void 0 ? void 0 : _a.uid) !== currentUser.uid) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            if (currentUser.uid) {
                currentUser.firstName = incomingStore.merchant.firstName || '';
                currentUser.lastName = incomingStore.merchant.lastName;
                currentUser.updatedAt = now;
                currentUser.store = {
                    _id: incomingStore._id,
                    companyName: incomingStore.companyName,
                    number: incomingStore.number,
                    street1: incomingStore.street1,
                    street2: incomingStore.street2 ? incomingStore.street2 : '',
                    city: incomingStore.city,
                    state: incomingStore.state,
                    zip: incomingStore.zip,
                    country: incomingStore.country,
                };
                await this.profileService.updateProfileById(currentUser.uid, currentUser);
            }
            // END FIREBASE UPDATE END
            // DB UPDATE START
            const storeForDB = Object.assign(Object.assign({}, incomingStore), { updatedAt: now });
            //@ts-ignore
            delete storeForDB._id;
            delete storeForDB.objectID;
            console.log(storeForDB);
            // update store itself
            await this.storeRepository.replaceById(id, storeForDB);
            // DB UPDATE END
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: 'Store has been updated successfully',
                result: Object.assign(Object.assign({}, storeForDB), { _id: id }),
            });
        }
        catch (error) {
            this.logger.error(error);
            if (Object.values(constants_1.GlobalResponseMessages).includes(error.message) ||
                Object.values(constants_1.ProfileResponseMessages).includes(error.message)) {
                throw error;
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/stores', specifications_1.POSTStoreSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTStoreRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Store]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/stores/count', specifications_1.GETStoresCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Store))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/stores', specifications_1.GETStoresSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Store))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/stores/{id}', specifications_1.GETStoreByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/stores/{id}', specifications_1.DELStoresByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "deleteById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.put('/store/{id}', specifications_1.PUTStoreByIDSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.PUTStoreByIDRequestBody)),
    tslib_1.__param(1, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Store, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "updateStoreById", null);
StoreController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.StoreRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.OfferRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.ReviewRepository)),
    tslib_1.__param(4, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(5, loopback4_spring_1.service(services_1.SearchEngineService)),
    tslib_1.__param(6, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(7, core_1.inject.getter(authorization_2.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.StoreRepository,
        repositories_1.ProductRepository,
        repositories_1.OfferRepository,
        repositories_1.ReviewRepository, Object, services_1.SearchEngineService,
        services_1.ProfileService, Function])
], StoreController);
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map