"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneySchemaObject = exports.MoneySchema = void 0;
exports.MoneySchema = {
    type: 'object',
    description: 'Money',
    properties: {
        amount: { type: 'integer' },
        precision: { type: 'integer' },
        currency: { type: 'string' },
        symbol: { type: 'string' },
    },
    required: ['amount', 'precision', 'currency'],
    additionalProperties: false,
};
exports.MoneySchemaObject = Object.assign(Object.assign({}, exports.MoneySchema), { properties: Object.assign({}, exports.MoneySchema.properties), required: [...exports.MoneySchema.required] });
//# sourceMappingURL=money.js.map