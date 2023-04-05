"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImageSchemaObject = exports.ProfileImageSchema = void 0;
exports.ProfileImageSchema = {
    type: 'object',
    description: "Profile's image",
    properties: {
        imgUrl: { type: 'string', minLength: 2 },
        imgFile: { type: 'object', nullable: true },
        base64Data: { type: 'string', nullable: true },
        previewImgUrl: { type: 'string', nullable: true },
        previewBase64Data: { type: 'string', nullable: true },
    },
    required: [],
    additionalProperties: false,
};
exports.ProfileImageSchemaObject = Object.assign(Object.assign({}, exports.ProfileImageSchema), { properties: Object.assign({}, exports.ProfileImageSchema.properties), required: [...exports.ProfileImageSchema.required] });
//# sourceMappingURL=profileImage.js.map