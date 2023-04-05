"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfersService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const app_error_1 = tslib_1.__importDefault(require("../errors/app-error"));
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const boom_account_service_1 = require("./boom-account.service");
const profile_service_1 = require("./profile.service");
let TransfersService = class TransfersService {
    constructor(transactionRepository, profileService, boomAccountService) {
        this.transactionRepository = transactionRepository;
        this.profileService = profileService;
        this.boomAccountService = boomAccountService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.TRANSACTION_SERVICE);
    }
    async transferFunds(transaction, options) {
        var _a, _b;
        const updatedTransaction = Object.assign(Object.assign({}, transaction), { status: globals_1.TransactionStatus.COMPLETED });
        const sender = transaction.sender;
        const receiver = transaction.receiver;
        const senderProfile = await this.profileService.getProfile(sender.uid);
        //TODO: here we need to use receiverProfile.data and forward the error properly using ServiceResponse not throwing error with handleServiceResponseResult
        const senderProfileData = utils_1.handleServiceResponseResult(senderProfile);
        if (!senderProfileData)
            throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
        /**
         * Check if this is a phone number only transfer
         * (if it was created before the receiver had a uid)
         */
        let receiverProfile;
        if (receiver === null || receiver === void 0 ? void 0 : receiver.uid) {
            receiverProfile = await this.profileService.getProfile(receiver.uid);
        }
        else if ((_a = receiver === null || receiver === void 0 ? void 0 : receiver.contact) === null || _a === void 0 ? void 0 : _a.phoneNumber) {
            receiverProfile = await this.profileService.getProfile(receiver.contact.phoneNumber, {
                method: profile_service_1.getProfileOptions.BY_PHONE,
            });
        }
        else {
            // TODO: here we don't have uid or phone number, is it ok to throw Error?? - Maybe we don't get here at any point since the controller has a validator, but TS is not aware of that
            throw new rest_1.HttpErrors.NotFound(constants_1.FundTransferResponseMessages.TRANSACTION_MISSING_INFO);
        }
        //TODO: here we need to use receiverProfile.data and forward the error properly using ServiceResponse not throwing error with handleServiceResponseResult
        const receiverProfileData = utils_1.handleServiceResponseResult(receiverProfile);
        // If the transfer was created before the receiver had a boom account we add the uid to the transfer
        // now so it is easier to look up in the future
        if (!((_b = updatedTransaction.receiver) === null || _b === void 0 ? void 0 : _b.uid) && (receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.uid)) {
            updatedTransaction.receiver = Object.assign(Object.assign({}, updatedTransaction.receiver), { uid: receiverProfileData.uid });
        }
        const senderBoomAccountResponse = await this.boomAccountService.verifyExistingAccounts(senderProfileData.uid);
        if (!senderBoomAccountResponse.success || !senderBoomAccountResponse.data) {
            return {
                success: false,
                message: constants_1.FundTransferResponseMessages.SENDER_BOOM_ACCOUNT_NOT_FOUND,
            };
        }
        const receiverBoomAccountResponse = await this.boomAccountService.verifyExistingAccounts((receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.uid) || '');
        if (!receiverBoomAccountResponse.success || !receiverBoomAccountResponse.data) {
            return {
                success: false,
                message: constants_1.FundTransferResponseMessages.RECEIVER_BOOM_ACCOUNT_NOT_FOUND,
            };
        }
        const senderBoomAccount = senderBoomAccountResponse.data;
        const receiverBoomAccount = receiverBoomAccountResponse.data;
        if (dinero_js_1.default(senderBoomAccount.balance).lessThan(dinero_js_1.default(transaction.amount))) {
            return { success: false, message: constants_1.FundTransferResponseMessages.INSUFFICIENT_FUNDS };
        }
        const chargeSenderResponse = await this.boomAccountService.charge(senderBoomAccount._id, transaction.amount);
        if (!chargeSenderResponse.success) {
            return { success: false, message: chargeSenderResponse.message };
        }
        const addFundsToReceiverResponse = await this.boomAccountService.addFunds(receiverBoomAccount._id, transaction.amount);
        if (!addFundsToReceiverResponse.success) {
            return { success: false, message: addFundsToReceiverResponse.message };
        }
        const transactionOptions = process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined;
        await this.transactionRepository.updateById(transaction._id, updatedTransaction, transactionOptions);
        return { success: true };
    }
    async addFunds(uid, amount, nonce, createBillingDoc = true, options) {
        var _a;
        const customerBoomAccountResponse = await this.boomAccountService.verifyExistingAccounts(uid);
        if (!customerBoomAccountResponse.success || !customerBoomAccountResponse.data) {
            throw new app_error_1.default(customerBoomAccountResponse.message, customerBoomAccountResponse.message, customerBoomAccountResponse.data);
        }
        const customerBoomAccount = customerBoomAccountResponse.data;
        if (customerBoomAccount.status === globals_1.BoomAccountStatus.CANCELLED) {
            throw new app_error_1.default(constants_1.BoomAccountResponseMessages.CANCELLED, constants_1.BoomAccountResponseMessages.CANCELLED, customerBoomAccountResponse.data);
        }
        const newBalance = dinero_js_1.default(customerBoomAccount.balance)
            .add(dinero_js_1.default(amount))
            .toObject();
        this.logger.log(`Adding funds to BoomCard. Old balance: ${utils_1.fromMoney(customerBoomAccount.balance)}, amount to add: ${utils_1.fromMoney(amount)}, new balance: ${utils_1.fromMoney(newBalance)} `);
        const addFundsToCustomerResponse = await this.boomAccountService.addFunds(customerBoomAccount._id, amount);
        if (!addFundsToCustomerResponse.success) {
            throw new app_error_1.default(addFundsToCustomerResponse.message, addFundsToCustomerResponse.message, (_a = customerBoomAccountResponse.data) === null || _a === void 0 ? void 0 : _a._id);
        }
        this.logger.log(addFundsToCustomerResponse.message);
        this.logger.log('Creating transaction...');
        const now = moment_1.default().utc().unix();
        const transaction = {
            createdAt: now,
            updatedAt: now,
            amount,
            boomAccountID: customerBoomAccount._id,
            nonce,
            type: globals_1.TransactionType.FUNDING,
            status: globals_1.TransactionStatus.COMPLETED,
            sender: { uid },
        };
        const transaction2 = {
            createdAt: now,
            updatedAt: now,
            amount,
            boomAccountID: customerBoomAccount._id,
            nonce,
            type: globals_1.TransactionType.CUSTOMER_BILLING,
            status: globals_1.TransactionStatus.UNPROCESSED,
            sender: { uid },
        };
        const result = await this.transactionRepository.create(transaction, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const result2 = createBillingDoc
            ? await this.transactionRepository.create(transaction2, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined)
            : null;
        this.logger.log('Transaction created:', result);
        if (result2)
            this.logger.log('Billing Transaction created:', result2);
        return { transaction: result, billingTransaction: result2 };
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransfersService.prototype, "transferFunds", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, String, Boolean, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransfersService.prototype, "addFunds", null);
TransfersService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__param(2, loopback4_spring_1.service(boom_account_service_1.BoomAccountService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository,
        profile_service_1.ProfileService,
        boom_account_service_1.BoomAccountService])
], TransfersService);
exports.TransfersService = TransfersService;
//# sourceMappingURL=transfers.service.js.map