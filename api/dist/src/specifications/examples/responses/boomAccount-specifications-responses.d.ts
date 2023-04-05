import { APIResponseMessages } from '../../../constants';
export declare const GETBoomAccountByIDResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            status: string;
            balance: {
                amount: number;
                currency: string;
                precision: number;
            };
            customerID: string;
        };
    };
};
export declare const GETBalanceByUIDResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            amount: number;
            currency: string;
            precision: number;
        };
    };
};
