"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomAccount = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let BoomAccount = class BoomAccount extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        mongodb: { dataType: 'ObjectID' },
        id: true,
        required: false,
        name: '_id',
        description: 'Boom account instance database unique identifier.',
    }),
    tslib_1.__metadata("design:type", String)
], BoomAccount.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Boom account date of creation in unix epoch time format, should be set on instance creation and never updated.',
        type: 'number',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], BoomAccount.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Boom account date of update in unix epoch time format, should be set on instance creation and updated in any modification.',
        type: 'number',
        required: false,
    }),
    tslib_1.__metadata("design:type", Number)
], BoomAccount.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'Boom account current Status.',
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], BoomAccount.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'balance',
        description: 'Boom account current balance.',
        type: 'object',
        required: false,
    }),
    tslib_1.__metadata("design:type", Object)
], BoomAccount.prototype, "balance", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'customerID',
        description: 'Boom user database identifier, related to boom account instance owner',
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], BoomAccount.prototype, "customerID", void 0);
BoomAccount = tslib_1.__decorate([
    repository_1.model({ name: 'boom_accounts', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], BoomAccount);
exports.BoomAccount = BoomAccount;
//# sourceMappingURL=boom-account.model.js.map