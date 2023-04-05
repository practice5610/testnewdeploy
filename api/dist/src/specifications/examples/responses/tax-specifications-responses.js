"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGetTaxExample = void 0;
const constants_1 = require("../../../constants");
// TODO: Use helpers for testing to build the response data here
exports.POSTGetTaxExample = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: [
            {
                id: '6062cc8865ff6f102f6d4750',
                tax: {
                    amount: 100,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
            },
        ],
    },
};
//# sourceMappingURL=tax-specifications-responses.js.map