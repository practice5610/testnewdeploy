"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServiceResponseResult = exports.APIResponseFalseOutput = void 0;
const rest_1 = require("@loopback/rest");
const constants_1 = require("../constants");
/**
 * Helper function to build an APIResponse success:false with a custom message and no data involved.
 * @param {string} message custom message.
 * @return APIResponse success: false, message: message.
 */
const APIResponseFalseOutput = (message) => {
    return {
        success: false,
        message: message ? message : constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
    };
};
exports.APIResponseFalseOutput = APIResponseFalseOutput;
/**
 * Helper function that formats the response based on the status code received from a Service
 * This must be used only inside Controllers (Services must return a ServiceResponse object - api\src\types\service.ts)
 * @param {string} message custom message.
 * @return APIResponse success: false, message: message.
 */
const handleServiceResponseResult = (result) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // console.log('cehckkkresult', result);
    switch (result.statusCode) {
        case constants_1.ServiceResponseCodes.SUCCESS:
            return result.data;
        case constants_1.ServiceResponseCodes.NO_CONTENT:
            return;
        case constants_1.ServiceResponseCodes.BAD_REQUEST:
            console.log('WARNING!! This CODE is used by the Schema validators too');
            throw new rest_1.HttpErrors.BadRequest((_a = result.message) !== null && _a !== void 0 ? _a : constants_1.APIResponseMessages.BAD_REQUEST);
        case constants_1.ServiceResponseCodes.UNAUTHORIZED:
            throw new rest_1.HttpErrors.Unauthorized((_b = result.message) !== null && _b !== void 0 ? _b : constants_1.APIResponseMessages.UNAUTHORIZED);
        case constants_1.ServiceResponseCodes.FORBIDDEN:
            console.log('WARNING!! This CODE must not be used, reserved for Schema validators (Alternative UNAUTHORIZED)');
            throw new rest_1.HttpErrors.Forbidden((_c = result.message) !== null && _c !== void 0 ? _c : constants_1.APIResponseMessages.FORBIDDEN);
        case constants_1.ServiceResponseCodes.RECORD_NOT_FOUND:
            console.log('WARNING!! This CODE is used by the Schema validators too');
            throw new rest_1.HttpErrors.NotFound((_d = result.message) !== null && _d !== void 0 ? _d : constants_1.APIResponseMessages.RECORD_NOT_FOUND);
        case constants_1.ServiceResponseCodes.UNPROCESSABLE:
            console.log('WARNING!! This CODE must not be used, reserved for Schema validators (Alternative BAD_REQUEST)');
            throw new rest_1.HttpErrors.UnprocessableEntity((_e = result.message) !== null && _e !== void 0 ? _e : constants_1.APIResponseMessages.UNPROCESSABLE);
        case constants_1.ServiceResponseCodes.RECORD_CONFLICT:
            throw new rest_1.HttpErrors.Conflict((_f = result.message) !== null && _f !== void 0 ? _f : constants_1.APIResponseMessages.RECORD_CONFLICT);
        case constants_1.ServiceResponseCodes.NOT_IMPLEMENTED:
            throw new rest_1.HttpErrors.Conflict((_g = result.message) !== null && _g !== void 0 ? _g : constants_1.APIResponseMessages.NOT_IMPLEMENTED);
        case constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR:
            throw new rest_1.HttpErrors.InternalServerError((_h = result.message) !== null && _h !== void 0 ? _h : constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        default:
            throw new rest_1.HttpErrors.InternalServerError((_j = result.message) !== null && _j !== void 0 ? _j : constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
    }
};
exports.handleServiceResponseResult = handleServiceResponseResult;
//# sourceMappingURL=service-response-helpers.js.map