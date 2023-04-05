import { CommonSummary } from '../constants';
import { Order } from '../models';
export declare const POSTPlaceOrderSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': ObjectConstructor;
                    };
                };
            };
        };
    };
};
export declare const POSTPlaceOrderRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': typeof Order;
            };
            examples: {
                success: {
                    summary: CommonSummary;
                    value: {
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
                    };
                };
            };
        };
    };
};
