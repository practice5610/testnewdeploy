"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarterObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const admin = tslib_1.__importStar(require("firebase-admin"));
const log4js_1 = require("log4js");
const log4js_2 = require("log4js");
const constants_1 = require("../constants");
const merchantTransaction_cronjob_1 = require("../cronJobs/merchantTransaction.cronjob");
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH || '');
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let StarterObserver = class StarterObserver {
    constructor() {
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        log4js_2.configure({
            appenders: {
                console: { type: 'console', layout: { type: 'colored' } },
            },
            categories: {
                [constants_1.LoggingCategory.PURCHASES_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.PROFILE_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.BANK_INFO_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.PAYMENT_PROCESSING]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.CUSTOMER_BILLING]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.MERCHANT_BILLING]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.MERCHANT_PAYOUTS]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.INVENTORY_ORDERS]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.DEFAULT]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.TAXES]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.CRON_JOB]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.SHIPPING]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.PRODUCTS_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.PRODUCTS_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.STORE_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.STORE_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.TRANSACTION_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.INVENTORY_ORDERS]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.ACCOUNT]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.BOOKINGS]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.PROFILES]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.USERS]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.ORDER_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.ORDER_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.BOOM_ACCOUNT_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.CONFIG_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.BOOM_ACCOUNT_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.WITHDRAWAL_SERVICE]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
                [constants_1.LoggingCategory.WITHDRAWAL_CONTROLLER]: {
                    appenders: ['console'],
                    level: process.env.LOG_LEVEL || 'all',
                },
            },
        });
        this.logger.info(`APP STARTED`);
        const merchantTransactionCronJob = core_1.createBindingFromClass(merchantTransaction_cronjob_1.MerchantTransactionCronJob);
        this.app.add(merchantTransactionCronJob);
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
        this.logger.info(`APP STOPPED`);
    }
};
tslib_1.__decorate([
    core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE),
    tslib_1.__metadata("design:type", core_1.Application)
], StarterObserver.prototype, "app", void 0);
StarterObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver(),
    tslib_1.__metadata("design:paramtypes", [])
], StarterObserver);
exports.StarterObserver = StarterObserver;
//# sourceMappingURL=starter.observer.js.map