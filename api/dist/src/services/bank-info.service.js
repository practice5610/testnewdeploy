"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankInfoService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const plaid = require('plaid');
const plaidMode = process.env.PLAID_MODE || '';
const plaidProduct = (process.env.PLAID_PRODUCT || '').split(',');
const plaidAppName = process.env.PLAID_APP_NAME || '';
const plaidPublicKey = process.env.PLAID_PUBLIC_KEY || '';
const plaidSecretKey = process.env.PLAID_SECRET_KEY || '';
const plaidClientId = process.env.PLAID_CLIENT_ID || '';
/**
 * Bank info class using Plaid service
 */
let BankInfoService = class BankInfoService {
    constructor(bankInfoRepository, customerBillingRepository) {
        this.bankInfoRepository = bankInfoRepository;
        this.customerBillingRepository = customerBillingRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BANK_INFO_SERVICE);
        this.client = new plaid.Client(plaidClientId, plaidSecretKey, plaidPublicKey, plaid.environments.sandbox);
    }
    getPlaidEnvInfo() {
        return {
            success: true,
            env: {
                plaidMode,
                plaidProduct,
                plaidAppName,
                plaidPublicKey,
            },
        };
    }
    async getPlaidPublicToken(accessToken) {
        try {
            return await new Promise((resolve, reject) => {
                this.client.createPublicToken(accessToken, (error, result) => {
                    if (error !== null) {
                        return reject(error);
                    }
                    resolve({ success: true, publicToken: result.public_token });
                });
            });
        }
        catch (error) {
            return { success: false, message: error.error_message };
        }
    }
    async exchangeToken(publicToken) {
        try {
            return await new Promise((resolve, reject) => {
                this.client.exchangePublicToken(publicToken, function (error, tokenResponse) {
                    if (error !== null) {
                        return reject(error);
                    }
                    const data = {
                        accessToken: tokenResponse.access_token,
                        itemId: tokenResponse.item_id,
                    };
                    resolve(data);
                });
            });
        }
        catch (error) {
            return { success: false, message: error.error_message };
        }
    }
    async getPlaidBalance(accessToken) {
        try {
            return await new Promise((resolve, reject) => {
                this.client.getBalance(accessToken, (error, result) => {
                    if (error !== null) {
                        return reject(error); // TODO: to improve the test maybe these errors can be hardcoded on the constants file
                    }
                    const accounts = result.accounts;
                    return resolve({ success: true, accounts });
                });
            });
        }
        catch (error) {
            return { success: false, message: error.error_message, error_code: error.error_code };
        }
    }
    async getAuth(accessToken) {
        try {
            return await new Promise((resolve, reject) => {
                this.client.getAuth(accessToken, {}, (err, results) => {
                    if (err) {
                        if (err.error_code === 'ITEM_LOGIN_REQUIRED') {
                            this.logger.warn(err.error_message);
                        }
                        else {
                            this.logger.error(err.error_message);
                        }
                        return reject(err);
                    }
                    const accountNumbers = {};
                    if (results.numbers.ach.length > 0) {
                        // Handle ACH numbers (US accounts)
                        accountNumbers.achNumbers = results.numbers.ach;
                    }
                    if (results.numbers.eft.length > 0) {
                        // Handle EFT numbers (Canadian accounts)
                        accountNumbers.eftNumbers = results.numbers.eft;
                    }
                    if (results.numbers.international.length > 0) {
                        // Handle International numbers (Standard International accounts)
                        accountNumbers.internationalNumbers = results.numbers.international;
                    }
                    if (results.numbers.bacs.length > 0) {
                        // Handle BACS numbers (British accounts)
                        accountNumbers.bacsNumbers = results.numbers.bacs;
                    }
                    return resolve({
                        success: true,
                        message: 'Success',
                        data: {
                            numbers: accountNumbers,
                            accounts: results.accounts,
                        },
                    });
                });
            });
        }
        catch (error) {
            return {
                success: false,
                message: error.error_message,
                data: error,
            };
        }
    }
    async getIdentity(accessToken) {
        try {
            return await new Promise((resolve, reject) => {
                this.client.getIdentity(accessToken, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve({
                        success: true,
                        message: 'Success',
                        data: results,
                    });
                });
            });
        }
        catch (error) {
            return {
                success: false,
                message: error.error_message,
                data: error,
            };
        }
    }
    async deleteAccounts(accounts, options) {
        try {
            for (const account of accounts) {
                const filter = {
                    where: {
                        plaidAccountId: account.plaidID,
                        or: [
                            { 'transaction.status': globals_1.TransactionStatus.UNPROCESSED },
                            { 'transaction.status': globals_1.TransactionStatus.PENDING },
                        ],
                    },
                };
                const pendingBillings = await this.customerBillingRepository.find(filter);
                if (pendingBillings.length) {
                    throw new Error(constants_1.BankAccountResponseMessages.BANK_DELETE_BLOCKED);
                }
                const foundAccount = await this.bankInfoRepository.find({
                    where: { plaidID: account.plaidID, userID: account.userID },
                });
                for (const acc of foundAccount) {
                    await this.bankInfoRepository.delete(acc, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                }
            }
        }
        catch (err) {
            this.logger.error(err);
            throw new Error(err.message);
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoService.prototype, "deleteAccounts", null);
BankInfoService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BankInfoRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CustomerBillingRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BankInfoRepository,
        repositories_1.CustomerBillingRepository])
], BankInfoService);
exports.BankInfoService = BankInfoService;
//# sourceMappingURL=bank-info.service.js.map