"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Image = class Image extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'uploadedBy',
        description: '',
        /**
         * What info is gathered here? Name? IP Address?
         */
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "uploadedBy", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'fileName',
        description: 'The unique name of the image file',
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "fileName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'path',
        description: 'The path where the image file can be found (i.e. C:Users\boomPictures)',
        /**
         * not sure with the u, b, and p are yellow... Does that negatively affect anything?
         */
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "path", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "modifiedAt", void 0);
Image = tslib_1.__decorate([
    repository_1.model({ name: 'images', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Image);
exports.Image = Image;
//# sourceMappingURL=image.model.js.map