"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantTransactionService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const merchant_transaction_error_1 = tslib_1.__importDefault(require("../errors/merchant-transaction-error"));
const repositories_1 = require("../repositories");
let MerchantTransactionService = class MerchantTransactionService {
    constructor(inventoryItemRepository, inventoryLeaseRepository, merchantTransactionRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
        this.inventoryLeaseRepository = inventoryLeaseRepository;
        this.merchantTransactionRepository = merchantTransactionRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    /**
     * Updates merchant transaction, inventorylease and inventoryItem when the Type is Return and Status Completed
     * @param {string | null} id
     * @param {MerchantTransaction | null} merchantTransaction
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling
     * this method.
     * @returns {Promise<APIResponse>}
     * @memberof MerchantTransactionService
     */
    async updateMerchantTransaction(id, merchantTransaction, options) {
        var _a, _b, _c, _d;
        this.logger.info('Starting merchant transaction update request');
        try {
            if (!id || !merchantTransaction) {
                throw new merchant_transaction_error_1.default('Cannot create merchant transaction without required params', 'Request param error', {});
            }
            const now = moment_1.default().utc().unix();
            if (merchantTransaction.type === constants_1.MerchantTransactionType.RETURN &&
                merchantTransaction.status === constants_1.MerchantTransactionStatus.COMPLETED) {
                if (merchantTransaction.purchaseItem._id) {
                    await this.inventoryItemRepository.updateById(merchantTransaction.purchaseItem._id, {
                        merchant: null,
                        updatedAt: now,
                    }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                    this.logger.debug(`updated inventory item`);
                }
                if (merchantTransaction.inventoryLease && merchantTransaction.inventoryLease._id) {
                    await this.inventoryLeaseRepository.updateById(merchantTransaction.inventoryLease._id, {
                        fulfillmentStatus: constants_1.FulfillmentStatus.CANCELLED,
                    }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                    merchantTransaction.inventoryLease = {};
                    this.logger.debug(`updated inventory Lease`);
                }
            }
            if (merchantTransaction.type === constants_1.MerchantTransactionType.RECURRING &&
                merchantTransaction.status === constants_1.MerchantTransactionStatus.COMPLETED) {
                if ((_a = merchantTransaction.inventoryLease) === null || _a === void 0 ? void 0 : _a._id) {
                    const amount = (((_b = merchantTransaction.inventoryLease.amountPaid) === null || _b === void 0 ? void 0 : _b.amount) || 0) +
                        (((_c = merchantTransaction.amount) === null || _c === void 0 ? void 0 : _c.amount) || 0);
                    const amountPaid = Object.assign(Object.assign({}, merchantTransaction.inventoryLease.amountPaid), { amount });
                    const fulfillmentStatus = amount >= (((_d = merchantTransaction.inventoryLease.fulfillmentAmount) === null || _d === void 0 ? void 0 : _d.amount) || 0)
                        ? constants_1.FulfillmentStatus.FULFILLED
                        : merchantTransaction.inventoryLease.fulfillmentStatus;
                    await this.inventoryLeaseRepository.updateById(merchantTransaction.inventoryLease._id, {
                        amountPaid,
                        fulfillmentStatus,
                    }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                }
            }
            const newMerchantTransaction = Object.assign(Object.assign({}, merchantTransaction), { updatedAt: now });
            await this.merchantTransactionRepository.updateById(id, newMerchantTransaction, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            this.logger.debug(`updated merchant transaction`);
            return {
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS_MERCHANT_TRANSACTION_PATCH,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new merchant_transaction_error_1.default(error.toString(), 'Db error', {});
        }
    }
    async createMerchantTransactions(merchantTransactions, options) {
        try {
            await this.merchantTransactionRepository.createAll(merchantTransactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            this.logger.debug(`created merchant transactions count is ${merchantTransactions.length}`);
            return {
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS_MERCHANT_TRANSACTION_PATCH,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new merchant_transaction_error_1.default(error.toString(), 'Db error', {});
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionService.prototype, "updateMerchantTransaction", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantTransactionService.prototype, "createMerchantTransactions", null);
MerchantTransactionService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryItemRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.InventoryLeaseRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.MerchantTransactionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryItemRepository,
        repositories_1.InventoryLeaseRepository,
        repositories_1.MerchantTransactionRepository])
], MerchantTransactionService);
exports.MerchantTransactionService = MerchantTransactionService;
//# sourceMappingURL=merchant-transaction.service.js.map