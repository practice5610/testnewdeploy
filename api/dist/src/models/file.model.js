"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let File = class File extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'Unite name or title of a file',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], File.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'size',
        description: 'The size of the file',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], File.prototype, "size", void 0);
File = tslib_1.__decorate([
    repository_1.model({ name: 'file', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], File);
exports.File = File;
//# sourceMappingURL=file.model.js.map