"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELCategoriesIdSpecifications = exports.PUTCategoriesIdRequestBody = exports.PUTCategoriesIdSpecifications = exports.PATCHCategoriesIdRequestBody = exports.PATCHCategoriesIdSpecification = exports.PATCHCategoriesRequestBody = exports.PATCHCategoriesSpecification = exports.GETCategoriesIdSpecification = exports.GETCategoriesSpecification = exports.GETCategoryCountSpecification = exports.POSTCategoriesRequestBody = exports.POSTCategoriesSpecification = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
const schemas_1 = require("../validation/schemas");
const requestBody_1 = require("./examples/requestBody");
const responses_1 = require("./examples/responses");
exports.POSTCategoriesSpecification = {
    summary: constants_1.SpecificationSummaries.POSTCategoriesSpecification,
    description: constants_1.SpecificationDescriptions.POSTCategoriesSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Successful category Creation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            //data: CategorySchemaObject,
                            data: { 'x-ts-type': models_1.Category },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTCategoriesResponseExamples.SUCCESS,
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
const _a = schemas_1.CategorySchema.properties, { _id, createdAt, updatedAt } = _a, CategorySchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
const CategorySchemaObjectPartial = Object.assign(Object.assign({}, schemas_1.CategorySchemaObject), { properties: Object.assign({}, CategorySchemaPartialProperties), required: ['name', 'commissionRate', 'subCategories'] });
exports.POSTCategoriesRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTCategoriesRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: CategorySchemaObjectPartial,
            /*schema: getModelSchemaRef(Category, {
              partial: false, // Setting this to true or false makes no effect, all the time all properties are optional and here we need all of them as required
              exclude: ['_id', 'createdAt', 'updatedAt'],
            }),*/
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTCategoriesRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.GETCategoryCountSpecification = {
    summary: constants_1.SpecificationSummaries.GETCategoryCountSpecification,
    description: constants_1.SpecificationDescriptions.GETCategoryCountSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Category Instances',
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
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETCategoryCountResponseExamples.SUCCESS,
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
exports.GETCategoriesSpecification = {
    summary: constants_1.SpecificationSummaries.GETCategoriesSpecification,
    description: constants_1.SpecificationDescriptions.GETCategoriesSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Category Instances',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            //data: { type: 'array', items: CategorySchemaObject },
                            data: { type: 'array', items: { 'x-ts-type': models_1.Category } },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETCategoriesSpecificationResponseExamples.SUCCESS,
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
exports.GETCategoriesIdSpecification = {
    summary: constants_1.SpecificationSummaries.GETCategoriesIdSpecification,
    description: constants_1.SpecificationDescriptions.GETCategoriesIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Category Instance',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            success: { type: 'boolean' },
                            message: { type: 'string' },
                            //data: CategorySchemaObject,
                            data: { 'x-ts-type': models_1.Category },
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETCategoriesIdSpecificationResponseExamples.SUCCESS,
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
exports.PATCHCategoriesSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHCategoriesSpecification,
    description: constants_1.SpecificationDescriptions.PATCHCategoriesSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Category instances PATCH success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHCategoriesRequestBody = {
    description: constants_1.RequestBodyDescriptions.POSTCategoriesRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.CategorySchemaObject,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTCategoriesRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.PATCHCategoriesIdSpecification = {
    summary: constants_1.SpecificationSummaries.PATCHCategoriesIdSpecification,
    description: constants_1.SpecificationDescriptions.PATCHCategoriesIdSpecification,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Category instance PATCH success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PATCHCategoriesIdRequestBody = {
    description: constants_1.RequestBodyDescriptions.PATCHCategoriesIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: schemas_1.CategorySchemaObject,
            /*schema: getModelSchemaRef(Category, {
                  partial: false, // Setting this to true or false makes no effect, all the time all properties are optional and here we need all of them as required
                  exclude: ['_id', 'createdAt', 'updatedAt'],
                }),*/
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.PATCHCategoriesIdRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.PUTCategoriesIdSpecifications = {
    summary: constants_1.SpecificationSummaries.PUTCategoriesIdSpecifications,
    description: constants_1.SpecificationDescriptions.PUTCategoriesIdSpecifications,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Category instance PUT success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: responses_1.GlobalResponseExamplesBuilder.BAD_REQUEST(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
exports.PUTCategoriesIdRequestBody = {
    description: constants_1.RequestBodyDescriptions.PUTCategoriesIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: CategorySchemaObjectPartial,
            /*schema: getModelSchemaRef(Category, {
                    partial: false, // Setting this to true or false makes no effect, all the time all properties are optional and here we need all of them as required
                    exclude: ['_id', 'createdAt', 'updatedAt'],
                  }),*/
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.PUTCategoriesIdRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.DELCategoriesIdSpecifications = {
    summary: constants_1.SpecificationSummaries.DELCategoriesIdSpecifications,
    description: constants_1.SpecificationDescriptions.DELCategoriesIdSpecifications,
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Category instance DELETE success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        //[ServiceResponseCodes.BAD_REQUEST]: GlobalResponseExamplesBuilder.BAD_REQUEST(), // Schema Validator Error
        //[ServiceResponseCodes.UNPROCESSABLE]: GlobalResponseExamplesBuilder.UNPROCESSABLE(), // Schema Validator Error
        [constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR]: responses_1.GlobalResponseExamplesBuilder.INTERNAL_SERVER_ERROR(),
    },
};
//# sourceMappingURL=category-specifications.js.map