"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantTransaction = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
/**
 * What do the merchant transactions track specifically? Are these the transactions that merchants process for their stores?
 */
let MerchantTransaction = class MerchantTransaction extends repository_1.Entity {
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
], MerchantTransaction.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date the transaction was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], MerchantTransaction.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date the transaction was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], MerchantTransaction.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'title',
        description: 'The title of the transaction',
        /**
         * I don't think this is right. Why would the transaction have a title... What is the title for?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], MerchantTransaction.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the transaction. Whether it is pending, completed, cancelled, or failed',
        type: 'string',
        jsonSchema: {
            enum: Object.values(constants_1.MerchantTransactionStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], MerchantTransaction.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'type',
        description: 'The type of the transaction. Whether it is recurring, one-time, or return',
        type: 'string',
        jsonSchema: {
            enum: Object.values(constants_1.MerchantTransactionType),
        },
    }),
    tslib_1.__metadata("design:type", String)
], MerchantTransaction.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'salestax',
        description: 'The sales tax charged to the customer on a particular transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], MerchantTransaction.prototype, "salestax", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'salestaxState',
        description: 'The state to which the sales tax is owed',
        type: 'string',
        pattern: '^(AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY)$',
    }),
    tslib_1.__metadata("design:type", String)
], MerchantTransaction.prototype, "salestaxState", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'amount',
        description: 'The amount the customer owes on a particular transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], MerchantTransaction.prototype, "amount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: 'The merchant the transaction goes to',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], MerchantTransaction.prototype, "merchant", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: 'The store the transaction corresponds to',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", models_1.StoreBasic)
], MerchantTransaction.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'purchaseItem',
        description: 'The item that the customer purchases from the merchant',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], MerchantTransaction.prototype, "purchaseItem", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'inventoryLease',
        description: 'The lease for inventory items that merchants are able to lease from Boom',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], MerchantTransaction.prototype, "inventoryLease", void 0);
MerchantTransaction = tslib_1.__decorate([
    repository_1.model({ name: 'merchant_transactions', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], MerchantTransaction);
exports.MerchantTransaction = MerchantTransaction;
//# sourceMappingURL=merchant-transaction.model.js.map