"use strict";
// TODO: Use helpers for testing to build the response data here
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTShippingCheckoutRequestBodyExamples = exports.POSTShippingBoxRequestBodyExamples = exports.POSTShippingPolicyRequestBodyExamples = exports.POSTEstimateShippingCostRequestBodyExamples = exports.POSTRefundShippingRequestBodyExamples = exports.POSTPurchaseRateRequestBodyExamples = exports.POSTShippingRateRequestBodyExamples = exports.POSTAddressValidationRequestBodyExamples = void 0;
exports.POSTAddressValidationRequestBodyExamples = {
    DATA_SENT_FORMAT_1: {
        name: 'customer name',
        number: '55',
        street1: 'weston rd ste 106',
        city: 'weston',
        state: 'fl',
        zip: '33326',
        country: 'us',
    },
    DATA_SENT_FORMAT_2: {
        name: 'customer name',
        street1: '55 weston rd',
        street2: 'ste 106',
        city: 'weston',
        state: 'fl',
        zip: '33326',
        country: 'us',
    },
};
exports.POSTShippingRateRequestBodyExamples = {
    DATA_SENT: {
        shipToAddressId: '2d1ec1fd05f7466b8c96d530a7b8dcbb',
        shipFromAddressId: '863ec64bf8aa4372885b30315457c1ea',
        parcels: [
            {
                length: 10,
                width: 15,
                height: 10,
                distance_unit: 'in',
                weight: 5,
                mass_unit: 'lb',
            },
        ],
        shipmentMethods: ['ups_ground'],
    },
};
exports.POSTPurchaseRateRequestBodyExamples = {
    DATA_SENT: {
        shippoRateId: 'e85639f2f6c84039a054ad70ac272964',
        purchaserId: 'test_uid',
    },
};
exports.POSTRefundShippingRequestBodyExamples = {
    DATA_SENT: 'ff06a23be3a84710946f7ad4ee18d15d',
};
exports.POSTEstimateShippingCostRequestBodyExamples = {
    DATA_SENT: {
        parcel: {
            length: 10,
            width: 15,
            height: 10,
            distance_unit: 'in',
            weight: 5,
            mass_unit: 'lb',
        },
        shipmentMethod: 'ups_ground',
        to: '2d1ec1fd05f7466b8c96d530a7b8dcbb',
        from: 'eb5f526a143a45f6890bcd92c792089e',
    },
};
exports.POSTShippingPolicyRequestBodyExamples = {
    DATA_SENT: {
        name: 'Standard Boom Shipping',
        merchantId: 're5OljVl3KObKLopKdxpOQBWPL82',
        freeShippingThresholds: [],
    },
};
exports.POSTShippingBoxRequestBodyExamples = {
    DATA_SENT: {
        name: 'Small square box',
        unit: 'in',
        length: 4,
        width: 4,
        height: 4,
    },
};
exports.POSTShippingCheckoutRequestBodyExamples = {
    DATA_SENT: {
        bookings: [
            {
                _id: '60539674b660181020a2a380',
                createdAt: 1616090740,
                updatedAt: 1616090740,
                type: 'product',
                item: {
                    _id: '604275ef73ce18ebc21023cd',
                    createdAt: 1600451437,
                    updatedAt: 1600451437,
                    imageUrl: 'https://via.placeholder.com/150/0000FF/808080?Text=Product_1',
                    merchantUID: 'test_merchant_1',
                    category: {
                        name: 'Books',
                        subCategories: ['Blank book/journal/diary'],
                    },
                    name: 'Product 1',
                    description: 'description for product 1. ships from weston, small box, 10 items per box, free shipping over $100',
                    store: {
                        _id: 'shippo_test',
                        companyName: 'Test Store 1',
                        address: '1315 53rd St STE 3',
                        _geoloc: {
                            lng: -80.0725,
                            lat: 26.7492,
                        },
                        merchant: {
                            uid: 'test_merchant_1',
                            firstName: 'firstName',
                            lastName: 'lastName',
                        },
                    },
                    price: {
                        amount: 2200,
                        precision: 2,
                        currency: 'USD',
                        symbol: '$',
                    },
                    attributes: {},
                    _tags: [],
                    objectID: '',
                    packageDetails: {
                        weight: 2,
                        massUnit: 'lb',
                        boxId: '603683fd73ce18ebc20bd24a',
                        itemsPerBox: 10,
                        shipsFrom: '11c1edc8e86c41d4b73ee2c5ce821fe9',
                    },
                    shippingPolicy: '60368264592e1b3abc69afe5',
                    status: 'approved',
                },
                quantity: 1,
                status: 'Active',
                memberUID: 'shippo_test_member',
                visits: 1,
            },
        ],
        shipToAddressId: '2d1ec1fd05f7466b8c96d530a7b8dcbb',
    },
};
//# sourceMappingURL=shipping-specifications-requestBody.js.map