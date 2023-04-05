"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUTStoreByIDRequestBody = exports.PUTStoreByIDSpecification = exports.DELStoresByIDSpecification = exports.GETStoreByIDSpecification = exports.GETStoresSpecification = exports.GETStoresCountSpecification = exports.POSTStoreSpecification = exports.POSTStoreRequestBody = void 0;
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("../specifications/examples/responses");
const requestBody_1 = require("./examples/requestBody");
const responses_2 = require("./examples/responses");
exports.POSTStoreRequestBody = {
    description: 'Require a partial Store object',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': models_1.Store },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'request body',
                    value: requestBody_1.POSTStoreRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTStoreSpecification = {
    summary: 'Create new Store instance',
    description: 'This endpoint should be use, to create a new instance of Store in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return a Store instance result from database record.',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.Store },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_2.POSTStoreResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE(),
        [constants_1.ServiceResponseCodes.NOT_ACCEPTABLE]: responses_1.GlobalResponseExamplesBuilder.NOT_ACCEPTABLE({
            message: 'Merchant has store.',
        }),
    },
};
exports.GETStoresCountSpecification = {
    summary: 'Count Stores instances',
    description: 'This endpoint can be used to count Store records in Database, optional you can use param KEY=where VALUE={ "key": "value"}',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Store model count',
            content: {
                'application/json': {
                    schema: repository_1.CountSchema,
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_2.GETStoresCountResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETStoresSpecification = {
    summary: 'Get a list of Stores instances.',
    description: 'This endpoint should be used to request a list of Store instances, optional you can use Filter as a param. KEY=filter VALUE={ "where" : { "key" : "value" } }',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return an __array__ of __Store__ instances from database.',
            content: {
                'application/json': {
                    schema: { type: 'array', items: { 'x-ts-type': models_1.Store } },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_2.GETStoresResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETStoreByIDSpecification = {
    summary: 'Get a Store instance by ID.',
    description: 'This endpoint should be used to __request__ any __Store__ instance by his MongoDB unique identifier string. - try out with __603e712662c87e5e629220d4__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Store model instance',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.Store },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_2.GETStoreByIDResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.DELStoresByIDSpecification = {
    summary: 'Delete a Store intance by ID.',
    description: '__Warning!__ This endpoint should be used to __delete__ a __Store instance__ from database record.',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'No content success.',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PUTStoreByIDSpecification = {
    summary: 'Update the whole Store instance by ID.',
    description: 'This endpoint should be used to __UPDATE__ a __WHOLE__ Store instance. Try out with __603e712662c87e5e629220d4__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Return a APIResponse object, with the Store instance updated.',
            content: {
                'application/json': {
                    schema: models_1.Store,
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_2.PUTStoreByIDResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        //[ServiceResponseCodes.FORBIDDEN]: GlobalResponseExamplesBuilder.FORBIDDEN(), //TODO: Use this one once Store is updated to use APIResponse
        [constants_1.ServiceResponseCodes.FORBIDDEN]: {
            description: 'Return a object with an error object.',
            content: {
                'application/json': {
                    examples: {
                        [constants_1.ExampleField.FORBIDDEN]: {
                            summary: constants_1.CommonSummary.FORBIDDEN,
                            value: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
                        },
                    },
                },
            },
        },
    },
};
exports.PUTStoreByIDRequestBody = {
    description: 'Require an entire Store object to be updated.',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': models_1.Store },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'request body',
                    value: requestBody_1.PUTStoreByIDRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
//# sourceMappingURL=store-specifications.js.map