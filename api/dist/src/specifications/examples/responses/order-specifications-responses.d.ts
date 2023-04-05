import { APIResponseMessages } from '../../../constants';
export declare const GETOrdersCountResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: import("@loopback/repository").Count;
    };
};
export declare const GETOrdersResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: {
            createdAt: number;
            updatedAt: number;
            orderGroups: {
                _id: string;
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
                            emails: string[];
                            phoneNumber: string;
                            number: string;
                            street1: string;
                            street2: string;
                            city: string;
                            state: string;
                            zip: string;
                            country: string;
                            pin: number;
                            createdAt: number;
                            updatedAt: number;
                            companyLogoUrl: string;
                            coverImageUrl: string;
                            companyType: string;
                            companyDescription: string;
                            links: string[];
                            _tags: string[];
                            _geoloc: {
                                lat: number;
                                lng: number;
                            };
                            openingTime: number;
                            closingTime: number;
                            days: string[];
                            merchant: {
                                uid: string;
                                name: string;
                                firstName: string;
                                lastName: string;
                            };
                        };
                    };
                    quantity: number;
                    status: string;
                    memberUID: string;
                    visits: number;
                }[];
                shippable: boolean;
                selectedRate: {
                    shippo_id: string;
                    attributes: never[];
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
                };
            }[];
            shipToAddress: {
                number: string;
                street1: string;
                street2: string;
                city: string;
                state: string;
                zip: string;
                country: string;
            };
            customerUID: string;
            transactions: {
                _id: {
                    $oid: string;
                };
                createdAt: number;
                type: string;
                status: string;
                amount: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                sender: {
                    uid: string;
                    firstName: string;
                    lastName: string;
                    roles: string[];
                    contact: {
                        phoneNumber: string;
                        emails: string[];
                    };
                    profileImg: {};
                };
                receiver: {
                    _id: string;
                    companyName: string;
                    city: string;
                    number: string;
                    street1: string;
                    street2: string;
                    state: string;
                    zip: string;
                };
                taxcode: {
                    country: string;
                    state: string;
                    county: string;
                    city: string;
                };
                salestax: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                boomAccountID: string;
                purchaseItem: {
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
                        emails: string[];
                        phoneNumber: string;
                        number: string;
                        street1: string;
                        street2: string;
                        city: string;
                        state: string;
                        zip: string;
                        country: string;
                        pin: number;
                        createdAt: number;
                        updatedAt: number;
                        companyLogoUrl: string;
                        coverImageUrl: string;
                        companyType: string;
                        companyDescription: string;
                        links: string[];
                        _tags: string[];
                        _geoloc: {
                            lat: number;
                            lng: number;
                        };
                        openingTime: number;
                        closingTime: number;
                        days: string[];
                        merchant: {
                            uid: string;
                            name: string;
                            firstName: string;
                            lastName: string;
                        };
                    };
                };
                booking: {
                    _id: string;
                    createdAt: number;
                    updatedAt: number;
                    type: string;
                    quantity: number;
                    status: string;
                    visits: number;
                };
                commissionCollected: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                shippingOrderId: string;
                shortId: string;
            }[];
        };
    };
};
export declare const GETOrdersByIdResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: string;
        data: {
            _id: string;
            createdAt: number;
            updatedAt: number;
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
                            emails: string[];
                            phoneNumber: string;
                            number: string;
                            street1: string;
                            street2: string;
                            city: string;
                            state: string;
                            zip: string;
                            country: string;
                            pin: number;
                            createdAt: number;
                            updatedAt: number;
                            companyLogoUrl: string;
                            coverImageUrl: string;
                            companyType: string;
                            companyDescription: string;
                            links: string[];
                            _tags: string[];
                            _geoloc: {
                                lat: number;
                                lng: number;
                            };
                            openingTime: number;
                            closingTime: number;
                            days: string[];
                            merchant: {
                                uid: string;
                                name: string;
                                firstName: string;
                                lastName: string;
                            };
                        };
                    };
                    quantity: number;
                    status: string;
                    memberUID: string;
                    visits: number;
                }[];
                shippable: boolean;
                selectedRate: {
                    shippo_id: string;
                    attributes: never[];
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
                };
            }[];
            shipToAddress: {
                number: string;
                street1: string;
                street2: string;
                city: string;
                state: string;
                zip: string;
                country: string;
            };
            customerUID: string;
            transactions: {
                _id: string;
                createdAt: number;
                type: string;
                status: string;
                amount: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                sender: {
                    uid: string;
                    firstName: string;
                    lastName: string;
                    roles: string[];
                    contact: {
                        phoneNumber: string;
                        emails: string[];
                    };
                    profileImg: {};
                };
                receiver: {
                    _id: string;
                    companyName: string;
                    city: string;
                    number: string;
                    street1: string;
                    street2: string;
                    state: string;
                    zip: string;
                };
                taxcode: {
                    country: string;
                    state: string;
                    county: string;
                    city: string;
                };
                salestax: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                boomAccountID: string;
                purchaseItem: {
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
                        emails: string[];
                        phoneNumber: string;
                        number: string;
                        street1: string;
                        street2: string;
                        city: string;
                        state: string;
                        zip: string;
                        country: string;
                        pin: number;
                        createdAt: number;
                        updatedAt: number;
                        companyLogoUrl: string;
                        coverImageUrl: string;
                        companyType: string;
                        companyDescription: string;
                        links: string[];
                        _tags: string[];
                        _geoloc: {
                            lat: number;
                            lng: number;
                        };
                        openingTime: number;
                        closingTime: number;
                        days: string[];
                        merchant: {
                            uid: string;
                            name: string;
                            firstName: string;
                            lastName: string;
                        };
                    };
                };
                booking: {
                    _id: string;
                    createdAt: number;
                    updatedAt: number;
                    type: string;
                    quantity: number;
                    status: string;
                    visits: number;
                };
                commissionCollected: {
                    amount: number;
                    precision: number;
                    currency: string;
                    symbol: string;
                };
                shippingOrderId: string;
                shortId: string;
            }[];
        };
    };
};
