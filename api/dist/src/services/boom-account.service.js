"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomAccountService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const transactions_1 = require("../types/transactions");
const profile_service_1 = require("./profile.service");
let BoomAccountService = class BoomAccountService {
    constructor(boomAccountRepository, transactionRepository, profileServices) {
        this.boomAccountRepository = boomAccountRepository;
        this.transactionRepository = transactionRepository;
        this.profileServices = profileServices;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOM_ACCOUNT_SERVICE);
    }
    /**
     * Since the Boom Account is not created when new user is created, we need to verify that User can have only 1 boom account at time.
     * @param {string} customerID User UID for verification
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: BoomAccount, error?: Error}
     * @memberof BoomAccountService
     */
    async verifyExistingAccounts(customerID) {
        const filterBuilder = new repository_1.FilterBuilder();
        const filter = filterBuilder
            .where({ customerID: customerID })
            .build();
        const existingAccount = await this.boomAccountRepository.find(filter);
        // If no existing account or existing more than one should return false.
        if (!(existingAccount === null || existingAccount === void 0 ? void 0 : existingAccount.length)) {
            return {
                success: false,
                message: !existingAccount.length
                    ? constants_1.BoomAccountResponseMessages.NOT_FOUND
                    : constants_1.BoomAccountResponseMessages.MORE_THAN_ONE_ACCOUNT,
            };
        }
        // Otherwise there is one account and should return true, and given back the existing boomAccount
        return {
            success: true,
            message: `Success`,
            data: existingAccount[0],
        };
    }
    /**
     * This method handle charge amount to a customer from his boom account. If cashback it add cashback to the account in same process.
     * @param {string} boomAccountID Boom Account Mongo ID to charge
     * @param {Money} amount Amount to charge
     * @param {Money} cashback Optional cashback amount to add after charge
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    async charge(boomAccountID, amount, cashback) {
        const oldStateAccount = await this.boomAccountRepository.findById(boomAccountID);
        // If not existing, account.
        if (!oldStateAccount) {
            return {
                success: false,
                message: constants_1.BoomAccountResponseMessages.NOT_FOUND,
            };
        }
        // Otherwise there is an account and we validate if the account is lower than the amount.
        if (dinero_js_1.default(oldStateAccount.balance).lessThan(dinero_js_1.default(amount))) {
            return {
                success: false,
                message: constants_1.BoomAccountResponseMessages.NOT_FUNDS,
            };
        }
        // At this point there is an account with enough funds, we proceed to subtact the amount from the account.
        let newBalance = dinero_js_1.default(oldStateAccount.balance).subtract(dinero_js_1.default(amount));
        // If there is any cashback we also add to the account.
        if (cashback) {
            newBalance = newBalance.add(dinero_js_1.default(cashback));
        }
        // We build the new BoomAccount state to update it.
        const newStateAccount = Object.assign(Object.assign({}, oldStateAccount), { updatedAt: moment_1.default().utc().unix(), balance: globals_1.dineroToMoney(newBalance) });
        // We call the updateById method which ALLOW_TRANSACTIONAL_FEATURE.
        const response = await this.updateById(newStateAccount._id, newStateAccount);
        // and return the same final response if update success or not.
        return response;
    }
    /**
     * This method handle add funds to a customer to his boom account.
     * @param {string} boomAccountID Boom Account Mongo ID to charge
     * @param {Money} amount Amount to add
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    async addFunds(boomAccountID, amount) {
        // Query the boom Account by ID
        const oldStateAccount = await this.boomAccountRepository.findById(boomAccountID);
        // If not existing BoomAccount return false.
        if (!oldStateAccount) {
            return {
                success: false,
                message: constants_1.BoomAccountResponseMessages.NOT_FOUND,
            };
        }
        // Add the Amount to the boom account.
        const newBalance = dinero_js_1.default(oldStateAccount.balance).add(dinero_js_1.default(amount));
        // Build the new boom account state.
        const newStateAccount = Object.assign(Object.assign({}, oldStateAccount), { updatedAt: moment_1.default().utc().unix(), balance: globals_1.dineroToMoney(newBalance) });
        // Call updateById method with the new boom account state. which ALLOW_TRANSACTIONAL_FEATURE.
        const response = await this.updateById(newStateAccount._id, newStateAccount);
        // and return the same final response if update success or not.
        return response;
    }
    /**
     * Boom Account Creation Method.
     * @param {string} customerID User UID issues to create a new Boom Account.
     * @param {Money} amount Amount to add
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}
     * @memberof BoomAccountService
     */
    async create(customerID, options) {
        const verificationResponse = await this.verifyExistingAccounts(customerID);
        //Verify if customer have an existing account. If true return that account.
        if (verificationResponse.success) {
            return {
                success: true,
                message: constants_1.BoomAccountResponseMessages.ALREADY_HAVE_ACCOUNT,
                data: verificationResponse.data,
            };
        }
        //Call Create Method to Boom Account creation. Which is Transactional.
        const brandNewBoomAccount = await this.boomAccountRepository.create({
            updatedAt: moment_1.default().utc().unix(),
            createdAt: moment_1.default().utc().unix(),
            status: globals_1.BoomAccountStatus.ACTIVE,
            balance: globals_1.toMoney(0),
            customerID: customerID,
        }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        //On success FireStore User Profile will be updated with data related to new boom account _id
        const profileUpdates = {
            updatedAt: moment_1.default().utc().unix(),
            boomAccounts: [brandNewBoomAccount._id.toString()],
        };
        await this.profileServices.updateProfileById(customerID, profileUpdates);
        //All success
        return {
            success: true,
            message: constants_1.BoomAccountResponseMessages.CREATE_SUCCESS,
            data: brandNewBoomAccount,
        };
    }
    /**
     * Boom Account updateById Method.
     * @param {string} boomAccountID Boom Account MongoID.
     * @param {BoomAccount} newBoomAccount New Boom Account state to be updated.
     * @param {Options} options Optional.
     * @returns {Promise<APIResponse<BoomAccount>>} { success: boolean, message: string, data?: T, error?: Error}.
     * @memberof BoomAccountService
     */
    async updateById(boomAccountID, newBoomAccount, options) {
        await this.boomAccountRepository.updateById(boomAccountID, newBoomAccount, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        return {
            success: true,
            message: constants_1.BoomAccountResponseMessages.UPDATE_SUCCESS,
        };
    }
    async pendingBalance(uid) {
        try {
            const transfersPending = await this.transactionRepository.find({
                where: {
                    and: [
                        // { sender: { eq: { uid: uid } } },  // REMINDER: This should be used to properly query if Store is no longer used as Transaction.sender type.
                        { type: { eq: globals_1.TransactionType.TRANSFER } },
                        { status: { eq: globals_1.TransactionStatus.PENDING } },
                    ],
                },
            });
            let pendingBalance = globals_1.toMoney(0);
            transfersPending.forEach((transfer) => {
                if (transactions_1.senderHasUID(transfer.sender)) {
                    if (transfer.sender.uid === uid) {
                        pendingBalance = globals_1.toMoney(dinero_js_1.default(pendingBalance).add(dinero_js_1.default(transfer.amount)).toUnit());
                    }
                }
            });
            return {
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: pendingBalance,
            };
        }
        catch (error) {
            this.logger.error(error);
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomAccountService.prototype, "create", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.BoomAccount, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomAccountService.prototype, "updateById", null);
BoomAccountService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomAccountRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(2, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomAccountRepository,
        repositories_1.TransactionRepository,
        profile_service_1.ProfileService])
], BoomAccountService);
exports.BoomAccountService = BoomAccountService;
//# sourceMappingURL=boom-account.service.js.map