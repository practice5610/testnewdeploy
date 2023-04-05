"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeolocationSchemaObject = exports.GeolocationSchema = void 0;
exports.GeolocationSchema = {
    type: 'object',
    description: 'Geolocation',
    properties: {
        lat: { type: 'number' },
        lng: { type: 'number' },
    },
    required: ['lat', 'lng'],
    additionalProperties: false,
};
exports.GeolocationSchemaObject = Object.assign(Object.assign({}, exports.GeolocationSchema), { properties: Object.assign({}, exports.GeolocationSchema.properties), required: [...exports.GeolocationSchema.required] });
//# sourceMappingURL=geolocation.js.map