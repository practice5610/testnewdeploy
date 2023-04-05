"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTSmsAppRequestBody = exports.POSTSmsAppSpecification = void 0;
const openapi_v3_1 = require("@loopback/openapi-v3");
const constants_1 = require("../constants");
const responses_1 = require("./examples/responses");
exports.POSTSmsAppSpecification = {
    summary: 'Send SMS with links to download Boom mobile app.',
    description: '__Return and API response instance if send sms successful.__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: 'Successful SMS',
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': Object,
                    },
                    [constants_1.ExampleField.SUCCESS]: {
                        success: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.POSTSmsAppResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.RECORD_CONFLICT]: responses_1.GlobalResponseExamplesBuilder.RECORD_CONFLICT({}),
        [constants_1.ServiceResponseCodes.UNPROCESSABLE]: responses_1.GlobalResponseExamplesBuilder.UNPROCESSABLE({
            description: 'Missing or additional properties on data sent',
        }),
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.POSTSmsAppRequestBody = {
    description: 'Object contain re-catchat token and phone number of the user.',
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.jsonToSchemaObject({
                type: 'object',
                properties: {
                    token: {
                        type: 'string',
                    },
                    phone: {
                        type: 'string',
                    },
                },
                required: ['token', 'phone'],
                maxProperties: 2,
                minProperties: 2,
            }),
            examples: {
                [constants_1.ExampleField.SUCCESS]: {
                    summary: 'Request with correct value',
                    value: {
                        token: 'reCapchat token here',
                        phone: '+13054443322',
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=sms-specifications.js.map