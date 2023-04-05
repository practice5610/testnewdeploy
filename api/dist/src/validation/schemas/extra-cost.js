"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraCostSchemaObject = exports.ExtraCostSchema = void 0;
const money_1 = require("./money");
exports.ExtraCostSchema = {
    type: 'object',
    description: 'Extra return fees the Merchant may charge to the Customer',
    properties: {
        name: { type: 'string', description: 'Name of return fee', minLength: 2 },
        description: { type: 'string', description: 'Explanation of return fee', minLength: 2 },
        price: money_1.MoneySchemaObject,
    },
    required: [],
    additionalProperties: false,
};
exports.ExtraCostSchemaObject = Object.assign(Object.assign({}, exports.ExtraCostSchema), { properties: Object.assign({}, exports.ExtraCostSchema.properties), required: [...exports.ExtraCostSchema.required] });
//# sourceMappingURL=extra-cost.js.map