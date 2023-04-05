"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSchemaObject = exports.StoreSchema = exports.StoreBasicSchemaObject = exports.StoreBasicSchema = void 0;
const globals_1 = require("@boom-platform/globals");
const addressInfo_1 = require("./addressInfo");
const base_1 = require("./base");
const contactInfo_1 = require("./contactInfo");
const geolocation_1 = require("./geolocation");
const profile_1 = require("./profile");
exports.StoreBasicSchema = {
    type: 'object',
    description: 'Store Basic',
    properties: Object.assign(Object.assign(Object.assign(Object.assign({}, base_1.BaseSchemaObject.properties), addressInfo_1.AddressInfoSchemaObject.properties), contactInfo_1.ContactInfoSchemaObject.properties), { companyName: { type: 'string', minLength: 2 } }),
    required: [...addressInfo_1.AddressInfoSchema.required, ...contactInfo_1.ContactInfoSchema.required],
    additionalProperties: false,
};
exports.StoreBasicSchemaObject = Object.assign(Object.assign({}, exports.StoreBasicSchema), { properties: Object.assign({}, exports.StoreBasicSchema.properties), required: [...exports.StoreBasicSchema.required] });
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.StoreSchema = {
    type: 'object',
    description: 'Store',
    properties: Object.assign(Object.assign({}, exports.StoreBasicSchemaObject.properties), { pin: { type: 'integer' }, 
        //objectID: { type: 'string' }, // Check ProductSchema - Removed on Globals
        companyLogoUrl: { type: 'string', minLength: 2 }, coverImageUrl: { type: 'string', minLength: 2 }, companyType: { type: 'string', minLength: 2 }, companyDescription: { type: 'string', minLength: 2 }, fein: { type: 'integer' }, years: { type: 'integer' }, storeType: {
            enum: [globals_1.StoreTypes.BRICK_AND_MORTAR, globals_1.StoreTypes.ONLINE, globals_1.StoreTypes.BOTH],
        }, links: {
            type: 'array',
            items: {
                type: 'string',
            },
        }, _tags: {
            type: 'array',
            items: {
                type: 'string',
            },
        }, _geoloc: geolocation_1.GeolocationSchemaObject, openingTime: { type: 'integer' }, closingTime: { type: 'integer' }, days: {
            type: 'array',
            items: {
                type: 'string',
            },
        }, merchant: Object.assign(Object.assign({}, profile_1.ProfileSchemaObject), { required: ['uid', 'firstName', 'lastName'] }) }),
    required: [...exports.StoreBasicSchema.required],
    additionalProperties: false,
};
exports.StoreSchemaObject = Object.assign(Object.assign({}, exports.StoreSchema), { properties: Object.assign(Object.assign({}, exports.StoreSchema.properties), { storeType: { enum: [...exports.StoreSchema.properties.storeType.enum] }, merchant: Object.assign(Object.assign({}, exports.StoreSchema.properties.merchant), { required: [...exports.StoreSchema.properties.merchant.required] }) }), required: [...exports.StoreSchema.required] });
//# sourceMappingURL=store.js.map