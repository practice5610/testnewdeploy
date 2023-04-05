"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHReturnRequestSchemaObjectPartial = exports.POSTReturnRequestSchemaObjectPartial = void 0;
const tslib_1 = require("tslib");
const _1 = require(".");
const _a = _1.ReturnRequestSchema.properties, { _id, createdAt, updatedAt } = _a, POSTReturnRequestSchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
exports.POSTReturnRequestSchemaObjectPartial = Object.assign(Object.assign({}, _1.ReturnRequestSchemaObject), { properties: Object.assign(Object.assign({}, POSTReturnRequestSchemaPartialProperties), { refundStatus: Object.assign(Object.assign({}, POSTReturnRequestSchemaPartialProperties.refundStatus), { items: {
                enum: [...POSTReturnRequestSchemaPartialProperties.refundStatus.items.enum],
            } }), returnStatus: Object.assign(Object.assign({}, POSTReturnRequestSchemaPartialProperties.returnStatus), { items: {
                enum: [...POSTReturnRequestSchemaPartialProperties.returnStatus.items.enum],
            } }), returnReason: Object.assign(Object.assign({}, POSTReturnRequestSchemaPartialProperties.returnReason), { items: {
                enum: [...POSTReturnRequestSchemaPartialProperties.returnReason.items.enum],
            } }), returnMethod: Object.assign(Object.assign({}, POSTReturnRequestSchemaPartialProperties.returnMethod), { items: {
                enum: [...POSTReturnRequestSchemaPartialProperties.returnMethod.items.enum],
            } }) }), required: [
        'customerID',
        'merchantID',
        'merchantPolicyID',
        'returnReason',
        'returnMethod',
        'purchaseTransactionID',
    ] });
const _b = _1.ReturnRequestSchema.properties, { customerID, merchantID, merchantPolicyID, returnReason, returnMethod, purchaseTransactionID, customReason, returnTransactionID, comment, refundAmount } = _b, PATCHReturnRequestSchemaPartialProperties = tslib_1.__rest(_b, ["customerID", "merchantID", "merchantPolicyID", "returnReason", "returnMethod", "purchaseTransactionID", "customReason", "returnTransactionID", "comment", "refundAmount"]);
exports.PATCHReturnRequestSchemaObjectPartial = Object.assign(Object.assign({}, _1.ReturnRequestSchemaObject), { properties: Object.assign(Object.assign({}, PATCHReturnRequestSchemaPartialProperties), { refundStatus: Object.assign(Object.assign({}, PATCHReturnRequestSchemaPartialProperties.refundStatus), { items: {
                enum: [...PATCHReturnRequestSchemaPartialProperties.refundStatus.items.enum],
            } }), returnStatus: Object.assign(Object.assign({}, PATCHReturnRequestSchemaPartialProperties.returnStatus), { items: {
                enum: [...PATCHReturnRequestSchemaPartialProperties.returnStatus.items.enum],
            } }) }), required: ['returnStatus'] });
//# sourceMappingURL=return-request-partial.js.map