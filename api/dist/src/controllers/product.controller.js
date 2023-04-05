"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const loopback4_ratelimiter_1 = require("../loopback4-ratelimiter");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const specifications_1 = require("../specifications");
const utils_1 = require("../utils");
const fs = require('fs');
const path = require('path');
// TODO: update the routes with old search logic to use new elastic search stuff
// old search logic is all commented out because it has lint errors
let ProductController = class ProductController {
    constructor(productRepository, searchEngineService, response, profileService, productService) {
        this.productRepository = productRepository;
        this.searchEngineService = searchEngineService;
        this.response = response;
        this.profileService = profileService;
        this.productService = productService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.PRODUCTS_CONTROLLER);
    }
    /**
     * Converts Doba product xml into smaller json files of 1,000 products each
     * @param {Object} obj
     * @returns {Promise<Response>}
     * @memberof ProductController
     */
    async batchCreate(obj) {
        try {
            const { uid, source } = obj;
            console.log('Will batch create from source:', source);
            const profile = await this.profileService.getProfile(uid, {
                requiredFields: ['firstName', 'lastName', 'store'],
            });
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (!profileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            const doStream = async () => {
                return new Promise((resolve, reject) => {
                    let products = [];
                    let currentProduct;
                    let currentTag;
                    let i = 0;
                    const paths = [];
                    const saxStream = require('sax').createStream(true, { trim: true });
                    saxStream.on('error', function (e) {
                        // unhandled errors will throw, since this is a proper node
                        // event emitter.
                        console.error('error!', e);
                        // clear the error
                        // @ts-ignore
                        this._parser.error = null; //eslint-disable-line
                        // @ts-ignore
                        this._parser.resume(); //eslint-disable-line
                    });
                    saxStream.on('opentag', function (node) {
                        // same object as above
                        if (node.name === 'item') {
                            currentProduct = {};
                        }
                        else if (currentProduct) {
                            currentTag = node.name;
                            //@ts-ignore
                            currentProduct[currentTag] = '';
                        }
                    });
                    saxStream.on('text', function (value) {
                        if (value.length) {
                            //@ts-ignore
                            currentProduct[currentTag] = value;
                        }
                    });
                    saxStream.on('closetag', (name) => {
                        // same object as above
                        if (name === 'item' && currentProduct) {
                            const product = utils_1.generateProduct(currentProduct, profileData);
                            products.push(product);
                            try {
                                if (products.length >= 500) {
                                    const coolPath = path.join(__dirname, `_products/product-${i}.json`);
                                    paths.push(coolPath);
                                    console.log('Writing file: ', coolPath);
                                    fs.writeFile(coolPath, JSON.stringify({ products }), (err) => {
                                        if (err) {
                                            console.error(err);
                                            return;
                                        }
                                    });
                                    i++;
                                    products = [];
                                }
                            }
                            catch (error) {
                                console.error(error);
                            }
                            currentProduct = undefined;
                        }
                    });
                    saxStream.on('end', () => {
                        const coolPath = path.join(__dirname, `_products/product-${i}.json`);
                        paths.push(coolPath);
                        fs.writeFile(coolPath, JSON.stringify({ products }), (err) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            return resolve(paths);
                        });
                    });
                    // pipe is supported, and it's readable/writable
                    // same chunks coming in also go out.
                    const coolPath = path.join(__dirname, `_products/${source}`);
                    fs.createReadStream(coolPath).pipe(saxStream);
                });
            };
            const paths = await doStream();
            console.log('Files saved in batches. Will write batched files to database...', paths);
            let totalRecords = 0;
            for (const batchPath of paths) {
                const json = fs.readFileSync(batchPath, 'utf8');
                const parsed = JSON.parse(json);
                const products = parsed.products;
                console.log('Read batch:', batchPath);
                console.log('Will write products to database...');
                const now = moment_1.default().utc().unix();
                for (const item of products) {
                    console.log('Creating product from batch:', batchPath);
                    const result = await this.productRepository.create(Object.assign(Object.assign({}, item), { createdAt: now, updatedAt: now }));
                    // transform product according to search engine schema
                    const searchProduct = {
                        id: result._id,
                        categoryName: result.category.name,
                        subCategoryName: result.category.subCategories.join(','),
                        hasOffer: false,
                        _geoloc: utils_1.transformGeolocForSearchEngine(result.store._geoloc),
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
                    console.log('Product added to db. Will add product to search engine index:', process.env.SEARCH_ENGINE_PRODUCTS_INDEX, 'Product:', searchProduct.id);
                    const indexResult = await this.searchEngineService.create(process.env.SEARCH_ENGINE_PRODUCTS_INDEX, searchProduct);
                    console.log('search engine success?', indexResult.success);
                    if (!indexResult.success) {
                        console.log('search engine Error:', indexResult);
                        // There was an error, rolling back...
                        await this.productRepository.deleteById(result._id);
                        return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(indexResult);
                    }
                    const updatedProductWithObjectID = Object.assign(Object.assign({}, result), { objectID: indexResult.data._id });
                    updatedProductWithObjectID.updatedAt = now;
                    await this.productRepository.updateById(result._id, updatedProductWithObjectID);
                    totalRecords++;
                    console.log('Records created so far:', totalRecords);
                }
                console.log('All batches processed! Done. Total records created:', totalRecords);
                const waitVal = 30000;
                console.log('Will wait', waitVal, 'ms before next batch...');
                await utils_1.wait(waitVal);
                console.log('Finished waiting...');
                console.log('Batch products created! for batch file:', batchPath, '\n\n\n');
            }
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'All batches processed!' });
        }
        catch (error) {
            console.error(error.message, error.toJSON && error.toJSON());
            return this.response.status(500).send({ success: false, message: error.message });
        }
    }
    /**
     * Converts Doba product xml into smaller json files of 1,000 products each
     * @param {Object} obj
     * @returns {Promise<Response>}
     * @memberof ProductController
     */
    async batchCreateResume(obj) {
        try {
            const { startIndex, source } = obj;
            console.log('Will resume batch create from source:', source);
            let totalRecords = 0;
            const paths = [];
            for (let i = startIndex; i < 886; i++) {
                const coolPath = path.join(__dirname, `_products/product-${i}.json`);
                paths.push(coolPath);
            }
            for (const batchPath of paths) {
                const json = fs.readFileSync(batchPath, 'utf8');
                const parsed = JSON.parse(json);
                const products = parsed.products;
                console.log('Read batch:', batchPath);
                console.log('Will write products to database...');
                const now = moment_1.default().utc().unix();
                for (const item of products) {
                    console.log('Creating product from batch:', batchPath);
                    await this.productRepository.create(Object.assign(Object.assign({}, item), { createdAt: now, updatedAt: now }));
                    /**
                     * This search engine code needs to be replaced for elastic search and it has
                     * several lint errors
                     */
                    // // transform product according to search engine schema
                    // const searchProduct = {
                    //   id: result._id,
                    //   categoryName: result.category!.name,
                    //   subCategoryName: result.category!.subCategories!.join(','),
                    //   hasOffer: false,
                    //   _geoloc: transformGeolocForSearchEngine(result.store!._geoloc!),
                    //   createdAt: result.createdAt,
                    //   updatedAt: now,
                    //   imageUrl: result.imageUrl,
                    //   merchantUID: result.merchantUID,
                    //   price: result.price,
                    //   priceNum: Dinero(result.price).toUnit(),
                    //   name: result.name,
                    //   category: result.category,
                    //   description: result.description,
                    //   attributes: result.attributes,
                    //   _tags: result._tags,
                    //   store: {
                    //     _id: result.store!._id,
                    //     address: result.store!.street1,
                    //   },
                    // } as SearchRecordProduct;
                    // console.log(
                    //   'Product added to db. Will add product to search engine index:',
                    //   process.env.SEARCH_ENGINE_PRODUCTS_INDEX,
                    //   'Product:',
                    //   searchProduct.id
                    // );
                    // const indexResult: {
                    //   success: boolean;
                    //   message?: string;
                    //   data?: any;
                    // } = await this.searchEngineService.create(
                    //   process.env.SEARCH_ENGINE_PRODUCTS_INDEX!,
                    //   searchProduct
                    // );
                    // console.log('search engine success?', indexResult.success);
                    // if (!indexResult.success) {
                    //   console.log('search engine Error:', indexResult);
                    //   // There was an error, rolling back...
                    //   await this.productRepository.deleteById(result._id);
                    //   return this.response.status(ServiceResponseCodes.SUCCESS).send(indexResult);
                    // }
                    // const updatedProductWithObjectID: Product = {
                    //   ...result,
                    //   objectID: indexResult.data._id,
                    // } as Product;
                    // updatedProductWithObjectID.updatedAt = now;
                    // await this.productRepository.updateById(result._id, updatedProductWithObjectID);
                    totalRecords++;
                    console.log('Records created so far:', totalRecords);
                }
                console.log('All batches processed! Done. Total records created:', totalRecords);
                const waitVal = 30000;
                console.log('Will wait', waitVal, 'ms before next batch...');
                await utils_1.wait(waitVal);
                console.log('Finished waiting...');
                console.log('Batch products created! for batch file:', batchPath, '\n\n\n');
            }
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: 'All batches processed!' });
        }
        catch (error) {
            console.error(error.message, error.toJSON && error.toJSON());
            return this.response.status(500).send({ success: false, message: error.message });
        }
    }
    async create(products) {
        const now = moment_1.default().utc().unix();
        const successfulProducts = [];
        const failedProducts = [];
        for (const item of products) {
            try {
                const serviceResult = await this.productService.create(item, now);
                successfulProducts.push(serviceResult);
            }
            catch (err) {
                failedProducts.push({ product: item, reason: err.message });
            }
        }
        return this.response
            .status(constants_1.ServiceResponseCodes.SUCCESS)
            .send({ successful: successfulProducts, failed: failedProducts });
    }
    async count(
    //@ts-ignore
    where) {
        try {
            const product_count = await this.productRepository.count(where);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(product_count);
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
            const result = await this.productRepository.find(filter);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id) {
        try {
            const result = await this.productRepository.findById(id);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, product) {
        try {
            const existingProduct = await this.productRepository.findById(id);
            if (!existingProduct) {
                throw new rest_1.HttpErrors.NotFound(constants_1.ProductResponseMessages.NOT_FOUND);
            }
            const now = moment_1.default().utc().unix();
            const newProduct = Object.assign(Object.assign(Object.assign({}, existingProduct), product), { updatedAt: now });
            // this update is a temporary solution while we don't have a working search engine
            await this.productRepository.updateById(id, newProduct);
            /**
             * This search engine code needs to be replaced for elastic search and it has
             * several lint errors
             */
            // // transform product according to search engine schema
            // const searchProduct = {
            //   productID: existingProduct._id,
            //   categoryName: newProduct.category.name,
            //   subCategoryName: newProduct.category.subCategories?.join(','),
            //   hasOffer: false,
            //   _geoloc: transformGeolocForSearchEngine(existingProduct.store._geoloc!),
            //   createdAt: newProduct.createdAt,
            //   updatedAt: now,
            //   imageUrl: newProduct.imageUrl,
            //   merchantUID: newProduct.merchantUID,
            //   price: newProduct.price,
            //   priceNum: Dinero(newProduct.price).toUnit(),
            //   name: newProduct.name,
            //   category: newProduct.category,
            //   description: newProduct.description,
            //   attributes: newProduct.attributes,
            //   _tags: newProduct._tags,
            //   store: {
            //     _id: existingProduct.store._id,
            //     address: getComposedAddressFromStore(existingProduct.store),
            //   },
            // } as SearchRecordProduct;
            // await this.productService.updateById(
            //   searchProduct,
            //   existingProduct.objectID!,
            //   id,
            //   newProduct
            // );
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
        }
        catch (error) {
            this.logger.error(error);
            if (Object.values(constants_1.ProductResponseMessages).includes(error.message)) {
                throw error;
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteById(id) {
        try {
            const existingProduct = await this.productRepository.findById(id);
            if (!existingProduct) {
                throw new rest_1.HttpErrors.NotFound('Could not find product to delete.');
            }
            // while we do not have a search engine working we can delete via the repo
            // instead of service so we don't need the !
            //await this.productService.deleteById(existingProduct.objectID!, id);
            await this.productRepository.deleteById(id);
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/products/source/doba', specifications_1.POSTProductSourceDobaSpecification),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "batchCreate", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/products/source/doba/resume', specifications_1.POSTProductSourceDobaResumeSpecification),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "batchCreateResume", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant]),
    rest_1.post('/products', specifications_1.POSTProductsSpecification),
    tslib_1.__param(0, rest_1.requestBody.array({
        schema: rest_1.getModelSchemaRef(models_1.Product, {
            partial: true,
            exclude: ['_id', 'objectID', 'createdAt', 'merchantUID'],
        }),
    }, { description: 'Require an array of products instances.', required: true })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/products/count', specifications_1.GETProductsCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Product))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "count", null);
tslib_1.__decorate([
    loopback4_ratelimiter_1.ratelimit(false),
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/products', specifications_1.GETProductsSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Product))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/products/{id}', specifications_1.GETProductByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/products/{id}', specifications_1.PATCHProductByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(specifications_1.PATCHProductByIDRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/products/{id}', specifications_1.DELProductByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteById", null);
ProductController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ProductRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(services_1.SearchEngineService)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.ProductService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProductRepository,
        services_1.SearchEngineService, Object, services_1.ProfileService,
        services_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map