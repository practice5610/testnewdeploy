"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../../../constants");
const boom_account_controller_1 = require("../../../controllers/boom-account.controller");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('Boom-Account Controller (unit)', () => {
    let boomAccountRepository;
    let boomAccountService;
    let profileService;
    let response;
    let responseSend;
    let send;
    let getCurrentUser;
    let getCurrentAdmin;
    let user;
    let admin;
    const now = moment_1.default().unix();
    beforeEach(givenBoomAccountRepository);
    beforeEach(givenBoomAccountService);
    beforeEach(givenProfileService);
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenCurrentAdmin);
    beforeEach(givenCurrentUser);
    beforeEach(givenResponse);
    describe('boom-account/{id}', () => {
        it('success when Admin request with correct boom-account {id}', async () => {
            const controller = new boom_account_controller_1.BoomAccountController(boomAccountRepository, response, profileService, getCurrentAdmin, boomAccountService);
            const boomAcc = await database_helpers_1.givenBoomAccount({
                updatedAt: now,
                createdAt: now,
                customerID: admin.uid,
            });
            boomAccountRepository.stubs.findById.resolves(boomAcc);
            const result = await controller.findById(boomAcc._id);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                message: 'Success',
                data: boomAcc,
            });
        });
        it('success when Admin request with NOT-correct boom-account {id}', async () => {
            const controller = new boom_account_controller_1.BoomAccountController(boomAccountRepository, response, profileService, getCurrentAdmin, boomAccountService);
            boomAccountRepository.stubs.findById.resolves(undefined);
            await testlab_1.expect(controller.findById('NOT-correct')).to.be.rejectedWith(constants_1.BoomAccountResponseMessages.NOT_FOUND);
        });
        it('false when Member request a boom-account NOT belong to', async () => {
            const controller = new boom_account_controller_1.BoomAccountController(boomAccountRepository, response, profileService, getCurrentUser, boomAccountService);
            const boomAcc = await database_helpers_1.givenBoomAccount({
                updatedAt: now,
                createdAt: now,
                customerID: admin.uid,
            });
            boomAccountRepository.stubs.findById.resolves(boomAcc);
            await testlab_1.expect(controller.findById(boomAcc._id)).to.be.rejectedWith(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
        });
        it('success when Member request his boom-account', async () => {
            const controller = new boom_account_controller_1.BoomAccountController(boomAccountRepository, response, profileService, getCurrentUser, boomAccountService);
            const boomAcc = await database_helpers_1.givenBoomAccount({
                updatedAt: now,
                createdAt: now,
                customerID: user.uid,
            });
            boomAccountRepository.stubs.findById.resolves(boomAcc);
            const result = await controller.findById(boomAcc._id);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                message: 'Success',
                data: boomAcc,
            });
        });
    });
    function givenBoomAccountRepository() {
        boomAccountRepository = testlab_1.createStubInstance(repositories_1.BoomAccountRepository);
    }
    function givenBoomAccountService() {
        boomAccountService = testlab_1.createStubInstance(services_1.BoomAccountService);
    }
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenResponse() {
        send = testlab_1.sinon.stub();
        responseSend = {
            send,
        };
        response = {
            status: testlab_1.sinon.stub().returns(responseSend),
        };
    }
    function givenCurrentUser() {
        user = database_helpers_1.givenCustomer();
        getCurrentUser = testlab_1.sinon.stub().resolves(user);
    }
    function givenCurrentAdmin() {
        admin = database_helpers_1.givenAdmin();
        getCurrentAdmin = testlab_1.sinon.stub().resolves(admin);
    }
});
//# sourceMappingURL=boom-account.controller.unit.js.map