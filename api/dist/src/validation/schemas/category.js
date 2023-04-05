"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchemaObject = exports.CategorySchema = void 0;
const base_1 = require("./base");
/**
 * When using this schema take into account that it contains _id, createdAt, updatedAt
 */
exports.CategorySchema = {
    type: 'object',
    description: 'Category',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { name: { type: 'string', minLength: 2 }, commissionRate: { type: 'integer' }, subCategories: {
            type: 'array',
            items: {
                type: 'string',
                minLength: 2,
            },
        } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.CategorySchemaObject = Object.assign(Object.assign({}, exports.CategorySchema), { properties: Object.assign({}, exports.CategorySchema.properties), required: [...exports.CategorySchema.required] });
//# sourceMappingURL=category.js.map