"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHMerchantWithdrawalRequestBody = exports.PATCHMerchantWithdrawalByIdSpecification = exports.GETMerchantWithdrawalByIdSpecification = exports.GETMerchantWithdrawalSpecification = exports.GETMerchantWithdrawalCountSpecification = exports.POSTMerchantWithdrawalRequestBody = exports.POSTMerchantWithdrawalSpecification = void 0;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
exports.POSTMerchantWithdrawalSpecification = {
    summary: 'Create new merchant withdrawal transaction',
    description: 'This endpoint should be use, to create a new merchant withdrawal transaction in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return the merchant withdrawal transaction from database record.',
            content: {
                'application/json': {
                    schema: rest_1.getModelSchemaRef(models_1.Transaction),
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.POSTMerchantWithdrawalRequestBody = {
    description: 'Require a partial transaction object for withdrawal',
    required: true,
    content: {
        'application/json': {
            schema: rest_1.getModelSchemaRef(models_1.Transaction, {
                exclude: [
                    '_id',
                    'booking',
                    'cashback',
                    'commissionCollected',
                    'createdAt',
                    'dateReceived',
                    'purchaseItem',
                    'updatedAt',
                    'type',
                    'title',
                    'sender',
                    'shippingOrderId',
                    'nonce',
                    'salestax',
                    'shortId',
                    'status',
                    'taxcode',
                ],
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'request body',
                },
            },
        },
    },
};
exports.GETMerchantWithdrawalCountSpecification = {
    summary: constants_1.SpecificationSummaries.GETMerchantWithdrawalCountSpecification,
    description: constants_1.SpecificationDescriptions.GETMerchantWithdrawalCountSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'APIResponse with the count of merchant withdrawal transaction instances matching with where condition',
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
exports.GETMerchantWithdrawalSpecification = {
    summary: constants_1.SpecificationSummaries.GETMerchantWithdrawalSpecification,
    description: constants_1.SpecificationDescriptions.GETMerchantWithdrawalSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: constants_1.ResponseSuccessDescription.GETMerchantWithdrawalSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: {
                                type: 'array',
                                items: rest_1.getModelSchemaRef(models_1.Transaction, { includeRelations: true }),
                            },
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
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
        // [ServiceResponseCodes.RECORD_NOT_FOUND]: GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
        //   message: OrderResponseMessages.NOT_FOUND,
        // }),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETMerchantWithdrawalByIdSpecification = {
    summary: constants_1.SpecificationSummaries.GETMerchantWithdrawalByIdSpecification,
    description: constants_1.SpecificationDescriptions.GETMerchantWithdrawalByIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: constants_1.ResponseSuccessDescription.GETMerchantWithdrawalByIdSpecification,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: rest_1.getModelSchemaRef(models_1.Transaction, { includeRelations: true }),
                        },
                        examples: {
                            [constants_1.ExampleField.SUCCESS]: {
                                summary: constants_1.CommonSummary.SUCCESS,
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
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHMerchantWithdrawalByIdSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHMerchantWithdrawalByIdSpecification,
    description: constants_1.SpecificationDescriptions.PATCHMerchantWithdrawalByIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: constants_1.ResponseSuccessDescription.PATCHMerchantWithdrawalByIdSpecification,
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHMerchantWithdrawalRequestBody = {
    description: 'Require a partial transaction object for withdrawal',
    required: true,
    content: {
        'application/json': {
            schema: rest_1.getModelSchemaRef(models_1.Transaction, {
                partial: true,
                title: 'Merchant Withdrawal Transaction',
                exclude: [
                    '_id',
                    'booking',
                    'cashback',
                    'commissionCollected',
                    'createdAt',
                    'dateReceived',
                    'purchaseItem',
                    'updatedAt',
                    'type',
                    'title',
                    'sender',
                    'shippingOrderId',
                    'nonce',
                    'salestax',
                    'shortId',
                    'status',
                    'taxcode',
                ],
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'request body',
                },
            },
        },
    },
};
//# sourceMappingURL=withdrawal-specifications.js.map