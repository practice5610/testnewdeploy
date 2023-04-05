"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingRequest = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let FundingRequest = class FundingRequest extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'uid',
        description: 'Unique ID',
        /**
         * Is that all? What is the id for maybe?
         */
        type: 'string',
        id: true,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FundingRequest.prototype, "uid", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'nonce',
        description: '',
        /**
         * What is nonce?
         */
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FundingRequest.prototype, "nonce", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'amount',
        description: 'The monetary value linked to the funding request. (i.e. how much money is being requested)',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], FundingRequest.prototype, "amount", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'publicToken',
        description: '',
        /**
         * What is this? How is it used?
         */
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FundingRequest.prototype, "publicToken", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidAccessToken',
        description: 'Unique access token provided by Plaid',
        /**
         * Honestly I'm not even quite sure what this one does...
         */
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FundingRequest.prototype, "plaidAccessToken", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'plaidAccountId',
        description: 'Unique account ID provided by Plaid',
        /**
         * These are provided to protect the user's bank account number right?
         */
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], FundingRequest.prototype, "plaidAccountId", void 0);
FundingRequest = tslib_1.__decorate([
    repository_1.model({ settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], FundingRequest);
exports.FundingRequest = FundingRequest;
//# sourceMappingURL=funding-request.model.js.map