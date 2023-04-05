"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingCategory = void 0;
var LoggingCategory;
(function (LoggingCategory) {
    /**
     * Log activity related to our purchases services
     */
    LoggingCategory["PURCHASES_SERVICE"] = "purchases-service";
    /**
     * Log activity related to our profile services
     */
    LoggingCategory["PROFILE_SERVICE"] = "profile-service";
    /**
     * Log activity related to our payment processing services (Magensa Gateway for tablet chip card processing)
     */
    LoggingCategory["PAYMENT_PROCESSING"] = "payment-processing";
    /**
     * Log activity related to our bank info services (Plaid for manual check generation)
     */
    LoggingCategory["BANK_INFO_SERVICE"] = "bank-info-service";
    /**
     * Log activity related to billing of a customer. These are payments that flow into Boom from customers
     */
    LoggingCategory["CUSTOMER_BILLING"] = "customer-billing";
    /**
     * Log activity related to billing of a merchant. These are payments that flow into Boom from merchants
     */
    LoggingCategory["MERCHANT_BILLING"] = "merchant-billing";
    /**
     * Log activity related to payouts to merchants. These are payments that flow out of Boom to merchants
     */
    LoggingCategory["MERCHANT_PAYOUTS"] = "merchant-payouts";
    /**
     * Log default activity
     */
    LoggingCategory["DEFAULT"] = "default";
    /**
     * Log alerts activity
     */
    LoggingCategory["ALERTS"] = "alerts";
    /**
     * Log activity related to inventory orders.
     */
    LoggingCategory["INVENTORY_ORDERS"] = "inventory-orders";
    /**
     * Log activity related to account.
     */
    LoggingCategory["ACCOUNT"] = "account";
    /**
     * Log activity related to taxes.
     */
    LoggingCategory["TAXES"] = "taxes";
    /**
     * Log activity related to cron jobs
     */
    LoggingCategory["CRON_JOB"] = "cron-job";
    /**
     * Log activity related to bookings
     */
    LoggingCategory["BOOKINGS"] = "bookings";
    /**
     * Log activity related to profiles
     */
    LoggingCategory["PROFILES"] = "profiles";
    /**
     * Log activity related to users
     */
    LoggingCategory["USERS"] = "users";
    /**
     * Log activity related to shipping
     */
    LoggingCategory["SHIPPING"] = "shipping";
    /**
     * Log activity related to transaction-service
     */
    LoggingCategory["TRANSACTION_SERVICE"] = "transaction-service";
    /**
     * Log activity related to store-controller
     */
    LoggingCategory["STORE_CONTROLLER"] = "store-controller";
    /**
     * Log activity related to store-service
     */
    LoggingCategory["STORE_SERVICE"] = "store-service";
    /**
     * Log activity related to product-controller
     */
    LoggingCategory["PRODUCTS_CONTROLLER"] = "product-controller";
    /**
     * Log activity related to product-service
     */
    LoggingCategory["PRODUCTS_SERVICE"] = "product-service";
    /**
     * Log activity related to order-service
     */
    LoggingCategory["ORDER_SERVICE"] = "order-service";
    /**
     * Log activity related to returns
     */
    LoggingCategory["RETURNS"] = "returns";
    /*
     * Log activity related to order-controller
     */
    LoggingCategory["ORDER_CONTROLLER"] = "order-controller";
    /**
     * Log activity related to boom-account-controller
     */
    LoggingCategory["BOOM_ACCOUNT_CONTROLLER"] = "boom-account-controller";
    /**
     * Log activity related to config-controller
     */
    LoggingCategory["CONFIG_CONTROLLER"] = "config-controller";
    /**
     * Log activity related to boom-account-service
     */
    LoggingCategory["BOOM_ACCOUNT_SERVICE"] = "boom-account-service";
    /**
     * Log activity related to boom-card-controller
     */
    LoggingCategory["BOOM_CARD_CONTROLLER"] = "boom-card-controller";
    /**
     * Log activity related to boom-card-service
     */
    LoggingCategory["BOOM_CARD_SERVICE"] = "boom-card-service";
    /**
     * Log activity related to withdrawal-controller
     */
    LoggingCategory["WITHDRAWAL_CONTROLLER"] = "withdrawal-controller";
    /**
     * Log activity related to withdrawal-service
     */
    LoggingCategory["WITHDRAWAL_SERVICE"] = "withdrawal-service";
})(LoggingCategory = exports.LoggingCategory || (exports.LoggingCategory = {}));
//# sourceMappingURL=logging.js.map