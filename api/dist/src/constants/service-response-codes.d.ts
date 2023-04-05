export declare enum ServiceResponseCodes {
    SUCCESS = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    RECORD_NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    RECORD_CONFLICT = 409,
    UNPROCESSABLE = 422,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    SERVICE_UNAVAILABLE = 503
}
/**
 * This enum represent a list of known error codes throwed by loopback repositories methods
 * intent to be accurate with error response codes
 */
export declare enum LoopbackErrorCodes {
    RECORD_NOT_FOUND = "ENTITY_NOT_FOUND"
}
