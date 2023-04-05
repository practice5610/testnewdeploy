import { APIResponseMessages } from '../../../constants';
export declare const POSTBookingsResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            valids: {
                _id: string;
                createdAt: number;
                updatedAt: number;
                type: string;
                item: {
                    _id: string;
                    createdAt: number;
                    updatedAt: number;
                    cashBackPerVisit: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    conditions: string[];
                    description: string;
                    maxQuantity: number;
                    maxVisits: number;
                    startDate: number;
                    title: string;
                    product: {
                        _id: string;
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
                        status: string;
                        quantity: number;
                    };
                    expiration: number;
                };
                quantity: number;
                status: string;
                memberUID: string;
                visits: number;
            }[];
            invalids: never[];
        };
    };
};
export declare const GETBookingsCountResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            count: number;
        };
    };
};
export declare const GETBookingsResponseExamples: {
    SUCCESS: {
        _id: string;
        createdAt: number;
        updatedAt: number;
        type: string;
        item: {
            _id: string;
            imageUrl: string;
            merchantUID: string;
            category: {
                name: string;
                subCategories: string[];
            };
            name: string;
            description: string;
            store: {
                _id: string;
                companyName: string;
                merchant: {
                    uid: string;
                    name: string;
                    firstName: string;
                    lastName: string;
                };
                country: string;
                state: string;
                city: string;
                zip: string;
                number: string;
                street1: string;
                street2: string;
                _geoloc: {
                    lat: number;
                    lng: number;
                };
            };
            price: {
                amount: number;
                precision: number;
                currency: string;
                symbol: string;
            };
            attributes: {
                upc: number;
                product_id: number;
                item_id: number;
                stock: string;
                supplier_id: number;
                supplier_name: string;
                brand_name: string;
                item_sku: string;
                ship_weight: number;
                warranty: string;
            };
            _tags: never[];
        };
        quantity: number;
        status: string;
        memberUID: string;
        visits: number;
    }[];
};
export declare const PATCHBookingsResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            count: number;
        };
    };
};
export declare const GETBookingByIDResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            type: string;
            item: {
                _id: string;
                _tags: never[];
                imageUrl: string;
                merchantUID: string;
                name: string;
                description: string;
                price: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                category: {
                    _id: string;
                    createdAt: number;
                    updatedAt: number;
                    name: string;
                    subCategories: string[];
                };
                packageDetails: {
                    weight: number;
                    massUnit: string;
                    boxId: string;
                    itemsPerBox: number;
                    shipsFrom: string;
                };
                shippingPolicy: string;
                status: string;
                store: {
                    _id: string;
                    companyName: string;
                    merchant: {
                        uid: string;
                        name: string;
                        firstName: string;
                        lastName: string;
                    };
                    country: string;
                    state: string;
                    city: string;
                    zip: string;
                    number: string;
                    street1: string;
                    street2: string;
                    _geoloc: {
                        lat: number;
                        lng: number;
                    };
                };
            };
            quantity: number;
            status: string;
            memberUID: string;
            visits: number;
        };
    };
    NOT_FOUND: {
        error: {
            statusCode: number;
            name: string;
            message: {
                code: string;
                entityName: string;
                entityId: string;
            };
        };
    };
};
