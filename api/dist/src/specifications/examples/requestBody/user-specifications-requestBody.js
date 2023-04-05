"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTAdminUserRequestBodyExamples = exports.POSTUsersVerifyPhoneNumberRequestBodyExamples = void 0;
const tslib_1 = require("tslib");
const database_helpers_1 = require("../../../__tests__/helpers/database.helpers");
const _b = database_helpers_1.givenCustomer(), { firstName, lastName, roles, contact } = _b, others = tslib_1.__rest(_b, ["firstName", "lastName", "roles", "contact"]);
exports.POSTUsersVerifyPhoneNumberRequestBodyExamples = {
    DATA_SENT: { firstName: firstName, lastName: lastName, phone: '5555555555' },
};
exports.POSTAdminUserRequestBodyExamples = {
    DATA_SENT: { email: firstName, password: (_a = contact.emails) === null || _a === void 0 ? void 0 : _a[0], roles: roles },
};
//# sourceMappingURL=user-specifications-requestBody.js.map