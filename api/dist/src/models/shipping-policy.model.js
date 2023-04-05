"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingPolicy = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ShippingPolicy = class ShippingPolicy extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ShippingPolicy.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingPolicy.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingPolicy.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingPolicy.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingPolicy.prototype, "merchantId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], ShippingPolicy.prototype, "flatRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingPolicy.prototype, "itemsPerFlatRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'object',
    }),
    tslib_1.__metadata("design:type", Array)
], ShippingPolicy.prototype, "freeShippingThresholds", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], ShippingPolicy.prototype, "pickUpOnly", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], ShippingPolicy.prototype, "pickUpLocations", void 0);
ShippingPolicy = tslib_1.__decorate([
    repository_1.model({ name: 'shipping_policies', settings: {} })
], ShippingPolicy);
exports.ShippingPolicy = ShippingPolicy;
//# sourceMappingURL=shipping-policy.model.js.map