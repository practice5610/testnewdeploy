import { SchemaObject } from '@loopback/openapi-v3';
export declare const ProfileImageSchema: {
    readonly type: "object";
    readonly description: "Profile's image";
    readonly properties: {
        readonly imgUrl: {
            readonly type: "string";
            readonly minLength: 2;
        };
        readonly imgFile: {
            readonly type: "object";
            readonly nullable: true;
        };
        readonly base64Data: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly previewImgUrl: {
            readonly type: "string";
            readonly nullable: true;
        };
        readonly previewBase64Data: {
            readonly type: "string";
            readonly nullable: true;
        };
    };
    readonly required: readonly [];
    readonly additionalProperties: false;
};
export declare const ProfileImageSchemaObject: SchemaObject;
