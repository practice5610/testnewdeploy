"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETInventoryOrdersSpecification = exports.GETInventoryOrderCountSpecification = void 0;
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
const inventory_order_specifications_responses_1 = require("./examples/responses/inventory-order-specifications-responses");
exports.GETInventoryOrderCountSpecification = {
    summary: 'Get a count of inventory orders.',
    description: 'This endpoint should be use, to __request__ a __Count of Inventory_Orders__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return a CountSchema with the count of inventory orders requested.',
            content: {
                'application/json': {
                    schema: repository_1.CountSchema,
                    [constants_1.ExampleField.SUCCESS]: {
                        success: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: inventory_order_specifications_responses_1.GETInventoryOrdersResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.GETInventoryOrdersSpecification = {
    summary: constants_1.SpecificationSummaries.GETInventoryOrdersSpecification,
    description: constants_1.SpecificationDescriptions.GETInventoryOrdersSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: constants_1.ResponseSuccessDescription.GETInventoryOrdersSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: { 'x-ts-type': models_1.InventoryOrder } },
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
                                value: inventory_order_specifications_responses_1.GETInventoryOrdersResponseExamples.SUCCESS,
                            },
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.UNAUTHORIZED]: responses_1.GlobalResponseExamplesBuilder.UNAUTHORIZED(),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.ProfileResponseMessages.NO_PROFILE_FOUND,
        }),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.OrderResponseMessages.NOT_FOUND,
        }),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
//# sourceMappingURL=inventory-order-specification.js.map