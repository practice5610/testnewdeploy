"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const nanoid_1 = require("nanoid");
/**
 * Short IDs with nanoid under 8 chars wasn't quite unique enough and nanoid includes
 * chars that make shortId hard to read, so this is our shortId generator that fixes
 * these problems by removing uppercase O, hyphen, and underscore. With a length of 8,
 * we need to make 1,950,000 ids to have a 1% of at least one collision
 * nanoid calculator: https://zelark.github.io/nano-id-cc/
 */
const nanoid = nanoid_1.customAlphabet('0123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);
let Transaction = class Transaction extends repository_1.Entity {
    constructor(data) {
        super(data);
        this.shortId = nanoid();
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
], Transaction.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date the transaction was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date the transaction was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'type',
        description: 'The type of transaction being made. Whether it is a funding, purchase, cash back, transfer, return, merchant withdrawal, or customer billing transaction',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of a transaction. Whether it is pending, cancelled, completed, failed, or unprocessed',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'amount',
        description: 'The amount of money spent in a transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "amount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'cashback',
        description: 'The amount of money a customer will get back in the transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "cashback", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'nonce',
        description: '',
        /**
         * What is nonce?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "nonce", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'sender',
        description: 'The sender of a transaction. Can be a customer or merchant depending on the type of transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "sender", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'receiver',
        description: 'The receiver of the transaction. Can be a customer or a merchant depending on the type of transaction',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "receiver", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'title',
        description: 'The title of the purchase item',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "title", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'taxcode',
        description: 'The country, state, county, city of where the taxes are to be paid to and calculated by',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "taxcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'salestax',
        description: 'The amount of taxes owed',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "salestax", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'boomAccountID',
        description: 'The unique ID for a Boom Account',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "boomAccountID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'purchaseItem',
        description: 'The item being purchased in a transaction. Can be a product or an offer',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "purchaseItem", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'booking',
        description: 'This can describe the quantity of items being purchased in a transaction',
        /**
         * This is a partial booking so I'm not sure what will be used from booking and what will not be
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "booking", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'dateReceived',
        description: '',
        /**
         * Date the transaction was received or the delivery was received?
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Transaction.prototype, "dateReceived", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'commissionCollected',
        description: 'The monetary value that is given to Boom for each purchase',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Transaction.prototype, "commissionCollected", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'shippingOrderId',
        description: 'The unique shipping order ID that links to the shipping information',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "shippingOrderId", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'shortId',
        description: '',
        /**
         * What is the short id used for?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Transaction.prototype, "shortId", void 0);
Transaction = tslib_1.__decorate([
    repository_1.model({ name: 'transactions', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Transaction);
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.model.js.map