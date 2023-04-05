"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETBalanceByUIDResponseExamples = exports.GETBoomAccountByIDResponseExamples = void 0;
const constants_1 = require("../../../constants");
// TODO: Use helpers for testing to build the response data here
exports.GETBoomAccountByIDResponseExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: {
            _id: '603d094d92c1c9c701241c26',
            createdAt: 1111111111,
            updatedAt: 2222222222,
            status: 'Active',
            balance: {
                amount: 10000,
                currency: 'USD',
                precision: 2,
            },
            customerID: 'TEST_PURPOSE_ONLY',
        },
    },
};
exports.GETBalanceByUIDResponseExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: {
            amount: 10000,
            currency: 'USD',
            precision: 2,
        },
    },
};
//# sourceMappingURL=boomAccount-specifications-responses.js.map