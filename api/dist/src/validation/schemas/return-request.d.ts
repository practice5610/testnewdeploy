import { ReturnMethod, ReturnReason, Status } from '@boom-platform/globals/lib/enums/returns';
import { SchemaObject } from 'openapi3-ts';
export declare const ReturnRequestSchema: {
    readonly type: "object";
    readonly description: "Return Request submitted by customer";
    readonly properties: {
        readonly customerID: {
            readonly type: "string";
            readonly description: "BoomUser's id";
        };
        readonly merchantID: {
            readonly type: "string";
            readonly description: "BoomUser's id";
        };
        readonly refundStatus: {
            readonly description: "Status of refund";
            readonly items: {
                readonly enum: readonly [Status.APPROVED, Status.COMPLETE, Status.DENIED, Status.DISPUTED, Status.EXPIRED, Status.PROCESSING, Status.REQUESTED];
            };
        };
        readonly returnStatus: {
            readonly description: "Status of return";
            readonly items: {
                readonly enum: readonly [Status.APPROVED, Status.COMPLETE, Status.DENIED, Status.DISPUTED, Status.EXPIRED, Status.PROCESSING, Status.REQUESTED];
            };
        };
        readonly merchantPolicyID: {
            readonly type: "string";
            readonly description: "Unique return policy ID";
            readonly minLength: 2;
        };
        readonly returnReason: {
            readonly type: "array";
            readonly description: "Reason for return";
            readonly items: {
                readonly enum: readonly [ReturnReason.BETTER_PRICE, ReturnReason.DAMAGED_PRODUCT, ReturnReason.DAMAGED_PRODUCT_AND_BOX, ReturnReason.DEFECTIVE_ITEM, ReturnReason.DID_NOT_APPROVE, ReturnReason.EXTRA_ITEM, ReturnReason.INACCURATE_DESCRIPTIONS, ReturnReason.LATE_ARRIVAL, ReturnReason.MISSING_OR_BROKEN_PARTS, ReturnReason.MISTAKE_PURCHASE, ReturnReason.NO_LONGER_NEEDED, ReturnReason.WRONG_ITEM];
            };
        };
        readonly customReason: {
            readonly type: "string";
            readonly description: "Custom reason for return";
            readonly minLength: 2;
        };
        readonly returnMethod: {
            readonly description: "Methods a customer can take to return an item";
            readonly items: {
                readonly enum: readonly [ReturnMethod.DROP_OFF, ReturnMethod.NO_RETURN, ReturnMethod.SHIP];
            };
        };
        readonly purchaseTransactionID: {
            readonly type: "string";
            readonly description: "Unique ID of original purchase transaction";
            readonly minLength: 2;
        };
        readonly refundAmount: SchemaObject;
        readonly returnTransactionID: {
            readonly type: "string";
            readonly description: "Unique ID of return transaction";
        };
        readonly comment: {
            readonly type: "string";
            readonly description: "Comments a customer may leave for the merchant regarding the return or item";
            readonly minLength: 2;
        };
        readonly _id: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly createdAt: {
            readonly type: "integer";
        };
        readonly updatedAt: {
            readonly type: "integer";
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const ReturnRequestSchemaObject: SchemaObject;
