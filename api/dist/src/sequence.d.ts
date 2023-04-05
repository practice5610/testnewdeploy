import { FindRoute, InvokeMethod, InvokeMiddleware, ParseParams, Reject, RequestContext, Send, SequenceHandler } from '@loopback/rest';
import { AuthenticateFn, AuthorizeFn } from './authorization';
import { RateLimitAction } from './loopback4-ratelimiter';
export declare class MySequence implements SequenceHandler {
    protected findRoute: FindRoute;
    protected parseParams: ParseParams;
    protected invoke: InvokeMethod;
    send: Send;
    reject: Reject;
    protected rateLimitAction: RateLimitAction;
    protected authenticateRequest: AuthenticateFn;
    protected checkAuthorization: AuthorizeFn;
    /**
     * Optional invoker for registered middleware in a chain.
     * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
     */
    protected invokeMiddleware: InvokeMiddleware;
    constructor(findRoute: FindRoute, parseParams: ParseParams, invoke: InvokeMethod, send: Send, reject: Reject, rateLimitAction: RateLimitAction, authenticateRequest: AuthenticateFn, checkAuthorization: AuthorizeFn);
    handle(context: RequestContext): Promise<void>;
}
