export declare enum InventoryItemStatus {
    INACTIVE = "Inactive",
    INACTIVE_ISSUED = "Inactive Issued",
    ACTIVE = "Active"
}
export declare enum InventoryItemInactiveReason {
    STOLEN = "stolen",
    EXPIRED = "expired",
    MISSING = "missing",
    DEFECTIVE = "defective"
}
export declare enum InventoryOrderStatus {
    PENDING = "pending",
    SHIPPED = "shipped",
    CLOSED = "closed",
    CANCELLED = "cancelled"
}
export declare enum InventoryOrderBillingType {
    RECURRING = "recurring",
    ONE_TIME = "one-time"
}
export declare enum InventoryOrderType {
    PURCHASE = "purchase",
    RETURN_OTHER = "return-other",
    RETURN_DEFECTIVE = "return-defective",
    CANCEL = "cancel"
}
export declare enum FulfillmentStatus {
    FULFILLED = "fulfilled",
    ACTIVE = "active",
    CANCELLED = "cancelled"
}
