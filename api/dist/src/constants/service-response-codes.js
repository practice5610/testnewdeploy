"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoopbackErrorCodes = exports.ServiceResponseCodes = void 0;
// Check https://en.wikipedia.org/wiki/List_of_HTTP_status_codes for more codes
var ServiceResponseCodes;
(function (ServiceResponseCodes) {
    ServiceResponseCodes[ServiceResponseCodes["SUCCESS"] = 200] = "SUCCESS";
    ServiceResponseCodes[ServiceResponseCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    ServiceResponseCodes[ServiceResponseCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ServiceResponseCodes[ServiceResponseCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ServiceResponseCodes[ServiceResponseCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    ServiceResponseCodes[ServiceResponseCodes["RECORD_NOT_FOUND"] = 404] = "RECORD_NOT_FOUND";
    ServiceResponseCodes[ServiceResponseCodes["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    ServiceResponseCodes[ServiceResponseCodes["RECORD_CONFLICT"] = 409] = "RECORD_CONFLICT";
    ServiceResponseCodes[ServiceResponseCodes["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
    ServiceResponseCodes[ServiceResponseCodes["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ServiceResponseCodes[ServiceResponseCodes["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    ServiceResponseCodes[ServiceResponseCodes["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
})(ServiceResponseCodes = exports.ServiceResponseCodes || (exports.ServiceResponseCodes = {}));
/**
 * This enum represent a list of known error codes throwed by loopback repositories methods
 * intent to be accurate with error response codes
 */
var LoopbackErrorCodes;
(function (LoopbackErrorCodes) {
    LoopbackErrorCodes["RECORD_NOT_FOUND"] = "ENTITY_NOT_FOUND";
})(LoopbackErrorCodes = exports.LoopbackErrorCodes || (exports.LoopbackErrorCodes = {}));
//# sourceMappingURL=service-response-codes.js.map