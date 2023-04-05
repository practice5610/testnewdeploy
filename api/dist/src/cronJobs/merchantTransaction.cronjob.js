"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantTransactionCronJob = void 0;
const tslib_1 = require("tslib");
const cron_1 = require("@loopback/cron");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const constants_1 = require("../constants");
const services_1 = require("../services");
let MerchantTransactionCronJob = class MerchantTransactionCronJob extends cron_1.CronJob {
    constructor() {
        super({
            name: 'Monthly Leases',
            onTick: async () => {
                try {
                    this.logger.log('Monthly Lease cron job invoked...');
                    await this.leaseService.reviewInventoryLeases();
                }
                catch (error) {
                    this.logger.error(error);
                }
            },
            //cronTime: '0 */1 * * * *',
            cronTime: '0 1 0 1 * *',
            start: true,
            timeZone: 'America/New_York',
        });
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.CRON_JOB);
    }
};
tslib_1.__decorate([
    loopback4_spring_1.service(services_1.LeaseService),
    tslib_1.__metadata("design:type", services_1.LeaseService)
], MerchantTransactionCronJob.prototype, "leaseService", void 0);
MerchantTransactionCronJob = tslib_1.__decorate([
    cron_1.cronJob(),
    tslib_1.__metadata("design:paramtypes", [])
], MerchantTransactionCronJob);
exports.MerchantTransactionCronJob = MerchantTransactionCronJob;
//# sourceMappingURL=merchantTransaction.cronjob.js.map