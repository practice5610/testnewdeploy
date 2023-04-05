"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerchantPayoutsController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest"); //eslint-disable-line
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const log4js_1 = require("log4js");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const admin = tslib_1.__importStar(require("firebase-admin"));
/**
 * Controller for managing of payouts for merchants (accounts payable)
 */
let MerchantPayoutsController = class MerchantPayoutsController {
    constructor(response) {
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.MERCHANT_PAYOUTS);
    }
    async findMerchants(keyword = '') {
        try {
            const firestore = admin.firestore();
            const users = await firestore
                .collection('users')
                .where('netEarningsPendingWithdrawal.amount', '>', 0)
                .get();
            const filteredUsers = [];
            /* eslint-disable */
            !users.empty &&
                users.forEach((userDoc) => {
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        const fullName = `${userData.firstName} ${userData.lastName}`;
                        if (fullName.toLowerCase().indexOf(keyword) >= 0 ||
                            userData.uid.toLowerCase().indexOf(keyword) >= 0 ||
                            userData.store.companyName.toLowerCase().indexOf(keyword) >= 0 ||
                            userData.store.street1.toLowerCase().indexOf(keyword) >= 0 || //TODO: Review if we need to add street2
                            userData.store._id.toLowerCase().indexOf(keyword) >= 0) {
                            filteredUsers.push(userDoc.data());
                        }
                    }
                });
            return this.response.json({ success: true, data: filteredUsers, message: 'success' });
        }
        catch (err) {
            return this.response.json({ success: false, message: err.message });
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/payouts/merchants', {
        responses: {
            '200': {
                description: 'Gets merchant profile info for those that have a payout amount in their account.',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': Object } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.string('keyword')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MerchantPayoutsController.prototype, "findMerchants", null);
MerchantPayoutsController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [Object])
], MerchantPayoutsController);
exports.MerchantPayoutsController = MerchantPayoutsController;
//# sourceMappingURL=merchant-payouts.controller.js.map