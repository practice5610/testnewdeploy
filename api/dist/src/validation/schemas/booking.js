"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSchemaObject = exports.BookingSchema = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const base_1 = require("./base");
const offer_1 = require("./offer");
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
const OfferSchemaPartialProperties = tslib_1.__rest(offer_1.OfferSchema.properties, []);
const OfferSchemaObjectPartial = Object.assign(Object.assign({}, offer_1.OfferSchemaObject), { properties: Object.assign(Object.assign({}, OfferSchemaPartialProperties), { product: Object.assign({}, offer_1.OfferSchema.properties.product) }), required: [
        ...offer_1.OfferSchema.required,
        '_id',
        'cashBackPerVisit',
        'conditions',
        'description',
        'maxQuantity',
        'maxVisits',
        'merchantUID',
        'startDate',
        'title',
        'product',
        'expiration',
    ] });
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.BookingSchema = {
    type: 'object',
    description: 'Booking',
    properties: Object.assign(Object.assign({}, base_1.BaseSchemaObject.properties), { type: {
            enum: [globals_1.BookingTypes.OFFER, globals_1.BookingTypes.PRODUCT],
        }, item: {
            type: 'object',
            oneOf: [
                // TODO: This one needs to be used carefully, if any of the fields set fails, all the items on the schema are reported as wrong ones
                ProductSchemaObjectPartial,
                OfferSchemaObjectPartial,
            ],
        }, quantity: { type: 'integer' }, status: {
            enum: [globals_1.BookingStatus.ACTIVE, globals_1.BookingStatus.CANCELLED, globals_1.BookingStatus.USED],
        }, memberUID: { type: 'string', description: "Merchant's id" }, visits: { type: 'integer' } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.BookingSchemaObject = Object.assign(Object.assign({}, exports.BookingSchema), { properties: Object.assign(Object.assign({}, exports.BookingSchema.properties), { type: { enum: [...exports.BookingSchema.properties.type.enum] }, item: Object.assign(Object.assign({}, exports.BookingSchema.properties.item), { oneOf: [
                Object.assign({}, ProductSchemaObjectPartial),
                Object.assign({}, OfferSchemaObjectPartial),
            ] }), status: { enum: [...exports.BookingSchema.properties.status.enum] } }), required: [...exports.BookingSchema.required] });
//# sourceMappingURL=booking.js.map