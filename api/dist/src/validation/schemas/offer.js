"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferSchemaObject = exports.OfferSchema = void 0;
const tslib_1 = require("tslib");
const base_1 = require("./base");
const money_1 = require("./money");
const product_1 = require("./product");
//const { createdAt, updatedAt, ...ProductSchemaPartialProperties } = ProductSchema.properties; //TODO: Review if we need to send these values
const ProductSchemaPartialProperties = tslib_1.__rest(product_1.ProductSchema.properties, []);
const ProductSchemaObjectPartial = Object.assign(Object.assign({}, product_1.ProductSchemaObject), { properties: Object.assign(Object.assign({}, ProductSchemaPartialProperties), { status: Object.assign(Object.assign({}, product_1.ProductSchema.properties.status), { enum: [...product_1.ProductSchema.properties.status.enum] }), store: Object.assign(Object.assign({}, product_1.ProductSchema.properties.store), { required: [...product_1.ProductSchema.properties.store.required] }) }), required: [
        ...product_1.ProductSchema.required,
        '_id',
        'merchantUID',
        'category',
        'name',
        'description',
        'store',
        'price',
        'attributes',
        '_tags',
        'objectID',
        'packageDetails',
        'shippingPolicy',
        'status',
    ] });
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.OfferSchema = {
    type: 'object',
    description: 'Offer',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { cashBackPerVisit: money_1.MoneySchemaObject, conditions: {
            type: 'array',
            items: {
                type: 'string',
            },
        }, description: { type: 'string', minLength: 2 }, maxQuantity: { type: 'integer' }, maxVisits: { type: 'integer' }, merchantUID: { type: 'string', minLength: 2 }, startDate: { type: 'integer' }, title: { type: 'string', minLength: 2 }, product: ProductSchemaObjectPartial, expiration: { type: 'integer' } }),
    required: [],
    additionalProperties: false,
};
exports.OfferSchemaObject = Object.assign(Object.assign({}, exports.OfferSchema), { properties: Object.assign(Object.assign({}, exports.OfferSchema.properties), { product: Object.assign({}, exports.OfferSchema.properties.product) }), required: [...exports.OfferSchema.required] });
//# sourceMappingURL=offer.js.map