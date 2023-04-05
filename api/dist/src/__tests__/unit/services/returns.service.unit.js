"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const testlab_1 = require("@loopback/testlab");
const constants_1 = require("../../../constants");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('Return Service (unit)', () => {
    let returnPolicyRepository;
    let returnRequestRepository;
    let returnDisputeRepository;
    let transactionRepository;
    let shippingRepository;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenReturnPolicyRepository);
    beforeEach(givenReturnRequestRepository);
    beforeEach(givenReturnDisputeRepository);
    beforeEach(givenTransactionRepository);
    beforeEach(givenShippingOrderRepository);
    function givenReturnPolicyRepository() {
        returnPolicyRepository = testlab_1.createStubInstance(repositories_1.ReturnPolicyRepository);
    }
    function givenReturnRequestRepository() {
        returnRequestRepository = testlab_1.createStubInstance(repositories_1.ReturnRequestRepository);
    }
    function givenReturnDisputeRepository() {
        returnDisputeRepository = testlab_1.createStubInstance(repositories_1.ReturnDisputeRepository);
    }
    function givenTransactionRepository() {
        transactionRepository = testlab_1.createStubInstance(repositories_1.TransactionRepository);
    }
    function givenShippingOrderRepository() {
        shippingRepository = testlab_1.createStubInstance(repositories_1.ShippingOrderRepository);
    }
    describe('createReturnPolicy Test', () => {
        it('calls create on ReturnPolicyReposity to create a new ReturnPolicy instance', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnPolicy = await database_helpers_1.givenReturnPolicy();
            returnPolicyRepository.stubs.create.resolves(returnPolicy);
            await service.createReturnPolicy(returnPolicy);
            testlab_1.expect(returnPolicyRepository.stubs.create.callCount).to.equal(1);
        });
    });
    describe('getReturnPolicies Test', () => {
        it('displays Policy Not Found message if no ReturnPolicy instances match provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnPolicy = await database_helpers_1.givenReturnPolicy();
            returnPolicyRepository.stubs.find.resolves([]);
            const result = await service.getReturnPolicies(returnPolicy._id);
            testlab_1.expect(result).to.eql({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.POLICY_NOT_FOUND,
            });
        });
        it('calls find on ReturnPolicyRepository to find a ReturnPolicy instance matching provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnPolicy = await database_helpers_1.givenReturnPolicy();
            returnPolicyRepository.stubs.find.resolves([returnPolicy]);
            await service.getReturnPolicies(returnPolicy._id);
            testlab_1.expect(returnPolicyRepository.stubs.find.callCount).to.equal(1);
        });
    });
    describe('deleteById Test', () => {
        it('calls deleteById on the provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnPolicy = await database_helpers_1.givenReturnPolicy();
            returnPolicyRepository.stubs.findById.resolves(returnPolicy);
            await service.deleteById(returnPolicy._id);
            testlab_1.expect(returnPolicyRepository.stubs.deleteById.callCount).to.equal(1);
        });
    });
    describe('createReturnRequest Test', () => {
        it('calls create on ReturnRequestRepository to create a new ReturnRequest instance', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnRequest = await database_helpers_1.givenReturnRequest();
            returnRequestRepository.stubs.create.resolves(returnRequest);
            await service.createReturnRequest(returnRequest);
            testlab_1.expect(returnRequestRepository.stubs.create.callCount).to.equal(1);
        });
    });
    describe('getReturnRequest Test', () => {
        it('displays Request Not Found message if no ReturnRequest instances match provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const filter = {};
            returnRequestRepository.stubs.find.resolves([]);
            const result = await service.getReturnRequest(filter);
            testlab_1.expect(result).to.eql({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.REQUEST_NOT_FOUND,
            });
        });
        it('calls find on ReturnRequestRepository to find ReturnRequest instances matching provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnRequest = await database_helpers_1.givenReturnRequest();
            const filter = {};
            returnRequestRepository.stubs.find.resolves([returnRequest]);
            await service.getReturnRequest(filter);
            testlab_1.expect(returnRequestRepository.stubs.find.callCount).to.equal(1);
        });
    });
    describe('updateReturnRequest Test', () => {
        it('displays No Further Updates Available message if merchant updates ReturnRequest instance when status is complete', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnRequest = await database_helpers_1.givenReturnRequest();
            returnRequest.returnStatus = returns_1.Status.COMPLETE;
            const currentUser = database_helpers_1.givenMerchant();
            returnRequestRepository.stubs.findById.resolves(returnRequest);
            const result = await service.updateReturnRequest(returnRequest._id, returnRequest, currentUser);
            testlab_1.expect(result).to.eql({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.REQUEST_NOT_UPDATED,
            });
        });
        it('calls updateById on ReturnRequest instance matching provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnRequest = await database_helpers_1.givenReturnRequest();
            returnRequestRepository.stubs.findById.resolves(returnRequest);
            const currentUser = database_helpers_1.givenSuperAdmin();
            await service.updateReturnRequest(returnRequest._id, returnRequest, currentUser);
            testlab_1.expect(returnRequestRepository.stubs.updateById.callCount).to.equal(1);
        });
    });
    describe('createDispute Test', () => {
        it('calls create on ReturnDisputeRepository to create a new ReturnDispute instance', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnDispute = await database_helpers_1.givenReturnDispute();
            returnDisputeRepository.stubs.create.resolves(returnDispute);
            await service.createDispute(returnDispute);
            testlab_1.expect(returnDisputeRepository.stubs.create.callCount).to.equal(1);
        });
    });
    describe('getDisputeByID Test', () => {
        it('displays Dispute Not Found message if there are no ReturnDispute instances matching the provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const filter = {};
            returnDisputeRepository.stubs.find.resolves([]);
            const result = await service.getDisputeByID(filter);
            testlab_1.expect(result).to.eql({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.DISPUTE_NOT_FOUND,
            });
        });
        it('calls find on ReturnDisputeRepository to find a ReturnDispute instance matching the provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnDispute = await database_helpers_1.givenReturnDispute();
            const filter = {};
            returnDisputeRepository.stubs.find.resolves([returnDispute]);
            await service.getDisputeByID(filter);
            testlab_1.expect(returnDisputeRepository.stubs.find.callCount).to.equal(1);
        });
    });
    describe('updateDispute Test', () => {
        it('displays No Updates Available message when user updates ReturnDispute instance when dispute is closed', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnDispute = await database_helpers_1.givenReturnDispute();
            returnDispute.isOpen = false;
            returnDisputeRepository.stubs.findById.resolves(returnDispute);
            const result = await service.updateDispute(returnDispute._id, returnDispute);
            testlab_1.expect(result).to.eql({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.DISPUTE_NOT_UPDATED,
            });
        });
        it('calls updateById on ReturnDispute instance matching provided ID', async () => {
            const service = new services_1.ReturnService(returnPolicyRepository, transactionRepository, shippingRepository, returnRequestRepository, returnDisputeRepository);
            const returnDispute = await database_helpers_1.givenReturnDispute();
            returnDisputeRepository.stubs.findById.resolves(returnDispute);
            await service.updateDispute(returnDispute._id, returnDispute);
            testlab_1.expect(returnDisputeRepository.stubs.updateById.callCount).to.equal(1);
        });
    });
});
//# sourceMappingURL=returns.service.unit.js.map