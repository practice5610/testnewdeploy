"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const search_engine_service_1 = require("../services/search-engine.service");
const transformers_1 = require("../utils/transformers");
let OfferController = class OfferController {
    constructor(offerRepository, productRepository, searchEngineService, response, categoryRepository) {
        this.offerRepository = offerRepository;
        this.productRepository = productRepository;
        this.searchEngineService = searchEngineService;
        this.response = response;
        this.categoryRepository = categoryRepository;
    }
    async isCategoryValid(category) {
        var _a;
        let response = { success: true, message: '' };
        try {
            const result = await this.categoryRepository.findOne({ where: { name: category.name } });
            if (!result) {
                return { success: false, message: `Invalid Category: ${category.name}` };
            }
            if ((_a = category.subCategories) === null || _a === void 0 ? void 0 : _a.length) {
                category.subCategories.forEach((subcategory) => {
                    var _a;
                    if (!((_a = result.subCategories) === null || _a === void 0 ? void 0 : _a.includes(subcategory))) {
                        response = { success: false, message: `Invalid Sub Category: ${subcategory}` };
                    }
                });
            }
        }
        catch (error) {
            return { success: false, message: `error looking for this category: ${category.name}` };
        }
        return response;
    }
    async create(offer) {
        var _a, _b, _c, _d, _e;
        const response = await this.isCategoryValid(offer.product.category);
        if (!response.success) {
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(response);
        }
        const now = moment_1.default().utc().unix();
        const result = await this.offerRepository.create(Object.assign(Object.assign({}, offer), { createdAt: now, updatedAt: now }));
        const product = await this.productRepository.findById(result.product._id);
        // search product by objectID and update it with offer
        const searchIndexResult = await this.searchEngineService.searchByObjectId((_a = process.env.SEARCH_ENGINE_PRODUCTS_INDEX) !== null && _a !== void 0 ? _a : '', [product.objectID || '']);
        const partialOffer = Object.assign({}, result);
        //@ts-ignore
        delete partialOffer.product; // remove product from offer
        const currentProduct = searchIndexResult.data && searchIndexResult.data.length ? searchIndexResult.data[0] : product;
        const searchProduct = Object.assign(Object.assign({ productID: currentProduct._id, categoryName: currentProduct.category.name, subCategoryName: (_d = (_c = (_b = currentProduct.category) === null || _b === void 0 ? void 0 : _b.subCategories) === null || _c === void 0 ? void 0 : _c.join(',')) !== null && _d !== void 0 ? _d : '', hasOffer: true }, (((_e = product === null || product === void 0 ? void 0 : product.store) === null || _e === void 0 ? void 0 : _e._geoloc) && {
            _geoloc: transformers_1.transformGeolocForSearchEngine(product.store._geoloc),
        })), { offer: partialOffer, priceNum: dinero_js_1.default(currentProduct.price).toUnit(), createdAt: currentProduct.createdAt, updatedAt: currentProduct.updatedAt, imageUrl: currentProduct.imageUrl, merchantUID: currentProduct.merchantUID, category: currentProduct.category, name: currentProduct.name, description: currentProduct.description, store: {
                _id: currentProduct.store._id,
                number: currentProduct.store.number,
                street1: currentProduct.store.street1,
                street2: currentProduct.store.street2,
                city: currentProduct.store.city,
                state: currentProduct.store.state,
                zip: currentProduct.store.zip,
                country: currentProduct.store.country,
            }, price: currentProduct.price, attributes: currentProduct.attributes, _tags: currentProduct._tags });
        // This check was added to get rid of ! usage for lint. I think this should be fine since we need
        // objectID on search engine records.
        if ((currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.objectID) && process.env.SEARCH_ENGINE_PRODUCTS_INDEX) {
            const indexResult = await this.searchEngineService.update(process.env.SEARCH_ENGINE_PRODUCTS_INDEX, currentProduct.objectID, searchProduct);
            if (!indexResult.success) {
                // There was an error, rolling back...
                await this.offerRepository.deleteById(result._id);
                return this.response
                    .status(constants_1.ServiceResponseCodes.SUCCESS)
                    .send({ success: false, message: indexResult.message });
            }
        }
        return result;
    }
    async count(
    //@ts-ignore
    where) {
        return this.offerRepository.count(where);
    }
    async find(
    //@ts-ignore
    filter) {
        return this.offerRepository.find(filter);
    }
    async findById(id) {
        return this.offerRepository.findById(id);
    }
    async updateById(id, incomingOffer) {
        var _a;
        const existingOffer = await this.offerRepository.findById(id);
        const existingProduct = await this.productRepository.findById(existingOffer.product._id);
        if ((_a = incomingOffer.product) === null || _a === void 0 ? void 0 : _a.category) {
            const response = await this.isCategoryValid(incomingOffer.product.category);
            if (!response.success) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(response);
            }
        }
        const partialOffer = Object.assign({}, incomingOffer);
        //@ts-ignore
        delete partialOffer.product; // remove product from offer
        const searchProduct = {
            hasOffer: true,
            offer: partialOffer,
        };
        // This check was added to get rid of ! usage for lint
        if (process.env.SEARCH_ENGINE_PRODUCTS_INDEX && existingProduct.objectID) {
            const indexResult = await this.searchEngineService.update(process.env.SEARCH_ENGINE_PRODUCTS_INDEX, existingProduct.objectID, searchProduct);
            if (!indexResult.success) {
                return this.response
                    .status(constants_1.ServiceResponseCodes.SUCCESS)
                    .send({ success: false, message: indexResult.message });
            }
        }
        await this.offerRepository.updateById(id, incomingOffer);
    }
    async deleteById(id) {
        const existingOffer = await this.offerRepository.findById(id);
        if (!existingOffer) {
            throw new rest_1.HttpErrors.NotFound('Could not find offer to delete.');
        }
        const existingProduct = await this.productRepository.findById(existingOffer.product._id);
        if (!existingProduct) {
            throw new rest_1.HttpErrors.NotFound('Could not find product of given offer.');
        }
        const indexResult = await this.searchEngineService.delete(existingProduct.objectID);
        if (!indexResult.success) {
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: false, message: indexResult.error });
        }
        await this.offerRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/offers', {
        responses: {
            '200': {
                description: 'Offer model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Offer } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Offer]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/offers/count', {
        responses: {
            '200': {
                description: 'Offer model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Offer))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/offers', {
        responses: {
            '200': {
                description: 'Array of Offer model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Offer } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Offer))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/offers/{id}', {
        responses: {
            '200': {
                description: 'Offer model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Offer } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/offers/{id}', {
        responses: {
            '204': {
                description: 'Offer PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Offer]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/offers/{id}', {
        responses: {
            '204': {
                description: 'Offer DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OfferController.prototype, "deleteById", null);
OfferController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OfferRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(2, loopback4_spring_1.service(search_engine_service_1.SearchEngineService)),
    tslib_1.__param(3, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(4, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OfferRepository,
        repositories_1.ProductRepository,
        search_engine_service_1.SearchEngineService, Object, repositories_1.CategoryRepository])
], OfferController);
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map