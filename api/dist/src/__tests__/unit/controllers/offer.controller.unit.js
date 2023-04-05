"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const nanoid_1 = require("nanoid");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('OfferController (unit)', () => {
    let offerRepository;
    let productRepository;
    let categoryRepository;
    let searchEngineService;
    let response;
    let responseSend;
    let send;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenResponse);
    beforeEach(givenOfferRepository);
    beforeEach(givenProductRepository);
    beforeEach(givenCategoryRepository);
    beforeEach(givenSearchEngineService);
    describe('create', () => {
        it('returns invalid offer reason invalid category', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const input = await database_helpers_1.givenOffer();
            await controller.create(input);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid Category: ${input.product.category.name}`,
            });
        });
        it('returns invalid offer reason invalid sub category', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const category = {
                name: 'Sports',
                subCategories: ['Accessories'],
            };
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            const partialProduct = {
                category: Object.assign(Object.assign({}, category), { subCategories: ['TestInvalid'] }),
            };
            const input = await database_helpers_1.givenOffer({ product: partialProduct });
            await controller.create(input);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid Sub Category: ${'TestInvalid'}`,
            });
        });
        it('returns invalid offer validating category failed with a reason', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.throws(new Error('error looking for this category: TestError'));
            const input = await database_helpers_1.givenOffer();
            await controller.create(input);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `error looking for this category: ${input.product.category.name}`,
            });
        });
        it('returns invalid offer updating search engine product failed with a reason', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const category = {
                _id: '5d12bf519eb1641840519334',
                name: 'Apparel, shoes, jewelry',
                subCategories: ['Accessories'],
            };
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            const product = await database_helpers_1.givenProduct();
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(product);
            const input = await database_helpers_1.givenOffer();
            const createOfferStub = offerRepository.stubs.create;
            createOfferStub.resolves(input);
            const searchByObjectIdStub = searchEngineService.stubs.searchByObjectId;
            searchByObjectIdStub.resolves([]);
            const searchEngineUpdateStub = searchEngineService.stubs.update;
            searchEngineUpdateStub.resolves({ success: false, message: 'Invalid product update' });
            await controller.create(input);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid product update`,
            });
        });
        it('returns offer as successful', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const category = {
                _id: '5d12bf519eb1641840519334',
                name: 'Apparel, shoes, jewelry',
                subCategories: ['Accessories'],
            };
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            const product = await database_helpers_1.givenProduct();
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(product);
            const inputOffer = await database_helpers_1.givenOffer();
            const createOfferStub = offerRepository.stubs.create;
            createOfferStub.resolves(inputOffer);
            const searchByObjectIdStub = searchEngineService.stubs.searchByObjectId;
            searchByObjectIdStub.resolves([]);
            const searchEngineUpdateStub = searchEngineService.stubs.update;
            searchEngineUpdateStub.resolves({ success: true });
            const newOffer = await controller.create(inputOffer);
            testlab_1.expect(newOffer).to.deepEqual(inputOffer, 'controllers return value should match this');
        });
    });
    describe('count', () => {
        it('passes the correct Where clause to offerRepository.count', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            await controller.count({ title: 'offer-title' });
            testlab_1.sinon.assert.calledOnceWithExactly(offerRepository.stubs.count, {
                title: 'offer-title',
            });
        });
        it('returns the correct value from offerRepository.count', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            offerRepository.stubs.count.resolves({ count: 15 });
            const result = await controller.count({ description: 'description' });
            testlab_1.expect(result.count).to.equal(15, 'this should be the value returned by offerRepository.count');
        });
    });
    describe('find', () => {
        it('returns a list of offers from the offersRepository', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const offers = [];
            offers.push(await database_helpers_1.givenOffer());
            offers.push(await database_helpers_1.givenOffer());
            offerRepository.stubs.find.resolves(offers);
            const result = await controller.find();
            testlab_1.expect(result).to.eql(offers, 'the offers we put in the offerRepository');
        });
        it('passes the correct filter to the repository function', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const filter = {
                where: {
                    title: 'offer-title',
                },
            };
            await controller.find(filter);
            testlab_1.sinon.assert.calledOnceWithExactly(offerRepository.stubs.find, filter);
        });
    });
    describe('findById', () => {
        it('returns rejected promise when id is not found', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            offerRepository.stubs.findById.returns(Promise.reject());
            await testlab_1.expect(controller.findById('1')).to.be.rejected();
        });
        it('returns product from the offerRepo', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const offer = await database_helpers_1.givenOffer();
            const id = offer._id;
            offerRepository.stubs.findById.resolves(offer);
            const result = await controller.findById(id);
            testlab_1.expect(result).to.eql(offer, `the offer with _id = ${id}`);
        });
        it('passes the correct id to the repository function', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const id = nanoid_1.nanoid();
            await controller.findById(id);
            testlab_1.sinon.assert.calledOnceWithExactly(offerRepository.stubs.findById, id);
        });
    });
    describe('updateById', () => {
        it('returns invalid offer reason invalid category', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const inputOffer = await database_helpers_1.givenOffer();
            // assert offer
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(inputOffer.product);
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(inputOffer);
            if (inputOffer._id)
                await controller.updateById(inputOffer._id, inputOffer);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid Category: ${inputOffer.product.category.name}`,
            });
        });
        it('returns invalid offer reason invalid sub category', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const oldOffer = await database_helpers_1.givenOffer();
            const category = oldOffer.product.category;
            // assert category
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            // assert offer
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(oldOffer.product);
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(oldOffer);
            const inputOffer = Object.assign(Object.assign({}, oldOffer), { title: 'updated-offer', product: Object.assign(Object.assign({}, oldOffer.product), { category: Object.assign(Object.assign({}, oldOffer.product.category), { subCategories: ['TestInvalid'] }) }) });
            if (inputOffer._id)
                await controller.updateById(inputOffer._id, inputOffer);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid Sub Category: ${'TestInvalid'}`,
            });
        });
        it('returns invalid offer validating category failed with a reason', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const oldOffer = await database_helpers_1.givenOffer();
            // assert category
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.throws(new Error('error looking for this category: TestError'));
            // assert offer
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(oldOffer.product);
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(oldOffer);
            const inputOffer = Object.assign(Object.assign({}, oldOffer), { title: 'updated-offer' });
            if (inputOffer._id)
                await controller.updateById(inputOffer._id, inputOffer);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `error looking for this category: ${inputOffer.product.category.name}`,
            });
        });
        it('returns invalid offer updating search engine product failed with a reason', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const oldOffer = await database_helpers_1.givenOffer();
            const category = oldOffer.product.category;
            // assert category
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            // assert offer
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(oldOffer.product);
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(oldOffer);
            const inputOffer = Object.assign(Object.assign({}, oldOffer), { title: 'updated-offer' });
            const searchEngineUpdateStub = searchEngineService.stubs.update;
            searchEngineUpdateStub.resolves({ success: false, message: 'Invalid product update' });
            if (inputOffer._id)
                await controller.updateById(inputOffer._id, inputOffer);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Invalid product update`,
            });
        });
        it('returns offer as successful', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const oldOffer = await database_helpers_1.givenOffer();
            const category = oldOffer.product.category;
            // assert category
            const findCatStub = categoryRepository.stubs.findOne;
            findCatStub.resolves(category);
            // assert offer
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(oldOffer.product);
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(oldOffer);
            // assert searchEngineResponse success true
            const searchEngineUpdateStub = searchEngineService.stubs.update;
            searchEngineUpdateStub.resolves({ success: true });
            const inputOffer = Object.assign(Object.assign({}, oldOffer), { title: 'updated-offer', updatedAt: moment_1.default().utc().unix() });
            if (inputOffer._id)
                await controller.updateById(inputOffer._id, inputOffer);
            const newOffer = offerRepository.stubs.updateById.args[0][1];
            testlab_1.expect(newOffer).to.deepEqual(inputOffer, 'controllers return value should match this');
        });
    });
    describe('deleteById', () => {
        it('returns a rejected promise when id does not exist', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            await testlab_1.expect(controller.deleteById('does not exist')).to.be.rejectedWith('Could not find offer to delete.');
        });
        it('returns a rejected promise when offer product id does not exist', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const inputOffer = await database_helpers_1.givenOffer();
            // assert product
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(inputOffer);
            testlab_1.expect(inputOffer._id).not.eql(undefined, 'offer needs to have _id');
            if (inputOffer._id)
                await testlab_1.expect(controller.deleteById(inputOffer._id)).to.be.rejectedWith('Could not find product of given offer.');
        });
        it('returns error when offer search engine product does not exist', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const inputOffer = await database_helpers_1.givenOffer();
            // assert offer
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(inputOffer);
            // assert product
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(inputOffer.product);
            // assert searchEngineResponse success false
            const searchEngineUpdateStub = searchEngineService.stubs.delete;
            searchEngineUpdateStub.resolves({ success: false, error: 'Product does not exists' });
            if (inputOffer._id)
                await controller.deleteById(inputOffer._id);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: `Product does not exists`,
            });
        });
        it('deletes offer with search engine product update', async () => {
            const controller = new controllers_1.OfferController(offerRepository, productRepository, searchEngineService, response, categoryRepository);
            const inputOffer = await database_helpers_1.givenOffer();
            // assert offer
            const findByIdOfferStub = offerRepository.stubs.findById;
            findByIdOfferStub.resolves(inputOffer);
            // assert product
            const findByIdProdStub = productRepository.stubs.findById;
            findByIdProdStub.resolves(inputOffer.product);
            // assert searchEngineResponse success false
            const searchEngineUpdateStub = searchEngineService.stubs.delete;
            searchEngineUpdateStub.resolves({ success: true });
            if (inputOffer._id)
                await controller.deleteById(inputOffer._id);
            testlab_1.sinon.assert.calledOnceWithExactly(offerRepository.stubs.deleteById, inputOffer._id);
        });
    });
    function givenResponse() {
        send = testlab_1.sinon.stub();
        responseSend = {
            send,
        };
        response = {
            status: testlab_1.sinon.stub().returns(responseSend),
        };
    }
    function givenOfferRepository() {
        offerRepository = testlab_1.createStubInstance(repositories_1.OfferRepository);
    }
    function givenProductRepository() {
        productRepository = testlab_1.createStubInstance(repositories_1.ProductRepository);
    }
    function givenCategoryRepository() {
        categoryRepository = testlab_1.createStubInstance(repositories_1.CategoryRepository);
    }
    function givenSearchEngineService() {
        searchEngineService = testlab_1.createStubInstance(services_1.SearchEngineService);
    }
});
//# sourceMappingURL=offer.controller.unit.js.map