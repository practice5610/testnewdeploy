"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELBookingByIDSpecification = exports.PATCHBookingByIDRequestBody = exports.PATCHBookingByIDSpecification = exports.GETBookingByIDSpecification = exports.PATCHBookingsRequestBody = exports.PATCHBookingsFilteredSpecification = exports.GETBookingsSpecification = exports.GETBookingsCountSpecification = exports.POSTBookingsSpecification = void 0;
const openapi_v3_1 = require("@loopback/openapi-v3");
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
exports.POSTBookingsSpecification = {
    summary: 'Bookings creation.',
    description: 'This endpoint should be use, to __create__ one or more Bookings instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Booking model instance',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTBookingsResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE({
            description: 'List of missing or additional properties in a Booking instance.',
        }),
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.GETBookingsCountSpecification = {
    summary: 'Bookings count.',
    description: 'This endpoint should be use, to __Count__ Bookings instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Count of Booking instance',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETBookingsCountResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.GETBookingsSpecification = {
    summary: 'List all bookings, if member all bookings only related to this current member.',
    description: 'This endpoint should be use, to __GET__ a List of Bookings instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Array of Booking model instances',
            content: {
                'application/json': {
                    schema: { type: 'array', items: { 'x-ts-type': models_1.Booking } },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETBookingsResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PATCHBookingsFilteredSpecification = {
    summary: 'Update bookings instance by Filter conditions.',
    description: 'This endpoint should be use, to __Update Bookings__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Bookings PATCH instance',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.PATCHBookingsResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PATCHBookingsRequestBody = {
    description: 'Object containing the fields for the existing Bookings',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.Booking, {
                partial: true,
                exclude: ['_id', 'createdAt', 'updatedAt'],
            }),
        },
    },
};
exports.GETBookingByIDSpecification = {
    summary: 'Get a Booking instance by ID.',
    description: 'This endpoint should be used to __request__ any __Booking__ instance by his MongoDB unique identifier string. - try out with __5fe9f9be5d4f0b1945cc47a3__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Booking model instance',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.Booking },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETBookingByIDResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        //[ServiceResponseCodes.RECORD_NOT_FOUND]: GlobalResponseExamplesBuilder.RECORD_NOT_FOUND(), // TODO: Once Bookings controller is updated check if we can use this global
        [constants_1.ServiceResponseCodes.BAD_REQUEST]: {
            //TODO: it seems that this needs to be RECORD_NOT_FOUND
            description: 'ENTITY_NOT_FOUND',
            content: {
                'application/json': {
                    examples: {
                        [constants_1.ExampleField.RECORD_NOT_FOUND]: {
                            summary: constants_1.CommonSummary.RECORD_NOT_FOUND,
                            value: responses_1.GETBookingByIDResponseExamples.NOT_FOUND,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PATCHBookingByIDSpecification = {
    summary: 'Update a single Booking instance by ID.',
    description: 'This endpoint should be use, to __update__ a __single product__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Booking PATCH success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.PATCHBookingByIDRequestBody = {
    description: 'Object containing the fields for the Booking with the id received',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.Booking, {
                partial: true,
                exclude: ['_id', 'createdAt', 'updatedAt'],
            }),
        },
    },
};
exports.DELBookingByIDSpecification = {
    summary: 'Delete a single Booking instance by ID.',
    description: 'This endpoint should be use, to __Delete__ a __single product__ instances in database.',
    responses: {
        [constants_1.ServiceResponseCodes.NO_CONTENT]: {
            description: 'Booking DEL success',
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
//# sourceMappingURL=booking-specifications.js.map