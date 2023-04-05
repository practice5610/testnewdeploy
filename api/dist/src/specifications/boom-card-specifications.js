"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHBoomCardsByIdRequestBody = exports.POSTBoomCardsLoginRequestBody = exports.POSTBoomCardsMerchantActivateByIdRequestBody = exports.DELBoomCardsByIdSpecifications = exports.PATCHBoomCardsByIdSpecification = exports.POSTBoomCardsMerchantActivateByIdSpecification = exports.GETBoomCardsMerchantByCardNumberSpecification = exports.GETBoomCardsSpecification = exports.GETBoomCardsByIdSpecification = exports.GETBoomCardsCountSpecification = exports.POSTBoomCardsLoginSpecification = exports.POSTBoomCardsSpecification = void 0;
const openapi_v3_1 = require("@loopback/openapi-v3");
const repository_1 = require("@loopback/repository");
const service_response_codes_1 = require("../constants/service-response-codes");
const specification_constants_1 = require("../constants/specification-constants");
const models_1 = require("../models");
const requestBody_1 = require("./examples/requestBody");
const boom_card_specifications_responses_1 = require("./examples/responses/boom-card-specifications-responses");
const globals_specifications_responses_builder_1 = require("./examples/responses/globals-specifications-responses-builder");
exports.POSTBoomCardsSpecification = {
    summary: specification_constants_1.SpecificationSummaries.POSTBoomCardsSpecification,
    description: specification_constants_1.SpecificationDescriptions.POSTBoomCardsSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.POSTBoomCardsSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.POSTBoomCardsExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.POSTBoomCardsLoginSpecification = {
    summary: specification_constants_1.SpecificationSummaries.POSTBoomCardsLoginSpecification,
    description: specification_constants_1.SpecificationDescriptions.POSTBoomCardsLoginSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.POSTBoomCardsLoginSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.POSTBoomCardsLoginExample.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETBoomCardsCountSpecification = {
    summary: specification_constants_1.SpecificationSummaries.GETBoomCardsCountSpecification,
    description: specification_constants_1.SpecificationDescriptions.GETBoomCardsCountSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.GETBoomCardsCountSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: repository_1.CountSchema,
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.GETBoomCardsCountExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETBoomCardsByIdSpecification = {
    summary: specification_constants_1.SpecificationSummaries.GETBoomCardsByIdSpecification,
    description: specification_constants_1.SpecificationDescriptions.GETBoomCardsByIdSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.GETBoomCardsByIdSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.GETBoomCardsCountExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETBoomCardsSpecification = {
    summary: specification_constants_1.SpecificationSummaries.GETBoomCardsSpecification,
    description: specification_constants_1.SpecificationDescriptions.GETBoomCardsSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.GETBoomCardsByIdSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.GETBoomCardsExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETBoomCardsMerchantByCardNumberSpecification = {
    summary: specification_constants_1.SpecificationSummaries.GETBoomCardsMerchantByCardNumberSpecification,
    description: specification_constants_1.SpecificationDescriptions.GETBoomCardsMerchantByCardNumberSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.GETBoomCardsMerchantByCardNumberSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.GETBoomCardsMerchantByCardNumberExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.POSTBoomCardsMerchantActivateByIdSpecification = {
    summary: specification_constants_1.SpecificationSummaries.POSTBoomCardsMerchantActivateByIdSpecification,
    description: specification_constants_1.SpecificationDescriptions.POSTBoomCardsMerchantActivateByIdSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: specification_constants_1.ResponseSuccessDescription.POSTBoomCardsMerchantActivateByIdSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { 'x-ts-type': models_1.BoomCard },
                        },
                    },
                    examples: {
                        [specification_constants_1.ExampleField.SUCCESS]: {
                            summary: [specification_constants_1.CommonSummary.SUCCESS],
                            value: boom_card_specifications_responses_1.GETBoomCardsMerchantByCardNumberExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHBoomCardsByIdSpecification = {
    summary: specification_constants_1.SpecificationSummaries.PATCHBoomCardsByIdSpecification,
    description: specification_constants_1.SpecificationDescriptions.PATCHBoomCardsByIdSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Boom card instance update success',
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.DELBoomCardsByIdSpecifications = {
    summary: specification_constants_1.SpecificationSummaries.DELBoomCardsByIdSpecifications,
    description: specification_constants_1.SpecificationDescriptions.DELBoomCardsByIdSpecifications,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Boom card instance deleted succesful',
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: globals_specifications_responses_builder_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.POSTBoomCardsMerchantActivateByIdRequestBody = {
    description: specification_constants_1.RequestBodyDescriptions.POSTBoomCardsMerchantActivateByIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.BoomCard, {
                partial: true,
                exclude: [
                    '_id',
                    'createdAt',
                    'fromBatchId',
                    'status',
                    'cardNumber',
                    'qrcode',
                    'customerID',
                    'storeMerchantID',
                ],
            }),
            examples: {
                [specification_constants_1.ExampleField.SUCCESS]: {
                    summary: specification_constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTBoomCardsMerchantActivateByIdRequestBodyExample.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTBoomCardsLoginRequestBody = {
    description: specification_constants_1.RequestBodyDescriptions.POSTBoomCardsLoginRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.BoomCard, {
                partial: true,
                exclude: [
                    '_id',
                    'createdAt',
                    'status',
                    'fromBatchId',
                    'qrcode',
                    'storeID',
                    'customerID',
                    'boomAccountID',
                    'storeMerchantID',
                ],
            }),
            examples: {
                [specification_constants_1.ExampleField.SUCCESS]: {
                    summary: specification_constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTBoomCardsLoginRequestBodyExample.DATA_SENT,
                },
            },
        },
    },
};
exports.PATCHBoomCardsByIdRequestBody = {
    description: specification_constants_1.RequestBodyDescriptions.PATCHBoomCardsByIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.BoomCard, {
                partial: true,
                exclude: ['_id', 'createdAt', 'fromBatchId', 'cardNumber', 'qrcode'],
            }),
        },
    },
};
//# sourceMappingURL=boom-card-specifications.js.map