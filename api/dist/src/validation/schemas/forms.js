"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserSchemaObject = exports.VerifyPhoneNumberSchemaObject = void 0;
const globals_1 = require("@boom-platform/globals");
const contactInfo_1 = require("./contactInfo");
const profile_1 = require("./profile");
exports.VerifyPhoneNumberSchemaObject = {
    type: 'object',
    description: "BoomUser's Profile",
    properties: {
        firstName: profile_1.ProfileSchema.properties.firstName,
        lastName: profile_1.ProfileSchema.properties.lastName,
        phone: contactInfo_1.ContactInfoSchema.properties.phoneNumber,
    },
    required: ['firstName', 'lastName', 'phone'],
    additionalProperties: false,
};
exports.CreateUserSchemaObject = {
    type: 'object',
    description: "BoomUser's Profile",
    properties: {
        email: Object.assign(Object.assign({}, contactInfo_1.ContactInfoSchema.properties.emails.items), { description: 'Email for this BoomUser' }),
        password: { type: 'string', minLength: 6, description: 'Password for this BoomUser' },
        roles: {
            type: 'array',
            items: { enum: [globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin] },
            description: 'Roles for this BoomUser',
        },
    },
    required: ['email', 'password', 'roles'],
    additionalProperties: false,
};
//# sourceMappingURL=forms.js.map