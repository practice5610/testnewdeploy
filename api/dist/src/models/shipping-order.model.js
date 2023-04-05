"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingOrder = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let ShippingOrder = class ShippingOrder extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Mongodb ObjectID of the ShippingOrder',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'utc unix time record was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingOrder.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'utc unix time record was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingOrder.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'shippo_id',
        description: 'object id of a Shippo Transaction',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "shippo_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'trackingNumber',
        description: 'tracking number for the shipment',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "trackingNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'trackingLink',
        description: 'url to track the shipment',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "trackingLink", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'price',
        description: 'Price paid for shipping',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], ShippingOrder.prototype, "price", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'purchaser',
        description: 'uid of user who paid the shipping cost',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "purchaser", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'status of this Shipping order. paid, refund pending, or refunded',
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.ShippingOrderStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ShippingOrder.prototype, "status", void 0);
ShippingOrder = tslib_1.__decorate([
    repository_1.model({ name: 'shipping_orders', settings: {} })
], ShippingOrder);
exports.ShippingOrder = ShippingOrder;
//# sourceMappingURL=shipping-order.model.js.map