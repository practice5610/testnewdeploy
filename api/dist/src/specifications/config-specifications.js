"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELConfigIdSpecifications = exports.PATCHConfigRequestBody = exports.PATCHConfigSpecification = exports.GETConfigSpecification = exports.POSTConfigRequestBody = exports.POSTConfigSpecification = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("../constants");
const schemas_1 = require("../validation/schemas");
const requestBody_1 = require("./examples/requestBody");
const responses_1 = require("./examples/responses");
exports.POSTConfigSpecification = {
    summary: constants_1.SpecificationSummaries.POSTConfigSpecification,
    description: constants_1.SpecificationDescriptions.POSTConfigSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Config instance',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: schemas_1.ConfigSchemaObject,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTConfigExamples.SUCCESS,
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
const _a = schemas_1.ConfigSchema.properties, { _id, createdAt, updatedAt } = _a, ConfigSchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
const ConfigSchemaObjectPartial = Object.assign(Object.assign({}, schemas_1.ConfigSchemaObject), { properties: Object.assign(Object.assign({}, ConfigSchemaPartialProperties), { type: Object.assign(Object.assign({}, schemas_1.ConfigSchema.properties.type), { enum: [...schemas_1.ConfigSchema.properties.type.enum] }) }), required: [...schemas_1.ConfigSchema.required, 'type', 'value'] });
exports.POSTConfigRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTConfigRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: ConfigSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTConfigRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.GETConfigSpecification = {
    summary: constants_1.SpecificationSummaries.GETConfigSpecification,
    description: constants_1.SpecificationDescriptions.GETConfigSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Array of Config instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            data: { type: 'array', items: schemas_1.ConfigSchemaObject },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETConfigSpecificationExamples.SUCCESS,
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
exports.PATCHConfigSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHConfigSpecification,
    description: constants_1.SpecificationDescriptions.PATCHConfigSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Config instance PATCH success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHConfigRequestBody = {
    description: constants_1.RequestBodyDescriptions.PATCHCategoriesIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: ConfigSchemaObjectPartial,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.PATCHConfigRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.DELConfigIdSpecifications = {
    summary: constants_1.SpecificationSummaries.DELConfigIdSpecifications,
    description: constants_1.SpecificationDescriptions.DELConfigIdSpecifications,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Config instance DELETE success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        //[ServiceResponseCodes.BAD_REQUEST]: GlobalResponseExamplesBuilder.BAD_REQUEST(), // Schema Validator Error
        //[ServiceResponseCodes.UNPROCESSABLE]: GlobalResponseExamplesBuilder.UNPROCESSABLE(), // Schema Validator Error
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
//# sourceMappingURL=config-specifications.js.map