"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const product_model_1 = require("./product.model");
let Offer = class Offer extends repository_1.Entity {
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
], Offer.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date an offer is created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date an offer is updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'cashBackPerVisit',
        description: 'The amount of cash back a customer receives each time they visit/use an offer',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Offer.prototype, "cashBackPerVisit", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'conditions',
        description: 'Conditions that can be added by the merchant (i.e. no refunds)',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Offer.prototype, "conditions", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'description',
        description: 'The desceiption of an offer explaining any specific details a merchant can offer to the customer',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Offer.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'maxQuantity',
        description: 'The max amount of times a customer can select a specific offer',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "maxQuantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'maxVisits',
        description: 'The max number visits a customer can use the offer they selected',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "maxVisits", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantUID',
        description: 'The unique ID for a merchant',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Offer.prototype, "merchantUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'startDate',
        description: 'The day an offer starts and is available to customers',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "startDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'title',
        description: 'The title of an offer',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Offer.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'product',
        description: 'The product the offer correlates to',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", product_model_1.Product)
], Offer.prototype, "product", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'expiration',
        description: 'The date an offer expires and is no longer available to customers',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Offer.prototype, "expiration", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnPolicy',
        description: '_id of return policy',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Offer.prototype, "returnPolicy", void 0);
Offer = tslib_1.__decorate([
    repository_1.model({ name: 'offers', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Offer);
exports.Offer = Offer;
//# sourceMappingURL=offer.model.js.map