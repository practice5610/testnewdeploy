"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELProductByIDSpecification = exports.PATCHProductByIDRequestBody = exports.PATCHProductByIDSpecification = exports.GETProductByIDSpecification = exports.GETProductsSpecification = exports.GETProductsCountSpecification = exports.POSTProductsRequestBody = exports.POSTProductsSpecification = exports.POSTProductSourceDobaResumeSpecification = exports.POSTProductSourceDobaSpecification = void 0;
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
exports.POSTProductSourceDobaSpecification = {
    summary: 'Converts Doba product xml into smaller json files of 1,000 products each.',
    description: 'This endpoint should be used, __ONLY__ to upload __DOBA PRODUCT CATALOG__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Product model instance',
            content: { 'application/json': { schema: { 'x-ts-type': Object } } },
        },
    },
};
exports.POSTProductSourceDobaResumeSpecification = {
    summary: 'Converts Doba product xml into smaller json files of 1,000 products each.',
    description: 'This endpoint should be used, __ONLY__ to upload __DOBA PRODUCT CATALOG__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Product model instance',
            content: { 'application/json': { schema: { 'x-ts-type': Object } } },
        },
    },
};
exports.POSTProductsSpecification = {
    summary: 'Create new Products instances',
    description: 'This endpoint should be use, to create a new instances of Products in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Product model instance',
            content: {
                'application/json': {
                    schema: {
                        type: 'array',
                        items: {
                            'x-ts-type': models_1.Product,
                        },
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTProductsResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.POSTProductsRequestBody = {
    description: 'Require an array of products instances.',
    content: {
        'application/json': {
            schema: {
                type: 'array',
                items: {
                    'x-ts-type': models_1.Product,
                },
                example: ['str1', 'str2', 'str3'],
            },
        },
    },
};
exports.GETProductsCountSpecification = {
    summary: 'Get a count of products.',
    description: 'This endpoint should be use, to __request__ a __Count of Products__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return a CountSchema with the count of products requested.',
            content: {
                'application/json': {
                    schema: repository_1.CountSchema,
                    [constants_1.ExampleField.SUCCESS]: {
                        success: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETProductsCountExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.GETProductsSpecification = {
    summary: 'Get a list of products.',
    description: 'This endpoint should be use, to __request__ an __array of products__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Array of Product model instances',
            content: {
                'application/json': {
                    schema: { type: 'array', items: { 'x-ts-type': models_1.Product } },
                },
            },
        },
    },
};
exports.GETProductByIDSpecification = {
    summary: 'Get a single product instance by ID.',
    description: 'This endpoint should be use, to __request__ a __single product__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Product model instance',
            content: { 'application/json': { schema: { 'x-ts-type': models_1.Product } } },
        },
    },
};
exports.PATCHProductByIDSpecification = {
    summary: 'Update a single product instance by ID.',
    description: 'This endpoint should be use, to __update__ a __single product__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Product PATCH success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PATCHProductByIDRequestBody = {
    content: {
        'application/json': {
            schema: rest_1.getModelSchemaRef(models_1.Product, {
                partial: true,
                exclude: ['_id', 'objectID', 'createdAt', 'merchantUID'],
            }),
        },
    },
};
exports.DELProductByIDSpecification = {
    summary: 'Delete a single product instance by ID.',
    description: 'This endpoint should be use, to __DELETE__ a __single product__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Product DELETE success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
//# sourceMappingURL=product-specifications.js.map