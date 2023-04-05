import { SchemaObject } from '@loopback/openapi-v3';
export declare const GeolocationSchema: {
    readonly type: "object";
    readonly description: "Geolocation";
    readonly properties: {
        readonly lat: {
            readonly type: "number";
        };
        readonly lng: {
            readonly type: "number";
        };
    };
    readonly required: readonly ["lat", "lng"];
    readonly additionalProperties: false;
};
export declare const GeolocationSchemaObject: SchemaObject;
