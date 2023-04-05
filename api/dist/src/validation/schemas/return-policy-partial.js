"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTPolicySchemaObjectPartial = void 0;
const tslib_1 = require("tslib");
const _1 = require(".");
const _a = _1.PolicySchema.properties, { _id, createdAt, updatedAt } = _a, POSTPolicySchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
exports.POSTPolicySchemaObjectPartial = Object.assign(Object.assign({}, _1.PolicySchemaObject), { properties: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties), { costsImposed: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.costsImposed), { items: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.costsImposed.items), { required: [...POSTPolicySchemaPartialProperties.costsImposed.items.required] }) }), returnMethod: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.returnMethod), { items: { enum: [...POSTPolicySchemaPartialProperties.returnMethod.items.enum] } }), transactionTotalPartsToRefund: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.transactionTotalPartsToRefund), { items: {
                enum: [...POSTPolicySchemaPartialProperties.transactionTotalPartsToRefund.items.enum],
            } }), returnCosts: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.returnCosts), { items: Object.assign(Object.assign({}, POSTPolicySchemaPartialProperties.returnCosts.items), { required: [...POSTPolicySchemaPartialProperties.returnCosts.items.required] }) }) }), required: [
        'merchantID',
        'name',
        'description',
        'refundsAccepted',
        'autoApprove',
        'daysToReturn',
        'returnMethod',
        'returnCosts',
    ] });
//# sourceMappingURL=return-policy-partial.js.map