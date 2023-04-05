"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomCard = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let BoomCard = class BoomCard extends repository_1.Entity {
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
], BoomCard.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date the boom card was assigned to a user',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BoomCard.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date the boom card info was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BoomCard.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'cardNumber',
        description: 'The unique card number assigned to each boom card given to each boom user',
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "cardNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'pinNumber',
        description: 'Unique 4-6 digit number chosen by the user to be used as their pin when making purchases',
        /**
         * is this correct? are pins automatically assigned that a user can then change? is it for making purchases?
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], BoomCard.prototype, "pinNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the boom card itself. Whether it is active, inactive, or blocked',
        /**
         * I don't understand the point of the inactive issued status
         */
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.BoomCardStatus),
        },
        default: globals_1.BoomCardStatus.INACTIVE,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'boomAccountID',
        description: 'Unique ID given to each boom account',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "boomAccountID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'qrcode',
        description: 'Unique code generated for users to scan with their phones to access certain features',
        /**
         * what features are these linked to?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "qrcode", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'fromBatchId',
        description: '',
        /**
         * I have no idea what this is...
         */
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "fromBatchId", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'storeID',
        description: 'The unique ID for a given store',
        /**
         * How is this used?
         */
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "storeID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'storeMerchantID',
        description: 'The unique ID for a given merchant of a given store',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "storeMerchantID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'customerID',
        description: 'The unique ID for a given customer',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], BoomCard.prototype, "customerID", void 0);
BoomCard = tslib_1.__decorate([
    repository_1.model({ name: 'boomcards', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BoomCard);
exports.BoomCard = BoomCard;
//# sourceMappingURL=boom-card.model.js.map