/**
 * TODO: Use helpers for testing to build the response data here
 */
import { APIResponseMessages } from '../../../constants';
export declare const POSTReturnPolicyResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            merchantID: string;
            name: string;
            description: string;
            refundsAccepted: boolean;
            autoApprove: boolean;
            costsImposed: {
                name: string;
                description: string;
                price: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
            }[];
            daysToReturn: number;
            returnMethod: string;
            returnCosts: {
                type: string;
                name: string;
                description: string;
                price: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
            }[];
        };
    };
};
export declare const POSTReturnRequestResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            customerID: string;
            merchantID: string;
            refundStatus: string;
            returnStatus: string;
            merchantPolicyID: string;
            returnReason: string[];
            customReason: string;
            returnMethod: string;
            purchaseTransactionID: string;
            returnTransactionID: string;
        };
    };
};
export declare const POSTDisputeResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            returnRequest: {
                _id: string;
                createdAt: number;
                updatedAt: number;
                customerID: string;
                merchantID: string;
                refundStatus: string;
                returnStatus: string;
                merchantPolicyID: string;
                returnReason: string[];
                customReason: string;
                returnMethod: string;
                purchaseTransactionID: string;
                returnTransactionID: string;
            };
            isOpen: boolean;
            comment: string;
        };
    };
};
export declare const PATCHReturnRequestResponseExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            returnStatus: string;
        };
    };
};
export declare const PATCHDisputeResponseExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            isOpen: boolean;
            comment: string;
        };
    };
};
