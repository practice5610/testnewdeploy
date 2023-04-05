"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRequestSchemaObject = exports.ReturnRequestSchema = void 0;
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const base_1 = require("./base");
const money_1 = require("./money");
const profile_1 = require("./profile");
exports.ReturnRequestSchema = {
    type: 'object',
    description: 'Return Request submitted by customer',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { customerID: profile_1.ProfileSchema.properties.uid, merchantID: profile_1.ProfileSchema.properties.uid, refundStatus: {
            description: 'Status of refund',
            items: {
                enum: [
                    returns_1.Status.APPROVED,
                    returns_1.Status.COMPLETE,
                    returns_1.Status.DENIED,
                    returns_1.Status.DISPUTED,
                    returns_1.Status.EXPIRED,
                    returns_1.Status.PROCESSING,
                    returns_1.Status.REQUESTED,
                ],
            },
        }, returnStatus: {
            description: 'Status of return',
            items: {
                enum: [
                    returns_1.Status.APPROVED,
                    returns_1.Status.COMPLETE,
                    returns_1.Status.DENIED,
                    returns_1.Status.DISPUTED,
                    returns_1.Status.EXPIRED,
                    returns_1.Status.PROCESSING,
                    returns_1.Status.REQUESTED,
                ],
            },
        }, merchantPolicyID: { type: 'string', description: 'Unique return policy ID', minLength: 2 }, returnReason: {
            type: 'array',
            description: 'Reason for return',
            items: {
                enum: [
                    returns_1.ReturnReason.BETTER_PRICE,
                    returns_1.ReturnReason.DAMAGED_PRODUCT,
                    returns_1.ReturnReason.DAMAGED_PRODUCT_AND_BOX,
                    returns_1.ReturnReason.DEFECTIVE_ITEM,
                    returns_1.ReturnReason.DID_NOT_APPROVE,
                    returns_1.ReturnReason.EXTRA_ITEM,
                    returns_1.ReturnReason.INACCURATE_DESCRIPTIONS,
                    returns_1.ReturnReason.LATE_ARRIVAL,
                    returns_1.ReturnReason.MISSING_OR_BROKEN_PARTS,
                    returns_1.ReturnReason.MISTAKE_PURCHASE,
                    returns_1.ReturnReason.NO_LONGER_NEEDED,
                    returns_1.ReturnReason.WRONG_ITEM,
                ],
            },
        }, customReason: { type: 'string', description: 'Custom reason for return', minLength: 2 }, returnMethod: {
            description: 'Methods a customer can take to return an item',
            items: { enum: [returns_1.ReturnMethod.DROP_OFF, returns_1.ReturnMethod.NO_RETURN, returns_1.ReturnMethod.SHIP] },
        }, purchaseTransactionID: {
            type: 'string',
            description: 'Unique ID of original purchase transaction',
            minLength: 2,
        }, refundAmount: money_1.MoneySchemaObject, returnTransactionID: { type: 'string', description: 'Unique ID of return transaction' }, comment: {
            type: 'string',
            description: 'Comments a customer may leave for the merchant regarding the return or item',
            minLength: 2,
        } }),
    required: [...base_1.BaseSchema.required],
    additionalProperties: false,
};
exports.ReturnRequestSchemaObject = Object.assign(Object.assign({}, exports.ReturnRequestSchema), { properties: Object.assign(Object.assign({}, exports.ReturnRequestSchema.properties), { refundStatus: Object.assign(Object.assign({}, exports.ReturnRequestSchema.properties.refundStatus), { items: {
                enum: [...exports.ReturnRequestSchema.properties.refundStatus.items.enum],
            } }), returnStatus: Object.assign(Object.assign({}, exports.ReturnRequestSchema.properties.returnStatus), { items: {
                enum: [...exports.ReturnRequestSchema.properties.returnStatus.items.enum],
            } }), returnReason: Object.assign(Object.assign({}, exports.ReturnRequestSchema.properties.returnReason), { items: {
                enum: [...exports.ReturnRequestSchema.properties.returnReason.items.enum],
            } }), returnMethod: Object.assign(Object.assign({}, exports.ReturnRequestSchema.properties.returnMethod), { items: {
                enum: [...exports.ReturnRequestSchema.properties.returnMethod.items.enum],
            } }) }), required: [...exports.ReturnRequestSchema.required] });
//# sourceMappingURL=return-request.js.map