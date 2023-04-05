"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const core_1 = require("@loopback/core");
const keys_1 = require("../keys");
function authorize(roles) {
    return core_1.MethodDecoratorFactory.createDecorator(keys_1.AUTHORIZATION_METADATA_ACCESSOR, {
        roles: roles || [],
    });
}
exports.authorize = authorize;
//# sourceMappingURL=authorize.decorator.js.map