"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageContainer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let StorageContainer = class StorageContainer extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'The name or title of a storage container',
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], StorageContainer.prototype, "name", void 0);
StorageContainer = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], StorageContainer);
exports.StorageContainer = StorageContainer;
//# sourceMappingURL=storage-container.model.js.map