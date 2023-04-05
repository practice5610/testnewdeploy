"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchemaObject = exports.ProfileSchema = void 0;
const globals_1 = require("@boom-platform/globals");
const addressInfo_1 = require("./addressInfo");
const contactInfo_1 = require("./contactInfo");
const money_1 = require("./money");
const profileImage_1 = require("./profileImage");
exports.ProfileSchema = {
    type: 'object',
    description: "BoomUser's Profile",
    properties: {
        uid: { type: 'string', description: "BoomUser's id" },
        firstName: { type: 'string', description: "BoomUser's First Name", minLength: 2 },
        lastName: { type: 'string', description: "BoomUser's Last Name", minLength: 2 },
        contact: contactInfo_1.ContactInfoSchemaObject,
        addresses: {
            type: 'array',
            description: 'All Addresses that belong to this BoomUser',
            items: Object.assign(Object.assign({}, addressInfo_1.AddressInfoSchemaObject), { required: ['name', 'street1', 'city', 'state', 'zip'] }),
        },
        createdAt: {
            type: 'integer',
            description: "Unix time when this BoomUser's profile was created",
        },
        updatedAt: {
            type: 'integer',
            description: "Last unix time when this BoomUser's profile was modified",
        },
        gender: { description: "BoomUser's gender", enum: [globals_1.Gender.MALE, globals_1.Gender.FEMALE, globals_1.Gender.NONE] },
        registrationStep: { type: 'integer', description: "BoomUser's registration step" },
        finishedRegistration: { type: 'boolean', description: 'BoomUser is registered ' },
        roles: {
            type: 'array',
            description: "BoomUser's roles",
            items: {
                enum: [globals_1.RoleKey.Admin, globals_1.RoleKey.All, globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin],
            },
        },
        cards: {
            //TODO: enable null or undefined
            type: 'array',
            description: "BoomUser's cards",
            items: {
                type: 'string',
            },
            nullable: true,
        },
        hasCards: { type: 'boolean' },
        store: { type: 'object', description: "BoomUser's store" },
        profileImg: profileImage_1.ProfileImageSchemaObject,
        enableNotification: { type: 'boolean', description: 'BoomUser allows notifications' },
        notificationSound: { type: 'boolean', description: 'BoomUser allows notifications sound' },
        notificationVibration: {
            type: 'boolean',
            description: 'BoomUser allows notifications vibrations',
        },
        fcmToken: { type: 'string' },
        range: { type: 'integer' },
        grossEarningsPendingWithdrawal: money_1.MoneySchemaObject,
        netEarningsPendingWithdrawal: money_1.MoneySchemaObject,
        tempPassword: { type: 'string' },
        password: { type: 'string' },
        plaidInfo: {
            type: 'array',
            items: {
                type: 'object',
            },
        },
        taxableNexus: {
            type: 'array',
            items: {
                type: 'object',
            },
        },
        boomAccounts: {
            type: 'array',
            items: {
                type: 'string',
            },
        },
        forceUpdate: { type: 'boolean' },
    },
    //required: ['uid', 'contact', 'addresses', 'createdAt', 'updatedAt'], // old default ones
    required: [],
    additionalProperties: true,
};
exports.ProfileSchemaObject = Object.assign(Object.assign({}, exports.ProfileSchema), { properties: Object.assign(Object.assign({}, exports.ProfileSchema.properties), { addresses: Object.assign(Object.assign({}, exports.ProfileSchema.properties.addresses), { items: Object.assign(Object.assign({}, exports.ProfileSchema.properties.addresses.items), { required: [...exports.ProfileSchema.properties.addresses.items.required] }) }), gender: Object.assign(Object.assign({}, exports.ProfileSchema.properties.gender), { enum: [...exports.ProfileSchema.properties.gender.enum] }), roles: Object.assign(Object.assign({}, exports.ProfileSchema.properties.roles), { items: { enum: [...exports.ProfileSchema.properties.roles.items.enum] } }) }), 
    //required: [...ProfileSchema.required, 'uid', 'createdAt', 'updatedAt', 'roles'], // These defaults are always set (also available on api\src\services\profile.service.ts)
    required: [...exports.ProfileSchema.required] });
//# sourceMappingURL=profile.js.map