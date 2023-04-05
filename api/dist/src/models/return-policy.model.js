"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnPolicyModel = void 0;
const tslib_1 = require("tslib");
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const repository_1 = require("@loopback/repository");
let ReturnPolicyModel = class ReturnPolicyModel extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ReturnPolicyModel.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date policy was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnPolicyModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date policy was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnPolicyModel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantID',
        description: 'Unique ID for a merchant',
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
], ReturnPolicyModel.prototype, "merchantID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'name of the policy',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Name should be at least 2 characters.',
                maxLength: 'Name should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnPolicyModel.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'description',
        description: 'Description of the policy',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 500,
            errorMessage: {
                minLength: 'Description should be at least 2 characters.',
                maxLength: 'Description should not exceed 500 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnPolicyModel.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'refundsAccepted',
        description: 'True or False if refunds are accepted by the merchant',
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ReturnPolicyModel.prototype, "refundsAccepted", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'autoApprove',
        description: 'True or False if merchant accepts auto-approval of returns/refunds/exchanges',
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ReturnPolicyModel.prototype, "autoApprove", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'costsImposed',
        descrition: 'Optional extra costs a merchant may charge for a return. i.e. restocking fee',
        type: 'array',
        itemType: 'object',
    }),
    tslib_1.__metadata("design:type", Array)
], ReturnPolicyModel.prototype, "costsImposed", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'daysToReturn',
        description: 'Specified timeframe inwhich a customer can return/exchange an item',
        type: 'number',
        required: true,
        jsonSchema: {
            minimum: 1,
            maximum: 30,
            errorMessage: {
                minimum: 'Days to return should be at least 1 day.',
                maximum: 'Days to return should not exceed 30 days.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnPolicyModel.prototype, "daysToReturn", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnMethod',
        description: 'The return method used to return an item. i.e. ship or drop off',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(returns_1.ReturnMethod),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ReturnPolicyModel.prototype, "returnMethod", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'dropOffAddress',
        description: 'A list of addresses/locations a customer can drop off their returns too',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], ReturnPolicyModel.prototype, "dropOffAddress", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'transactionTotalPartsToRefuned',
        description: 'Each part of a transaction total that is to be refunded',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], ReturnPolicyModel.prototype, "transactionTotalPartsToRefund", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnCosts',
        description: 'Fees owed by the customer for a return. i.e. shipping fee',
        type: 'array',
        itemType: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], ReturnPolicyModel.prototype, "returnCosts", void 0);
ReturnPolicyModel = tslib_1.__decorate([
    repository_1.model({ name: 'return_policy', settings: {} })
], ReturnPolicyModel);
exports.ReturnPolicyModel = ReturnPolicyModel;
//# sourceMappingURL=return-policy.model.js.map