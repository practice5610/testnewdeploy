"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantTransactionType = exports.MerchantTransactionStatus = void 0;
var MerchantTransactionStatus;
(function (MerchantTransactionStatus) {
    MerchantTransactionStatus["PENDING"] = "pending";
    MerchantTransactionStatus["COMPLETED"] = "completed";
    MerchantTransactionStatus["CANCELLED"] = "cancelled";
    MerchantTransactionStatus["FAILED"] = "failed";
})(MerchantTransactionStatus = exports.MerchantTransactionStatus || (exports.MerchantTransactionStatus = {}));
var MerchantTransactionType;
(function (MerchantTransactionType) {
    MerchantTransactionType["RECURRING"] = "recurring";
    MerchantTransactionType["ONE_TIME"] = "one-time";
    MerchantTransactionType["RETURN"] = "return";
})(MerchantTransactionType = exports.MerchantTransactionType || (exports.MerchantTransactionType = {}));
//# sourceMappingURL=merchant-transaction.js.map