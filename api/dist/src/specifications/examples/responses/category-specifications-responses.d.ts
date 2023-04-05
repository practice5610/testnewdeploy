import { APIResponseMessages } from '../../../constants';
export declare const POSTCategoriesResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            name: string;
            commissionRate: number;
            subCategories: string[];
        };
    };
};
export declare const GETCategoryCountResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            count: number;
        };
    };
};
export declare const GETCategoriesSpecificationResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            name: string;
            subCategories: string[];
        }[];
    };
};
export declare const GETCategoriesIdSpecificationResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            name: string;
            subCategories: string[];
        };
    };
};
