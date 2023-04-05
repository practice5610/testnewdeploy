"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHDisputeSpecification = exports.PATCHDisputeRequestBody = exports.GETDisputeSpecification = exports.POSTDisputeSpecifications = exports.POSTDisputeRequestBody = exports.PATCHReturnRequestSpecification = exports.PATCHReturnRequestBody = exports.GETReturnRequestSpecification = exports.POSTReturnRequestSpecifications = exports.POSTReturnRequestBody = exports.DELPolicyByIDSpecification = exports.GETPolicySpecification = exports.POSTReturnPolicySpecifications = exports.POSTReturnPolicyRequestBody = void 0;
const constants_1 = require("../constants");
const service_response_codes_1 = require("../constants/service-response-codes");
const schemas_1 = require("../validation/schemas");
const responses_1 = require("./examples/responses");
const returns_examples_1 = require("./examples/responses/returns-examples");
exports.POSTReturnPolicyRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTReturnPolicyRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.POSTPolicySchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: returns_examples_1.POSTReturnPolicyResponseExamples.SUCCESS,
                },
            },
        },
    },
};
exports.POSTReturnPolicySpecifications = {
    summary: constants_1.SpecificationSummaries.POSTReturnPolicySpecification,
    description: constants_1.SpecificationDescriptions.POSTReturnPolicySpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Successful ReturnPolicy Creation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.PolicySchemaObject,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: returns_examples_1.POSTReturnPolicyResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.GETPolicySpecification = {
    summary: constants_1.SpecificationSummaries.GETPolicySpecification,
    description: constants_1.SpecificationDescriptions.GETPolicySpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'ReturnPolicy Instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: schemas_1.PolicySchemaObject },
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.DELPolicyByIDSpecification = {
    summary: constants_1.SpecificationSummaries.DELPolicyByIDSpecification,
    description: constants_1.SpecificationDescriptions.DELPolicyByIDSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'ReturnPolicy instance DELETE success',
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.POSTReturnRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTReturnRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.POSTReturnRequestSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: returns_examples_1.POSTReturnRequestResponseExamples.SUCCESS,
                },
            },
        },
    },
};
exports.POSTReturnRequestSpecifications = {
    summary: constants_1.SpecificationSummaries.POSTReturnRequestSpecifications,
    description: constants_1.SpecificationDescriptions.POSTReturnRequestSpecifications,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Successful ReturnRequest Creation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.ReturnRequestSchemaObject,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: returns_examples_1.POSTReturnRequestResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.GETReturnRequestSpecification = {
    summary: constants_1.SpecificationSummaries.GETReturnRequestSpecification,
    description: constants_1.SpecificationDescriptions.GETReturnRequestSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'ReturnRequest Instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: schemas_1.ReturnRequestSchemaObject },
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.PATCHReturnRequestBody = {
    description: constants_1.RequestBodyDescriptions.PATCHReturnRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.PATCHReturnRequestSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: returns_examples_1.PATCHReturnRequestResponseExample.SUCCESS,
                },
            },
        },
    },
};
exports.PATCHReturnRequestSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHReturnRequestSpecification,
    description: constants_1.SpecificationDescriptions.PATCHReturnRequestSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'ReturnRequest instance PATCH success',
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.POSTDisputeRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTDisputeRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.POSTDisputeSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: returns_examples_1.POSTDisputeResponseExamples.SUCCESS,
                },
            },
        },
    },
};
exports.POSTDisputeSpecifications = {
    summary: constants_1.SpecificationSummaries.POSTDisputeSpecifications,
    description: constants_1.SpecificationDescriptions.POSTDisputeSpecifications,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Successful ReturnDispute Creation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.DisputeSchemaObject,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: returns_examples_1.POSTDisputeResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.GETDisputeSpecification = {
    summary: constants_1.SpecificationSummaries.GETDisputeSpecification,
    description: constants_1.SpecificationDescriptions.GETDisputeSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.SUCCESS]: {
            description: 'ReturnDispute Instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: schemas_1.DisputeSchemaObject },
                        },
                    },
                },
            },
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
exports.PATCHDisputeRequestBody = {
    description: constants_1.RequestBodyDescriptions.PATCHDisputeRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.PATCHDisputeSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: returns_examples_1.PATCHDisputeResponseExample.SUCCESS,
                },
            },
        },
    },
};
exports.PATCHDisputeSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHDisputeSpecification,
    description: constants_1.SpecificationDescriptions.PATCHDisputeSpecification,
    responses: {
        [service_response_codes_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'ReturnDispute instance PATCH success',
        },
        [service_response_codes_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [service_response_codes_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [service_response_codes_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [service_response_codes_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
    },
};
//# sourceMappingURL=returns-specifications.js.map