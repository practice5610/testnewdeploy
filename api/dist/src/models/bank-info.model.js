"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankInfo = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let BankInfo = class BankInfo extends repository_1.Entity {
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
], BankInfo.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date ',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BankInfo.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date ',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BankInfo.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidID',
        description: 'Unique ID generated through Plaid',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "plaidID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'accountNumber',
        description: 'The bank account number for the user',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "accountNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'routingNumber',
        description: 'The routing number for the bank the user uses. Each bank has their own routing number',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "routingNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'wireRoutingNumber',
        description: 'The wire routing number for the bank the user uses. This will be different from the routing number for each bank',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "wireRoutingNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidItemID',
        description: 'Unique item ID that is provided by Plaid',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "plaidItemID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidAccessToken',
        description: 'Unique access token that is provided by Plaid',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "plaidAccessToken", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'The name of the bank',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'userID',
        description: 'The unique ID of the user',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BankInfo.prototype, "userID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'accountOwner',
        description: 'Information gathered from the bank by Plaid regarding the user/owner of the account. This includes their name, phone number, address, and emails.',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], BankInfo.prototype, "accountOwner", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'balances',
        description: 'Balance information gathered by Plaid regarding how much funds the user has available to them, the current account standings, and their banking limits.',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], BankInfo.prototype, "balances", void 0);
BankInfo = tslib_1.__decorate([
    repository_1.model({ name: 'bank_info', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BankInfo);
exports.BankInfo = BankInfo;
//# sourceMappingURL=bank-info.model.js.map