"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTPlaceOrderRequestBody = exports.POSTPlaceOrderSpecification = void 0;
const constants_1 = require("../constants");
const models_1 = require("../models");
const requestBody_1 = require("./examples/requestBody");
exports.POSTPlaceOrderSpecification = {
    summary: 'Place an order when checkout complete.',
    description: '__Return and API response instance when checkout process end.__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Checks out bookings that are provided',
            content: { 'application/json': { schema: { 'x-ts-type': Object } } },
        },
    },
};
exports.POSTPlaceOrderRequestBody = {
    description: 'Require an Order Type object to be placed.',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': models_1.Order },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTPlaceOrderRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
//# sourceMappingURL=checkout-specifications.js.map