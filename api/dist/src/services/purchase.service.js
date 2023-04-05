"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const admin = tslib_1.__importStar(require("firebase-admin"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const purchase_error_1 = tslib_1.__importDefault(require("../errors/purchase-error"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const utils_1 = require("../utils");
const store_1 = require("../utils/store");
const tempLocation_1 = require("../utils/tempLocation");
const booking_service_1 = require("./booking.service");
const order_service_1 = require("./order.service");
const shipping_service_1 = require("./shipping.service");
let PurchaseService = class PurchaseService {
    constructor(bookingRepository, categoryRepository, configRepository, transactionRepository, profileService, taxService, boomAccountService, bookingService, shippingService, orderService) {
        this.bookingRepository = bookingRepository;
        this.categoryRepository = categoryRepository;
        this.configRepository = configRepository;
        this.transactionRepository = transactionRepository;
        this.profileService = profileService;
        this.taxService = taxService;
        this.boomAccountService = boomAccountService;
        this.bookingService = bookingService;
        this.shippingService = shippingService;
        this.orderService = orderService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.PURCHASES_SERVICE);
    }
    /**
     * Will take a list of bookings to purchase them.
     * This adds the amount to the merchant minus fees and cashback.
     * Then subtracts amount from customer and adds cashback amount to customer.
     * The transaction is an all or none transaction. If any part fails the process will roll back.
     * Bookings that are expired, or more than current funds are not processed, but will alow
     * valid bookings to process.
     * @param {Booking[]} bookings A list of bookings to purchase
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling
     * this method.
     * @returns {Promise<PurchaseResult>}
     * @memberof PurchaseService
     */
    async purchase(bookings, options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        this.logger.info('Starting purchase process...');
        const now = moment_1.default().unix();
        const expiredList = [];
        const succeededList = [];
        const failedList = [];
        const merchants = {};
        let customer = null;
        let customerEmail = null;
        const queuedBookings = [];
        this.logger.debug('Default values set, will loop through each booking and transfer money values in-memory only...');
        try {
            for (const booking of bookings) {
                this.logger.debug(`\n>\nWill start processing Booking with ID of ${booking._id}`);
                if (booking.status === globals_1.BookingStatus.USED || booking.status === globals_1.BookingStatus.CANCELLED) {
                    this.logger.debug(`Booking has status ${booking.status} added to failed list`);
                    failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.BOOKING_INACTIVE });
                }
                else {
                    const item = booking.item;
                    if (globals_1.isOffer(item)) {
                        // Handle offers
                        this.logger.addContext('in-memory-offers', 'Offer Processing');
                        this.logger.debug('Booking is an offer.');
                        this.logger.debug('Booking price is.', utils_1.fromMoney(item.product.price));
                        this.logger.debug('Booking cashback is.', utils_1.fromMoney(item.cashBackPerVisit));
                        if (item.expiration && now > item.expiration) {
                            this.logger.debug(`This offer is expired. Now value is: ${moment_1.default
                                .unix(now)
                                .format(tempLocation_1.DateFormatting.VERBOSE)} and offer expiration is ${moment_1.default
                                .unix(item.expiration)
                                .format(tempLocation_1.DateFormatting.VERBOSE)}`);
                            this.logger.debug(`Adding booking with id of: ${booking._id} to expired list`);
                            expiredList.push(booking);
                            continue;
                        }
                        this.logger.debug(`This offer is valid, extracting data...`);
                        const cashback = item.cashBackPerVisit;
                        if (!cashback) {
                            failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.MISSING_CASHBACK });
                            continue;
                        }
                        if (!merchants[item.merchantUID]) {
                            this.logger.debug(`Merchant is not yet cached in memory, will get merchant with ID of ${item.merchantUID} from Firebase...`);
                            const profile = await this.profileService.getProfile(item.merchantUID, {
                                requiredFields: ['contact'],
                            });
                            let profileData;
                            if (!profile.success || !profile.data) {
                                this.logger.error(`Merchant with ID of ${item.merchantUID} was not found, aborting...`);
                                failedList.push({ booking, reason: constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND });
                                continue;
                            }
                            else {
                                profileData = profile.data;
                            }
                            this.logger.debug(`Merchant profile retrieved. UID:`, profileData.uid);
                            merchants[item.merchantUID] = {
                                profile: profileData,
                                currentGrossBalance: profileData.grossEarningsPendingWithdrawal || {
                                    amount: 0,
                                    precision: 2,
                                    currency: 'USD',
                                    symbol: '$',
                                },
                                currentNetBalance: profileData.netEarningsPendingWithdrawal || {
                                    amount: 0,
                                    precision: 2,
                                    currency: 'USD',
                                    symbol: '$',
                                },
                            };
                        }
                        else {
                            this.logger.debug('Merchant profile was found cached. Using cached version...');
                        }
                        const merchant = merchants[item.merchantUID].profile;
                        const currentMerchantData = merchants[item.merchantUID];
                        if (!customer) {
                            // TODO: entering all the time into this would guarantee we get the data from the collection and get the required fields
                            const profileTemp = await this.profileService.getProfile(booking.memberUID, {
                                requiredFields: ['contact'],
                            });
                            if (profileTemp.success && profileTemp.data) {
                                customer = profileTemp.data;
                            }
                        }
                        customerEmail = customerEmail || ((_b = (_a = customer === null || customer === void 0 ? void 0 : customer.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b[0]);
                        if (!customer || customerEmail) {
                            this.logger.error(`Customer with ID of ${booking.memberUID} or customer email was not found, aborting...`);
                            return {
                                success: false,
                                customer,
                                customerEmail,
                                message: constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND,
                            };
                        }
                        if (!customer.boomAccounts) {
                            this.logger.error(`Did not find any Boom Account for this user in Firebase. User: ${customer.uid}`);
                            return {
                                success: false,
                                customer,
                                customerEmail,
                                message: constants_1.GlobalResponseMessages.NO_BOOM_ACCOUNT,
                            };
                        }
                        this.logger.debug(`Merchant Basic Info: uid:${merchant.uid}, firstName:${merchant.firstName}, lastName:${merchant.lastName}`);
                        this.logger.debug(`Customer Basic Info: uid:${customer.uid}, firstName:${customer.firstName}, lastName:${customer.lastName}`);
                        this.logger.debug(`Current Merchant Balance: currentGross: ${utils_1.fromMoney(currentMerchantData.currentGrossBalance)} currentNet: ${utils_1.fromMoney(currentMerchantData.currentNetBalance)}`);
                        let category = null;
                        if ((_c = item.product.category) === null || _c === void 0 ? void 0 : _c._id) {
                            category = await this.categoryRepository.findById(item.product.category._id);
                        }
                        else if ((_d = item.product.category) === null || _d === void 0 ? void 0 : _d.name) {
                            const filterCatBuilder = new repository_1.FilterBuilder();
                            const filterCat = filterCatBuilder
                                .where({ name: item.product.category.name })
                                .build();
                            const categories = await this.categoryRepository.find(filterCat);
                            category = categories.length ? categories[0] : null;
                        }
                        if (!category) {
                            this.logger.error(constants_1.GlobalResponseMessages.NO_CATEGORY);
                            failedList.push({ booking, reason: constants_1.GlobalResponseMessages.NO_CATEGORY });
                            continue;
                        }
                        this.logger.debug(`Offer Category is: ${category.name}`);
                        this.logger.info('Will transfer purchase amounts to merchant (in-memory)...');
                        const commissionRate = category.commissionRate;
                        const price = item.product.price;
                        const fromAddress = {
                            address: store_1.getComposedAddressFromStore(merchant.store),
                            city: (_f = (_e = merchant.store) === null || _e === void 0 ? void 0 : _e.city) !== null && _f !== void 0 ? _f : '',
                            state: (_h = (_g = merchant.store) === null || _g === void 0 ? void 0 : _g.state) !== null && _h !== void 0 ? _h : '',
                            zipcode: (_k = (_j = merchant.store) === null || _j === void 0 ? void 0 : _j.zip) !== null && _k !== void 0 ? _k : '',
                            country: 'US',
                        };
                        const toAddress = {
                        /*
                        TODO: Need to implement the new AddressInfo Interface here
                        address: customer?.contact?.street1 ?? '',
                        city: customer?.contact?.city ?? '',
                        state: customer?.contact?.state ?? '',
                        zipcode: customer?.contact?.zipcode ?? '',
                        country: 'US',
                        */
                        };
                        if (!merchant.taxableNexus) {
                            this.logger.error(`Merchant with ID of ${merchant.uid} don't have taxableNexus, aborting...`);
                            failedList.push({
                                booking,
                                reason: constants_1.ProfileResponseMessages.MERCHANT_EMPTY_TAX_NEXUS,
                            });
                            continue;
                        }
                        const taxResponse = await this.taxService.getTotalTaxByProduct(fromAddress, toAddress, merchant.taxableNexus, price);
                        console.log('chekresponse', taxResponse);
                        if (!taxResponse.success || !taxResponse.data) {
                            this.logger.error(constants_1.CheckOutResponseMessages.TAX_ERROR);
                            failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.TAX_ERROR });
                            continue;
                        }
                        this.logger.info(`Tax amount  is: ${taxResponse.data.tax.amount_to_collect}`);
                        const taxAmount = globals_1.toMoney(taxResponse.data.tax.amount_to_collect);
                        const { newGrossBalance, newNetBalance, } = utils_1.addFundsToMerchant(Object.assign(Object.assign({}, merchant), { grossEarningsPendingWithdrawal: currentMerchantData.currentGrossBalance, netEarningsPendingWithdrawal: currentMerchantData.currentNetBalance }), price, taxAmount, commissionRate, cashback);
                        currentMerchantData.currentGrossBalance = newGrossBalance;
                        currentMerchantData.currentNetBalance = newNetBalance;
                        this.logger.debug(`New Merchant Balance: currentGross: ${utils_1.fromMoney(currentMerchantData.currentGrossBalance)} currentNet: ${utils_1.fromMoney(currentMerchantData.currentNetBalance)}`);
                        this.logger.info('Will subtract from customer available Boom Account (in-db)...');
                        this.logger.addContext('Boom Account', 'charge');
                        const verificationResponse = await this.boomAccountService.verifyExistingAccounts(customer.uid);
                        if (!verificationResponse.success || !verificationResponse.data) {
                            failedList.push({ booking, reason: verificationResponse.message });
                            continue;
                        }
                        const customerBoomAccount = verificationResponse.data;
                        const totalAmount = dinero_js_1.default(price).add(dinero_js_1.default(taxAmount)).toObject();
                        const chargeResponse = await this.boomAccountService.charge(customerBoomAccount._id, totalAmount, cashback);
                        if (!chargeResponse.success) {
                            this.logger.error(chargeResponse.message);
                            failedList.push({ booking, reason: chargeResponse.message });
                            continue;
                        }
                        queuedBookings.push({
                            booking,
                            boomAccountID: customerBoomAccount._id,
                            taxAmount: taxResponse.data.tax.amount_to_collect,
                            taxCode: taxResponse.data.tax.jurisdictions,
                        });
                        this.logger.removeContext('in-memory-offers');
                    }
                    else if (globals_1.isProduct(item)) {
                        // Handle products
                        this.logger.addContext('in-memory-products', 'Product processing');
                        this.logger.debug('Booking is an product.');
                        this.logger.debug('Booking price is.', utils_1.fromMoney(item.price));
                        if (!merchants[item.merchantUID]) {
                            this.logger.debug('Merchant is not yet cached in memory, will get merchant from Firebase...');
                            const profile = await this.profileService.getProfile(item.merchantUID, {
                                requiredFields: ['contact'],
                            });
                            let profileData;
                            if (!profile.success || !profile.data) {
                                this.logger.error(`Merchant with ID of ${item.merchantUID} was not found, aborting...`);
                                failedList.push({ booking, reason: constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND });
                                continue;
                            }
                            else {
                                profileData = profile.data;
                            }
                            this.logger.debug(`Merchant profile retrieved. UID:`, profileData.uid);
                            merchants[item.merchantUID] = {
                                profile: profileData,
                                currentGrossBalance: profileData.grossEarningsPendingWithdrawal || {
                                    amount: 0,
                                    precision: 2,
                                    currency: 'USD',
                                    symbol: '$',
                                },
                                currentNetBalance: profileData.netEarningsPendingWithdrawal || {
                                    amount: 0,
                                    precision: 2,
                                    currency: 'USD',
                                    symbol: '$',
                                },
                            };
                        }
                        else {
                            this.logger.debug('Merchant profile was found cached. Using cached version...');
                        }
                        const merchant = merchants[item.merchantUID].profile;
                        const currentMerchantData = merchants[item.merchantUID];
                        if (!customer) {
                            // TODO: entering all the time into this would guarantee we get the data from the collection and get the required fields
                            const profileTemp = await this.profileService.getProfile(booking.memberUID, {
                                requiredFields: ['contact'],
                            });
                            if (profileTemp.success && profileTemp.data) {
                                customer = profileTemp.data;
                            }
                        }
                        customerEmail = customerEmail || ((_m = (_l = customer === null || customer === void 0 ? void 0 : customer.contact) === null || _l === void 0 ? void 0 : _l.emails) === null || _m === void 0 ? void 0 : _m[0]);
                        if (!customer) {
                            this.logger.error(`Customer with ID of ${booking.memberUID} was not found, aborting...`);
                            return {
                                success: false,
                                customer,
                                customerEmail,
                                message: constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND,
                            };
                        }
                        this.logger.debug(`Merchant Basic Info: uid:${merchant.uid}, firstName:${merchant.firstName}, lastName:${merchant.lastName}`);
                        this.logger.debug(`Customer Basic Info: uid:${customer.uid}, firstName:${customer.firstName}, lastName:${customer.lastName}`);
                        if (!customer.boomAccounts) {
                            this.logger.error(`Did not find any Boom Account for this user in Firebase. User: ${customer.uid}`);
                            return {
                                success: false,
                                customer,
                                customerEmail,
                                message: constants_1.GlobalResponseMessages.NO_BOOM_ACCOUNT,
                            };
                        }
                        const filterBuilder2 = new repository_1.FilterBuilder();
                        const configFilter = filterBuilder2
                            .where({ type: globals_1.AdminConfigType.DEFAULT_PROCESSING_RATE })
                            .build();
                        console.log('confi112', configFilter);
                        const config = 22;
                        if (!config) {
                            this.logger.info(`There was no commission rate for booking ${booking._id}`);
                            failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.INVALID_CATEGORY });
                            continue;
                        }
                        const commissionRate = config;
                        this.logger.debug(`Current Merchant Balance: currentGross: ${utils_1.fromMoney(currentMerchantData.currentGrossBalance)} currentNet: ${utils_1.fromMoney(currentMerchantData.currentNetBalance)}`);
                        const price = item.price;
                        const fromAddress = {
                            address: store_1.getComposedAddressFromStore(merchant.store),
                            city: (_p = (_o = merchant.store) === null || _o === void 0 ? void 0 : _o.city) !== null && _p !== void 0 ? _p : '',
                            state: (_r = (_q = merchant.store) === null || _q === void 0 ? void 0 : _q.state) !== null && _r !== void 0 ? _r : '',
                            zipcode: (_t = (_s = merchant.store) === null || _s === void 0 ? void 0 : _s.zip) !== null && _t !== void 0 ? _t : '',
                            country: (_v = (_u = merchant.store) === null || _u === void 0 ? void 0 : _u.country) !== null && _v !== void 0 ? _v : '',
                        };
                        const toAddress = {
                            address: '234streed',
                            city: 'Avenel',
                            state: 'NJ',
                            zipcode: '07001',
                            country: 'US',
                        };
                        if (!merchant.taxableNexus) {
                            this.logger.error(`Merchant with ID of ${merchant.uid} don't have taxableNexus, aborting...`);
                            failedList.push({
                                booking,
                                reason: constants_1.ProfileResponseMessages.MERCHANT_EMPTY_TAX_NEXUS,
                            });
                            continue;
                        }
                        const taxResponse = await this.taxService
                            .getTotalTaxByProduct(fromAddress, toAddress, merchant.taxableNexus, price)
                            .then((total) => {
                            console.log('resul', total);
                            return total;
                        })
                            .catch((error) => {
                            console.log('error12', error);
                            return error;
                        });
                        if (!taxResponse.success || !taxResponse.data) {
                            this.logger.error(constants_1.CheckOutResponseMessages.TAX_ERROR);
                            failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.TAX_ERROR });
                            continue;
                        }
                        // const taxAmount: Money = toMoney(taxResponse.data.tax.amount_to_collect);
                        const taxAmount = {
                            amount: 80,
                            precision: 80.0,
                            currency: 'USD',
                            symbol: '$,',
                        };
                        this.logger.info(`Tax over price is:80$`);
                        const { newGrossBalance, newNetBalance, } = utils_1.addFundsToMerchant(Object.assign(Object.assign({}, merchant), { grossEarningsPendingWithdrawal: currentMerchantData.currentGrossBalance, netEarningsPendingWithdrawal: currentMerchantData.currentNetBalance }), price, taxAmount, commissionRate);
                        currentMerchantData.currentGrossBalance = newGrossBalance;
                        currentMerchantData.currentNetBalance = newNetBalance;
                        this.logger.debug(`New Merchant Balance: currentGross: ${utils_1.fromMoney(currentMerchantData.currentGrossBalance)} currentNet: ${utils_1.fromMoney(currentMerchantData.currentNetBalance)}`);
                        this.logger.info('Will subtract from customer available Boom Account (in-db)...');
                        this.logger.addContext('Boom Account', 'charge');
                        const verificationResponse = await this.boomAccountService.verifyExistingAccounts(customer.uid);
                        if (!verificationResponse.success || !verificationResponse.data) {
                            failedList.push({ booking, reason: verificationResponse.message });
                            continue;
                        }
                        const customerBoomAccount = verificationResponse.data;
                        const totalAmount = dinero_js_1.default(price).add(dinero_js_1.default(taxAmount)).toObject();
                        const chargeResponse = await this.boomAccountService.charge(customerBoomAccount._id, totalAmount);
                        if (!chargeResponse.success) {
                            this.logger.error(chargeResponse.message);
                            failedList.push({ booking, reason: chargeResponse.message });
                            continue;
                        }
                        queuedBookings.push({
                            booking,
                            boomAccountID: customerBoomAccount._id,
                            taxAmount: taxResponse.data.tax.amount_to_collect,
                            taxCode: taxResponse.data.tax.jurisdictions,
                        });
                        this.logger.removeContext('in-memory-products');
                    }
                }
            }
        }
        catch (error) {
            console.log('erromess', error);
            this.logger.error(error);
            this.logger.trace(error.message);
            throw new purchase_error_1.default(error.toString(), 'Preparation Error', {
                checkedOut: succeededList,
                failed: failedList,
                expired: expiredList,
            });
        }
        try {
            if (queuedBookings.length > 0) {
                this.logger.addContext('db', 'Processing');
                this.logger.debug('Preparing transactions...');
                // Prepare transactions to create in db
                const transactionSender = {
                    uid: customer === null || customer === void 0 ? void 0 : customer.uid,
                    firstName: customer === null || customer === void 0 ? void 0 : customer.firstName,
                    lastName: customer === null || customer === void 0 ? void 0 : customer.lastName,
                    roles: customer === null || customer === void 0 ? void 0 : customer.roles,
                    contact: customer === null || customer === void 0 ? void 0 : customer.contact,
                    profileImg: { imgUrl: (_w = customer === null || customer === void 0 ? void 0 : customer.profileImg) === null || _w === void 0 ? void 0 : _w.imgUrl },
                };
                const transactions = [];
                this.logger.debug('Queued bookings count is:', queuedBookings.length);
                for (const queuedBooking of queuedBookings) {
                    const preparedBooking = Object.assign({}, queuedBooking.booking);
                    //@ts-ignore
                    delete preparedBooking.item;
                    //@ts-ignore
                    delete preparedBooking.memberUID;
                    let store = {};
                    const queuedItem = queuedBooking.booking.item;
                    if (globals_1.isOffer(queuedItem) && queuedItem.product.store) {
                        store = queuedItem.product.store;
                    }
                    else if (globals_1.isProduct(queuedItem) && queuedItem.store) {
                        store = queuedItem.store;
                    }
                    else {
                        throw new Error('Error booking item do not have any store.');
                    }
                    const transactionReceiver = {
                        _id: store._id,
                        companyName: store.companyName,
                        city: store.city,
                        number: store.number,
                        street1: store.street1,
                        street2: store.street2,
                    };
                    if (globals_1.isOffer(queuedItem)) {
                        transactions.push({
                            type: globals_1.TransactionType.PURCHASE,
                            status: globals_1.TransactionStatus.COMPLETED,
                            createdAt: moment_1.default().unix(),
                            amount: queuedItem.product.price,
                            cashback: queuedItem.cashBackPerVisit,
                            sender: transactionSender,
                            receiver: transactionReceiver,
                            purchaseItem: queuedItem,
                            boomAccountID: queuedBooking.boomAccountID.toString(),
                            booking: preparedBooking,
                            salestax: globals_1.toMoney(queuedBooking.taxAmount),
                            taxcode: queuedBooking.taxCode,
                        });
                    }
                    else if (globals_1.isProduct(queuedItem)) {
                        transactions.push({
                            type: globals_1.TransactionType.PURCHASE,
                            status: globals_1.TransactionStatus.COMPLETED,
                            createdAt: moment_1.default().unix(),
                            amount: queuedItem.price,
                            sender: transactionSender,
                            receiver: transactionReceiver,
                            purchaseItem: queuedBooking.booking.item,
                            boomAccountID: queuedBooking.boomAccountID.toString(),
                            booking: preparedBooking,
                            salestax: globals_1.toMoney(queuedBooking.taxAmount),
                            taxcode: queuedBooking.taxCode,
                        }); // TODO: https://boomcarding.atlassian.net/browse/BW-1582;
                    }
                    else {
                        throw new Error('Booking type error creating trasactions');
                    }
                }
                this.logger.debug('Transactions prepared. Will save to DB...');
                const createdTransactions = await this.transactionRepository.createAll(transactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                this.logger.debug(`created transactions count is ${createdTransactions.length}`);
                this.logger.debug('Transactions saved to DB. Will update booking statuses');
                for (const queuedBooking of queuedBookings) {
                    const updatedBooking = Object.assign(Object.assign({}, queuedBooking.booking), { status: globals_1.BookingStatus.USED });
                    this.logger.debug(`Booking with ID of: ${updatedBooking._id} will be updated to a status of ${updatedBooking.status}`);
                    this.logger.debug(`Will now save updated bookings and boomcards to DB...`);
                    await Promise.all([
                        this.bookingRepository.updateById(updatedBooking._id, updatedBooking, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined),
                    ]);
                    this.logger.debug(`Update to DB successful, adding booking to succeeded list...`);
                    succeededList.push(updatedBooking);
                }
                this.logger.debug('All DB operations were successful, will prepare merchant profiles for new balances...');
                // Add new amount to merchant profile
                const updatedProfiles = Object.keys(merchants).map((uid) => {
                    this.logger.debug(`Target merchant is: ${uid}`);
                    this.logger.debug(`Total gross amount currently in Firebase: ${utils_1.fromMoney(merchants[uid].profile.grossEarningsPendingWithdrawal)}`);
                    this.logger.debug(`Total net amount currently in Firebase: ${utils_1.fromMoney(merchants[uid].profile.netEarningsPendingWithdrawal)}`);
                    this.logger.debug(`Total new gross amount: ${utils_1.fromMoney(merchants[uid].currentGrossBalance)}`);
                    this.logger.debug(`Total new net amount: ${utils_1.fromMoney(merchants[uid].currentNetBalance)}`);
                    return {
                        uid,
                        grossEarningsPendingWithdrawal: merchants[uid].currentGrossBalance,
                        netEarningsPendingWithdrawal: merchants[uid].currentNetBalance,
                    };
                });
                this.logger.debug('Will update merchants via Firebase...');
                await this.profileService.updateManyProfilesById(updatedProfiles);
                this.logger.debug(`Firebase update successful.`);
                this.logger.removeContext('db');
            }
            return {
                success: true,
                customer,
                customerEmail,
                checkedOut: succeededList,
                failed: failedList,
                expired: expiredList,
                message: constants_1.CheckOutResponseMessages.SUCCESS,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code === 'ENTITY_NOT_FOUND') {
                if (error.entityName === 'bookings') {
                    const failedItem = queuedBookings.filter((item) => item.booking._id === error.entityId);
                    const booking = failedItem[0].booking;
                    failedList.push({ booking, reason: constants_1.CheckOutResponseMessages.MISSING_BOOKING });
                }
                return {
                    success: true,
                    customer,
                    customerEmail,
                    checkedOut: succeededList,
                    failed: failedList,
                    expired: expiredList,
                    message: constants_1.CheckOutResponseMessages.SUCCESS,
                };
            }
            else {
                throw new purchase_error_1.default(error.toString(), 'Db error', {
                    checkedOut: succeededList,
                    failed: failedList,
                    expired: expiredList,
                });
            }
        }
    }
    /**
     * update the state of each merchant withdrawal amount,
     * so when merchant’s are paid by check their amount for withdrawal is set to 0
     * and a record of the payment is created
     * @param {BoomUser[]} merchants A list of merchants to clear
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling
     * this method.
     * @returns {Promise<object>}
     * @memberof PurchaseService
     */
    async clearMerchantPayoutAmount(merchants, options) {
        var _a;
        this.logger.info('Starting merchants payout amount clear request');
        const transactions = [];
        const updatingData = [];
        // prepare transaction recordss
        for (const merchant of merchants) {
            const now = moment_1.default().utc().unix();
            const transaction = {
                createdAt: now,
                updatedAt: now,
                type: globals_1.TransactionType.MERCHANT_WITHDRAWAL,
                status: globals_1.TransactionStatus.COMPLETED,
                amount: globals_1.toMoney(((_a = merchant.netEarningsPendingWithdrawal) === null || _a === void 0 ? void 0 : _a.amount) || 0),
                receiver: merchant,
            };
            transactions.push(transaction);
            updatingData.push({
                uid: merchant.uid,
                // @ts-ignore
                netEarningsPendingWithdrawal: admin.firestore.FieldValue.delete(),
                // @ts-ignore
                grossEarningsPendingWithdrawal: admin.firestore.FieldValue.delete(),
            });
        }
        // create transaction records
        await this.transactionRepository.createAll(transactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        // update merchants info (delete netEarningsPendingWithdrawal, grossEarningsPendingWithdrawal fields)
        await this.profileService.updateManyProfilesById(updatingData);
        this.logger.info('Merchants payout amount clear completed');
        return { success: true, message: 'success', data: transactions };
    }
    async newPurchase(order, options) {
        var _a, _b, _c, _d, _e;
        try {
            // Some variables definition.
            let invalidBookings = [];
            let validBookings = [];
            const validBookingsWithShippo = [];
            const queuedBookings = [];
            let amount = globals_1.toMoney(0);
            const cashback = globals_1.toMoney(0);
            let shippingCost = globals_1.toMoney(0);
            let taxes = globals_1.toMoney(0);
            // Start purchase process.
            this.logger.info('Starting purchase process...');
            // empty order validation.
            if (!(order === null || order === void 0 ? void 0 : order.customerUID))
                return utils_1.APIResponseFalseOutput(constants_1.OrderResponseMessages.INVALID_ORDER);
            // customer profile validation.
            const customer = await this.profileService.getProfile(order.customerUID, {
                requiredFields: ['firstName', 'lastName', 'contact'],
            });
            if (!customer.success || !customer.data)
                return utils_1.APIResponseFalseOutput('Customer ID no longer exist or wrong data');
            const customerData = customer.data;
            this.logger.debug(`Customer ${customerData.uid} start the purchase proccess.`);
            // payment method validation.
            const customerBoomAccountResponse = await this.boomAccountService.verifyExistingAccounts(customerData.uid);
            if (!(customerBoomAccountResponse === null || customerBoomAccountResponse === void 0 ? void 0 : customerBoomAccountResponse.data))
                return utils_1.APIResponseFalseOutput(constants_1.BoomAccountResponseMessages.NOT_FOUND);
            if (!customerBoomAccountResponse.success)
                return utils_1.APIResponseFalseOutput(customerBoomAccountResponse.message);
            this.logger.debug('Customer boom account validation: ', customerBoomAccountResponse.message);
            const customerBoomAccount = customerBoomAccountResponse.data;
            if (!customerBoomAccount._id)
                return utils_1.APIResponseFalseOutput(constants_1.BoomAccountResponseMessages.NOT_VALID);
            // Order must have booking order group to purchase it.
            if (!((_a = order.orderGroups) === null || _a === void 0 ? void 0 : _a.length))
                return utils_1.APIResponseFalseOutput('Empty order group');
            this.logger.debug('Loop over orderGroup start:');
            // We loop over orderGroups to validate their bookings[], and also we calculate order shipping cost amount.
            for (const group of order.orderGroups) {
                // empty booking in a group validation.
                if (!((_b = group.bookings) === null || _b === void 0 ? void 0 : _b.length))
                    return utils_1.APIResponseFalseOutput('Empty booking list inside order groups');
                // group must have selected rate to be purchase.
                if (!group.selectedRate)
                    return utils_1.APIResponseFalseOutput(`This group ${group} must have selectedRate.`);
                this.logger.info('Start booking validation.');
                // array booking validation.
                const isValidBooking = await this.bookingService.validateBookings(group.bookings);
                this.logger.debug(`Bookings validation result: ${isValidBooking.message}`);
                // unsuccessful validation.
                if (!isValidBooking.success || !isValidBooking.data)
                    return utils_1.APIResponseFalseOutput(isValidBooking.message);
                // each group must have selected shipping rate, we sum all of them.
                shippingCost = globals_1.toMoney(dinero_js_1.default(shippingCost).add(dinero_js_1.default((_c = group.selectedRate) === null || _c === void 0 ? void 0 : _c.amount)).toUnit());
                // update invalid or valid
                invalidBookings = invalidBookings.concat(isValidBooking.data.invalids);
                validBookings = validBookings.concat(isValidBooking.data.valids);
            }
            // invalid booking validation, if any booking is not valid at this point we stop the purchase process and return not valid bookings.
            // if (invalidBookings.length) {
            //   this.logger.debug('There is some booking invalid.. rolling back');
            //   return {
            //     success: false,
            //     message: BookingResponseMessages.INVALID_BOOKING,
            //     data: invalidBookings,
            //   };
            // }
            this.logger.debug('All bookings are valid.');
            // All booking are valid, we procced to purchase shippo id Labels for groups.
            for (const group of order.orderGroups) {
                if (!group.selectedRate)
                    return utils_1.APIResponseFalseOutput(`This group ${group} must have selectedRate.`);
                // const shippingOrderResponse = await this.shippingService
                //   .purchase(group.selectedRate.shippo_id, customerData.uid, undefined)
                //   .then((response) => {
                //     console.log('checkshi', response);
                //     return response;
                //   })
                //   .catch((error) => {
                //     console.log('shierrors', error);
                //     return error;
                //   });
                // if (!shippingOrderResponse.success || !shippingOrderResponse.data)
                //   return APIResponseFalseOutput(`error purchasing shippo label for group ${group}.`);
                for (const booking of group.bookings) {
                    validBookingsWithShippo.push({
                        booking: booking,
                        // shippingOrderId: shippingOrderResponse.data,
                        shippingOrderId: 'shippingOrderResponse.data',
                    });
                }
            }
            this.logger.debug('All shipping order are submitted.');
            // Loop into valid bookings to calculate total amount, cashback and taxes, for this particular order. At this point there is not valid bookings anymore.
            for (const bundle of validBookingsWithShippo) {
                let product;
                if (globals_1.isOffer(bundle.booking.item)) {
                    product = bundle.booking.item.product;
                }
                else if (globals_1.isProduct(bundle.booking.item)) {
                    product = bundle.booking.item;
                }
                else {
                    throw new Error('Booking type error');
                }
                if (!bundle.booking.quantity)
                    throw new Error(constants_1.BookingResponseMessages.QUANTITY_ERROR);
                amount = globals_1.toMoney(dinero_js_1.default(amount).add(dinero_js_1.default(product.price).multiply(bundle.booking.quantity)).toUnit());
                const merchant = await this.profileService.getProfile(product.merchantUID, {
                    requiredFields: ['addresses', 'contact'],
                });
                if (!merchant.success || !merchant.data)
                    throw new Error(constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND);
                const merchantData = merchant.data;
                if (!merchantData.taxableNexus)
                    throw new Error(constants_1.ProfileResponseMessages.MERCHANT_EMPTY_TAX_NEXUS);
                const fromAddress = {
                    address: store_1.getComposedAddressFromStore(product.store),
                    city: product.store.city,
                    state: product.store.state,
                    zipcode: product.store.zip,
                    country: product.store.country,
                };
                const toAddress = {
                    // getComposedAddressFromStore works here because Store extend from AddressInfo.
                    address: store_1.getComposedAddressFromStore(order.shipToAddress),
                    city: order.shipToAddress.city,
                    state: order.shipToAddress.state,
                    zipcode: order.shipToAddress.zip,
                    country: order.shipToAddress.country,
                };
                const getTaxesResponse = {
                    data: { tax: { amount_to_collect: 80 } },
                };
                // await this.taxService.getTotalTaxByProduct(
                //   fromAddress,
                //   toAddress,
                //   merchantData.taxableNexus,
                //   product.price
                // );
                console.log('totalamount', getTaxesResponse);
                // if (!getTaxesResponse?.success || !getTaxesResponse.data?.tax?.amount_to_collect)
                //   throw new Error(CheckOutResponseMessages.TAX_ERROR);
                taxes = globals_1.toMoney(dinero_js_1.default(taxes)
                    .add(dinero_js_1.default(globals_1.toMoney(getTaxesResponse.data.tax.amount_to_collect)).multiply(bundle.booking.quantity))
                    .toUnit());
                queuedBookings.push({
                    booking: bundle.booking,
                    boomAccountID: customerBoomAccount._id,
                    taxAmount: getTaxesResponse.data.tax.amount_to_collect,
                    taxCode: getTaxesResponse.data.tax.jurisdictions,
                    shippingOrderId: bundle.shippingOrderId,
                });
            }
            // Here is the total cost amount for this order, this include all item price plus taxes and shipping rate selected by the user.
            const totalOrderAmount = globals_1.toMoney(dinero_js_1.default(amount)
                .add(dinero_js_1.default(taxes).add(dinero_js_1.default(shippingCost)))
                .toUnit());
            // We charge the customer for total amount of this order, and cashback apply.
            const chargeResponse = await this.boomAccountService.charge(customerBoomAccount._id, totalOrderAmount, cashback);
            // Unsuccessful charge service validation.
            if (!chargeResponse.success)
                throw new Error(chargeResponse.message);
            this.logger.addContext('db', 'Processing');
            this.logger.debug('Preparing transactions...');
            const transactions = [];
            let dbCreatedTransaction = [];
            const transactionSender = {
                uid: customerData.uid,
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                roles: customerData.roles,
                contact: customerData.contact,
                profileImg: { imgUrl: (_d = customerData.profileImg) === null || _d === void 0 ? void 0 : _d.imgUrl },
            };
            this.logger.debug('Queued bookings count is:', queuedBookings.length);
            for (const queuedBooking of queuedBookings) {
                const _f = queuedBooking.booking, { item, memberUID } = _f, preparedBooking = tslib_1.__rest(_f, ["item", "memberUID"]);
                let product;
                if (globals_1.isOffer(queuedBooking.booking.item)) {
                    product = queuedBooking.booking.item.product;
                }
                else if (globals_1.isProduct(queuedBooking.booking.item)) {
                    product = queuedBooking.booking.item;
                }
                else {
                    throw new Error(constants_1.BookingResponseMessages.INVALID_TYPE);
                }
                const transactionReceiver = {
                    _id: product.store._id,
                    companyName: product.store.companyName,
                    city: product.store.city,
                    number: product.store.number,
                    street1: product.store.street1,
                    street2: product.store.street2,
                    state: product.store.state,
                    zip: product.store.zip,
                };
                const merchant = await this.profileService.getProfile(product.merchantUID, {
                    requiredFields: ['addresses', 'contact'],
                });
                if (!merchant.success || !merchant.data)
                    throw new Error(constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND);
                const merchantData = merchant.data;
                if (!merchantData.boomAccounts)
                    throw new Error(constants_1.PurchaseResponseMessages.ERROR_GETTING_BOOMACCOUNT);
                const merchantBoomAccountIsValid = await this.boomAccountService.verifyExistingAccounts(product.merchantUID);
                if (!merchantBoomAccountIsValid.success)
                    throw new Error(merchantBoomAccountIsValid.message);
                if (!((_e = merchantBoomAccountIsValid.data) === null || _e === void 0 ? void 0 : _e._id))
                    throw new Error(constants_1.PurchaseResponseMessages.ERROR_GETTING_BOOMACCOUNT);
                const dbCategory = await this.categoryRepository.findById(product.category._id);
                if (!dbCategory || !dbCategory.commissionRate)
                    throw new Error(constants_1.PurchaseResponseMessages.ERROR_PRODUCT_CATEGORY);
                const commissionRate = dbCategory.commissionRate;
                const price = product.price;
                if (globals_1.isOffer(queuedBooking.booking.item)) {
                    transactions.push({
                        type: globals_1.TransactionType.PURCHASE,
                        status: globals_1.TransactionStatus.COMPLETED,
                        createdAt: moment_1.default().unix(),
                        amount: queuedBooking.booking.item.product.price,
                        cashback: queuedBooking.booking.item.cashBackPerVisit,
                        sender: transactionSender,
                        receiver: transactionReceiver,
                        purchaseItem: queuedBooking.booking.item,
                        boomAccountID: merchantBoomAccountIsValid.data._id.toString(),
                        booking: preparedBooking,
                        salestax: globals_1.toMoney(queuedBooking.taxAmount),
                        taxcode: queuedBooking.taxCode,
                        shippingOrderId: queuedBooking.shippingOrderId,
                        commissionCollected: globals_1.toMoney(dinero_js_1.default(price).percentage(commissionRate).toUnit()),
                    });
                }
                else if (globals_1.isProduct(queuedBooking.booking.item)) {
                    transactions.push({
                        type: globals_1.TransactionType.PURCHASE,
                        status: globals_1.TransactionStatus.COMPLETED,
                        createdAt: moment_1.default().unix(),
                        amount: queuedBooking.booking.item.price,
                        sender: transactionSender,
                        receiver: transactionReceiver,
                        purchaseItem: queuedBooking.booking.item,
                        boomAccountID: queuedBooking.boomAccountID.toString(),
                        booking: preparedBooking,
                        salestax: globals_1.toMoney(queuedBooking.taxAmount),
                        taxcode: queuedBooking.taxCode,
                        shippingOrderId: queuedBooking.shippingOrderId,
                        commissionCollected: globals_1.toMoney(dinero_js_1.default(price).percentage(commissionRate).toUnit()),
                    });
                }
                else {
                    throw new Error(constants_1.TransactionResponseMessages.ERROR);
                }
                this.logger.debug('Transactions prepared. Will save to DB...');
                console.log('cehck232', transactions);
                const createdTransactions = await this.transactionRepository.createAll(transactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                if (!createdTransactions)
                    throw new Error(constants_1.TransactionResponseMessages.ERROR);
                dbCreatedTransaction = createdTransactions;
                this.logger.debug(`created transactions count is ${createdTransactions.length}`);
                this.logger.debug('Transactions saved to DB. Will update booking statuses');
                for (const otherQueuedBooking of queuedBookings) {
                    const updatedBooking = Object.assign(Object.assign({}, otherQueuedBooking.booking), { status: globals_1.BookingStatus.USED });
                    this.logger.debug(`Booking with ID of: ${updatedBooking._id} will be updated to a status of ${updatedBooking.status}`);
                    this.logger.debug(`Will now save updated bookings and boomcards to DB...`);
                    await this.bookingRepository.updateById(updatedBooking._id, updatedBooking, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
                    this.logger.debug(`Update to DB successful, adding booking to succeeded list...`);
                }
            }
            // console.log('cehcktrans', dbCreatedTransaction[0], dbCreatedTransaction[1]);
            const check = dbCreatedTransaction.map((x) => {
                x.updatedAt = 1678676809;
                return x;
            });
            console.log('lastcehck', check);
            // const newtrans = dbCreatedTransaction[0];
            const orderHistoric = Object.assign(Object.assign({}, order), { transactions: check });
            console.log('orderHistoric', orderHistoric);
            const createOrderResponse = await this.orderService
                .create(orderHistoric)
                .then((response) => {
                console.log('responsedfda', response);
                return response;
            })
                .catch((error) => {
                console.log('erro212r', error);
                return error;
            });
            if (!createOrderResponse.success)
                throw new Error(createOrderResponse.message);
            return {
                success: true,
                message: constants_1.PurchaseResponseMessages.COMPLETED,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new Error(constants_1.PurchaseResponseMessages.FAILURE);
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PurchaseService.prototype, "purchase", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PurchaseService.prototype, "clearMerchantPayoutAmount", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Order, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PurchaseService.prototype, "newPurchase", null);
PurchaseService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BookingRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.CategoryRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ConfigRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(5, loopback4_spring_1.service(services_1.TaxService)),
    tslib_1.__param(6, loopback4_spring_1.service(services_1.BoomAccountService)),
    tslib_1.__param(7, loopback4_spring_1.service(booking_service_1.BookingService)),
    tslib_1.__param(8, loopback4_spring_1.service(shipping_service_1.ShippingService)),
    tslib_1.__param(9, loopback4_spring_1.service(order_service_1.OrderService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BookingRepository,
        repositories_1.CategoryRepository,
        repositories_1.ConfigRepository,
        repositories_1.TransactionRepository,
        services_1.ProfileService,
        services_1.TaxService,
        services_1.BoomAccountService,
        booking_service_1.BookingService,
        shipping_service_1.ShippingService,
        order_service_1.OrderService])
], PurchaseService);
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=purchase.service.js.map