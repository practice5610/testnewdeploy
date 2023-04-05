"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUTSetTaxableStatesRequestBody = exports.POSTGetTaxableProductRequestBody = exports.PUTSetTaxableStatesSpecification = exports.POSTGetTaxableProductSpecification = void 0;
const globals_1 = require("@boom-platform/globals");
const openapi_v3_1 = require("@loopback/openapi-v3");
const constants_1 = require("../constants");
const requestBody_1 = require("./examples/requestBody");
const responses_1 = require("./examples/responses");
exports.POSTGetTaxableProductSpecification = {
    summary: 'get taxes for a list of bookings',
    description: 'MISSING DESCRIPTION',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a list of taxes',
            context: {
                'application/json': {
                    schema: { type: 'array', items: { 'x-ts-type': Object } },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTGetTaxExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.PUTSetTaxableStatesSpecification = {
    summary: 'MISSING SUMMARY',
    description: 'MISSING DESCRIPTION',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Taxable States PUT success',
        },
    },
};
exports.POSTGetTaxableProductRequestBody = {
    description: 'An array of items to calculate taxes for. Includes a booking id, to address, from address, and cost',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'toAddress'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'The id of a booking',
                            minLength: 1,
                        },
                        toAddress: {
                            type: 'object',
                            required: ['address', 'city', 'state', 'country'],
                            description: 'Address of the purchaser',
                            properties: {
                                address: {
                                    type: 'string',
                                    description: 'street address',
                                    minLength: 1,
                                },
                                city: {
                                    type: 'string',
                                    description: 'city',
                                    minLength: 1,
                                },
                                state: {
                                    type: 'string',
                                    description: 'state',
                                    pattern: globals_1.TaxRegionsRegex.source,
                                },
                                country: {
                                    type: 'string',
                                    description: 'country',
                                    minLength: 1,
                                },
                            },
                        },
                    },
                },
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Request with one item',
                    value: requestBody_1.POSTGetTaxRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.PUTSetTaxableStatesRequestBody = {
    description: 'An array of tax nexus (locations) that the user calling this endpoint pays taxes in',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'array',
                description: 'A tax nexus array',
                items: {
                    required: ['country', 'state'],
                    properties: {
                        country: {
                            type: 'string',
                            description: 'Two-letter ISO country code for nexus region',
                            pattern: globals_1.TaxCountriesRegex.source,
                        },
                        state: {
                            type: 'string',
                            description: 'Two-letter ISO region code for nexus region',
                            pattern: globals_1.TaxRegionsRegex.source,
                        },
                    },
                },
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Request with two states',
                    value: requestBody_1.PUTTaxableStatesRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
//# sourceMappingURL=tax-specifications.js.map