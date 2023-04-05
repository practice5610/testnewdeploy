export declare const POSTProductsResponseExamples: {
    SUCCESS: {
        successful: {
            _id: string;
            objectID: string;
            createdAt: number;
            updatedAt: number;
            imageUrl: string;
            merchantUID: string;
            category: {
                _id: string;
                createdAt: number;
                updatedAt: number;
                name: string;
                commissionRate: number;
                subCategories: string[];
            };
            name: string;
            description: string;
            store: {
                _id: string;
                companyName: string;
                address: string;
                _geoloc: {
                    lat: number;
                    lng: number;
                };
                merchant: {
                    uid: string;
                    firstName: string;
                    lastName: string;
                };
            };
            price: {
                amount: number;
                precision: number;
                currency: string;
                symbol: string;
            };
            attributes: {
                sku: string;
                color: string;
                'shipping weight': string;
            };
            _tags: string[];
        }[];
        failed: never[];
    };
};
export declare const GETProductsCountExamples: {
    SUCCESS: {
        count: number;
    };
};
