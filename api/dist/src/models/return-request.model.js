"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRequestModel = void 0;
const tslib_1 = require("tslib");
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const repository_1 = require("@loopback/repository");
let ReturnRequestModel = class ReturnRequestModel extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date return request was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnRequestModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date return request was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnRequestModel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'customerID',
        description: 'Unique customer ID',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Customer ID should be at least 2 characters',
                maxLength: 'Customer ID should not exceed 80 characters',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "customerID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantID',
        description: 'Unique merchant ID',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Merchant ID should be at least 2 characters.',
                maxLength: 'Merchant ID should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "merchantID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'refundStatus',
        description: 'Status of the refund',
        type: 'string',
        default: returns_1.Status.REQUESTED,
        jsonSchema: {
            enum: Object.values(returns_1.Status),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "refundStatus", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnStatus',
        description: 'Status of the return',
        type: 'string',
        default: returns_1.Status.REQUESTED,
        jsonSchema: {
            enum: Object.values(returns_1.Status),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "returnStatus", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantPolicyID',
        description: 'Unique ID for the policy of the merchant',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Merchant Return Policy ID should be at least 2 characters.',
                maxLength: 'Merchant Return Policy ID should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "merchantPolicyID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnReason',
        description: 'The reason for the return',
        type: 'array',
        itemType: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(returns_1.ReturnReason),
        },
    }),
    tslib_1.__metadata("design:type", Array)
], ReturnRequestModel.prototype, "returnReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'customReason',
        description: 'A specific reason for the return that is not listed in the return reasons',
        type: 'string',
        jsonSchema: {
            minLength: 2,
            maxLength: 500,
            errorMessage: {
                minLength: 'Custom reason should be at least 2 characters.',
                maxLength: 'Custom reason should not exceed 500 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "customReason", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnMethod',
        description: 'The method of return. i.e, shipping or drop-off',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(returns_1.ReturnMethod),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "returnMethod", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'purchaseTransactionID',
        description: 'Unique ID for the original purchase transaction',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Purchase Transaction ID should be at least 2 characters.',
                maxLength: 'Purchase Transaction ID should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "purchaseTransactionID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'refundAmount',
        description: 'Amount of money to be refunded to the customer',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], ReturnRequestModel.prototype, "refundAmount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnTransactionID',
        description: 'Unique ID for the return transaction',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Return Transaction ID should be at least 2 characters.',
                maxLength: 'Return Transaction ID should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "returnTransactionID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'comment',
        description: 'Any comments or notes regarding the return',
        type: 'string',
        jsonSchema: {
            minLength: 2,
            maxLength: 500,
            errorMessage: {
                minLength: 'Comments should be at least 2 characters.',
                maxLength: 'Comments should not exceed 500 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnRequestModel.prototype, "comment", void 0);
ReturnRequestModel = tslib_1.__decorate([
    repository_1.model({ name: 'return_request', settings: {} })
], ReturnRequestModel);
exports.ReturnRequestModel = ReturnRequestModel;
//# sourceMappingURL=return-request.model.js.map