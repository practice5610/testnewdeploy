"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETBoomCardsMerchantByCardNumberExamples = exports.GETBoomCardsExamples = exports.GETBoomCardsCountExamples = exports.POSTBoomCardsExamples = exports.POSTBoomCardsLoginExample = void 0;
const constants_1 = require("../../../constants");
// TODO: Use helpers for testing to build the response data here
exports.POSTBoomCardsLoginExample = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: 'token',
    },
};
exports.POSTBoomCardsExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: [
            {
                _id: '60a2bff3eb020a0218920c5a',
                createdAt: 1621278458,
                updatedAt: 1621278458,
                cardNumber: '1234123412341234',
                status: 'Inactive',
                fromBatchId: '1234567890',
            },
            {
                _id: '60a2bff3eb020a0218920c5b',
                createdAt: 1621278458,
                updatedAt: 1621278458,
                cardNumber: '1234123412341235',
                status: 'Inactive',
                fromBatchId: '1234567890',
            },
            {
                _id: '60a2bff3eb020a0218920c5c',
                createdAt: 1621278458,
                updatedAt: 1621278458,
                cardNumber: '1234123412341236',
                status: 'Inactive',
                fromBatchId: '1234567890',
            },
        ],
    },
};
exports.GETBoomCardsCountExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: {
            count: 9,
        },
    },
};
exports.GETBoomCardsExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: [
            {
                _id: '5e5d2799faa3d90d054a4c8e',
                createdAt: 1583163289,
                updatedAt: 1583163289,
                cardNumber: '2272120894299844',
                pinNumber: 1234,
                status: 'Active',
                qrcode: '2272120894299844',
                fromBatchId: '556eca2c3f41763f7be352cb',
                storeID: '5d2e02329eb1641840578f58',
                storeMerchantID: 're5OljVl3KObKLopKdxpOQBWPL82',
                customerID: 'Rj7Q4ZQpzUfg19k7lD91XqFCIWI2',
            },
        ],
    },
};
exports.GETBoomCardsMerchantByCardNumberExamples = {
    SUCCESS: {
        success: true,
        message: constants_1.APIResponseMessages.SUCCESS,
        data: [
            {
                _id: '5e5d2799faa3d90d054a4c8e',
                createdAt: 1583163289,
                updatedAt: 1583163289,
                cardNumber: '2272120894299844',
                pinNumber: 1234,
                status: 'Active',
                qrcode: '2272120894299844',
                fromBatchId: '556eca2c3f41763f7be352cb',
                storeID: '5d2e02329eb1641840578f58',
                storeMerchantID: 're5OljVl3KObKLopKdxpOQBWPL82',
                customerID: 'Rj7Q4ZQpzUfg19k7lD91XqFCIWI2',
            },
        ],
    },
};
//# sourceMappingURL=boom-card-specifications-responses.js.map