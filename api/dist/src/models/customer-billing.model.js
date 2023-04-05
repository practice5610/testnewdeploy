"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerBilling = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let CustomerBilling = class CustomerBilling extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBilling.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'transaction',
        description: 'Transaction record linked to a unique store ID and a unique customer ID.',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], CustomerBilling.prototype, "transaction", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidAccountId',
        description: 'Unique account ID provided by Plaid',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBilling.prototype, "plaidAccountId", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidItemId',
        description: 'Unique item ID provided by Plaid',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], CustomerBilling.prototype, "plaidItemId", void 0);
CustomerBilling = tslib_1.__decorate([
    repository_1.model({ name: 'customer_billings', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CustomerBilling);
exports.CustomerBilling = CustomerBilling;
//# sourceMappingURL=customer-billing.model.js.map