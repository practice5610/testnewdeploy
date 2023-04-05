"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GETBalanceByUIDSpecification = exports.GETBoomAccountByIDSpecification = void 0;
const constants_1 = require("../constants");
const models_1 = require("../models");
const responses_1 = require("./examples/responses");
exports.GETBoomAccountByIDSpecification = {
    summary: 'get a boom account instance, requested by ID',
    description: '__Return and API response instance with a single boom account in data field.__ - Try out with: __603d094d92c1c9c701241c26__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: ['BoomAccount model instance'],
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': models_1.BoomAccount,
                    },
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETBoomAccountByIDResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
        [constants_1.ServiceResponseCodes.FORBIDDEN]: responses_1.GlobalResponseExamplesBuilder.FORBIDDEN(),
    },
};
exports.GETBalanceByUIDSpecification = {
    summary: 'get Balance from a boom account instance, requested by User UID',
    description: '__Return and API response instance with the balance in data field.__ - Try out with: __lZz4ZtR4ycUvIXZt0bMlWm4ClOf2__',
    responses: {
        [constants_1.ServiceResponseCodes.SUCCESS]: {
            description: ['Boom account'],
            content: {
                'application/json': {
                    examples: {
                        [constants_1.ExampleField.SUCCESS]: {
                            summary: constants_1.CommonSummary.SUCCESS,
                            value: responses_1.GETBalanceByUIDResponseExamples.SUCCESS,
                        },
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=boomAccount-specifications.js.map