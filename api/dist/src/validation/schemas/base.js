"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSchemaObject = exports.BaseSchema = void 0;
exports.BaseSchema = {
    type: 'object',
    description: 'Base',
    properties: {
        _id: { type: 'string', minLength: 2 },
        createdAt: { type: 'integer' },
        updatedAt: { type: 'integer' },
    },
    required: [],
    additionalProperties: false,
};
exports.BaseSchemaObject = Object.assign(Object.assign({}, exports.BaseSchema), { properties: Object.assign({}, exports.BaseSchema.properties), required: [...exports.BaseSchema.required] });
//# sourceMappingURL=base.js.map