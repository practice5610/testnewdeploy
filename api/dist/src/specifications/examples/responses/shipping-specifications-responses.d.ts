import { APIResponseMessages } from '../../../constants';
export declare const POSTAddressValidationExamples: {
    SUCCESS_MISSING_APT: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            address: {
                object_id: string;
                name: string;
                number: string;
                street1: string;
                street2: string;
                city: string;
                state: string;
                zip: string;
                country: string;
                is_complete: boolean;
            };
            is_valid: boolean;
            messages: {
                source: string;
                code: string;
                type: string;
                text: string;
            }[];
        };
    };
    SUCCESS_NO_SUGGESTIONS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            address: {
                object_id: string;
                name: string;
                number: string;
                street1: string;
                street2: string;
                city: string;
                state: string;
                zip: string;
                country: string;
                is_complete: boolean;
            };
            is_valid: boolean;
            messages: null;
        };
    };
};
export declare const POSTShippingRateExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            shippo_id: string;
            attributes: string[];
            amount: {
                amount: number;
                precision: number;
                currency: string;
                symbol: string;
            };
            provider: string;
            service: string;
            service_token: string;
            estimated_days: number;
            duration_terms: string;
        }[];
    };
};
export declare const POSTPurchaseRateExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: string;
    };
};
export declare const GETShippoTransactionExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            status: string;
            createdAt: number;
            updatedAt: number;
            shippo_id: string;
            rate: string;
            label_url: string;
            eta: null;
            tracking_number: string;
            tracking_status: string;
            tracking_url_provider: string;
        };
    };
};
export declare const GETShippingLabelsExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: string[];
    };
};
export declare const POSTRefundShippingExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: string;
    };
};
export declare const POSTEstimateShippingCostExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            amount: number;
            precision: number;
            currency: string;
            symbol: string;
        };
    };
};
export declare const GETShippingOrderExample: {
    SUCCESS: {
        _id: string;
        createdAt: number;
        updatedAt: number;
        shippo_id: string;
        trackingNumber: string;
        trackingLink: null;
        price: {
            amount: number;
            precision: number;
            currency: string;
            symbol: string;
        };
        purchaser: string;
        status: string;
    };
};
export declare const POSTShippingPolicyExample: {
    SUCCESS: {
        _id: string;
        createdAt: number;
        updatedAt: number;
        name: string;
        merchantId: string;
        freeShippingThresholds: never[];
    };
};
export declare const POSTShippingBoxExample: {
    SUCCESS: {
        success: boolean;
        message: string;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
            name: string;
            merchantId: string;
            unit: string;
            length: number;
            width: number;
            height: number;
        };
    };
};
export declare const GETShippingPolicyExample: {
    SUCCESS: {
        _id: string;
        createdAt: number;
        updatedAt: number;
        name: string;
        merchantId: string;
        freeShippingThresholds: never[];
    };
};
export declare const POSTShippingCheckoutExample: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            orderGroups: {
                store: string;
                rates: {
                    shippo_id: string;
                    attributes: string[];
                    amount: {
                        amount: number;
                        precision: number;
                        currency: string;
                        symbol: string;
                    };
                    provider: string;
                    service: string;
                    service_token: string;
                    estimated_days: number;
                    duration_terms: string;
                }[];
                bookings: {
                    _id: string;
                    createdAt: number;
                    updatedAt: number;
                    type: string;
                    item: {
                        _id: string;
                        createdAt: number;
                        updatedAt: number;
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
                            address: string;
                            _geoloc: {
                                lng: number;
                                lat: number;
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
                        attributes: {};
                        _tags: never[];
                        objectID: string;
                        packageDetails: {
                            weight: number;
                            massUnit: string;
                            boxId: string;
                            itemsPerBox: number;
                            shipsFrom: string;
                        };
                        shippingPolicy: string;
                        status: string;
                    };
                    quantity: number;
                    status: string;
                    memberUID: string;
                    visits: number;
                }[];
                shippable: boolean;
            }[];
            failedBookings: never[];
        };
    };
};
