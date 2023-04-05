"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHOrdersByIdSpecification = exports.GETOrdersByIdSpecification = exports.GETOrdersSpecification = exports.GETOrdersCountSpecification = void 0;
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
const order_specifications_responses_1 = require("./examples/responses/order-specifications-responses");
exports.GETOrdersCountSpecification = {
    summary: constants_1.SpecificationSummaries.GETOrdersCountSpecification,
    description: constants_1.SpecificationDescriptions.GETOrdersCountSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'APIResponse with the count of orders instances matching with where condition',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: repository_1.CountSchema,
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
                                value: order_specifications_responses_1.GETOrdersCountResponseExamples.SUCCESS,
                            },
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETOrdersSpecification = {
    summary: constants_1.SpecificationSummaries.GETOrdersSpecification,
    description: constants_1.SpecificationDescriptions.GETOrdersSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: constants_1.ResponseSuccessDescription.GETOrdersSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: { 'x-ts-type': models_1.Order } },
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
                                value: order_specifications_responses_1.GETOrdersResponseExamples.SUCCESS,
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
exports.GETOrdersByIdSpecification = {
    summary: constants_1.SpecificationSummaries.GETOrdersByIdSpecification,
    description: constants_1.SpecificationDescriptions.GETOrdersByIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: constants_1.ResponseSuccessDescription.GETOrdersByIdSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.Order },
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
                                value: order_specifications_responses_1.GETOrdersByIdResponseExamples.SUCCESS,
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
exports.PATCHOrdersByIdSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHOrdersByIdSpecification,
    description: constants_1.SpecificationDescriptions.PATCHOrdersByIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: constants_1.ResponseSuccessDescription.PATCHOrdersByIdSpecification,
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.OrderResponseMessages.NOT_FOUND,
        }),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
//# sourceMappingURL=order-specifications.js.map