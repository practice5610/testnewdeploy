"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTAdminUserExamples = exports.POSTUsersVerifyPhoneNumberExamples = exports.GETUserTransferReceiverProfileExamples = exports.GETAdminUserResponseExamples = exports.GETAdminUsersResponseExamples = void 0;
const tslib_1 = require("tslib");
const database_helpers_1 = require("../../../__tests__/helpers/database.helpers");
const constants_1 = require("../../../constants");
const _d = database_helpers_1.givenCustomer(), { uid, lastName, roles, contact } = _d, others = tslib_1.__rest(_d, ["uid", "lastName", "roles", "contact"]);
exports.GETAdminUsersResponseExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: [database_helpers_1.givenCustomer(), database_helpers_1.givenCustomer()],
    },
};
exports.GETAdminUserResponseExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: database_helpers_1.givenCustomer(),
    },
};
exports.GETUserTransferReceiverProfileExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: database_helpers_1.givenTransferReceiverProfileData(),
    },
};
exports.POSTUsersVerifyPhoneNumberExamples = {
    SUCCESS: {
        success: true,
        message: 'Information is verified',
        data: {
            foundAccount: true,
        },
    },
};
exports.POSTAdminUserExamples = {
    SUCCESS: {
        success: true,
        message: 'success',
        data: {
            uid: uid,
            email: (_a = contact.emails) === null || _a === void 0 ? void 0 : _a[0],
            emailVerified: false,
            disabled: false,
            metadata: {
                lastSignInTime: null,
                creationTime: 'Tue, 18 May 2021 19:29:06 GMT',
            },
            tokensValidAfterTime: 'Tue, 18 May 2021 19:29:06 GMT',
            providerData: [
                {
                    uid: (_b = contact.emails) === null || _b === void 0 ? void 0 : _b[0],
                    email: (_c = contact.emails) === null || _c === void 0 ? void 0 : _c[0],
                    providerId: 'password',
                },
            ],
        },
    },
};
//# sourceMappingURL=user-specifications-responses.js.map