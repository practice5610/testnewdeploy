import { RequestBodyDescriptions } from '../../../constants/specification-constants';
export declare const PATCHORdersByIdRequestBody: {
    description: RequestBodyDescriptions;
    required: boolean;
    content: {
        'application/json': {
            schema: import("@loopback/openapi-v3").SchemaRef;
        };
    };
};
