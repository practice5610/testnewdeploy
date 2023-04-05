"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchemaObject = exports.ProductSchema = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const base_1 = require("./base");
const category_1 = require("./category");
const money_1 = require("./money");
const store_1 = require("./store");
const _a = category_1.CategorySchema.properties, { _id, createdAt, updatedAt } = _a, CategorySchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
const CategorySchemaObjectPartial = Object.assign(Object.assign({}, category_1.CategorySchemaObject), { properties: Object.assign({}, CategorySchemaPartialProperties), 
    //required: ['name', 'commissionRate', 'subCategories'], // TODO: Review if we need subCategories and commissionRate
    required: [...category_1.CategorySchema.required, 'name'] });
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.ProductSchema = {
    type: 'object',
    description: 'Product',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { 
        //objectID: { type: 'string' }, // Check StoreSchema - Removed on Globals
        imageUrl: { type: 'string', minLength: 2 }, category: CategorySchemaObjectPartial, name: { type: 'string', minLength: 2 }, description: { type: 'string', minLength: 2 }, store: Object.assign(Object.assign({}, store_1.StoreSchemaObject), { required: [
                ...store_1.StoreSchema.required,
                '_id',
                'name',
                'street1',
                'city',
                'state',
                'zip',
                'country',
                //'phoneNumber',
                //'emails',
                'companyName',
                //'companyType',
                //'companyDescription',
                //'fein',
                //'years',
                '_geoloc',
                'merchant',
            ] }), price: money_1.MoneySchemaObject, attributes: { type: 'object' }, _tags: {
            type: 'array',
            items: {
                type: 'string',
            },
        }, merchantUID: { type: 'string', minLength: 2 }, packageDetails: { type: 'object' }, shippingPolicy: { type: 'string', minLength: 2 }, status: { enum: [globals_1.ProductStatus.APPROVED, globals_1.ProductStatus.DECLINED, globals_1.ProductStatus.PENDING] }, quantity: { type: 'integer' } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.ProductSchemaObject = Object.assign(Object.assign({}, exports.ProductSchema), { properties: Object.assign(Object.assign({}, exports.ProductSchema.properties), { status: Object.assign(Object.assign({}, exports.ProductSchema.properties.status), { enum: [...exports.ProductSchema.properties.status.enum] }), store: Object.assign(Object.assign({}, exports.ProductSchema.properties.store), { required: [...exports.ProductSchema.properties.store.required] }) }), required: [...exports.ProductSchema.required] });
//# sourceMappingURL=product.js.map