"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTAdminUserRequestBody = exports.POSTAdminUserSpecification = exports.GETTransferReceiverProfileSpecification = exports.POSTUsersVerifyPhoneNumberRequestBody = exports.POSTUsersVerifyPhoneNumberSpecification = exports.GETAdminUserSpecification = exports.GETAdminUsersSpecification = void 0;
const constants_1 = require("../constants");
const schemas_1 = require("../validation/schemas");
const requestBody_1 = require("./examples/requestBody");
const responses_1 = require("./examples/responses");
exports.GETAdminUsersSpecification = {
    summary: constants_1.SpecificationSummaries.GETAdminUsersSpecification,
    description: constants_1.SpecificationDescriptions.GETAdminUsersSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Array of users instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: schemas_1.ProfileSchema },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETAdminUsersResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.GETAdminUserSpecification = {
    summary: constants_1.SpecificationSummaries.GETAdminUserSpecification,
    description: constants_1.SpecificationDescriptions.GETAdminUserSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'BoomUser instance',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.ProfileSchema,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETAdminUserResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.ProfileResponseMessages.NO_PROFILE_FOUND,
        }),
        [constants_1.ServiceResponseCodes.RECORD_CONFLICT]: responses_1.GlobalResponseExamplesBuilder.RECORD_CONFLICT({
            message: constants_1.ProfileResponseMessages.MISSING_PROFILE_PARAMETERS,
        }),
    },
};
exports.POSTUsersVerifyPhoneNumberSpecification = {
    summary: constants_1.SpecificationSummaries.POSTUsersVerifyPhoneNumberSpecification,
    description: constants_1.SpecificationDescriptions.POSTUsersVerifyPhoneNumberSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'BoomUser instance',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.ProfileSchema,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTUsersVerifyPhoneNumberExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST({
            // Schema Validator Error and from the controller
            message: constants_1.ProfileResponseMessages.NAME_DOESNT_MATCH,
        }),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR({
            message: constants_1.ProfileResponseMessages.ACCOUNT_NAME_CANNOT_BE_CONFIRMED,
        }),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.ProfileResponseMessages.PHONE_NUMBER_WITHOUT_ACCOUNT,
        }),
        [constants_1.ServiceResponseCodes.RECORD_CONFLICT]: responses_1.GlobalResponseExamplesBuilder.RECORD_CONFLICT({
            message: constants_1.ProfileResponseMessages.MISSING_PROFILE_PARAMETERS,
        }),
    },
};
exports.POSTUsersVerifyPhoneNumberRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTUsersVerifyPhoneNumberRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.VerifyPhoneNumberSchemaObject,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Request with correct value',
                    value: requestBody_1.POSTUsersVerifyPhoneNumberRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.GETTransferReceiverProfileSpecification = {
    summary: constants_1.SpecificationSummaries.GETTransferReceiverProfileSpecification,
    description: constants_1.SpecificationDescriptions.GETTransferReceiverProfileSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: '"name" and "profileImg" from receiver user instance.',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: {
                                type: 'object',
                                properties: {
                                    firstName: schemas_1.ProfileSchema.properties.firstName,
                                    lastName: schemas_1.ProfileSchema.properties.lastName,
                                    profileImg: schemas_1.ProfileSchema.properties.profileImg,
                                },
                                additionalProperties: false,
                            },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: [constants_1.CommonSummary.SUCCESS],
                            value: responses_1.GETUserTransferReceiverProfileExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
        [constants_1.ServiceResponseCodes.UNAUTHORIZED]: responses_1.GlobalResponseExamplesBuilder.UNAUTHORIZED(),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND,
        }),
    },
};
exports.POSTAdminUserSpecification = {
    summary: constants_1.SpecificationSummaries.POSTAdminUserSpecification,
    description: constants_1.SpecificationDescriptions.POSTAdminUserSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'userRecord',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'object', description: "User's object provided by Firebase" },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTAdminUserExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST({
            // Schema Validator Error and from the controller
            message: constants_1.GlobalResponseMessages.INVALID_ROLE,
        }),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR({
            message: '<Messages returned by Firebase>',
        }),
        [constants_1.ServiceResponseCodes.RECORD_NOT_FOUND]: responses_1.GlobalResponseExamplesBuilder.RECORD_NOT_FOUND({
            message: constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND,
        }),
    },
};
exports.POSTAdminUserRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTAdminUserRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.CreateUserSchemaObject,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Request with correct value',
                    value: requestBody_1.POSTAdminUserRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
//# sourceMappingURL=user-specifications.js.map