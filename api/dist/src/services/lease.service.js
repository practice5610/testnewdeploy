"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaseService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const services_2 = require("../services");
const boomAdminEmail = process.env.BOOM_TECHNICAL_ADMIN_EMAIL || 'noel@boomcarding.com';
let LeaseService = class LeaseService {
    constructor(inventoryLeaseRepository, inventoryItemRepository, merchantTransactionRepository, emailService, merchantTransactionService) {
        this.inventoryLeaseRepository = inventoryLeaseRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.merchantTransactionRepository = merchantTransactionRepository;
        this.emailService = emailService;
        this.merchantTransactionService = merchantTransactionService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    /**
     * Called by a cron function to create the transactions remaining for each Lease
     * @param {Options} [options]
     * @return {*}  {Promise<any>}
     * @memberof LeaseService
     */
    async reviewInventoryLeases(options) {
        let now = moment_1.default().utc().unix();
        //console.log('subtract', moment().subtract(2, 'month').utc().unix());
        try {
            const filter = {
                where: {
                    and: [{ fulfillmentStatus: constants_1.FulfillmentStatus.ACTIVE }],
                },
            };
            const result = await this.inventoryLeaseRepository.find(filter);
            const merchantTransactions = [];
            const inventoryLeases = [];
            for (const item of result) {
                console.log('time', moment_1.default.unix(item.createdAt));
                console.log('Months since creation :', moment_1.default.unix(now).diff(moment_1.default.unix(item.createdAt), 'months'));
                console.log('Last charged was in current month :', moment_1.default.unix(item.lastChargedAt), ' : ', moment_1.default.unix(now).isSame(moment_1.default.unix(item.lastChargedAt), 'month'));
                //Checks if more than 1 month has passed since the lease creation
                if (moment_1.default.unix(now).diff(moment_1.default.unix(item.createdAt), 'months') > 1 &&
                    !moment_1.default.unix(now).isSame(moment_1.default.unix(item.lastChargedAt), 'month')) {
                    now = moment_1.default().utc().unix();
                    const merchantTransaction = {
                        createdAt: now,
                        updatedAt: now,
                        status: constants_1.MerchantTransactionStatus.PENDING,
                        type: constants_1.MerchantTransactionType.RECURRING,
                        amount: item.leaseAmount,
                        merchant: item.merchant,
                        store: item.store,
                        purchaseItem: item.inventoryItem,
                        inventoryLease: item,
                    };
                    merchantTransactions.push(merchantTransaction);
                    inventoryLeases.push({ _id: item._id });
                    /*await this.inventoryLeaseRepository.updateById(
                      item._id,
                      {
                        lastChargedAt: now,
                        updatedAt: now,
                      },
                      process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined
                    );*/
                }
            }
            if (inventoryLeases.length > 0) {
                await this.inventoryLeaseRepository.updateAll({
                    lastChargedAt: now,
                    updatedAt: now,
                }, { or: inventoryLeases }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                this.logger.debug(`update inventory leases count is ${inventoryLeases.length}`);
            }
            await this.merchantTransactionService.createMerchantTransactions(merchantTransactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            console.log('boomAdminEmail', boomAdminEmail);
            await this.emailService.send({
                to: boomAdminEmail,
                from: 'Boom Rewards <noreply@boomcarding.com>',
                subject: 'Inventory lease successfully completed',
                html: this.emailService.mailGenerator.generate({
                    body: {
                        name: 'Boom',
                        intro: `Inventory lease billing cron job successfully completed`,
                    },
                }),
            });
        }
        catch (error) {
            this.logger.error(error);
            const dictionary = {
                diagnosticsData: error.toJSON(),
            };
            await this.emailService.sendAppError('Inventory lease failed', 'Inventory lease billing cron job failed with errors', dictionary);
            throw new Error(error);
        }
    }
    async swapItems(oldItem, newItem, newLease) {
        if (!newLease.inventoryItem._id)
            return;
        await this.inventoryItemRepository.updateById(oldItem._id, oldItem);
        await this.inventoryItemRepository.updateById(newLease.inventoryItem._id, newLease.inventoryItem);
        await this.inventoryLeaseRepository.updateById(newLease._id, newLease);
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], LeaseService.prototype, "reviewInventoryLeases", null);
LeaseService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryLeaseRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.InventoryItemRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.MerchantTransactionRepository)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.EmailService)),
    tslib_1.__param(4, loopback4_spring_1.service(services_2.MerchantTransactionService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryLeaseRepository,
        repositories_1.InventoryItemRepository,
        repositories_1.MerchantTransactionRepository,
        services_1.EmailService,
        services_2.MerchantTransactionService])
], LeaseService);
exports.LeaseService = LeaseService;
//# sourceMappingURL=lease.service.js.map