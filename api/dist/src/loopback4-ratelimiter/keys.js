"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RATELIMIT_METADATA_ACCESSOR = exports.RateLimitSecurityBindings = void 0;
const core_1 = require("@loopback/core");
var RateLimitSecurityBindings;
(function (RateLimitSecurityBindings) {
    RateLimitSecurityBindings.RATELIMIT_SECURITY_ACTION = core_1.BindingKey.create('sf.security.ratelimit.actions');
    RateLimitSecurityBindings.METADATA = core_1.BindingKey.create('sf.security.ratelimit.operationMetadata');
    RateLimitSecurityBindings.CONFIG = core_1.BindingKey.create('sf.security.ratelimit.config');
})(RateLimitSecurityBindings = exports.RateLimitSecurityBindings || (exports.RateLimitSecurityBindings = {}));
exports.RATELIMIT_METADATA_ACCESSOR = core_1.MetadataAccessor.create('sf.security.ratelimit.operationMetadata.accessor');
//# sourceMappingURL=keys.js.map