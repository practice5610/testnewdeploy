"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const nanoid_1 = require("nanoid");
const constants_1 = require("../../../constants");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('ProductController (unit)', () => {
    let productRepository;
    let profileService;
    let searchEngineService;
    let productService;
    let response;
    let responseSend;
    let send;
    let sendStatus;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenResponse);
    beforeEach(givenProductService);
    beforeEach(givenProductRepository);
    beforeEach(givenProfileService);
    beforeEach(givenSearchEngineService);
    describe('create', () => {
        it('returns successful products as successful', async () => {
            // The product controller's create function takes an array of products, calls the
            // product service create function for each of them, and returns lists of successful
            // and unsuccessful products added
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            // the product that will be sent to the api
            const input = await database_helpers_1.givenProduct();
            // the product that the service returns (this would be the same as input in real life but in a unit test it does not matter)
            const newProduct = await database_helpers_1.givenProduct();
            // we define the behavior of all of the functions that the route we are testing calls
            productService.stubs.create.resolves(newProduct);
            // we call the function
            await controller.create([input]);
            // we confirm the result
            testlab_1.expect(send.args[0][0]).to.deepEqual({ successful: [newProduct], failed: [] }, 'controllers return value should match this');
        });
        it('returns failed products as failed with a reason', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const input = await database_helpers_1.givenProduct();
            productService.stubs.create.throws(new Error('create error'));
            await controller.create([input]);
            testlab_1.expect(send.args[0][0]).to.deepEqual({ successful: [], failed: [{ product: input, reason: 'create error' }] }, 'controllers return value should match this');
        });
        it('tries to create every product it is passed (does not stop after an error)', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const input = [];
            input.push(await database_helpers_1.givenProduct());
            input.push(await database_helpers_1.givenProduct());
            input.push(await database_helpers_1.givenProduct());
            productService.stubs.create.throws(new Error('create error'));
            await controller.create(input);
            testlab_1.expect(send.args[0][0]).to.deepEqual({
                successful: [],
                failed: [
                    { product: input[0], reason: 'create error' },
                    { product: input[1], reason: 'create error' },
                    { product: input[2], reason: 'create error' },
                ],
            }, 'controllers return value should match this');
        });
    });
    describe('count', () => {
        it('passes the correct Where clause to productRepository.count', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            await controller.count({ description: 'description' });
            testlab_1.sinon.assert.calledOnceWithExactly(productRepository.stubs.count, {
                description: 'description',
            });
        });
        it('returns the correct value from productRepository.count', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            productRepository.stubs.count.resolves({ count: 5 });
            await controller.count();
            testlab_1.expect(send.args[0][0]).to.eql({ count: 5 }, 'this should be the value returned by productRepository.count');
        });
    });
    describe('find', () => {
        it('returns a list of products from the productRepo', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const products = [];
            products.push(await database_helpers_1.givenProduct());
            products.push(await database_helpers_1.givenProduct());
            productRepository.stubs.find.resolves(products);
            await controller.find();
            testlab_1.expect(send.args[0][0]).to.eql(products, 'the products we put in the productRepository');
        });
        it('passes the correct filter to the repository function', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const filter = {
                where: {
                    description: 'test filter',
                },
            };
            await controller.find(filter);
            testlab_1.sinon.assert.calledOnceWithExactly(productRepository.stubs.find, filter);
        });
    });
    describe('findById', () => {
        it('returns rejected promise when id is not found', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            productRepository.stubs.findById.returns(Promise.reject());
            await testlab_1.expect(controller.findById('1')).to.be.rejected();
        });
        it('returns product from the productRepo', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const product = await database_helpers_1.givenProduct();
            const id = product._id;
            productRepository.stubs.findById.resolves(product);
            await controller.findById(id);
            testlab_1.expect(send.args[0][0]).to.eql(product, `the product with _id = ${id}`);
        });
        it('passes the correct id to the repository function', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const id = nanoid_1.nanoid();
            await controller.findById(id);
            testlab_1.sinon.assert.calledOnceWithExactly(productRepository.stubs.findById, id);
        });
    });
    //TODO: update this after search is updated
    /**
     * This needs to be updated after search is updated
     */
    xdescribe('updateById', () => {
        it('sends the updated Product to the productService', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const update = {
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                imageUrl: 'NEW testurl',
                description: 'a-NEW-product-description',
            };
            const oldProduct = {
                objectID: 'test12345',
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                createdAt: 1595689198,
                updatedAt: 1601045998,
                imageUrl: 'testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                category: {
                    _id: '5d12bf519eb1641840519334',
                    name: 'Apparel, shoes, jewelry',
                    subCategories: ['Accessories'],
                },
                name: 'name',
                description: 'a-product-description',
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    companyName: 'store name',
                    number: '111',
                    street1: 'N Stetson Ave',
                    city: 'Boca Raton',
                    _geoloc: { lat: 1, lng: 1 },
                    merchant: {
                        uid: 'PzhQqzDft6X8FnclXsvdvbgzihE3',
                        firstName: 'Daniel',
                        lastName: 'Montano',
                    },
                },
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                attributes: {},
                _tags: ['tag'],
            };
            const now = moment_1.default().utc().unix();
            const correctProduct = {
                objectID: 'test12345',
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                createdAt: 1595689198,
                updatedAt: now,
                imageUrl: 'NEW testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                category: {
                    _id: '5d12bf519eb1641840519334',
                    name: 'Apparel, shoes, jewelry',
                    subCategories: ['Accessories'],
                },
                name: 'name',
                description: 'a-NEW-product-description',
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    companyName: 'store name',
                    number: '111',
                    street1: 'N Stetson Ave',
                    _geoloc: { lat: 1, lng: 1 },
                    city: 'Boca Raton',
                    merchant: {
                        uid: 'PzhQqzDft6X8FnclXsvdvbgzihE3',
                        firstName: 'Daniel',
                        lastName: 'Montano',
                    },
                },
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                attributes: {},
                _tags: ['tag'],
            };
            productRepository.stubs.findById.resolves(oldProduct);
            if (update._id)
                await controller.updateById(update._id, update);
            const newProduct = productService.stubs.updateById.args[0][3];
            for (const [key] of Object.entries(correctProduct)) {
                if (key === 'updatedAt') {
                    const newUpdatedAt = newProduct[key];
                    const correctUpdatedAt = correctProduct.updatedAt;
                    // these are here so that we can do the last expect in a way that doesn't cause lint errors
                    testlab_1.expect(newUpdatedAt).not.eql(undefined);
                    testlab_1.expect(correctUpdatedAt).not.eql(undefined);
                    if (newUpdatedAt !== undefined && correctUpdatedAt !== undefined)
                        testlab_1.expect(newUpdatedAt >= correctUpdatedAt).to.exactly(true, 'if this is false, updatedAt was not updated');
                }
                else {
                    testlab_1.expect(newProduct[key]).to.deepEqual(correctProduct[key], 'checking that each property in the new product is correct');
                }
            }
        });
        it('sends a new SearchRecordProduct to the productService', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const update = {
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                imageUrl: 'NEW testurl',
                description: 'a-NEW-product-description',
            };
            const oldProduct = {
                objectID: 'test12345',
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                createdAt: 1595689198,
                updatedAt: 1601045998,
                imageUrl: 'testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                category: {
                    _id: '5d12bf519eb1641840519334',
                    name: 'Apparel, shoes, jewelry',
                    subCategories: ['Accessories'],
                },
                name: 'name',
                description: 'a-product-description',
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    companyName: 'store name',
                    number: '111',
                    street1: 'N Stetson Ave',
                    city: 'Boca Raton',
                    _geoloc: { lat: 1, lng: 1 },
                    merchant: {
                        uid: 'PzhQqzDft6X8FnclXsvdvbgzihE3',
                        firstName: 'Daniel',
                        lastName: 'Montano',
                    },
                },
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                attributes: {},
                _tags: ['tag'],
            };
            const now = moment_1.default().utc().unix();
            const correctSearchProduct = {
                productID: 'V976aWa7LJHgBNTZ0Qs7g',
                categoryName: 'Apparel, shoes, jewelry',
                subCategoryName: 'Accessories',
                hasOffer: false,
                _geoloc: { lat: 1, lon: 1 },
                createdAt: 1595689198,
                updatedAt: now,
                imageUrl: 'NEW testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                priceNum: 20,
                name: 'name',
                category: {
                    _id: '5d12bf519eb1641840519334',
                    name: 'Apparel, shoes, jewelry',
                    subCategories: ['Accessories'],
                },
                description: 'a-NEW-product-description',
                attributes: {},
                _tags: ['tag'],
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    number: '111',
                    street1: 'N Stetson Ave',
                    city: 'Boca Raton',
                    state: 'FL',
                    country: 'US',
                    zip: '33487',
                },
            };
            productRepository.stubs.findById.resolves(oldProduct);
            if (update._id)
                await controller.updateById(update._id, update);
            const newSearchProduct = productService.stubs.updateById.args[0][0];
            for (const [key] of Object.entries(correctSearchProduct)) {
                if (key === 'updatedAt')
                    testlab_1.expect(newSearchProduct.updatedAt >= correctSearchProduct.updatedAt).to.exactly(true, 'if this is false the new searchProduct updatedAt wasnt updated');
                else
                    testlab_1.expect(newSearchProduct[key]).to.deepEqual(correctSearchProduct[key], 'checks that the properties of newSearchProdect match the expected result');
            }
        });
        it('throws an error if the product can not be found', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            productRepository.stubs.findById.resolves(undefined);
            const product = await database_helpers_1.givenProduct();
            testlab_1.expect(product._id).not.eql(undefined);
            if (product._id)
                await testlab_1.expect(controller.updateById(product._id, product)).to.be.rejectedWith('Could not find product to update.');
        });
        it('throws an error if the product is missing data that the SearchRecordProduct needs', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            // this update will be missing critical category info
            const update = {
                objectID: 'test12345',
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                createdAt: 1595689198,
                updatedAt: 1601045998,
                imageUrl: 'testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                category: {
                    _id: '5d12bf519eb1641840519334',
                },
                name: 'name',
                description: 'a-product-description',
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    companyName: 'store name',
                    number: '111',
                    street1: 'N Stetson Ave',
                    city: 'Boca Raton',
                    _geoloc: { lat: 1, lng: 1 },
                    merchant: {
                        uid: 'PzhQqzDft6X8FnclXsvdvbgzihE3',
                        firstName: 'Daniel',
                        lastName: 'Montano',
                    },
                },
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                attributes: {},
                _tags: ['tag'],
            };
            const oldProduct = {
                objectID: 'test12345',
                _id: 'V976aWa7LJHgBNTZ0Qs7g',
                createdAt: 1595689198,
                updatedAt: 1601045998,
                imageUrl: 'testurl',
                merchantUID: 'ETDLzzIUzuaTf62E0VHen',
                category: {
                    _id: '5d12bf519eb1641840519334',
                    name: 'Apparel, shoes, jewelry',
                    subCategories: ['Accessories'],
                },
                name: 'name',
                description: 'a-product-description',
                store: {
                    _id: 'xZ0Z4ScMPLhhWwDrWI6qV',
                    companyName: 'store name',
                    number: '111',
                    street1: 'N Stetson Ave',
                    city: 'Boca Raton',
                    _geoloc: { lat: 1, lng: 1 },
                    merchant: {
                        uid: 'PzhQqzDft6X8FnclXsvdvbgzihE3',
                        firstName: 'Daniel',
                        lastName: 'Montano',
                    },
                },
                price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' },
                attributes: {},
                _tags: ['tag'],
            };
            productRepository.stubs.findById.resolves(oldProduct);
            testlab_1.expect(update._id).not.eql(undefined);
            if (update._id)
                await testlab_1.expect(controller.updateById(update._id, update)).to.be.rejected();
        });
    });
    describe('deleteById', () => {
        it('returns a rejected promise when id does not exist', async () => {
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            await testlab_1.expect(controller.deleteById('does not exist')).to.be.rejectedWith(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        });
        it('sends the right id to the repo', async () => {
            var _a;
            const controller = new controllers_1.ProductController(productRepository, searchEngineService, response, profileService, productService);
            const product = await database_helpers_1.givenProduct();
            productRepository.stubs.findById.resolves(product);
            if (product._id)
                await controller.deleteById(product._id);
            testlab_1.sinon.assert.calledOnceWithExactly(productRepository.stubs.deleteById, (_a = product._id) !== null && _a !== void 0 ? _a : 'error');
            testlab_1.expect(sendStatus.args[0][0]).to.eql(204);
        });
    });
    function givenResponse() {
        send = testlab_1.sinon.stub();
        sendStatus = testlab_1.sinon.stub();
        responseSend = {
            send,
        };
        response = {
            status: testlab_1.sinon.stub().returns(responseSend),
            sendStatus: sendStatus,
        };
    }
    function givenProductRepository() {
        productRepository = testlab_1.createStubInstance(repositories_1.ProductRepository);
    }
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenProductService() {
        productService = testlab_1.createStubInstance(services_1.ProductService);
    }
    function givenSearchEngineService() {
        searchEngineService = testlab_1.createStubInstance(services_1.SearchEngineService);
    }
});
//# sourceMappingURL=product.controller.unit.js.map