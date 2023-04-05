"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const authorization_1 = require("./authorization");
const loopback4_ratelimiter_1 = require("./loopback4-ratelimiter");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject, rateLimitAction, authenticateRequest, checkAuthorization) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
        this.rateLimitAction = rateLimitAction;
        this.authenticateRequest = authenticateRequest;
        this.checkAuthorization = checkAuthorization;
        /**
         * Optional invoker for registered middleware in a chain.
         * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
         */
        this.invokeMiddleware = () => false;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const finished = await this.invokeMiddleware(context);
            if (finished)
                return;
            const route = this.findRoute(request);
            const args = await this.parseParams(request, route);
            // rate limit Action here
            await this.rateLimitAction(request, response);
            let authUser;
            //http://localhost:3000/api/v1/ping This endpoint gives ctor issues on my side
            let isAccessAllowed = route.path === '/' || route.path.indexOf('/explorer') >= 0;
            if (!isAccessAllowed) {
                if (request.headers.authorization) {
                    const token = request.headers.authorization.split('Bearer ')[1];
                    authUser = await this.authenticateRequest(token);
                }
                else {
                    authUser = await this.authenticateRequest(null); // so we can use AuthorizatonBindings.CURRENT_USER on routes which don't receive a token like : /categories
                }
                // If no set of roles is passed, then the provider will check if it is a public route
                isAccessAllowed = await this.checkAuthorization(authUser ? authUser.roles : null);
            }
            if (!isAccessAllowed) {
                throw new rest_1.HttpErrors.Forbidden("Not Allowed Access" /* NotAllowedAccess */);
            }
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            this.reject(context, err);
        }
    }
};
tslib_1.__decorate([
    context_1.inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true }),
    tslib_1.__metadata("design:type", Function)
], MySequence.prototype, "invokeMiddleware", void 0);
MySequence = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
    tslib_1.__param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
    tslib_1.__param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
    tslib_1.__param(3, context_1.inject(SequenceActions.SEND)),
    tslib_1.__param(4, context_1.inject(SequenceActions.REJECT)),
    tslib_1.__param(5, context_1.inject(loopback4_ratelimiter_1.RateLimitSecurityBindings.RATELIMIT_SECURITY_ACTION)),
    tslib_1.__param(6, context_1.inject(authorization_1.AuthorizatonBindings.AUTHENTICATE_ACTION)),
    tslib_1.__param(7, context_1.inject(authorization_1.AuthorizatonBindings.AUTHORIZE_ACTION)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map