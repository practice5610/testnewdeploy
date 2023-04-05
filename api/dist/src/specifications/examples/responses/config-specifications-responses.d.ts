import { APIResponseMessages } from '../../../constants';
export declare const POSTConfigExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            type: string;
            label: string;
            value: {
                key1: string;
                key2: string;
            };
        };
    };
};
export declare const GETConfigSpecificationExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            type: string;
            label: string;
            value: {
                b7Y8uNIbpInpei3vfV0QJ: {
                    purchasePrice: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    label: string;
                    name: string;
                };
                'tAQv5T-L3qjEgEAQQjSIV': {
                    purchasePrice: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    label: string;
                    name: string;
                };
                oPAmLRahdC7203Z1fKCBo: {
                    purchasePrice: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    label: string;
                };
                "DNR_iN0--1uSi_krur5IO": {
                    purchasePrice: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    label: string;
                };
            };
        }[];
    };
};
