import { CommonSummary, ServiceResponseCodes } from '../constants';
import { Store } from '../models';
export declare const POSTStoreRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': typeof Store;
            };
            examples: {
                success: {
                    summary: string;
                    value: {
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
                        fein: number;
                        years: number;
                        storeType: string;
                        links: string[];
                        _tags: string[];
                        _geoloc: {};
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
            };
        };
    };
};
export declare const POSTStoreSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Store;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
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
                                fein: number;
                                years: number;
                                storeType: string;
                                links: string[];
                                _tags: string[];
                                _geoloc: {};
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
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        422: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        properties: {
                            code: {
                                type: string;
                            };
                            details: {
                                type: string;
                            };
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                        type: string;
                    };
                    examples: {
                        unprocessable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                    code: string;
                                    details: {
                                        path: string;
                                        code: string;
                                        message: string;
                                        info: {
                                            missingProperty: string;
                                        };
                                    }[];
                                };
                            };
                        };
                    };
                };
            };
        };
        406: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        notAcceptable: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETStoresCountSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: "object";
                        title: string;
                        'x-typescript-type': string;
                        properties: {
                            count: {
                                type: "number";
                            };
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: import("../constants").APIResponseMessages;
                                data: {
                                    count: number;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const GETStoresSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        items: {
                            'x-ts-type': typeof Store;
                        };
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: ({
                                _id: string;
                                companyName: string;
                                emails: string[];
                                phoneNumber: string;
                                city: string;
                                state: string;
                                country: string;
                                objectID: null;
                                createdAt: number;
                                updatedAt: number;
                                companyLogoUrl: null;
                                coverImageUrl: null;
                                companyType: string;
                                companyDescription: string;
                                links: never[];
                                _tags: never[];
                                _geoloc: {
                                    lat: string;
                                    lng: string;
                                };
                                openingTime: number;
                                closingTime: number;
                                days: string[];
                                merchant: {
                                    uid: string;
                                    firstName: string;
                                    lastName: string;
                                    name?: undefined;
                                };
                                number?: undefined;
                                street1?: undefined;
                                street2?: undefined;
                                zip?: undefined;
                                fein?: undefined;
                                years?: undefined;
                                storeType?: undefined;
                            } | {
                                _id: string;
                                companyName: string;
                                emails: string[];
                                phoneNumber: string;
                                city: string;
                                state: string;
                                country: string;
                                objectID: null;
                                createdAt: number;
                                updatedAt: number;
                                companyLogoUrl: string;
                                coverImageUrl: null;
                                companyType: string;
                                companyDescription: string;
                                links: never[];
                                _tags: never[];
                                _geoloc: {
                                    lat: number;
                                    lng: number;
                                };
                                openingTime: number;
                                closingTime: number;
                                days: string[];
                                merchant: {
                                    uid: string;
                                    firstName: string;
                                    lastName: string;
                                    name?: undefined;
                                };
                                number?: undefined;
                                street1?: undefined;
                                street2?: undefined;
                                zip?: undefined;
                                fein?: undefined;
                                years?: undefined;
                                storeType?: undefined;
                            } | {
                                _id: string;
                                companyName: string;
                                emails: string[];
                                phoneNumber: string;
                                number: null;
                                street1: null;
                                street2: null;
                                city: string;
                                state: string;
                                zip: string;
                                country: string;
                                objectID: null;
                                createdAt: number;
                                updatedAt: number;
                                companyLogoUrl: null;
                                coverImageUrl: null;
                                companyType: string;
                                companyDescription: string;
                                fein: null;
                                years: null;
                                storeType: null;
                                links: never[];
                                _tags: never[];
                                _geoloc: {
                                    lat: number;
                                    lng: number;
                                };
                                openingTime: number;
                                closingTime: number;
                                days: string[];
                                merchant: {
                                    uid: string;
                                    firstName: string;
                                    lastName: string;
                                    name?: undefined;
                                };
                            } | {
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
                                objectID: null;
                                createdAt: number;
                                updatedAt: number;
                                companyLogoUrl: string;
                                coverImageUrl: string;
                                companyType: string;
                                companyDescription: string;
                                fein: number;
                                years: number;
                                storeType: string;
                                links: string[];
                                _tags: string[];
                                _geoloc: {
                                    lat?: undefined;
                                    lng?: undefined;
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
                            })[];
                        };
                    };
                };
            };
        };
    };
};
export declare const GETStoreByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        'x-ts-type': typeof Store;
                    };
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
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
                                objectID: null;
                                createdAt: number;
                                updatedAt: number;
                                companyLogoUrl: string;
                                coverImageUrl: string;
                                companyType: string;
                                companyDescription: string;
                                fein: number;
                                years: number;
                                storeType: string;
                                links: string[];
                                _tags: string[];
                                _geoloc: {};
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
                    };
                };
            };
        };
    };
};
export declare const DELStoresByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        204: {
            description: string;
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    schema: {
                        type: string;
                        properties: {
                            statusCode: {
                                type: string;
                            };
                            name: {
                                type: string;
                            };
                            message: {
                                type: string;
                            };
                        };
                    };
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                error: {
                                    statusCode: ServiceResponseCodes;
                                    name: string;
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const PUTStoreByIDSpecification: {
    summary: string;
    description: string;
    responses: {
        200: {
            description: string;
            content: {
                'application/json': {
                    schema: typeof Store;
                    examples: {
                        success: {
                            summary: CommonSummary;
                            value: {
                                success: boolean;
                                message: string;
                                result: {
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
                                    fein: number;
                                    years: number;
                                    storeType: string;
                                    links: string[];
                                    _tags: string[];
                                    _geoloc: {};
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
                        };
                    };
                };
            };
        };
        403: {
            description: string;
            content: {
                'application/json': {
                    examples: {
                        forbidden: {
                            summary: CommonSummary;
                            value: {
                                description: string;
                                content: {
                                    'application/json': {
                                        schema: {
                                            type: string;
                                            properties: {
                                                statusCode: {
                                                    type: string;
                                                };
                                                name: {
                                                    type: string;
                                                };
                                                message: {
                                                    type: string;
                                                };
                                            };
                                        };
                                        examples: {
                                            forbidden: {
                                                summary: CommonSummary;
                                                value: {
                                                    error: {
                                                        statusCode: ServiceResponseCodes;
                                                        name: string;
                                                        message: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export declare const PUTStoreByIDRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                'x-ts-type': typeof Store;
            };
            examples: {
                success: {
                    summary: string;
                    value: {
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
                        fein: number;
                        years: number;
                        storeType: string;
                        links: string[];
                        _tags: string[];
                        _geoloc: {};
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
            };
        };
    };
};
