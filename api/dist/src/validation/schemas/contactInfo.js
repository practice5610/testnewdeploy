"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactInfoSchemaObject = exports.ContactInfoSchema = void 0;
const globals_1 = require("@boom-platform/globals");
exports.ContactInfoSchema = {
    type: 'object',
    description: 'ContactInfo',
    properties: {
        phoneNumber: { type: 'string', minLength: 10 },
        emails: {
            type: 'array',
            items: {
                type: 'string',
                pattern: globals_1.EmailRegex.source,
            },
        },
    },
    required: [],
    additionalProperties: false,
};
exports.ContactInfoSchemaObject = Object.assign(Object.assign({}, exports.ContactInfoSchema), { properties: Object.assign({}, exports.ContactInfoSchema.properties), required: [...exports.ContactInfoSchema.required] });
//# sourceMappingURL=contactInfo.js.map