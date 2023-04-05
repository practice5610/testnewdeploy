import { APIResponseMessages } from '../../../constants';
export declare const POSTGetTaxExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            id: string;
            tax: {
                amount: number;
                precision: number;
                currency: string;
                symbol: string;
            };
        }[];
    };
};
