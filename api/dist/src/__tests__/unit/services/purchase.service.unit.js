"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const testlab_1 = require("@loopback/testlab");
const moment_1 = tslib_1.__importDefault(require("moment"));
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const constants_1 = require("../../../constants");
const repositories_1 = require("../../../repositories");
const services_1 = require("../../../services");
const database_helpers_1 = require("../../helpers/database.helpers");
//TODO: Update this after BW-950 updates purchase service
xdescribe('PurchaseService (unit)', () => {
    let configRepository;
    let categoryRepository;
    let transactionRepository;
    let bookingRepository;
    let profileService;
    let taxService;
    let boomAccountService;
    let bookingService;
    let shippingService;
    let orderService;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenProfileService);
    beforeEach(givenConfigRepository);
    beforeEach(givenTransactionRepository);
    beforeEach(givenBookingRepository);
    beforeEach(givenCategoryRepository);
    beforeEach(givenTaxService);
    beforeEach(givenBoomAccountService);
    beforeEach(givenShippingService);
    beforeEach(givenOrderService);
    describe('Validation', () => {
        it('returns failed bookings list for a customer profile not found in firebase', async () => {
            const bookings = await database_helpers_1.givenBookings();
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            const result = await service.purchase(bookings);
            const failedList = [];
            bookings.forEach((booking) => {
                failedList.push({
                    booking: booking,
                    reason: constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND,
                });
            });
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: null,
                customerEmail: null,
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failedList,
            });
        });
        it('returns used bookings as failed', async () => {
            var _a, _b;
            const bookings = await database_helpers_1.givenBookings([
                { status: globals_1.BookingStatus.USED },
                { status: globals_1.BookingStatus.USED },
            ]);
            const customer = database_helpers_1.givenCustomer();
            profileService.stubs.getProfile.resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            const failedList = [];
            failedList.push({
                booking: bookings[0],
                reason: constants_1.CheckOutResponseMessages.BOOKING_INACTIVE,
            });
            failedList.push({
                booking: bookings[1],
                reason: constants_1.CheckOutResponseMessages.BOOKING_INACTIVE,
            });
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: customer,
                customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failedList,
            });
        });
        it('returns valid bookings as successful', async () => {
            var _a, _b;
            // givenBookings creates a list of offer bookins so I change one to a product here
            // to test offers and bookings
            const bookings = await database_helpers_1.givenBookings([{}, {}]);
            bookings[1].type = globals_1.BookingTypes.PRODUCT;
            bookings[1].item = await database_helpers_1.givenProduct();
            // we get standard user info and set the bookings to match the new uid
            let customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            bookings[0].memberUID = customer.uid;
            bookings[1].memberUID = customer.uid;
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            const boomAccount = await database_helpers_1.givenBoomAccount({ customerID: customer.uid });
            customer = Object.assign(Object.assign({}, customer), { boomAccounts: [boomAccount._id] });
            // the service gets a merchant twice and a customer only once because we set the customer uid above
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            profileService.stubs.getProfile.onThirdCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            // make all the repos and stubs return good stuff
            categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
            categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
            taxService.stubs.getTotalTaxByProduct.resolves(database_helpers_1.givenTaxResponse());
            boomAccountService.stubs.verifyExistingAccounts.resolves(database_helpers_1.givenBoomAccountVerifyResponse(boomAccount));
            boomAccountService.stubs.charge.resolves({
                success: true,
                message: 'Boom account update sucessfully.',
            });
            transactionRepository.stubs.createAll.resolves([]);
            configRepository.stubs.findOne.resolves({ value: 1 });
            // create a list of used bookings that the service should return
            const checkedOut = [];
            checkedOut.push(Object.assign(Object.assign({}, bookings[0]), { status: globals_1.BookingStatus.USED }));
            checkedOut.push(Object.assign(Object.assign({}, bookings[1]), { status: globals_1.BookingStatus.USED }));
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: customer,
                customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                checkedOut: checkedOut,
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: [],
            });
        });
        /**
         * This test makes sure the transactions being passed to the transaction repo are correct
         */
        it('correct transactions are created on successful bookings', async () => {
            var _a, _b, _c;
            // make an offer and a product. extract the offer and product so we can access the
            // properties later
            const bookings = await database_helpers_1.givenBookings([{}, {}]);
            bookings[1].type = globals_1.BookingTypes.PRODUCT;
            bookings[1].item = await database_helpers_1.givenProduct();
            const offer = (_a = bookings[0]) === null || _a === void 0 ? void 0 : _a.item;
            const product = (_b = bookings[1]) === null || _b === void 0 ? void 0 : _b.item;
            let customer = database_helpers_1.givenCustomer({ cards: ['card id'], profileImg: { imgUrl: undefined } });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            bookings[0].memberUID = customer.uid;
            bookings[1].memberUID = customer.uid;
            // stub moment so we can predict the created date on the new transactions
            moment_1.default.now = sinon_1.default.stub().returns(moment_1.default.unix(1));
            const transactionSender = {
                uid: customer.uid,
                firstName: customer.firstName,
                lastName: customer.lastName,
                roles: customer.roles,
                contact: customer.contact,
                profileImg: { imgUrl: (_c = customer.profileImg) === null || _c === void 0 ? void 0 : _c.imgUrl },
            };
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            const boomAccount = await database_helpers_1.givenBoomAccount({ customerID: customer.uid });
            customer = Object.assign(Object.assign({}, customer), { boomAccounts: [boomAccount._id] });
            // first booking
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            // second booking
            profileService.stubs.getProfile.onCall(2).resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onCall(3).resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            // all of the services and repos work as intended in this test
            const taxResponse = database_helpers_1.givenTaxResponse();
            const category = database_helpers_1.givenCategory();
            categoryRepository.stubs.find.resolves([category]);
            categoryRepository.stubs.findById.resolves(category);
            taxService.stubs.getTotalTaxByProduct.resolves(taxResponse);
            boomAccountService.stubs.verifyExistingAccounts.resolves(database_helpers_1.givenBoomAccountVerifyResponse(boomAccount));
            boomAccountService.stubs.charge.resolves({
                success: true,
                message: 'Boom account update sucessfully.',
            });
            transactionRepository.stubs.createAll.resolves([]);
            configRepository.stubs.findOne.resolves({ value: 1 });
            await service.purchase(bookings);
            // this is how the bookings in the transactions are changes so we do the same here
            const finalBookings = [Object.assign({}, bookings[0]), Object.assign({}, bookings[1])];
            //@ts-ignore
            delete finalBookings[0].memberUID;
            //@ts-ignore
            delete finalBookings[0].item;
            //@ts-ignore
            delete finalBookings[1].memberUID;
            //@ts-ignore
            delete finalBookings[1].item;
            //fill this array with the expected transactions
            const finalTransactions = [];
            finalTransactions.push({
                type: globals_1.TransactionType.PURCHASE,
                status: globals_1.TransactionStatus.COMPLETED,
                createdAt: moment_1.default().utc().unix(),
                amount: offer.product.price,
                cashback: offer.cashBackPerVisit,
                sender: transactionSender,
                receiver: {
                    _id: offer.product.store._id,
                    companyName: offer.product.store.companyName,
                    //number: offer.product.store.number, // TODO: Need to implement the new AddressInfo Interface here
                    //street1: offer.product.store.street1,
                    //street2: offer.product.store.street2,
                    city: offer.product.store.city,
                },
                purchaseItem: offer,
                boomAccountID: boomAccount._id,
                booking: finalBookings[0],
                salestax: globals_1.toMoney(taxResponse.tax.amount_to_collect),
                taxcode: taxResponse.tax.jurisdictions,
            });
            finalTransactions.push({
                type: globals_1.TransactionType.PURCHASE,
                status: globals_1.TransactionStatus.COMPLETED,
                createdAt: moment_1.default().utc().unix(),
                amount: product.price,
                sender: transactionSender,
                receiver: {
                    _id: product.store._id,
                    companyName: product.store.companyName,
                    //number: product.store.number, // TODO: Need to implement the new AddressInfo Interface here
                    //street1: product.store.street1,
                    //street2: product.store.street2,
                    city: product.store.city,
                },
                purchaseItem: product,
                boomAccountID: boomAccount._id,
                booking: finalBookings[1],
                salestax: globals_1.toMoney(taxResponse.tax.amount_to_collect),
                taxcode: taxResponse.tax.jurisdictions,
            });
            testlab_1.expect(transactionRepository.stubs.createAll.args[0][0]).deepEqual(finalTransactions);
            // reset moment in case something else depends on it
            moment_1.default.now = function () {
                return +new Date();
            };
        });
        it('returns failed when taxService fails', async () => {
            var _a, _b;
            // this is the basic setup, see previous tests for explanation
            const customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            const bookings = await database_helpers_1.givenBookings([
                { memberUID: customer.uid },
            ]);
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
            categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
            // the tax service returns success: false when it fails
            taxService.stubs.getTotalTaxByProduct.resolves({ success: false, message: '' });
            // when tax service fails it should add a booking to a list like this
            const failed = [];
            failed.push({
                booking: bookings[0],
                reason: constants_1.CheckOutResponseMessages.TAX_ERROR,
            });
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: customer,
                customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failed,
            });
        });
        it('returns failed when offer has no category', async () => {
            var _a, _b;
            const customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            const bookings = await database_helpers_1.givenBookings([
                { memberUID: customer.uid },
            ]);
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            categoryRepository.stubs.find.resolves([]);
            // categoryRepo returns undefined when a category is not found
            categoryRepository.stubs.findById.resolves(undefined);
            const failed = [];
            failed.push({
                booking: bookings[0],
                reason: constants_1.GlobalResponseMessages.NO_CATEGORY,
            });
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: customer,
                customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failed,
            });
        });
        it('returns failed when configRepo can not find commission rate for a product', async () => {
            var _a, _b;
            const customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            const bookings = await database_helpers_1.givenBookings([
                { memberUID: customer.uid },
            ]);
            bookings[0].type = globals_1.BookingTypes.PRODUCT;
            bookings[0].item = await database_helpers_1.givenProduct();
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            categoryRepository.stubs.find.resolves([]);
            categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
            // same as previous test but for configRepo, as it is called when a booking is a product
            configRepository.stubs.findOne.resolves(null);
            const failed = [];
            failed.push({
                booking: bookings[0],
                reason: constants_1.CheckOutResponseMessages.INVALID_CATEGORY,
            });
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: customer,
                customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failed,
            });
        });
        it('returns failed when merchant can not be found', async () => {
            const customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const bookings = await database_helpers_1.givenBookings([
                { memberUID: customer.uid },
            ]);
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            categoryRepository.stubs.find.resolves([]);
            categoryRepository.stubs.findById.resolves(undefined);
            const failed = [];
            failed.push({
                booking: bookings[0],
                reason: constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND,
            });
            const result = await service.purchase(bookings);
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: null,
                customerEmail: null,
                checkedOut: [],
                expired: [],
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: failed,
            });
        });
        it('returns failed when offer is expired', async () => {
            const customer = database_helpers_1.givenCustomer({ cards: ['card id'] });
            const store = await database_helpers_1.givenStore();
            const merchant = database_helpers_1.givenMerchant({ store: store });
            const bookings = await database_helpers_1.givenBookings([
                { memberUID: customer.uid },
            ]);
            moment_1.default.now = sinon_1.default.stub().returns(moment_1.default.unix(2));
            // give the booking an expiration date of unix time 1
            bookings[0].item = Object.assign(Object.assign({}, bookings[0].item), { expiration: 1 });
            const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
            profileService.stubs.getProfile.onFirstCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: merchant,
            });
            profileService.stubs.getProfile.onSecondCall().resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
            categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
            taxService.stubs.getTotalTaxByProduct.resolves(database_helpers_1.givenTaxResponse());
            transactionRepository.stubs.createAll.resolves([]);
            configRepository.stubs.findOne.resolves({ value: 1 });
            const result = await service.purchase(bookings);
            // the booking should be denied as expired
            testlab_1.expect(result).to.deepEqual({
                success: true,
                customer: null,
                customerEmail: null,
                checkedOut: [],
                expired: bookings,
                message: constants_1.CheckOutResponseMessages.SUCCESS,
                failed: [],
            });
            // reset moment in case something else depends on it
            moment_1.default.now = function () {
                return +new Date();
            };
        });
        describe('Money Transfers', () => {
            it('returns failed when member does not have enough money', async () => {
                var _a, _b;
                let customer = database_helpers_1.givenCustomer();
                const store = await database_helpers_1.givenStore();
                const merchant = database_helpers_1.givenMerchant({ store: store });
                const bookings = await database_helpers_1.givenBookings([
                    { memberUID: customer.uid },
                ]);
                const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
                const boomAccount = await database_helpers_1.givenBoomAccount({ customerID: customer.uid });
                customer = Object.assign(Object.assign({}, customer), { boomAccounts: [boomAccount._id] });
                profileService.stubs.getProfile.onFirstCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: merchant,
                });
                profileService.stubs.getProfile.onSecondCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: customer,
                });
                categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
                categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
                taxService.stubs.getTotalTaxByProduct.resolves(database_helpers_1.givenTaxResponse());
                boomAccountService.stubs.verifyExistingAccounts.resolves(database_helpers_1.givenBoomAccountVerifyResponse(boomAccount));
                boomAccountService.stubs.charge.resolves({
                    success: false,
                    message: `Not enough funds.`,
                });
                transactionRepository.stubs.createAll.resolves([]);
                configRepository.stubs.findOne.resolves({ value: 1 });
                const result = await service.purchase(bookings);
                testlab_1.expect(result).to.deepEqual({
                    success: true,
                    customer: customer,
                    customerEmail: (_b = (_a = customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0],
                    checkedOut: [],
                    expired: [],
                    message: constants_1.CheckOutResponseMessages.SUCCESS,
                    failed: [{ booking: bookings[0], reason: `Not enough funds.` }],
                });
            });
            it('correctly updates merchant funds when successful', async () => {
                var _a;
                let customer = database_helpers_1.givenCustomer();
                const store = await database_helpers_1.givenStore();
                const merchant = database_helpers_1.givenMerchant({ store: store });
                const bookings = await database_helpers_1.givenBookings([
                    {
                        memberUID: customer.uid,
                    },
                ]);
                const product = bookings[0].item.product;
                // the booking costs 10 and had 5 cashback
                bookings[0] = Object.assign(Object.assign({}, bookings[0]), { item: Object.assign(Object.assign({}, bookings[0].item), { cashBackPerVisit: { amount: 500, precision: 2, currency: 'USD' }, product: Object.assign(Object.assign({}, product), { price: { amount: 1000, precision: 2, currency: 'USD' } }), merchantUID: merchant.uid }) });
                const boomAccount = await database_helpers_1.givenBoomAccount({ customerID: customer.uid });
                customer = Object.assign(Object.assign({}, customer), { boomAccounts: [boomAccount._id] });
                const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
                profileService.stubs.getProfile.onFirstCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: merchant,
                });
                profileService.stubs.getProfile.onSecondCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: customer,
                });
                categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
                categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
                taxService.stubs.getTotalTaxByProduct.resolves(database_helpers_1.givenTaxResponse());
                boomAccountService.stubs.verifyExistingAccounts.resolves(database_helpers_1.givenBoomAccountVerifyResponse(boomAccount));
                boomAccountService.stubs.charge.resolves({
                    success: true,
                    message: 'Boom account update sucessfully.',
                });
                transactionRepository.stubs.createAll.resolves([]);
                // the commission rate is 1%
                configRepository.stubs.findOne.resolves({ value: 1 });
                await service.purchase(bookings);
                // the merchant should have the booking price ($10) - cashback ($5) - commission (10*.01 = $.10) = $4.90
                testlab_1.expect(profileService.stubs.updateManyProfilesById.args[0][0][0]).deepEqual({
                    uid: (_a = bookings[0].item) === null || _a === void 0 ? void 0 : _a.merchantUID,
                    grossEarningsPendingWithdrawal: { amount: 1500, precision: 2, currency: 'USD' },
                    netEarningsPendingWithdrawal: { amount: 1490, precision: 2, currency: 'USD' },
                });
            });
            it('does not change merchant funds on failure', async () => {
                let customer = database_helpers_1.givenCustomer();
                const store = await database_helpers_1.givenStore();
                const merchant = database_helpers_1.givenMerchant({ store: store });
                const boomAccount = await database_helpers_1.givenBoomAccount({ customerID: customer.uid });
                customer = Object.assign(Object.assign({}, customer), { boomAccounts: [boomAccount._id] });
                const bookings = await database_helpers_1.givenBookings([
                    {
                        memberUID: customer.uid,
                    },
                ]);
                const product = bookings[0].item.product;
                bookings[0] = Object.assign(Object.assign({}, bookings[0]), { item: Object.assign(Object.assign({}, bookings[0].item), { cashBackPerVisit: { amount: 500, precision: 2, currency: 'USD' }, product: Object.assign(Object.assign({}, product), { price: { amount: 1000, precision: 2, currency: 'USD' } }) }) });
                const service = new services_1.PurchaseService(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService);
                profileService.stubs.getProfile.onFirstCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: merchant,
                });
                profileService.stubs.getProfile.onSecondCall().resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: customer,
                });
                categoryRepository.stubs.find.resolves([database_helpers_1.givenCategory()]);
                categoryRepository.stubs.findById.resolves(database_helpers_1.givenCategory());
                taxService.stubs.getTotalTaxByProduct.resolves(database_helpers_1.givenTaxResponse());
                boomAccountService.stubs.verifyExistingAccounts.resolves(database_helpers_1.givenBoomAccountVerifyResponse(boomAccount));
                boomAccountService.stubs.charge.resolves({
                    success: false,
                    message: `Not enough funds.`,
                });
                transactionRepository.stubs.createAll.resolves([]);
                configRepository.stubs.findOne.resolves({ value: 1 });
                await service.purchase(bookings);
                testlab_1.expect(profileService.stubs.updateManyProfilesById.notCalled).equal(true);
            });
        });
    });
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(services_1.ProfileService);
    }
    function givenConfigRepository() {
        configRepository = testlab_1.createStubInstance(repositories_1.ConfigRepository);
    }
    function givenTransactionRepository() {
        transactionRepository = testlab_1.createStubInstance(repositories_1.TransactionRepository);
    }
    function givenBoomAccountService() {
        boomAccountService = testlab_1.createStubInstance(services_1.BoomAccountService);
    }
    function givenBookingRepository() {
        bookingRepository = testlab_1.createStubInstance(repositories_1.BookingRepository);
    }
    function givenCategoryRepository() {
        categoryRepository = testlab_1.createStubInstance(repositories_1.CategoryRepository);
    }
    function givenTaxService() {
        taxService = testlab_1.createStubInstance(services_1.TaxService);
    }
    function givenShippingService() {
        shippingService = testlab_1.createStubInstance(services_1.ShippingService);
    }
    function givenOrderService() {
        orderService = testlab_1.createStubInstance(services_1.OrderService);
    }
});
//# sourceMappingURL=purchase.service.unit.js.map