"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItem = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
/**
 * Aren't the types of each property supposed to match what is set in globals?
 */
let InventoryItem = class InventoryItem extends repository_1.Entity {
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
], InventoryItem.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date a particular inventory item was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryItem.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date a particular inventory item was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryItem.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'friendlyID',
        description: 'A unique but shorter ID to make for a better user experience',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "friendlyID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'itemID',
        description: 'A unique ID generated for each inventory item',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "itemID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'itemType',
        description: 'The type of item the new inventory item may be',
        /**
         * (i.e. an updated table that would fall under the tablet type?)
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "itemType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'itemName',
        description: 'The unique name or title of an inventory item',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "itemName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'nickname',
        description: 'A uniquie name or title of an inventory item usually created by a merchant',
        /**
         * Is this right? Admins don't create nicknames right? Just merchants?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "nickname", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: '',
        /**
         * Why is merchant here? Boom Admins create inventory items for merchants to lease/purchase...
         * would this be a list of each merchant that leases/purchases each item?
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryItem.prototype, "merchant", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: '',
        /**
         * Why is store here? Boom Admins create inventory items for merchants to lease/purchase...
         * would this be a list of each store that has each item?
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryItem.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the inventory item. Whether it is active or inactive',
        /**
         * What is inactive issued and is it ever used?
         */
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.InventoryItemStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'purchasePrice',
        description: 'The price of the inventory item',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], InventoryItem.prototype, "purchasePrice", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'inactiveReason',
        description: 'The reason behind why an item has been set to inactive',
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.InventoryItemInactiveReason),
        },
    }),
    tslib_1.__metadata("design:type", String)
], InventoryItem.prototype, "inactiveReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'count',
        description: '',
        /**
         * This field is not listed on globals. I am not sure what it does
         */
        type: 'number',
        jsonSchema: {
            minimum: 1,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], InventoryItem.prototype, "count", void 0);
InventoryItem = tslib_1.__decorate([
    repository_1.model({ name: 'inventory_items', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], InventoryItem);
exports.InventoryItem = InventoryItem;
//# sourceMappingURL=inventory-item.model.js.map