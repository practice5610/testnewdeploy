"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicySchemaObject = exports.PolicySchema = void 0;
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const base_1 = require("./base");
const extra_cost_1 = require("./extra-cost");
const profile_1 = require("./profile");
const return_cost_1 = require("./return-cost");
exports.PolicySchema = {
    type: 'object',
    description: "Merchant's Return Policy",
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { merchantID: profile_1.ProfileSchema.properties.uid, name: { type: 'string', description: 'Name of Return Policy', minLength: 2 }, description: { type: 'string', description: 'Description of the Return Policy', minLength: 2 }, refundsAccepted: { type: 'boolean', description: 'Merchant accepts refund request' }, autoApprove: {
            type: 'boolean',
            description: 'Merchant accepts all return requests with this policy',
        }, costsImposed: {
            type: 'array',
            description: 'All extra costs the customer may incurr for return',
            items: Object.assign(Object.assign({}, extra_cost_1.ExtraCostSchemaObject), { required: ['name', 'description', 'price'] }),
        }, daysToReturn: { type: 'integer', description: 'How many days an item is eligible for return' }, returnMethod: {
            description: 'Methods a customer can take to retun an item',
            items: { enum: [returns_1.ReturnMethod.DROP_OFF, returns_1.ReturnMethod.NO_RETURN, returns_1.ReturnMethod.SHIP] },
        }, dropOffAddress: { type: 'array', items: { type: 'string' } }, transactionTotalPartsToRefund: {
            type: 'array',
            description: 'Parts of the transaction to be refunded to the customer',
            items: {
                enum: [
                    returns_1.TransactionTotalParts.BOOM_FEE,
                    returns_1.TransactionTotalParts.NET_PRODUCT_COST,
                    returns_1.TransactionTotalParts.SHIPPING,
                    returns_1.TransactionTotalParts.TAX,
                ],
            },
        }, returnCosts: {
            type: 'array',
            description: 'Costs customer incurrs for return',
            items: Object.assign(Object.assign({}, return_cost_1.ReturnCostSchemaObject), { required: ['name', 'description', 'price', 'type'] }),
        } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.PolicySchemaObject = Object.assign(Object.assign({}, exports.PolicySchema), { properties: Object.assign(Object.assign({}, exports.PolicySchema.properties), { costsImposed: Object.assign(Object.assign({}, exports.PolicySchema.properties.costsImposed), { items: Object.assign(Object.assign({}, extra_cost_1.ExtraCostSchemaObject), { required: [...exports.PolicySchema.properties.costsImposed.items.required] }) }), returnMethod: Object.assign(Object.assign({}, exports.PolicySchema.properties.returnMethod), { items: { enum: [...exports.PolicySchema.properties.returnMethod.items.enum] } }), transactionTotalPartsToRefund: Object.assign(Object.assign({}, exports.PolicySchema.properties.transactionTotalPartsToRefund), { items: { enum: [...exports.PolicySchema.properties.transactionTotalPartsToRefund.items.enum] } }), returnCosts: Object.assign(Object.assign({}, exports.PolicySchema.properties.returnCosts), { items: Object.assign(Object.assign({}, return_cost_1.ReturnCostSchemaObject), { required: [...exports.PolicySchema.properties.returnCosts.items.required] }) }) }), required: [...exports.PolicySchema.required] });
//# sourceMappingURL=return-policy.js.map