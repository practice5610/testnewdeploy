"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_CONFIGURATION = exports.REDIS_ENABLED = void 0;
const globals_1 = require("@boom-platform/globals");
exports.REDIS_ENABLED = globals_1.processEnvBoolean(process.env.REDIS_ENABLED);
exports.REDIS_CONFIGURATION = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || '6379',
};
//# sourceMappingURL=redis-config.js.map