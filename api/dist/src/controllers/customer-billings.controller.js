"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerBillingsController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
/**
 * Controller for managing of customer related billing queries
 */
let CustomerBillingsController = class CustomerBillingsController {
    constructor(transactionRepository, customerBillingRepository, response) {
        this.transactionRepository = transactionRepository;
        this.customerBillingRepository = customerBillingRepository;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.CUSTOMER_BILLING);
    }
    /**
     * Gets the customer billing info with optional filter.
     * Customer billings tell the Boom admin what checks have been paid and which are pending creation.
     * @param filter
     */
    async find(
    //@ts-ignore
    filter) {
        return this.customerBillingRepository.find(filter);
    }
    /**
     * Updates the customer billing transaction state
     * @param billings
     */
    async updateBillings(billings) {
        try {
            this.logger.info('Customer billing update requested');
            this.logger.debug('Billings count:', billings.length);
            for (const billing of billings) {
                this.logger.debug('Customer Billing:', billing);
                this.logger.debug('Will update billing transaction with this data:', billing.transaction);
                await this.transactionRepository.updateById(billing.transaction._id, billing.transaction);
                this.logger.debug('Finding customer billing with ID of:', billing._id);
                const oldTransaction = (await this.customerBillingRepository.findById(billing._id))
                    .transaction;
                this.logger.debug('Customer billing found with transaction:', oldTransaction);
                billing.transaction = Object.assign(Object.assign({}, oldTransaction), billing.transaction);
                this.logger.debug('Will update customer billing record with new transaction data', billing.transaction);
                await this.customerBillingRepository.updateById(billing._id, billing);
                this.logger.info('Customer billing udpated.');
            }
            return this.response.json({ success: true });
        }
        catch (err) {
            this.logger.error(err.message);
            return this.response.json({ success: false, message: err.message });
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/customer-billings', {
        responses: {
            '200': {
                description: 'Billing data for customers',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': Object } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.CustomerBilling))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerBillingsController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/customer-billings', {
        responses: {
            '200': {
                description: 'update transaction object',
                content: { 'application/json': { schema: Object } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerBillingsController.prototype, "updateBillings", null);
CustomerBillingsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CustomerBillingRepository)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository,
        repositories_1.CustomerBillingRepository, Object])
], CustomerBillingsController);
exports.CustomerBillingsController = CustomerBillingsController;
//# sourceMappingURL=customer-billings.controller.js.map