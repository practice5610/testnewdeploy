"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTShippingCheckoutSpecification = exports.POSTShippingCheckoutRequestBody = exports.GETShippingPolicySpecification = exports.POSTShippingBoxSpecification = exports.POSTShippingPolicySpecification = exports.GETShippingBoxSpecification = exports.POSTShippingBoxRequestBody = exports.POSTShippingPolicyRequestBody = exports.GETShippingOrderSpecification = exports.POSTEstimateShippingSpecification = exports.POSTEstimateShippingRequestBody = exports.POSTRefundShippingSpecification = exports.POSTRefundShippingRequestBody = exports.GETShippingLabelsSpecification = exports.GETShippoTransactionSpecification = exports.POSTPurchaseRateSpecification = exports.POSTPurchaseRateRequestBody = exports.POSTGetRatesSpecification = exports.POSTGetRatesRequestBody = exports.POSTAddressValidationSpecification = exports.POSTAddressValidationRequestBody = void 0;
const globals_1 = require("@boom-platform/globals");
const openapi_v3_1 = require("@loopback/openapi-v3");
const constants_1 = require("../constants");
const models_1 = require("../models");
const schemas_1 = require("../validation/schemas");
const requestBody_1 = require("./examples/requestBody");
const responses_1 = require("./examples/responses");
exports.POSTAddressValidationRequestBody = {
    description: 'An AddressInfo Object including the name',
    required: true,
    content: {
        'application/json': {
            //schema: AddressInfoSchemaObject,
            schema: Object.assign(Object.assign({}, schemas_1.AddressInfoSchemaObject), { required: ['name', 'street1', 'city', 'state', 'zip'] }),
            examples: {
                formatOne: {
                    // [ExampleField.SUCCESS]
                    summary: 'Request body with address split between number and street1',
                    value: requestBody_1.POSTAddressValidationRequestBodyExamples.DATA_SENT_FORMAT_1,
                },
                formatTwo: {
                    // [ExampleField.SUCCESS]
                    summary: 'Request body that does not use "number"',
                    value: requestBody_1.POSTAddressValidationRequestBodyExamples.DATA_SENT_FORMAT_2,
                },
            },
        },
    },
};
exports.POSTAddressValidationSpecification = {
    summary: 'Validate a new Address',
    description: 'Every shipping address saved by Boom needs to be validated here.' +
        ' A unique id (AddressInfo.object_id) for the address will be returned,' +
        ' along with wether or not the address is valid and a list of messages ' +
        'suggesting improvements, like if Shippo thinks the address is missing' +
        ' an apartment number.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the AddressInfo with suggested changes as an AddressValidationResponse wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        // [ExampleField.SUCCESS]
                        successWithSuggestion: {
                            summary: 'On success, with suggestion messages',
                            value: responses_1.POSTAddressValidationExamples.SUCCESS_MISSING_APT,
                        },
                        // [ExampleField.SUCCESS]
                        successWithNoSuggestion: {
                            summary: 'On success, with no messages',
                            value: responses_1.POSTAddressValidationExamples.SUCCESS_NO_SUGGESTIONS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTGetRatesRequestBody = {
    description: 'A GetRatesRequest Object',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'object',
                description: 'a request body to get rates for a shipment',
                required: ['shipToAddressId', 'shipFromAddressId', 'parcels'],
                additionalProperties: false,
                properties: {
                    shipToAddressId: {
                        type: 'string',
                        description: 'Shippo id of the address the parcels will be shipped to',
                        minLength: 1,
                    },
                    shipFromAddressId: {
                        type: 'string',
                        description: 'Shippo id of the address the parcels will be shipped from',
                        minLength: 1,
                    },
                    parcels: {
                        type: 'array',
                        description: 'an array of parcels to be shipped',
                        items: {
                            type: 'object',
                            description: 'parcel data for a box to be shipped',
                            required: ['length', 'width', 'height', 'weight', 'distance_unit', 'mass_unit'],
                            properties: {
                                length: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                width: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                height: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                weight: {
                                    type: 'number',
                                    minimum: 0,
                                },
                                distance_unit: {
                                    type: 'string',
                                    pattern: globals_1.DistanceUnitRegex.source,
                                },
                                mass_unit: {
                                    type: 'string',
                                    pattern: globals_1.MassUnitRegex.source,
                                },
                            },
                        },
                    },
                    extra: {
                        type: 'object',
                        description: 'Extras object to specify extra shipping services',
                    },
                    returnAll: {
                        type: 'boolean',
                        description: 'include true here to get every rate returned',
                    },
                    shipmentMethods: {
                        type: 'array',
                        description: 'optional list of shippment methods to get rates for',
                        items: {
                            type: 'string',
                            description: 'ShipmentMethod to include',
                            pattern: globals_1.ShipmentMethodsRegex.source,
                        },
                    },
                },
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'GetRatesRequest object that includes an optional shipmentMethods list',
                    value: requestBody_1.POSTShippingRateRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTGetRatesSpecification = {
    summary: 'Find rates for a given shipment',
    description: 'This will try to find rates for the given parcels shipped between the given addresses. See the GetRatesRequest documentation for more info',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a list of rates available to the user, wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: 'On success, with two rates',
                            value: responses_1.POSTShippingRateExamples.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTPurchaseRateRequestBody = {
    description: 'A PurchaseRateRequest Object',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'object',
                required: ['shippoRateId', 'purchaserId'],
                additionalProperties: false,
                description: 'purchase rate request body',
                properties: {
                    shippoRateId: {
                        type: 'string',
                        description: 'the shippo id of the chosen rate',
                        minLength: 1,
                    },
                    purchaserId: {
                        type: 'string',
                        description: 'the uid of the user paying for shipping',
                        minLength: 1,
                    },
                    labelFileType: {
                        type: 'string',
                        description: 'the format to create the label in. Default is set in shippo settings',
                        pattern: globals_1.ShippingLabelFileTypeRegex.source,
                    },
                },
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'PurchaseRateRequest object with the id of the chosen rate and the uid of the purchaser',
                    value: requestBody_1.POSTPurchaseRateRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTPurchaseRateSpecification = {
    summary: 'Purchase a Shippo rate',
    description: 'This will purchase the given rate and create a new ShippingOrder with shipping transaction details',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the _id of the new ShippingOrder, wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTPurchaseRateExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETShippoTransactionSpecification = {
    summary: 'Get details of a shippo transaction',
    description: 'This will get the details of a Shippo transaction. The transaction can be found ' +
        'with the shippo_id of the Shippo transaction OR with the _id of the ShippingOrder ' +
        'that matches the Shippo transaction',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the Shippo transaction data wrapped in an APIResponse, including ' +
                'the tracking number and sometimes the eta of the package',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETShippoTransactionExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETShippingLabelsSpecification = {
    summary: 'Get urls for the labels of all packages in a given shipment',
    description: 'This will get a list of urls. Normally there will only be one url in the list but ' +
        'it is possible that there are multiple labels for one shipment',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a list of urls wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETShippingLabelsExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTRefundShippingRequestBody = {
    description: 'The shippo_id of a shipment to cancel',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': String },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'The shippo_id of the shipment to cancel',
                    value: requestBody_1.POSTRefundShippingRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTRefundShippingSpecification = {
    summary: 'Refund a Shippo transaction',
    description: "This will try to refund a shipping transaction if the label hasn't been used. If a refund can " +
        'not be immediately processed it is changed to pending and this still returns success.',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns an APIResponse for a refund that was immediately approved and did not have to go to pending',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTRefundShippingExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTEstimateShippingRequestBody = {
    description: 'A EstimateRateRequest Object',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'object',
                description: 'Shipping estimate request body',
                required: ['parcel', 'shipmentMethod', 'to', 'from'],
                additionalProperties: false,
                properties: {
                    parcel: {
                        type: 'object',
                        description: 'parcel data for a box to be shipped',
                        required: ['length', 'width', 'height', 'weight', 'distance_unit', 'mass_unit'],
                        properties: {
                            length: {
                                type: 'number',
                                minimum: 0,
                            },
                            width: {
                                type: 'number',
                                minimum: 0,
                            },
                            height: {
                                type: 'number',
                                minimum: 0,
                            },
                            weight: {
                                type: 'number',
                                minimum: 0,
                            },
                            distance_unit: {
                                type: 'string',
                                pattern: globals_1.DistanceUnitRegex.source,
                            },
                            mass_unit: {
                                type: 'string',
                                pattern: globals_1.MassUnitRegex.source,
                            },
                        },
                    },
                    shipmentMethod: {
                        type: 'string',
                        description: 'Shipment Method to estimate',
                        pattern: globals_1.ShipmentMethodsRegex.source,
                    },
                    to: {
                        type: 'string',
                        description: 'shippo id of destination address',
                        minLength: 1,
                    },
                    from: {
                        type: 'string',
                        description: 'shippo id of merchant address',
                        minLength: 1,
                    },
                },
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Estimate request body',
                    value: requestBody_1.POSTEstimateShippingCostRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTEstimateShippingSpecification = {
    summary: 'Estimate the cost of a shipment',
    description: 'This will get the price to ship a package between any two addresses (using their object_ids) using a specific shipmentMethod',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the _id of the new ShippingOrder, wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTEstimateShippingCostExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETShippingOrderSpecification = {
    summary: 'Get a ShippingOrder',
    description: 'Gets a ShippingOrder',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a ShippingOrder',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.ShippingOrder },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETShippingOrderExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTShippingPolicyRequestBody = {
    description: 'A ShippingPolicy Object',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': models_1.ShippingPolicy },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'The new ShippingPolicy to create',
                    value: requestBody_1.POSTShippingPolicyRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTShippingBoxRequestBody = {
    description: 'A ShippingBox Object',
    required: true,
    content: {
        'application/json': {
            schema: { 'x-ts-type': models_1.ShippingBox },
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: constants_1.CommonSummary.SUCCESS,
                    value: requestBody_1.POSTShippingBoxRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.GETShippingBoxSpecification = {
    summary: 'Get a list of ShippingBox',
    description: 'Gets a list of ShippingBox',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Get a list ShippingBox',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.ShippingBox },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTShippingPolicySpecification = {
    summary: 'Create a new ShippingPolicy',
    description: 'Creates a new record containing the given ShippingPolicy',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the new ShippingPolicy',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.ShippingPolicy },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTShippingPolicyExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.POSTShippingBoxSpecification = {
    summary: 'Create a new ShippingBox',
    description: 'Creates a new record containing the given ShippingBox',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns the new ShippingBox',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.ShippingBox },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTShippingBoxExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
exports.GETShippingPolicySpecification = {
    summary: 'Get a ShippingPolicy',
    description: 'This gets a ShippingPolicy by _id',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a ShippingPolicy',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': models_1.ShippingPolicy },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETShippingPolicyExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
/*
This is not working as expected and doesn't allow to set all required fields correctly
const testSchemaObject: SchemaObject = {
  definitions: getModelSchemaRef(Booking).definitions,
  type: 'object',
  description: 'Shipping checkout request body',
  required: ['bookings', 'shipToAddressId'],
  additionalProperties: false,
  properties: {
    bookings: {
      type: 'array',
      description: 'List of bookings to get shipping for',
      items: { $ref: '#/definitions/Booking' },
      minItems: 1,
    },
    booking: { $ref: '#/definitions/Booking' },
    shipToAddressId: {
      type: 'string',
      description: 'shippo address id that the bookings will be shipped to',
      minLength: 1,
    },
  },
};
*/
const ShippingCheckoutSchemaObject = {
    type: 'object',
    description: 'Shipping checkout request body',
    properties: {
        bookings: {
            type: 'array',
            description: 'List of bookings to get shipping for',
            items: Object.assign(Object.assign({}, schemas_1.BookingSchemaObject), { properties: Object.assign({}, schemas_1.BookingSchemaObject.properties), required: [
                    ...schemas_1.BookingSchema.required,
                    '_id',
                    'type',
                    'item',
                    'quantity',
                    'status',
                    'memberUID',
                    'visits',
                ] }),
            minItems: 1,
        },
        shipToAddressId: {
            type: 'string',
            description: 'Shippo address id that the bookings will be shipped to',
            minLength: 2,
        },
    },
    required: ['bookings', 'shipToAddressId'],
    additionalProperties: false,
};
exports.POSTShippingCheckoutRequestBody = {
    description: 'A ShippingCheckoutRequest Object',
    required: true,
    content: {
        'application/json': {
            //schema: testSchemaObject,
            schema: ShippingCheckoutSchemaObject,
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'ShippingCheckoutRequest object with a list of bookings and the uid of the buyer',
                    value: requestBody_1.POSTShippingCheckoutRequestBodyExamples.DATA_SENT,
                },
            },
        },
    },
};
exports.POSTShippingCheckoutSpecification = {
    summary: 'Prices to ship a list of bookings',
    description: 'This will group bookings into units that can ship together (or that have to be picked up together), ' +
        'then returns each of those groups of bookings along with the available rates for each group',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Returns a list of OrderGroups wrapped in an APIResponse',
            content: {
                'application/json': {
                    schema: { 'x-ts-type': Object },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTShippingCheckoutExample.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=shipping-specifications.js.map