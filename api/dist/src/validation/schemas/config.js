"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSchemaObject = exports.ConfigSchema = void 0;
const globals_1 = require("@boom-platform/globals");
const base_1 = require("./base");
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.ConfigSchema = {
    type: 'object',
    description: 'Config',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { type: {
            enum: [globals_1.AdminConfigType.DEFAULT_PROCESSING_RATE, globals_1.AdminConfigType.INVENTORY_TYPES],
        }, label: { type: 'string' }, value: { type: 'object' } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.ConfigSchemaObject = Object.assign(Object.assign({}, exports.ConfigSchema), { properties: Object.assign(Object.assign({}, exports.ConfigSchema.properties), { type: { enum: [...exports.ConfigSchema.properties.type.enum] } }), required: [...exports.ConfigSchema.required] });
//# sourceMappingURL=config.js.map