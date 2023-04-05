"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.givenReturnDispute = exports.givenReturnRequest = exports.givenReturnPolicy = exports.givenTransferReceiverProfileData = exports.givenCustomerBilling = exports.givenBoomAccount = exports.givenBoomCard = exports.givenBoomAccountVerifyResponse = exports.givenCount = exports.givenTaxResponse = exports.givenCategory = exports.givenBankInfo = exports.givenMoney = exports.givenPlaidEntry = exports.givenBookings = exports.givenOfferBooking = exports.givenProductBooking = exports.givenSuperAdmin = exports.givenAdmin = exports.givenCustomer = exports.givenMerchant = exports.givenStore = exports.givenPackageDetails = exports.givenShippingBox = exports.givenShippingPolicy = exports.givenProduct = exports.givenOffer = exports.givenEmptyDatabase = void 0;
const globals_1 = require("@boom-platform/globals");
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const nanoid_1 = require("nanoid");
const repositories_1 = require("../../repositories");
const testdb_datasource_1 = require("../fixtures/datasources/testdb.datasource");
async function givenEmptyDatabase() {
    await new repositories_1.ProductRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.CategoryRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.BookingRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.BoomCardRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.BoomAccountRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.OfferRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ReviewRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.StoreRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.TransactionRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ConfigRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.BankInfoRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.CustomerBillingRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ShippingBoxRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ShippingOrderRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ShippingPolicyRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ReturnPolicyRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ReturnRequestRepository(testdb_datasource_1.testdb).deleteAll();
    await new repositories_1.ReturnDisputeRepository(testdb_datasource_1.testdb).deleteAll();
}
exports.givenEmptyDatabase = givenEmptyDatabase;
const _givenPackageDetailsData = (data) => {
    return {
        weight: 200,
        massUnit: globals_1.MassUnit.GRAM,
        boxId: nanoid_1.nanoid(),
        itemsPerBox: 10,
        shipsFrom: nanoid_1.nanoid(),
    };
};
const _givenShippingPolicyData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 1574617668, updatedAt: 1574617668, name: 'Default shipping policy', merchantId: nanoid_1.nanoid() }, data);
};
const _givenShippingBoxData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 1574617668, updatedAt: 1574617668, name: 'Small box', length: 8, width: 3, height: 3, unit: globals_1.DistanceUnit.INCH, merchantId: nanoid_1.nanoid() }, data);
};
const _givenStoreData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), companyName: 'store name', emails: ['store@email.com'], phoneNumber: '7774441111', number: '111', street1: 'N Stetson Ave', city: 'Boca Raton', state: 'FL', zip: '33333', country: 'US', companyLogoUrl: 'company.com/logo', coverImageUrl: 'company.com/coverimage', companyType: 'Fake', companyDescription: 'test company', years: 0, fein: 123, storeType: 'online' }, data);
};
const _givenOfferData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 1574617668, updatedAt: 1606240106, cashBackPerVisit: { amount: 1000, precision: 2, currency: 'USD', symbol: '$' }, description: 'offer-description', maxQuantity: 5, maxVisits: 5, merchantUID: nanoid_1.nanoid(), startDate: 1574617668, title: 'offer-title', expiration: 1921772868 }, data);
};
const _givenProductData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), objectID: nanoid_1.nanoid(), createdAt: 1574617668, updatedAt: 1606240106, imageUrl: 'www.testurl.com', price: { amount: 2000, precision: 2, currency: 'USD', symbol: '$' }, name: 'name', description: 'a-product-description', merchantUID: nanoid_1.nanoid(), category: {
            _id: '5d12bf519eb1641840519334',
            name: 'Apparel, shoes, jewelry',
            subCategories: ['Accessories'],
        }, attributes: {}, _tags: ['tag'], packageDetails: _givenPackageDetailsData(data === null || data === void 0 ? void 0 : data.packageDetails), shippingPolicy: nanoid_1.nanoid(), status: globals_1.ProductStatus.APPROVED, quantity: 1 }, data);
};
const _givenUserData = (data) => {
    return Object.assign({ uid: nanoid_1.nanoid(), firstName: 'John', lastName: 'Doe', contact: {
            phoneNumber: '+1 555 555 5555',
            emails: ['john@email.com'],
        }, addresses: [
            {
                number: '1977',
                street1: 'Main Street',
                city: 'New York',
                state: 'NY',
                zip: '12233',
                country: 'US',
            },
        ], createdAt: 0, updatedAt: 0, roles: [], boomAccounts: [] }, data);
};
const _givenBookingData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 1574617668, updatedAt: 1606240106, type: globals_1.BookingTypes.OFFER, quantity: 5, status: globals_1.BookingStatus.ACTIVE, memberUID: nanoid_1.nanoid(), visits: 0 }, data);
};
const _givenBankInfoData = (data) => {
    return Object.assign({ createdAt: 0, updatedAt: 0, plaidID: nanoid_1.nanoid(), accountNumber: nanoid_1.nanoid(), routingNumber: nanoid_1.nanoid(), wireRoutingNumber: nanoid_1.nanoid(), plaidItemID: nanoid_1.nanoid(), plaidAccessToken: nanoid_1.nanoid(), name: 'Test Checking Account', userID: nanoid_1.nanoid(), accountOwner: {
            phone: '6505559999',
            names: ['David Byrne'],
            address: '1977 main st',
            city: 'NYC',
            state: 'New York',
            zip: '12233',
            emails: ['david@website.com'],
            gotInfoFromBank: true,
        }, balances: {
            available: 300,
            current: 300,
            limit: null,
        } }, data);
};
const _givenReturnPolicyData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 0, updatedAt: 0, merchantID: nanoid_1.nanoid(), name: 'Test Policy', description: 'Test Policy Description', refundsAccepted: false, autoApprove: false, daysToReturn: 30, returnMethod: returns_1.ReturnMethod.SHIP, returnCosts: [
            {
                name: 'Shipping Fee',
                description: 'Fee for shipping label',
                price: {
                    amount: 2000,
                    precision: 2,
                    currency: 'USD',
                    symbol: '$',
                },
                type: returns_1.ReturnCostType.SHIPPING,
            },
        ] }, data);
};
const _givenReturnRequestData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 0, updatedAt: 0, merchantID: nanoid_1.nanoid(), customerID: nanoid_1.nanoid(), returnStatus: returns_1.Status.REQUESTED, merchantPolicyID: nanoid_1.nanoid(), returnReason: [returns_1.ReturnReason.WRONG_ITEM], returnMethod: returns_1.ReturnMethod.SHIP, purchaseTransactionID: nanoid_1.nanoid(), returnTransactionID: '001' }, data);
};
const _givenReturnDisputeData = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), createdAt: 0, updatedAt: 0, returnRequest: {
            _id: nanoid_1.nanoid(),
            createdAt: 0,
            updatedAt: 0,
            merchantID: nanoid_1.nanoid(),
            customerID: nanoid_1.nanoid(),
            returnStatus: returns_1.Status.REQUESTED,
            merchantPolicyID: nanoid_1.nanoid(),
            returnReason: [returns_1.ReturnReason.WRONG_ITEM],
            returnMethod: returns_1.ReturnMethod.SHIP,
            purchaseTransactionID: nanoid_1.nanoid(),
            returnTransactionID: '001',
        }, isOpen: true, comment: 'Wrong item sent, merchant refuses to replace for correct item or return/refund' }, data);
};
const givenOffer = async (data) => {
    const product = await exports.givenProduct();
    const offer = _givenOfferData(Object.assign({ product }, data));
    return new repositories_1.OfferRepository(testdb_datasource_1.testdb).create(offer);
};
exports.givenOffer = givenOffer;
const givenProduct = async (data) => {
    const store = await exports.givenStore();
    return new repositories_1.ProductRepository(testdb_datasource_1.testdb).create(_givenProductData(Object.assign(Object.assign({}, data), { store })));
};
exports.givenProduct = givenProduct;
const givenShippingPolicy = async (data) => {
    return new repositories_1.ShippingPolicyRepository(testdb_datasource_1.testdb).create(_givenShippingPolicyData(data));
};
exports.givenShippingPolicy = givenShippingPolicy;
const givenShippingBox = async (data) => {
    return new repositories_1.ShippingBoxRepository(testdb_datasource_1.testdb).create(_givenShippingBoxData(data));
};
exports.givenShippingBox = givenShippingBox;
const givenPackageDetails = (data) => {
    return Object.assign({ weight: 5, massUnit: globals_1.MassUnit.OUNCE, boxId: nanoid_1.nanoid(), itemsPerBox: 5, shipsFrom: nanoid_1.nanoid() }, data);
};
exports.givenPackageDetails = givenPackageDetails;
const givenStore = async (data) => {
    const merchant = exports.givenMerchant();
    return new repositories_1.StoreRepository(testdb_datasource_1.testdb).create(_givenStoreData(Object.assign(Object.assign({}, data), { merchant })));
};
exports.givenStore = givenStore;
const givenMerchant = (data) => {
    return _givenUserData(Object.assign(Object.assign({}, data), { roles: [globals_1.RoleKey.Merchant] }));
};
exports.givenMerchant = givenMerchant;
const givenCustomer = (data) => {
    return _givenUserData(Object.assign(Object.assign({}, data), { roles: [globals_1.RoleKey.Member] }));
};
exports.givenCustomer = givenCustomer;
const givenAdmin = (data) => {
    return _givenUserData(Object.assign(Object.assign({}, data), { roles: [globals_1.RoleKey.Admin] }));
};
exports.givenAdmin = givenAdmin;
const givenSuperAdmin = (data) => {
    return _givenUserData(Object.assign(Object.assign({}, data), { roles: [globals_1.RoleKey.SuperAdmin] }));
};
exports.givenSuperAdmin = givenSuperAdmin;
const givenProductBooking = async (data) => {
    const product = _givenProductData(data === null || data === void 0 ? void 0 : data.item);
    return new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData(Object.assign(Object.assign({}, data), { item: product, type: globals_1.BookingTypes.PRODUCT })));
};
exports.givenProductBooking = givenProductBooking;
const givenOfferBooking = async (data) => {
    var _a;
    const product = _givenProductData((_a = data === null || data === void 0 ? void 0 : data.item) === null || _a === void 0 ? void 0 : _a.product);
    const offer = _givenOfferData({ product: product });
    return new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData(Object.assign(Object.assign({}, data), { item: offer, type: globals_1.BookingTypes.OFFER })));
};
exports.givenOfferBooking = givenOfferBooking;
const givenBookings = async (bookings) => {
    let bookingsData = [];
    if (bookings) {
        for (const booking of bookings) {
            const offer = await exports.givenOffer();
            const newBooking = await new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData(Object.assign(Object.assign({}, booking), { item: offer })));
            bookingsData.push(newBooking);
        }
    }
    else {
        const offer1 = await exports.givenOffer();
        const offer2 = await exports.givenOffer();
        const offer3 = await exports.givenOffer();
        const offer4 = await exports.givenOffer();
        const booking1 = await new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData({ item: offer1 }));
        const booking2 = await new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData({ item: offer2 }));
        const booking3 = await new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData({ item: offer3 }));
        const booking4 = await new repositories_1.BookingRepository(testdb_datasource_1.testdb).create(_givenBookingData({ item: offer4 }));
        bookingsData = [booking1, booking2, booking3, booking4];
    }
    return bookingsData;
};
exports.givenBookings = givenBookings;
/**
 * Represents a plaid entry from a user's firebase document
 */
