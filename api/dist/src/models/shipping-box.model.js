"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingBox = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let ShippingBox = class ShippingBox extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Mongodb ObjectID of the ShippingBox',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ShippingBox.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'utc unix time record was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingBox.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'utc unix time record was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingBox.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantId',
        description: 'uid of the user who created this ShippingBox',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingBox.prototype, "merchantId", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'Name of this box set by the user',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingBox.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'unit',
        description: 'Unit that the box dimensions are measured in',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], ShippingBox.prototype, "unit", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'length',
        description: 'length of box in units',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingBox.prototype, "length", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'width',
        description: 'width of box in units',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingBox.prototype, "width", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'height',
        description: 'height of box in units',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ShippingBox.prototype, "height", void 0);
ShippingBox = tslib_1.__decorate([
    repository_1.model({ name: 'shipping_boxes', settings: {} })
], ShippingBox);
exports.ShippingBox = ShippingBox;
//# sourceMappingURL=shipping-box.model.js.map