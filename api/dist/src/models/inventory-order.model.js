"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOrder = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
let InventoryOrder = class InventoryOrder extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], InventoryOrder.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date the inventory order is made',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryOrder.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date the inventory order is updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryOrder.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'item',
        description: 'The inventory item that is being ordered in the inventory order',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", models_1.InventoryItem)
], InventoryOrder.prototype, "item", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the inventory order. Whether it is pending, shipped, closed, or cancelled',
        /**
         * Should there also be a delivered status? Or complete? Something to show the order was successful
         */
        type: 'string',
        jsonSchema: {
            enum: Object.values(constants_1.InventoryOrderStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], InventoryOrder.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'billingType',
        description: 'The way the billing is handled for the inventory order. Whether it will be a recurring billing type or a one-time payment',
        type: 'string',
        jsonSchema: {
            enum: Object.values(constants_1.InventoryOrderBillingType),
        },
    }),
    tslib_1.__metadata("design:type", String)
], InventoryOrder.prototype, "billingType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'orderType',
        description: 'The type of inventory order being placed. Whether it is a purchase, return, or cancelled order. For return orders, there is the return-defective option for orders that are returned due to the items being defective and the return-other category for all other returns',
        type: 'string',
        jsonSchema: {
            enum: Object.values(constants_1.InventoryOrderType),
        },
    }),
    tslib_1.__metadata("design:type", String)
], InventoryOrder.prototype, "orderType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'amount',
        description: 'The cost of the inventory order',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryOrder.prototype, "amount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: 'The merchant that is placing the inventory order',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryOrder.prototype, "merchant", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: 'The store in which the inventory order is being delivered to',
        /**
         * Is this correct?
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryOrder.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'notes',
        description: 'Any miscellaneous information regarding the order that the Boom Admin feels is worth noting',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryOrder.prototype, "notes", void 0);
InventoryOrder = tslib_1.__decorate([
    repository_1.model({ name: 'inventory_orders', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], InventoryOrder);
exports.InventoryOrder = InventoryOrder;
//# sourceMappingURL=inventory-order.model.js.map