const givenPlaidEntry = () => {
    return {
        accounts: [
            {
                id: nanoid_1.nanoid(),
                mask: '0000',
                name: 'Plaid Checking',
                subtype: 'Checking',
                type: 'depository',
            },
        ],
        institution: {
            institution_id: 'institution_id',
            name: 'Wells Fargo',
        },
        item: {
            accessToken: nanoid_1.nanoid(),
            itemId: nanoid_1.nanoid(),
        },
    };
};
exports.givenPlaidEntry = givenPlaidEntry;
const givenMoney = (dollarAmmount) => {
    if (!dollarAmmount) {
        dollarAmmount = 5;
    }
    return { amount: dollarAmmount * 100, precision: 2, symbol: '$', currency: 'USD' };
};
exports.givenMoney = givenMoney;
const givenBankInfo = (data) => {
    return new repositories_1.BankInfoRepository(testdb_datasource_1.testdb).create(_givenBankInfoData(data));
};
exports.givenBankInfo = givenBankInfo;
const givenCategory = (data) => {
    return Object.assign({ _id: nanoid_1.nanoid(), name: 'test_category', commissionRate: 1 }, data);
};
exports.givenCategory = givenCategory;
const givenTaxResponse = () => {
    const tax = {
        tax: {
            amount_to_collect: 5,
            jurisdictions: { country: 'usa', state: 'FL', county: 'Dade', city: 'Miami' },
        },
    };
    return Object.assign(Object.assign({}, tax), { success: true });
};
exports.givenTaxResponse = givenTaxResponse;
const givenCount = () => {
    return {
        count: 10,
    };
};
exports.givenCount = givenCount;
const givenBoomAccountVerifyResponse = (data) => {
    const res = {
        success: true,
        message: 'Success',
        data: data,
    };
    return Object.assign(Object.assign({}, res), { success: true });
};
exports.givenBoomAccountVerifyResponse = givenBoomAccountVerifyResponse;
const givenBoomCard = (data) => {
    return new repositories_1.BoomCardRepository(testdb_datasource_1.testdb).create(Object.assign({ _id: nanoid_1.nanoid(), status: globals_1.BoomCardStatus.ACTIVE, boomAccountID: nanoid_1.nanoid(), cardNumber: nanoid_1.nanoid() }, data));
};
exports.givenBoomCard = givenBoomCard;
const givenBoomAccount = (data) => {
    return new repositories_1.BoomAccountRepository(testdb_datasource_1.testdb).create(Object.assign({ _id: nanoid_1.nanoid(), status: globals_1.BoomAccountStatus.ACTIVE, balance: exports.givenMoney(10000) }, data));
};
exports.givenBoomAccount = givenBoomAccount;
const givenCustomerBilling = (data) => {
    return new repositories_1.CustomerBillingRepository(testdb_datasource_1.testdb).create(Object.assign({ _id: nanoid_1.nanoid() }, data));
};
exports.givenCustomerBilling = givenCustomerBilling;
const givenTransferReceiverProfileData = () => {
    const profileAllowedField = {
        firstName: 'Danee',
        lastName: 'Smith T',
        profileImg: {
            imgUrl: 'https://apiqa.boomcard.net/api/v1/images/Rj7Q4ZQpzUfg19k7lD91XqFCIWI2_IMG_0003.JPG?override=true',
        },
    };
    return profileAllowedField;
};
exports.givenTransferReceiverProfileData = givenTransferReceiverProfileData;
const givenReturnPolicy = (data) => {
    return new repositories_1.ReturnPolicyRepository(testdb_datasource_1.testdb).create(_givenReturnPolicyData(data));
};
exports.givenReturnPolicy = givenReturnPolicy;
const givenReturnRequest = (data) => {
    return new repositories_1.ReturnRequestRepository(testdb_datasource_1.testdb).create(_givenReturnRequestData(data));
};
exports.givenReturnRequest = givenReturnRequest;
const givenReturnDispute = (data) => {
    return new repositories_1.ReturnDisputeRepository(testdb_datasource_1.testdb).create(_givenReturnDisputeData(data));
};
exports.givenReturnDispute = givenReturnDispute;
//# sourceMappingURL=database.helpers.js.map