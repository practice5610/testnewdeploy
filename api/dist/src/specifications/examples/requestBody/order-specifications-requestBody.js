"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHORdersByIdRequestBody = void 0;
const openapi_v3_1 = require("@loopback/openapi-v3");
const specification_constants_1 = require("../../../constants/specification-constants");
const models_1 = require("../../../models");
exports.PATCHORdersByIdRequestBody = {
    description: specification_constants_1.RequestBodyDescriptions.PATCHORdersByIdRequestBody,
    required: true,
    content: {
        'application/json': {
            schema: openapi_v3_1.getModelSchemaRef(models_1.Order, {
                partial: true,
                exclude: ['_id', 'createdAt'],
            }),
        },
    },
};
//# sourceMappingURL=order-specifications-requestBody.js.map