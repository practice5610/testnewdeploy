"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateLimitMetadata = exports.RateLimitMetadataProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const core_1 = require("@loopback/core");
const keys_1 = require("../keys");
let RateLimitMetadataProvider = class RateLimitMetadataProvider {
    constructor(controllerClass, methodName) {
        this.controllerClass = controllerClass;
        this.methodName = methodName;
    }
    value() {
        if (!this.controllerClass || !this.methodName)
            return;
        return getRateLimitMetadata(this.controllerClass, this.methodName);
    }
};
RateLimitMetadataProvider = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(core_1.CoreBindings.CONTROLLER_CLASS, { optional: true })),
    tslib_1.__param(1, context_1.inject(core_1.CoreBindings.CONTROLLER_METHOD_NAME, { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object, String])
], RateLimitMetadataProvider);
exports.RateLimitMetadataProvider = RateLimitMetadataProvider;
function getRateLimitMetadata(controllerClass, methodName) {
    return context_1.MetadataInspector.getMethodMetadata(keys_1.RATELIMIT_METADATA_ACCESSOR, controllerClass.prototype, methodName);
}
exports.getRateLimitMetadata = getRateLimitMetadata;
//# sourceMappingURL=ratelimit-metadata.provider.js.map