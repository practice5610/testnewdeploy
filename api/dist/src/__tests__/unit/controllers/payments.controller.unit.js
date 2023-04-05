"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@loopback/core");
const testlab_1 = require("@loopback/testlab");
const constants_1 = require("../../../constants");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('PaymentsController (unit)', () => {
    let profileService;
    let bankInfoService;
    let bankInfoRepository;
    let customerBillingRepository;
    let paymentProcessorService;
    let transactionRepository;
    let boomCardRepository;
    let transfersService;
    let emailService;
    let response;
    let responseSend;
    let send;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenResponse);
    beforeEach(givenBankInfoService);
    beforeEach(givenBankInfoRepository);
    beforeEach(givenProfileService);
    beforeEach(givenEmailService);
    beforeEach(givenTransfersService);
    beforeEach(givenBoomCardRepository);
    beforeEach(givenTransactionRepository);
    beforeEach(givenPaymentProcessorService);
    beforeEach(givenCustomerBillingRepository);
    describe('adds funds to user account', () => {
        it('throws exception one or more fields are missing: first name, last name, address, city, phone number, state, zip code', async () => {
            const user = database_helpers_1.givenCustomer({
                firstName: '',
                lastName: '',
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            const depositAmount = database_helpers_1.givenMoney(55);
            await testlab_1.expect(controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            })).to.be.rejectedWith('One or more fields are missing: first name, last name, address number, street, city, phone number, state, zip code');
        });
        it('returns error while fetching BankInfo balance', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const depositAmount = database_helpers_1.givenMoney(55);
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            bankInfoService.stubs.getPlaidBalance.resolves({
                success: false,
                message: 'Invalid Plaid Balance',
                error_code: 400,
            });
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                message: `Invalid Plaid Balance`,
                errorCode: 400,
            });
        });
        it('returns error missing balance account but BankInfo balance response ok', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const depositAmount = database_helpers_1.givenMoney(55);
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            bankInfoService.stubs.getPlaidBalance.resolves({ success: true, accounts: [] });
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                message: constants_1.BankAccountResponseMessages.BALANCE_CHECK_FAILED,
            });
        });
        it('returns error while finding account from bankInfoRepository', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available - 55,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert exception to bankInfoRepository->findOne
            bankInfoRepository.stubs.findOne.throwsException('Error finding account');
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({ success: false, message: 'Error finding account' });
        });
        it('returns error when current realtime balance is same with saved balance but balance is less then charged amount', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 300, current: 300 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(500);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert account to bankInfoRepo
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                balanceInfo: {
                    available: realTimeBalance.available,
                    current: realTimeBalance.current,
                    canPay: false,
                },
            });
        });
        it('returns error when current realtime balance is not same with saved balance but balance is less then charged amount', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(310);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert account to bankInfoRepo
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({
                success: false,
                balanceInfo: {
                    available: realTimeBalance.available,
                    current: realTimeBalance.current,
                    canPay: false,
                },
            });
        });
        it('returns error while updating account balance in saved account info', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available - 55,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert account to bankInfoRepo
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            //assert transfersService.addFunds
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            // assert exception to bankInfoRepository.updateById
            bankInfoRepository.stubs.updateById.throwsException('Error updating account');
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({ success: false, message: 'Error updating account' });
        });
        it('updates the BankInfo with updated balance on success, when saved balance is outdated', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available - 55,
                current: realTimeBalance.current,
                limit: null,
            };
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: startingBankAccount.plaidItemID,
                amount: depositAmount,
                plaidAccountId: startingBankAccount.plaidID,
            });
            testlab_1.sinon.assert.match(bankInfoRepository.stubs.updateById.args[0][1], endBankAccount);
        });
        it('updates the BankInfo with updated balance on success, when saved balance is not outdated', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            const oldBalance = { available: 220, current: 300 };
            const realTimeBalance = { available: 300, current: 300 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55.5);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: oldBalance.available - 55.5,
                current: realTimeBalance.current,
                limit: null,
            };
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: startingBankAccount.plaidItemID,
                amount: depositAmount,
                plaidAccountId: startingBankAccount.plaidID,
            });
            testlab_1.sinon.assert.match(bankInfoRepository.stubs.updateById.args[0][1], endBankAccount);
        });
        it('does not update saved funds when not enough funds and saved balance is not outdated', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            const oldBalance = { available: 220, current: 300 };
            const realTimeBalance = { available: 300, current: 300 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(555.5);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: startingBankAccount.plaidItemID,
                amount: depositAmount,
                plaidAccountId: startingBankAccount.plaidID,
            });
            testlab_1.sinon.assert.notCalled(bankInfoRepository.stubs.updateById);
        });
        it('does not update saved funds when not enough funds and saved balance is outdated', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            const oldBalance = { available: 220, current: 230 };
            const realTimeBalance = { available: 300, current: 300 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(555.5);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: startingBankAccount.plaidItemID,
                amount: depositAmount,
                plaidAccountId: startingBankAccount.plaidID,
            });
            testlab_1.sinon.assert.notCalled(bankInfoRepository.stubs.updateById);
        });
        it('returns error while saving customer billing transactions', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available - 55,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert account to bankInfoRepo
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            //assert transfersService.addFunds
            transfersService.stubs.addFunds.resolves({
                transaction: {},
                billingTransaction: {},
            });
            // assert response null  to billingRepository.create
            customerBillingRepository.stubs.create.resolves(undefined);
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({ success: false, message: 'Failed to save into DB' });
        });
        it('returns succuss after adding funds to user account', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const oldBalance = { available: 300, current: 300 };
            const realTimeBalance = { available: 210.5, current: 211 };
            const userPlaidData = database_helpers_1.givenPlaidEntry();
            const depositAmount = database_helpers_1.givenMoney(55);
            const startingBankAccount = await database_helpers_1.givenBankInfo({
                plaidID: userPlaidData.accounts[0].id,
                plaidAccessToken: userPlaidData.item.accessToken,
                plaidItemID: userPlaidData.item.itemId,
                userID: user.uid,
                balances: { available: oldBalance.available, current: oldBalance.current, limit: null },
            });
            const endBankAccount = Object.assign({}, startingBankAccount);
            endBankAccount.balances = {
                available: realTimeBalance.available - 55,
                current: realTimeBalance.current,
                limit: null,
            };
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            //assert profile to profile service
            const userAndPlaidInfo = Object.assign(Object.assign({}, user), { plaidInfo: [userPlaidData] });
            profileService.stubs.getProfile
                .withArgs(user.uid, {
                requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: userAndPlaidInfo,
            });
            //assert boom card to boom card repo
            boomCardRepository.stubs.find.resolves([await database_helpers_1.givenBoomCard()]);
            //assert plaid balance accounts to bankInfo service
            bankInfoService.stubs.getPlaidBalance.resolves(getPlaidBalanceResult(true, startingBankAccount.plaidID, realTimeBalance.available, realTimeBalance.current));
            //assert account to bankInfoRepo
            bankInfoRepository.stubs.findOne.resolves(startingBankAccount);
            const transaction = {};
            const billingTransaction = {};
            //assert transfersService.addFunds
            transfersService.stubs.addFunds.resolves({
                transaction,
                billingTransaction,
            });
            // assert record to billingRepository.create
            customerBillingRepository.stubs.create.resolves({
                transaction: billingTransaction,
                plaidItemId: startingBankAccount.plaidItemID,
                plaidAccountId: startingBankAccount.plaidID,
            });
            const result = await controller.create({
                nonce: 'true',
                uid: user.uid,
                plaidItemId: userPlaidData.item.itemId,
                amount: depositAmount,
                plaidAccountId: userPlaidData.accounts[0].id,
            });
            testlab_1.expect(result).to.deepEqual({
                success: true,
                transaction,
            });
        });
    });
    describe('add funds via credit card', () => {
        it('returns error while process request EMVSRED', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            // assert success false for payment process service
            paymentProcessorService.stubs.ProcessEMVSRED.resolves({
                success: false,
                message: 'Invalid Process',
            });
            await controller.ProcessCreditCardPayment({
                amount: database_helpers_1.givenMoney(100),
                ksn: '',
                EMVSREDData: '',
                numberOfPaddedBytes: '',
                userEmail: '',
                userFirstName: '',
                userLastName: '',
                userUid: '',
            });
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({ success: false, message: 'Invalid Process' });
        });
        it('returns success after funds added successfully', async () => {
            const user = database_helpers_1.givenCustomer({
                cards: ['test_card_ID'],
                contact: {
                    phoneNumber: '6505559999',
                    emails: ['name@website.com'],
                },
            });
            const controller = new controllers_1.PaymentController(transactionRepository, boomCardRepository, bankInfoRepository, customerBillingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, core_1.Getter.fromValue(user));
            // assert success false for payment process service
            paymentProcessorService.stubs.ProcessEMVSRED.resolves({
                success: true,
                message: 'Processed Successfully',
                data: [{ success: true }],
            });
            await controller.ProcessCreditCardPayment({
                amount: database_helpers_1.givenMoney(100),
                ksn: 'test',
                EMVSREDData: 'test',
                numberOfPaddedBytes: '2020',
                userEmail: 'test@website.com',
                userFirstName: 'test',
                userLastName: 'l-test',
                userUid: 'test',
            });
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: true,
                message: 'Processed Successfully',
                data: [{ success: true }],
            });
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
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenBankInfoService() {
        bankInfoService = testlab_1.createStubInstance(services_1.BankInfoService);
    }
    function givenBankInfoRepository() {
        bankInfoRepository = testlab_1.createStubInstance(repositories_1.BankInfoRepository);
    }
    function givenEmailService() {
        emailService = {
            mailGenerator: {
                generate: () => {
                    return { replace: testlab_1.sinon.stub() };
                },
            },
            send: testlab_1.sinon.stub(),
        };
        //mailGenerator = emailService.mailGenerator as sinon.SinonStub;
    }
    function givenTransfersService() {
        transfersService = testlab_1.createStubInstance(services_1.TransfersService);
    }
    function givenBoomCardRepository() {
        boomCardRepository = testlab_1.createStubInstance(repositories_1.BoomCardRepository);
    }
    function givenTransactionRepository() {
        transactionRepository = testlab_1.createStubInstance(repositories_1.TransactionRepository);
    }
    function givenPaymentProcessorService() {
        paymentProcessorService = testlab_1.createStubInstance(services_1.PaymentProcessorService);
    }
    function givenCustomerBillingRepository() {
        customerBillingRepository = testlab_1.createStubInstance(repositories_1.CustomerBillingRepository);
    }
    function getPlaidBalanceResult(success, accountID, available, current) {
        return {
            success: success,
            accounts: [{ account_id: accountID, balances: { available: available, current: current } }],
        };
    }
});
//# sourceMappingURL=payments.controller.unit.js.map