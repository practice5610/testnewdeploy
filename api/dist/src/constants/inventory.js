"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FulfillmentStatus = exports.InventoryOrderType = exports.InventoryOrderBillingType = exports.InventoryOrderStatus = exports.InventoryItemInactiveReason = exports.InventoryItemStatus = void 0;
var InventoryItemStatus;
(function (InventoryItemStatus) {
    InventoryItemStatus["INACTIVE"] = "Inactive";
    InventoryItemStatus["INACTIVE_ISSUED"] = "Inactive Issued";
    InventoryItemStatus["ACTIVE"] = "Active";
})(InventoryItemStatus = exports.InventoryItemStatus || (exports.InventoryItemStatus = {}));
var InventoryItemInactiveReason;
(function (InventoryItemInactiveReason) {
    InventoryItemInactiveReason["STOLEN"] = "stolen";
    InventoryItemInactiveReason["EXPIRED"] = "expired";
    InventoryItemInactiveReason["MISSING"] = "missing";
    InventoryItemInactiveReason["DEFECTIVE"] = "defective";
})(InventoryItemInactiveReason = exports.InventoryItemInactiveReason || (exports.InventoryItemInactiveReason = {}));
var InventoryOrderStatus;
(function (InventoryOrderStatus) {
    InventoryOrderStatus["PENDING"] = "pending";
    InventoryOrderStatus["SHIPPED"] = "shipped";
    InventoryOrderStatus["CLOSED"] = "closed";
    InventoryOrderStatus["CANCELLED"] = "cancelled";
})(InventoryOrderStatus = exports.InventoryOrderStatus || (exports.InventoryOrderStatus = {}));
var InventoryOrderBillingType;
(function (InventoryOrderBillingType) {
    InventoryOrderBillingType["RECURRING"] = "recurring";
    InventoryOrderBillingType["ONE_TIME"] = "one-time";
})(InventoryOrderBillingType = exports.InventoryOrderBillingType || (exports.InventoryOrderBillingType = {}));
var InventoryOrderType;
(function (InventoryOrderType) {
    InventoryOrderType["PURCHASE"] = "purchase";
    InventoryOrderType["RETURN_OTHER"] = "return-other";
    InventoryOrderType["RETURN_DEFECTIVE"] = "return-defective";
    InventoryOrderType["CANCEL"] = "cancel";
})(InventoryOrderType = exports.InventoryOrderType || (exports.InventoryOrderType = {}));
var FulfillmentStatus;
(function (FulfillmentStatus) {
    FulfillmentStatus["FULFILLED"] = "fulfilled";
    FulfillmentStatus["ACTIVE"] = "active";
    FulfillmentStatus["CANCELLED"] = "cancelled";
})(FulfillmentStatus = exports.FulfillmentStatus || (exports.FulfillmentStatus = {}));
//# sourceMappingURL=inventory.js.map