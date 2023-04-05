import { APIResponse, ServiceResponse } from '../types';
/**
 * Helper function to build an APIResponse success:false with a custom message and no data involved.
 * @param {string} message custom message.
 * @return APIResponse success: false, message: message.
 */
export declare const APIResponseFalseOutput: (message?: string | undefined) => APIResponse;
/**
 * Helper function that formats the response based on the status code received from a Service
 * This must be used only inside Controllers (Services must return a ServiceResponse object - api\src\types\service.ts)
 * @param {string} message custom message.
 * @return APIResponse success: false, message: message.
 */
export declare const handleServiceResponseResult: <T>(result: ServiceResponse<T>) => T | undefined;
