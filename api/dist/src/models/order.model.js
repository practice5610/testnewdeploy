"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const moment_1 = tslib_1.__importDefault(require("moment"));
let Order = class Order extends repository_1.Entity {
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
], Order.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createAt',
        description: 'Instance creation date in Unix Epoch Time',
        type: 'number',
        default: moment_1.default().utc().unix(),
    }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date an order was updated',
        type: 'number',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'orderGroups',
        description: 'Bookings group by shipping parcel',
        type: 'array',
        itemType: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "orderGroups", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'shipToAddressId',
        description: 'Delivery shipping address ID selected by user.',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Order.prototype, "shipToAddress", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'customerUID',
        description: 'Customer ID who order belong to.',
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "customerUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'transactions',
        description: 'Transactions list, generated from this order.',
        type: 'array',
        itemType: 'object',
    }),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "transactions", void 0);
Order = tslib_1.__decorate([
    repository_1.model({ name: 'orders', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Order);
exports.Order = Order;
//# sourceMappingURL=order.model.js.map