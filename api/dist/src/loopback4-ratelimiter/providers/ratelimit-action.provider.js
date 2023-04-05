"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatelimitActionProvider = void 0;
const tslib_1 = require("tslib");
// import { CoreBindings, inject, Provider } from '@loopback/core'; // *** Reenable this if the juggler part works at some point
const core_1 = require("@loopback/core");
// import { Getter, juggler } from '@loopback/repository'; // *** Reenable this if the juggler part works at some point
const repository_1 = require("@loopback/repository");
// import { Request, Response, RestApplication, HttpErrors } from '@loopback/rest';  // *** Reenable this if the juggler part works at some point
const rest_1 = require("@loopback/rest");
const RateLimit = tslib_1.__importStar(require("express-rate-limit"));
//import * as RedisStore from 'rate-limit-redis'; // *** Reenable this if the juggler part works at some point
const keys_1 = require("../keys");
let RatelimitActionProvider = class RatelimitActionProvider {
    constructor(getMetadata, 
    // @inject(CoreBindings.APPLICATION_INSTANCE) // TODO: Reenable this if the juggler part works at some point
    // private readonly application: RestApplication,
    // @inject('RateLimitSecurityBindings.CONFIG')
    config) {
        this.getMetadata = getMetadata;
        this.config = config;
        // console.log('application RateLimitSecurityBindings.CONFIG', RateLimitSecurityBindings.CONFIG); // *** Enable for testing
    }
    value() {
        return (req, resp) => this.action(req, resp);
    }
    async action(request, response) {
        const metadata = await this.getMetadata();
        // console.log('metadata', metadata); // *** Enable for testing
        //if metadata is null it means we are using the global settings - all routes, so we should continue
        if (metadata && !metadata.enabled) {
            return Promise.resolve();
        }
        // console.log('this.config', this.config); // *** Enable for testing
        // For redis datasource
        /*
        let redisDS: juggler.DataSource;
        if (this.config) {
          redisDS = (await this.application.get(`datasources.${this.config.name}`)) as juggler.DataSource; // *** the juggler returned is always null, I cannot find where this juggler is created
        }
        */
        // Perform rate limiting now
        const promise = new Promise((resolve, reject) => {
            var _a, _b;
            // First check if rate limit options available at method level
            const operationMetadata = metadata ? metadata.options : {};
            // Create options based on global config and method level config
            const opts = Object.assign({}, this.config, operationMetadata); // Merges global settings and the ones added with the decorator on the controller if one is found
            // console.log('opts', opts); // *** Enable for testing
            /*if (redisDS?.connector) { // TODO: Reenable this if the juggler part works at some point
              opts.store = new RedisStore.default({
                client: redisDS.connector._client,
              });
            }*/
            opts.message = new rest_1.HttpErrors.TooManyRequests((_b = (_a = opts.message) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : 'Method rate limit reached !');
            const limiter = RateLimit.default(opts);
            limiter(request, response, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
        await promise;
    }
};
RatelimitActionProvider = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject.getter(keys_1.RateLimitSecurityBindings.METADATA)),
    tslib_1.__param(1, core_1.inject('RateLimitSecurityBindings.CONFIG')),
    tslib_1.__metadata("design:paramtypes", [Function, Object])
], RatelimitActionProvider);
exports.RatelimitActionProvider = RatelimitActionProvider;
//# sourceMappingURL=ratelimit-action.provider.js.map