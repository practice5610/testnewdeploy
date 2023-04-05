export declare const POSTAddressValidationRequestBodyExamples: {
    DATA_SENT_FORMAT_1: {
        name: string;
        number: string;
        street1: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    DATA_SENT_FORMAT_2: {
        name: string;
        street1: string;
        street2: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
};
export declare const POSTShippingRateRequestBodyExamples: {
    DATA_SENT: {
        shipToAddressId: string;
        shipFromAddressId: string;
        parcels: {
            length: number;
            width: number;
            height: number;
            distance_unit: string;
            weight: number;
            mass_unit: string;
        }[];
        shipmentMethods: string[];
    };
};
export declare const POSTPurchaseRateRequestBodyExamples: {
    DATA_SENT: {
        shippoRateId: string;
        purchaserId: string;
    };
};
export declare const POSTRefundShippingRequestBodyExamples: {
    DATA_SENT: string;
};
export declare const POSTEstimateShippingCostRequestBodyExamples: {
    DATA_SENT: {
        parcel: {
            length: number;
            width: number;
            height: number;
            distance_unit: string;
            weight: number;
            mass_unit: string;
        };
        shipmentMethod: string;
        to: string;
        from: string;
    };
};
export declare const POSTShippingPolicyRequestBodyExamples: {
    DATA_SENT: {
        name: string;
        merchantId: string;
        freeShippingThresholds: never[];
    };
};
export declare const POSTShippingBoxRequestBodyExamples: {
    DATA_SENT: {
        name: string;
        unit: string;
        length: number;
        width: number;
        height: number;
    };
};
export declare const POSTShippingCheckoutRequestBodyExamples: {
    DATA_SENT: {
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
        shipToAddressId: string;
    };
};
