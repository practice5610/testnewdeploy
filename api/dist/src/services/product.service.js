"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const utils_1 = require("../utils");
let ProductService = class ProductService {
    constructor(productRepository, searchEngineService, categoryRepository) {
        this.productRepository = productRepository;
        this.searchEngineService = searchEngineService;
        this.categoryRepository = categoryRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.PRODUCTS_SERVICE);
    }
    async deleteById(objectID, mongoID, options) {
        await this.productRepository.deleteById(mongoID, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const indexResult = await this.searchEngineService.delete(objectID);
        if (!indexResult.success) {
            throw new Error(indexResult.message);
        }
    }
    async updateById(searchProduct, objectID, mongoID, newProduct, options) {
        if (newProduct.category) {
            const isValid = await this.validateCategory(newProduct.category);
            if (!isValid.success)
                throw new Error(`product ${newProduct.name} has ${isValid.message}`);
        }
        await this.productRepository.updateById(mongoID, newProduct, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        /**
         * This needs to be updated when new search engine is ready. until then
         * it is commented out because ! causes lint problems
         */
        const indexResult = await this.searchEngineService.update(process.env.SEARCH_ENGINE_PRODUCTS_INDEX, objectID, searchProduct);
        if (!indexResult.success) {
            throw new Error(indexResult.message);
        }
    }
    async create(newProduct, now, options) {
        var _a, _b;
        const isValid = await this.validateCategory(newProduct.category);
        if (!isValid.success)
            throw new Error(`product ${newProduct.name} has ${isValid.message}`);
        const result = await this.productRepository.create(Object.assign(Object.assign({}, newProduct), { category: Object.assign(Object.assign({}, isValid.data), { subCategories: newProduct.category.subCategories }), updatedAt: now, createdAt: now }), process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        let searchProduct;
        try {
            searchProduct = {
                id: result._id,
                categoryName: result.category.name,
                subCategoryName: result.category.subCategories.join(','),
                hasOffer: false,
                productID: result._id,
                // TODO: Some default location value needs to be set on a constant variable(probably on globals) to use on these cases when no value is available
                _geoloc: utils_1.transformGeolocForSearchEngine(((_a = result.store._geoloc) === null || _a === void 0 ? void 0 : _a.lat) && ((_b = result.store._geoloc) === null || _b === void 0 ? void 0 : _b.lng)
                    ? result.store._geoloc
                    : { lat: 0, lng: 0 }),
                createdAt: result.createdAt,
                updatedAt: now,
                imageUrl: result.imageUrl,
                merchantUID: result.merchantUID,
                price: result.price,
                priceNum: dinero_js_1.default(result.price).toUnit(),
                name: result.name,
                category: result.category,
                description: result.description,
                attributes: result.attributes,
                _tags: result._tags,
                store: {
                    _id: result.store._id,
                    number: result.store.number,
                    street1: result.store.street1,
                    street2: result.store.street2,
                    city: result.store.city,
                    state: result.store.state,
                    zip: result.store.zip,
                    country: result.store.country,
                },
            };
        }
        catch (err) {
            throw new Error(`product ${result._id} is missing properties needed to make a new SearchRecordProduct:\n\t${err}`);
        }
        console.log('Will add product to search engine index:', process.env.SEARCH_ENGINE_PRODUCTS_INDEX, 'Product:', searchProduct);
        const indexResult = await this.searchEngineService.create(process.env.SEARCH_ENGINE_PRODUCTS_INDEX, searchProduct);
        if (!indexResult.success) {
            throw new Error(indexResult.message);
        }
        const resultWithObjectID = Object.assign(Object.assign({}, result), { objectID: indexResult.data._id, updatedAt: now });
        await this.productRepository.updateById(result._id, resultWithObjectID, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        return resultWithObjectID;
    }
    /**
     * Async method to validate if a Category is valid.
     * feel free to add more validation over a valid category as needed.
     * @param category
     * @return {Promise<APIResponse>}
     */
    async validateCategory(category) {
        try {
            // empty param validation.
            if (!category)
                return utils_1.APIResponseFalseOutput('Invalid category.');
            // query of requested category from our database.
            const dbCategory = await this.categoryRepository.findOne({ where: { name: category.name } });
            // unsuccesful query validation.
            if (!dbCategory)
                return utils_1.APIResponseFalseOutput('Category no longer exist.');
            // sub-categories validation, requested category must match with our db records.
            if (category.subCategories && category.subCategories.length) {
                // each sub-category received must match with db category sub-category
                for (const subcategory of category.subCategories)
                    if (!dbCategory.subCategories.includes(subcategory))
                        return utils_1.APIResponseFalseOutput(`Invalid Sub Category: ${subcategory}`);
            }
            // at this point Category pass all validations.
            return {
                success: true,
                message: 'Category valid.',
                data: dbCategory,
            };
        }
        catch (error) {
            return utils_1.APIResponseFalseOutput();
        }
    }
    /**
     * Async Method to validate if a Product exist and is valid.
     * feel free to add as many validation you need.
     * @param product
     * @return {Promise<APIResponse>}
     */
    async validateProduct(product) {
        try {
            // empty product or empty product_id validation.
            if (!product || !product._id)
                return utils_1.APIResponseFalseOutput(constants_1.ProductResponseMessages.MISSING_ID);
            // empty category validation.
            if (!product.category)
                return utils_1.APIResponseFalseOutput(constants_1.ProductResponseMessages.MISSING_CATEGORY);
            // call validateCategory to verify is the category is valid.
            const hasValidCategory = await this.validateCategory(product.category);
            // validateCategory result validation.
            if (!hasValidCategory.success) {
                return utils_1.APIResponseFalseOutput(hasValidCategory.message);
            }
            // query product by id from db.
            const dbProduct = await this.productRepository.findById(product._id);
            // unsuccessful query validation.
            if (!dbProduct)
                return utils_1.APIResponseFalseOutput(constants_1.ProductResponseMessages.NOT_LONGER_EXIST);
            // at this point product has been pass all validations.
            return {
                success: true,
                message: constants_1.ProductResponseMessages.VALID,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code) {
                return utils_1.APIResponseFalseOutput(error);
            }
            return utils_1.APIResponseFalseOutput();
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductService.prototype, "deleteById", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }) // TODO: Review if we can remove searchProduct and objectID
    ,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.SearchRecordProduct, String, String, models_1.Product, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductService.prototype, "updateById", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Product, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductService.prototype, "create", null);
ProductService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(services_1.SearchEngineService)),
    tslib_1.__param(2, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProductRepository,
        services_1.SearchEngineService,
        repositories_1.CategoryRepository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map