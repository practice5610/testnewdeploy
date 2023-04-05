"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisputeSchemaObject = exports.DisputeSchema = void 0;
const base_1 = require("./base");
const return_request_1 = require("./return-request");
exports.DisputeSchema = {
    type: 'object',
    description: 'Dispute regarding return',
    properties: Object.assign(Object.assign({}, base_1.BaseSchema.properties), { returnRequest: Object.assign(Object.assign({}, return_request_1.ReturnRequestSchemaObject), { required: [
                '_id',
                'createdAt',
                'updatedAt',
                'customerID',
                'merchantID',
                'returnStatus',
                'merchantPolicyID',
                'returnReason',
                'returnMethod',
                'purchaseTransactionID',
                'returnTransactionID',
            ] }), isOpen: {
            type: 'boolean',
            description: 'Lets the merchant, customer, or admin know if a dispute is still open',
        }, comment: { type: 'string', description: 'Comments regarding a dispute', minLength: 2 } }),
    required: [...base_1.BaseSchema.required, ...return_request_1.ReturnRequestSchema.required],
    additionalProperties: false,
};
exports.DisputeSchemaObject = Object.assign(Object.assign({}, exports.DisputeSchema), { properties: Object.assign(Object.assign({}, exports.DisputeSchema.properties), { returnRequest: Object.assign(Object.assign({}, exports.DisputeSchema.properties.returnRequest), { required: [...exports.DisputeSchema.properties.returnRequest.required] }) }), required: [...exports.DisputeSchema.required] });
//# sourceMappingURL=return-dispute.js.map