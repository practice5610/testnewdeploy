"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../../../constants");
const controllers_1 = require("../../../controllers");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('TransfersController (unit)', () => {
    let transactionRepository;
    let transfersService;
    let profileService;
    let emailService;
    let snsService;
    let response;
    let responseSend;
    let send;
    let boomAccountService;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenResponse);
    beforeEach(givenTransactionRepository);
    beforeEach(givenProfileService);
    beforeEach(givenTransfersService);
    beforeEach(givenEmailService);
    beforeEach(givenSNSService);
    beforeEach(givenBoomAccountService);
    describe('POST new transfer', () => {
        /**
         * This test gives every stub valid output and then checks that the final transaction
         * create call is passed the correct object
         */
        it('creates correct transaction on success', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11112223344' },
                boomAccounts: ['1111'],
            });
            const receiver = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+12223334455' },
                boomAccounts: ['2222'],
            });
            const senderBoomAccount = {
                _id: '1111',
                createdAt: 1611767842,
                updatedAt: 1612382579,
                status: 'Active',
                balance: {
                    amount: 2200,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
                customerID: receiver.uid,
            };
            //here we replace moment() with a stub that always returns 0 so we can predict the final output
            moment_1.default.now = testlab_1.sinon.stub().returns(moment_1.default.unix(0));
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            profileService.stubs.getProfile
                .withArgs(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: sender,
            });
            profileService.stubs.getProfile
                .withArgs('+12223334455', {
                requiredFields: ['contact', 'firstName'],
                method: services_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: receiver,
            });
            /**
             * The controller always gets the sender's data first
             */
            transactionRepository.stubs.create.resolves({});
            boomAccountService.stubs.verifyExistingAccounts.resolves({
                success: true,
                message: `Success`,
                data: senderBoomAccount,
            });
            const input = {
                sender: { firstName: sender.firstName, uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
                amount: { amount: 1000, precision: 2 },
            };
            await controller.create(input);
            testlab_1.expect(transactionRepository.stubs.create.args[0][0]).deepEqual({
                sender: { uid: sender.uid, firstName: sender.firstName },
                receiver: {
                    uid: receiver.uid,
                    firstName: receiver.firstName,
                    contact: {
                        emails: receiver.contact.emails,
                        phoneNumber: receiver.contact.phoneNumber,
                    },
                },
                createdAt: moment_1.default().utc().unix(),
                updatedAt: moment_1.default().utc().unix(),
                type: globals_1.TransactionType.TRANSFER,
                status: globals_1.TransactionStatus.PENDING,
                amount: input.amount,
            });
        });
        it('throws error if receiver is merchant', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['1111'],
            });
            const receiver = database_helpers_1.givenMerchant({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['2222'],
            });
            const senderBoomAccount = {
                _id: '1111',
                createdAt: 1611767842,
                updatedAt: 1612382579,
                status: 'Active',
                balance: {
                    amount: 0,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
                customerID: receiver.uid,
            };
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            profileService.stubs.getProfile
                .withArgs(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: sender,
            });
            profileService.stubs.getProfile
                .withArgs('+11111111111', {
                requiredFields: ['contact', 'firstName'],
                method: services_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: receiver,
            });
            boomAccountService.stubs.verifyExistingAccounts.resolves({
                success: true,
                message: `Success`,
                data: senderBoomAccount,
            });
            const input = {
                sender: { uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
                amount: { amount: 1000, precision: 2 },
            };
            await testlab_1.expect(controller.create(input)).to.be.rejectedWith(constants_1.FundTransferResponseMessages.RECEIVER_IS_MERCHANT);
        });
        it('throws error if sender had not enough funds', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['1111'],
            });
            const receiver = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['2222'],
            });
            const senderBoomAccount = {
                _id: '1111',
                createdAt: 1611767842,
                updatedAt: 1612382579,
                status: 'Active',
                balance: {
                    amount: 0,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
                customerID: receiver.uid,
            };
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            profileService.stubs.getProfile
                .withArgs(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: sender,
            });
            profileService.stubs.getProfile
                .withArgs('+11111111111', {
                requiredFields: ['contact', 'firstName'],
                method: services_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: receiver,
            });
            boomAccountService.stubs.verifyExistingAccounts.resolves({
                success: true,
                message: `Success`,
                data: senderBoomAccount,
            });
            const input = {
                sender: { uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
                amount: { amount: 1000, precision: 2 },
            };
            await testlab_1.expect(controller.create(input)).to.be.rejectedWith(constants_1.FundTransferResponseMessages.INSUFFICIENT_FUNDS);
        });
        it('fails if transaction is missing info', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['1111'],
            });
            const receiver = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['2222'],
            });
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            profileService.stubs.getProfile
                .withArgs(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: sender,
            });
            profileService.stubs.getProfile
                .withArgs('+11111111111', {
                requiredFields: ['contact', 'firstName'],
                method: services_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: receiver,
            });
            // This input is missing an amount for the transaction
            const input = {
                sender: { uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
            };
            await testlab_1.expect(controller.create(input)).to.be.rejectedWith(constants_1.FundTransferResponseMessages.TRANSACTION_MISSING_INFO);
        });
        it('throws error if sender account is no valid - no account or more than one', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['1111'],
            });
            const receiver = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['2222'],
            });
            const senderBoomAccount = {
                _id: '1111',
                createdAt: 1611767842,
                updatedAt: 1612382579,
                status: 'Active',
                balance: {
                    amount: 0,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
                customerID: receiver.uid,
            };
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            profileService.stubs.getProfile
                .withArgs(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: sender,
            });
            profileService.stubs.getProfile
                .withArgs('+11111111111', {
                requiredFields: ['contact', 'firstName'],
                method: services_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                message: constants_1.ProfileResponseMessages.NO_PROFILE_FOUND,
            });
            boomAccountService.stubs.verifyExistingAccounts.resolves({
                success: false,
                message: constants_1.BoomAccountResponseMessages.NOT_FOUND,
            });
            const input = {
                sender: { uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
                amount: { amount: 1000, precision: 2 },
            };
            await testlab_1.expect(controller.create(input)).to.be.rejectedWith(constants_1.BoomAccountResponseMessages.NOT_FOUND);
        });
        it('throws an error when phone number does not match format - 11 digits', async () => {
            const sender = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '+11111111111' },
                boomAccounts: ['1111'],
            });
            //the receiver number needs to be 10 digits with no +1 OR 12 digits with the +1 so 11 digits should throw error
            const receiver = database_helpers_1.givenCustomer({
                contact: { phoneNumber: '11111111111' },
                boomAccounts: ['2222'],
            });
            const controller = new controllers_1.TransferController(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService);
            const input = {
                sender: { uid: sender.uid },
                receiver: { contact: { phoneNumber: receiver.contact.phoneNumber } },
                amount: { amount: 1000, precision: 2 },
            };
            await testlab_1.expect(controller.create(input)).to.be.rejectedWith(constants_1.FundTransferResponseMessages.BAD_PHONE_FORMAT);
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
    function givenTransactionRepository() {
        transactionRepository = testlab_1.createStubInstance(repositories_1.TransactionRepository);
    }
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenTransfersService() {
        transfersService = testlab_1.createStubInstance(services_1.TransfersService);
    }
    function givenEmailService() {
        emailService = testlab_1.createStubInstance(services_1.EmailService);
    }
    function givenSNSService() {
        snsService = testlab_1.createStubInstance(services_1.SNSService);
    }
    function givenBoomAccountService() {
        boomAccountService = testlab_1.createStubInstance(services_1.BoomAccountService);
    }
});
//# sourceMappingURL=transfers.controller.unit.js.map