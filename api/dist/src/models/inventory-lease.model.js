"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLease = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
let InventoryLease = class InventoryLease extends repository_1.Entity {
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
], InventoryLease.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date an inventory lease was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryLease.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date an inventory lease was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryLease.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'lastChargedAt',
        description: 'Date an inventory lease payment was last processed',
        /**
         * Not sure if this is accurate
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryLease.prototype, "lastChargedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'inventoryItem',
        description: 'The inventory item the inventory lease is for',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryLease.prototype, "inventoryItem", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'leaseAmount',
        description: 'The monetary value a merchant has to pay for their lease',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryLease.prototype, "leaseAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'leaseExpiration',
        description: 'Date the lease ends or expires',
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryLease.prototype, "leaseExpiration", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'fulfillmentAmount',
        description: 'Monetary value a merchant would have to pay to satisfy a lease',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryLease.prototype, "fulfillmentAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'amountPaid',
        description: 'Monetary value of how much a merchant has paid on their lease',
        /**
         * is this calculated to date?
         */
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryLease.prototype, "amountPaid", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: 'The merchant who is responsible for the lease payments',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryLease.prototype, "merchant", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        /**
         * This property is not listed on globals
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", models_1.StoreBasic)
], InventoryLease.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'fulfillmentStatus',
        description: 'The status of the inventory lease. Whether it is fulfilled, active, or cancelled',
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InventoryLease.prototype, "fulfillmentStatus", void 0);
InventoryLease = tslib_1.__decorate([
    repository_1.model({ name: 'inventory_leases', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], InventoryLease);
exports.InventoryLease = InventoryLease;
//# sourceMappingURL=inventory-lease.model.js.map