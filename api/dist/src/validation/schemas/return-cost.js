"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnCostSchemaObject = exports.ReturnCostSchema = void 0;
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const money_1 = require("./money");
exports.ReturnCostSchema = {
    type: 'object',
    description: 'Return fees the Merchant may charge to the Customer',
    properties: {
        name: { type: 'string', description: 'Name of return fee', minLength: 2 },
        description: { type: 'string', description: 'Explanation of return fee', minLength: 2 },
        price: money_1.MoneySchemaObject,
        type: {
            description: 'The type of return cost',
            items: { enum: [returns_1.ReturnCostType.FLAT_FEE, returns_1.ReturnCostType.SHIPPING] },
        },
    },
    required: [],
    additionalProperties: false,
};
exports.ReturnCostSchemaObject = Object.assign(Object.assign({}, exports.ReturnCostSchema), { properties: Object.assign(Object.assign({}, exports.ReturnCostSchema.properties), { type: Object.assign(Object.assign({}, exports.ReturnCostSchema.properties.type), { items: {
                enum: [...exports.ReturnCostSchema.properties.type.items.enum],
            } }) }), required: [...exports.ReturnCostSchema.required] });
//# sourceMappingURL=return-cost.js.map