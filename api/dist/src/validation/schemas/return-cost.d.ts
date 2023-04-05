import { ReturnCostType } from '@boom-platform/globals/lib/enums/returns';
import { SchemaObject } from 'openapi3-ts';
export declare const ReturnCostSchema: {
    readonly type: "object";
    readonly description: "Return fees the Merchant may charge to the Customer";
    readonly properties: {
        readonly name: {
            readonly type: "string";
            readonly description: "Name of return fee";
            readonly minLength: 2;
        };
        readonly description: {
            readonly type: "string";
            readonly description: "Explanation of return fee";
            readonly minLength: 2;
        };
        readonly price: SchemaObject;
        readonly type: {
            readonly description: "The type of return cost";
            readonly items: {
                readonly enum: readonly [ReturnCostType.FLAT_FEE, ReturnCostType.SHIPPING];
            };
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const ReturnCostSchemaObject: SchemaObject;
