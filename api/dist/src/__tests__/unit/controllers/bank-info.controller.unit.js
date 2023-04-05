"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../../../constants");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
const response_helpers_1 = require("../../helpers/response.helpers");
describe('Bank Info Controller (unit)', () => {
    let bankInfoRepository;
    let profileService;
    let bankInfoService;
    let boomAccountService;
    let response;
    let responseSend;
    let send;
    let getCurrentUser;
    let user;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenCurrentUser);
    beforeEach(givenResponse);
    beforeEach(givenBankInfoRepository);
    beforeEach(givenProfileService);
    beforeEach(givenBankInfoService);
    beforeEach(givenBoomAccountService);
    describe('bank-info/saveAccounts', () => {
        it('returns failed when the callers uid does not match the request body', async () => {
            const user2 = database_helpers_1.givenCustomer();
            const plaidInfo = database_helpers_1.givenPlaidEntry();
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            const result = await controller.saveAccounts({ plaidInfo: plaidInfo, user: user2 });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                message: constants_1.GlobalResponseMessages.NOT_AUTHORIZED,
            });
        });
        it('adds a bankinfo record on valid input', async () => {
            var _a, _b, _c;
            const plaidInfo = database_helpers_1.givenPlaidEntry();
            const authResult = response_helpers_1.givenPlaidAuthResult();
            const idResult = response_helpers_1.givenPlaidIdentityResult();
            // We must set the plaid info account id to match the fake auth result
            plaidInfo.accounts[0].id = authResult.data.numbers.achNumbers[0].account_id;
            moment_1.default.now = testlab_1.sinon.stub().returns(moment_1.default.unix(0));
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoService.stubs.getAuth.resolves(authResult);
            bankInfoService.stubs.getIdentity.resolves(idResult);
            bankInfoRepository.stubs.find.resolves([]);
            await controller.saveAccounts({ plaidInfo: plaidInfo, user: user });
            // The emails field below is a combination of the emails on the user account and the
            // emails returned from Plaid identity. Extracting them from the data for this test
            // seems confusing to follow so I just copy and pasted them from the database helper
            // functions
            testlab_1.expect(bankInfoRepository.stubs.create.args[0][0]).to.deepEqual({
                createdAt: moment_1.default.utc().unix(),
                updatedAt: moment_1.default.utc().unix(),
                accountNumber: authResult.data.numbers.achNumbers[0].account,
                routingNumber: authResult.data.numbers.achNumbers[0].routing,
                wireRoutingNumber: authResult.data.numbers.achNumbers[0].wire_routing,
                plaidID: authResult.data.numbers.achNumbers[0].account_id,
                plaidItemID: plaidInfo.item.itemId,
                plaidAccessToken: plaidInfo.item.accessToken,
                name: plaidInfo.institution.name + ' ' + plaidInfo.accounts[0].subtype,
                userID: user.uid,
                balances: {
                    available: (_a = authResult.data.accounts[0].balances.available) === null || _a === void 0 ? void 0 : _a.toString(),
                    current: (_b = authResult.data.accounts[0].balances.current) === null || _b === void 0 ? void 0 : _b.toString(),
                    limit: ((_c = authResult.data.accounts[0].balances.limit) === null || _c === void 0 ? void 0 : _c.toString()) || null,
                },
                accountOwner: {
                    phone: user.contact.phoneNumber,
                    names: idResult.data.accounts[0].owners[0].names,
                    address: idResult.data.accounts[0].owners[0].addresses[0].data.street,
                    city: idResult.data.accounts[0].owners[0].addresses[0].data.city,
                    state: idResult.data.accounts[0].owners[0].addresses[0].data.region,
                    zip: idResult.data.accounts[0].owners[0].addresses[0].data.postal_code,
                    emails: [
                        'john@email.com',
                        'accountholder0@example.com',
                        'accountholder1@example.com',
                        'extraordinarily.long.email.username.123456@reallylonghostname.com',
                    ],
                    gotInfoFromBank: true,
                },
            });
        });
        it('does not create a record if the account exists', async () => {
            const plaidInfo = database_helpers_1.givenPlaidEntry();
            const authResult = response_helpers_1.givenPlaidAuthResult();
            const idResult = response_helpers_1.givenPlaidIdentityResult();
            // We must set the plaid info account id to match the fake auth result
            plaidInfo.accounts[0].id = authResult.data.numbers.achNumbers[0].account_id;
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoService.stubs.getAuth.resolves(authResult);
            bankInfoService.stubs.getIdentity.resolves(idResult);
            bankInfoRepository.stubs.find.resolves([{}]);
            await controller.saveAccounts({ plaidInfo: plaidInfo, user: user });
            // if bankInfoRepository.find does not return an empty array,
            // the account already exists and this create should never be called
            testlab_1.expect(bankInfoRepository.stubs.create.callCount).to.equal(0);
        });
        it('returns failure when auth fails', async () => {
            const plaidInfo = database_helpers_1.givenPlaidEntry();
            const idResult = response_helpers_1.givenPlaidIdentityResult();
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoService.stubs.getAuth.resolves({ success: false, message: '' });
            bankInfoService.stubs.getIdentity.resolves(idResult);
            const result = await controller.saveAccounts({ plaidInfo: plaidInfo, user: user });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                message: 'Could not find account numbers for this Plaid data',
            });
        });
        it('returns success with backup billing info when identity fails', async () => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const plaidInfo = database_helpers_1.givenPlaidEntry();
            const authResult = response_helpers_1.givenPlaidAuthResult();
            // We must set the plaid info account id to match the fake auth result
            plaidInfo.accounts[0].id = authResult.data.numbers.achNumbers[0].account_id;
            moment_1.default.now = testlab_1.sinon.stub().returns(moment_1.default.unix(0));
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoService.stubs.getAuth.resolves(authResult);
            bankInfoService.stubs.getIdentity.resolves({ success: false, message: '' });
            bankInfoRepository.stubs.find.resolves([]);
            await controller.saveAccounts({ plaidInfo: plaidInfo, user: user });
            testlab_1.expect(bankInfoRepository.stubs.create.args[0][0]).to.deepEqual({
                createdAt: moment_1.default.utc().unix(),
                updatedAt: moment_1.default.utc().unix(),
                accountNumber: authResult.data.numbers.achNumbers[0].account,
                routingNumber: authResult.data.numbers.achNumbers[0].routing,
                wireRoutingNumber: authResult.data.numbers.achNumbers[0].wire_routing,
                plaidID: authResult.data.numbers.achNumbers[0].account_id,
                plaidItemID: plaidInfo.item.itemId,
                plaidAccessToken: plaidInfo.item.accessToken,
                name: plaidInfo.institution.name + ' ' + plaidInfo.accounts[0].subtype,
                userID: user.uid,
                balances: {
                    available: (_a = authResult.data.accounts[0].balances.available) === null || _a === void 0 ? void 0 : _a.toString(),
                    current: (_b = authResult.data.accounts[0].balances.current) === null || _b === void 0 ? void 0 : _b.toString(),
                    limit: ((_c = authResult.data.accounts[0].balances.limit) === null || _c === void 0 ? void 0 : _c.toString()) || null,
                },
                accountOwner: {
                    phone: user.contact.phoneNumber,
                    names: [user.firstName + ' ' + user.lastName],
                    //TODO: use new compose address function when it is created getComposedAddressFromStore
                    address: ((_d = user.addresses) === null || _d === void 0 ? void 0 : _d[0].number) + ' ' + ((_e = user.addresses) === null || _e === void 0 ? void 0 : _e[0].street1),
                    city: (_f = user.addresses) === null || _f === void 0 ? void 0 : _f[0].city,
                    state: (_g = user.addresses) === null || _g === void 0 ? void 0 : _g[0].state,
                    zip: (_h = user.addresses) === null || _h === void 0 ? void 0 : _h[0].zip,
                    emails: user.contact.emails,
                    gotInfoFromBank: false,
                },
            });
        });
    });
    describe('bank-info/getAccountInfo', () => {
        it('succeeds when looking up merchant', async () => {
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            await controller.getAccountInfo({ uid: user.uid, accountID: '', isMerchant: true });
            testlab_1.expect(bankInfoRepository.stubs.findOne.args[0][0]).to.deepEqual({
                where: { userID: user.uid },
            });
        });
        it('succeeds when looking up customer', async () => {
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            await controller.getAccountInfo({ uid: user.uid, accountID: '111', isMerchant: false });
            testlab_1.expect(bankInfoRepository.stubs.findOne.args[0][0]).to.deepEqual({
                where: { and: [{ plaidID: '111' }, { userID: user.uid }] },
            });
        });
        it('returns error when info not found', async () => {
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoRepository.stubs.findOne.resolves(undefined);
            const result = await controller.getAccountInfo({
                uid: user.uid,
                accountID: '',
                isMerchant: true,
            });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                message: 'No bank info was found for this user',
            });
        });
    });
    describe('bank-info/deleteAccount', () => {
        it('returns failure message when delete fails', async () => {
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            bankInfoService.stubs.deleteAccounts.throws(new Error('delete error'));
            await controller.deleteAccount([{ plaidID: '1', userID: user.uid }]);
            testlab_1.expect(send.args[0][0]).deepEqual({
                success: false,
                message: constants_1.BankAccountResponseMessages.BANK_DELETE_FAILED,
            });
        });
        it('passes requests to bankInfoService for delete', async () => {
            const controller = new controllers_1.BankInfoController(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, getCurrentUser);
            await controller.deleteAccount([{ plaidID: '1', userID: user.uid }]);
            testlab_1.expect(bankInfoService.stubs.deleteAccounts.args[0][0]).deepEqual([
                { plaidID: '1', userID: user.uid },
            ]);
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
    function givenCurrentUser() {
        user = database_helpers_1.givenCustomer();
        getCurrentUser = testlab_1.sinon.stub().resolves(user);
    }
    function givenBankInfoRepository() {
        bankInfoRepository = testlab_1.createStubInstance(repositories_1.BankInfoRepository);
    }
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenBankInfoService() {
        bankInfoService = testlab_1.createStubInstance(services_1.BankInfoService);
    }
    function givenBoomAccountService() {
        boomAccountService = testlab_1.createStubInstance(services_1.BoomAccountService);
    }
});
//# sourceMappingURL=bank-info.controller.unit.js.map