"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiterComponent = void 0;
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const providers_1 = require("./providers");
class RateLimiterComponent {
    constructor() {
        this.bindings = [];
        this.providers = {
            [keys_1.RateLimitSecurityBindings.RATELIMIT_SECURITY_ACTION.key]: providers_1.RatelimitActionProvider,
            [keys_1.RateLimitSecurityBindings.METADATA.key]: providers_1.RateLimitMetadataProvider,
        };
        this.bindings.push(core_1.Binding.bind(keys_1.RateLimitSecurityBindings.CONFIG.key).to(null));
    }
}
exports.RateLimiterComponent = RateLimiterComponent;
//# sourceMappingURL=component.js.map