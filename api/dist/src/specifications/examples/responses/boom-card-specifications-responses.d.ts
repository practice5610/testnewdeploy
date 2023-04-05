import { APIResponseMessages } from '../../../constants';
export declare const POSTBoomCardsLoginExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: string;
    };
};
export declare const POSTBoomCardsExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            cardNumber: string;
            status: string;
            fromBatchId: string;
        }[];
    };
};
export declare const GETBoomCardsCountExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            count: number;
        };
    };
};
export declare const GETBoomCardsExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            cardNumber: string;
            pinNumber: number;
            status: string;
            qrcode: string;
            fromBatchId: string;
            storeID: string;
            storeMerchantID: string;
            customerID: string;
        }[];
    };
};
export declare const GETBoomCardsMerchantByCardNumberExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            cardNumber: string;
            pinNumber: number;
            status: string;
            qrcode: string;
            fromBatchId: string;
            storeID: string;
            storeMerchantID: string;
            customerID: string;
        }[];
    };
};
