"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const shippo = require('shippo')(process.env.SHIPPO_API_KEY);
let ShippingService = class ShippingService {
    constructor(shippingOrderRepository, shippingPolicyRepository, shippingBoxRepository) {
        this.shippingOrderRepository = shippingOrderRepository;
        this.shippingPolicyRepository = shippingPolicyRepository;
        this.shippingBoxRepository = shippingBoxRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.SHIPPING);
    }
    /**
     *  Validates an address, returns the address as it is stored in shippo and messages with warnings or
     *  errors.
     *  @param address the address to be validated
     */
    async validateAddress(address) {
        var _a, _b, _c, _d;
        const response = await shippo.address.create({
            name: address.name,
            street_no: address === null || address === void 0 ? void 0 : address.number,
            street1: address.street1,
            street2: address === null || address === void 0 ? void 0 : address.street2,
            city: address.city,
            state: address.state,
            zip: address.zip,
            country: address.country,
            validate: true,
        });
        if (!(response === null || response === void 0 ? void 0 : response.validation_results)) {
            return {
                success: false,
                message: 'Validation Failed',
            };
        }
        if (!response.validation_results.is_valid) {
            return {
                success: true,
                data: {
                    is_valid: false,
                    messages: ((_b = (_a = response.validation_results) === null || _a === void 0 ? void 0 : _a.messages) === null || _b === void 0 ? void 0 : _b.length) ? response.validation_results.messages
                        : undefined,
                },
                message: 'Failed',
            };
        }
        const validatedAddress = {
            object_id: response.object_id,
            name: response.name,
            number: response.street1.split(' ')[0],
            street1: response.street1.substring(response.street1.indexOf(' ') + 1),
            street2: response.street2,
            city: response.city,
            state: response.state,
            zip: response.zip,
            country: response.country,
            is_complete: response.is_complete,
        };
        return {
            success: true,
            data: {
                address: validatedAddress,
                is_valid: true,
                messages: ((_d = (_c = response.validation_results) === null || _c === void 0 ? void 0 : _c.messages) === null || _d === void 0 ? void 0 : _d.length) ? response.validation_results.messages
                    : undefined,
            },
            message: 'success',
        };
    }
    /**
     * gets rates for a shipment
     *
     * @param shipToAddressId the object_id of the address being shipped to
     * @param addressFrom the object_id of the address being shipped from
     * @param parcels a list of parcels in the shipment
     * @param extra this is where things like required signature or contains alcohol can be specified
     * @param returnAll set this to true to get every rate. by default this will only return 1-3 of the best rates
     * @param shipmentMethods a list of the service levels to return
     */
    async getRates(shipToAddressId, shipFromAddressId, parcels, extra, returnAll, shipmentMethods) {
        const response = await shippo.shipment.create({
            address_to: shipToAddressId,
            address_from: shipFromAddressId,
            parcels: parcels,
            extra: extra,
            async: false,
        });
        console.log('checkresponseerate ', response);
        if (!(response === null || response === void 0 ? void 0 : response.rates)) {
            return { success: false, message: 'No rates found' };
        }
        let rates;
        if (returnAll) {
            rates = response.rates.map((rate) => {
                var _a, _b, _c, _d;
                return {
                    shippo_id: rate.object_id,
                    attributes: rate.attributes,
                    amount: globals_1.toMoney(rate.amount),
                    provider: rate.provider,
                    service: (_b = (_a = rate.servicelevel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                    service_token: (_d = (_c = rate.servicelevel) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '',
                    estimated_days: rate.estimated_days,
                    duration_terms: rate.duration_terms,
                };
            });
        }
        else {
            // If no service levels were provided, default to UPS 3 day and UPS next day air saver
            if (!(shipmentMethods === null || shipmentMethods === void 0 ? void 0 : shipmentMethods.length)) {
                shipmentMethods = [globals_1.ShipmentMethod.UPS_3_DAY, globals_1.ShipmentMethod.UPS_NEXT_DAY_AIR_SAVER];
            }
            rates = response.rates
                .map((rate) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                if (rate.attributes.includes(globals_1.RateAttributes.CHEAPEST)) {
                    return {
                        shippo_id: rate.object_id,
                        attributes: rate.attributes,
                        amount: globals_1.toMoney(rate.amount),
                        provider: rate.provider,
                        service: (_b = (_a = rate.servicelevel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
                        service_token: (_d = (_c = rate.servicelevel) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '',
                        estimated_days: rate.estimated_days,
                        duration_terms: rate.duration_terms,
                    };
                }
                // return the rate if it is in the list of service levels
                else if (((_e = rate.servicelevel) === null || _e === void 0 ? void 0 : _e.token) && (shipmentMethods === null || shipmentMethods === void 0 ? void 0 : shipmentMethods.includes(rate.servicelevel.token))) {
                    return {
                        shippo_id: rate.object_id,
                        attributes: rate.attributes,
                        amount: globals_1.toMoney(rate.amount),
                        provider: rate.provider,
                        service: (_g = (_f = rate.servicelevel) === null || _f === void 0 ? void 0 : _f.name) !== null && _g !== void 0 ? _g : '',
                        service_token: (_j = (_h = rate.servicelevel) === null || _h === void 0 ? void 0 : _h.token) !== null && _j !== void 0 ? _j : '',
                        estimated_days: rate.estimated_days,
                        duration_terms: rate.duration_terms,
                    };
                }
                else {
                    return undefined;
                }
            })
                // map turns all the rates we don't want into undefined so we filter them out
                .filter((element) => {
                return element !== undefined;
            });
        }
        //sort from cheapest to most expensive for front end
        rates.sort((a, b) => {
            return a.amount.amount - b.amount.amount;
        });
        return { success: true, message: 'success', data: rates };
    }
    /**
     * Retrieves rate details for a given rate
     * @param id the Shippo id of the rate
     */
    async getRate(id) {
        var _a, _b, _c, _d;
        const response = await shippo.rate.retrieve(id);
        return {
            shippo_id: response.object_id,
            attributes: response.attributes,
            amount: globals_1.toMoney(response.amount),
            provider: response.provider,
            service: (_b = (_a = response.servicelevel) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '',
            service_token: (_d = (_c = response.servicelevel) === null || _c === void 0 ? void 0 : _c.token) !== null && _d !== void 0 ? _d : '',
            estimated_days: response.estimated_days,
            duration_terms: response.duration_terms,
        };
    }
    /**
     * Purchase lables from a rate. Create a ShippingOrder with the new shipping info
     * @param rate rate to purchase
     * @param purchaser the uid of the account paying for shipping
     * @param labelFileType file type for label. Default is set in shippo settings
     *
     * @returns the _id of the new ShippingOrder
     */
    async purchase(shippoRateId, purchaserId, labelFileType, options) {
        const rateDetails = await this.getRate(shippoRateId);
        const shippingOrder = await this.shippingOrderRepository.create({
            createdAt: moment_1.default().utc().unix(),
            updatedAt: moment_1.default().utc().unix(),
            price: rateDetails.amount,
            purchaser: purchaserId,
        }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        if (!(shippingOrder === null || shippingOrder === void 0 ? void 0 : shippingOrder._id)) {
            throw new Error('Error creating Shipping Order');
        }
        const response = await shippo.transaction.create({
            rate: shippoRateId,
            label_file_type: labelFileType,
            async: false,
        });
        if ((response === null || response === void 0 ? void 0 : response.status) === 'SUCCESS') {
            try {
                await this.shippingOrderRepository.updateById(shippingOrder._id, {
                    updatedAt: moment_1.default().utc().unix(),
                    trackingNumber: response.tracking_number,
                    trackingLink: response.tracking_url_provider,
                    shippo_id: response.object_id,
                    status: globals_1.ShippingOrderStatus.PAID,
                });
            }
            catch (error) {
                // Log the error and continue, we dont want to roll back after shipping is purchased from shippo
                this.logger.error(error.message);
                this.logger.error(`Shipping Order ${shippingOrder._id} failed to update:
        |  updatedAt: ${moment_1.default().utc().unix()},
        |  trackingNumber: ${response.tracking_number},
        |  trackingLink: ${response.tracking_url_provider},
        |  shippo_id: ${response.object_id},
        |  status: ${globals_1.ShippingOrderStatus.PAID},`);
            }
            return { success: true, message: 'ShippingOrder id', data: shippingOrder._id.toString() };
        }
        this.logger.error('Error purchasing shippo rate' + shippoRateId);
        this.logger.error(response === null || response === void 0 ? void 0 : response.messages);
        // throw error to roll back Shipping Order create
        throw new Error('shipping purchase service error');
    }
    /**
     * This retrieves a shippo transaction and returns the info in a useful way
     *
     * @param id id of the ShippoTransaction
     */
    async getTransaction(id) {
        const response = await shippo.transaction.retrieve(id);
        if (!response)
            return { success: false, message: 'Shippo transaction not found' };
        return {
            success: true,
            message: 'success',
            data: Object.assign(Object.assign(Object.assign(Object.assign({ status: response.status, createdAt: moment_1.default(response.object_created).utc().unix(), updatedAt: moment_1.default(response.object_updated).utc().unix(), shippo_id: response.object_id, rate: response.rate, label_url: response.label_url, eta: (response === null || response === void 0 ? void 0 : response.eta) ? Date.parse(response === null || response === void 0 ? void 0 : response.eta) : null }, ((response === null || response === void 0 ? void 0 : response.metadata) && { metadata: response.metadata })), ((response === null || response === void 0 ? void 0 : response.tracking_number) && { tracking_number: response.tracking_number })), ((response === null || response === void 0 ? void 0 : response.tracking_status) && { tracking_status: response.tracking_status })), ((response === null || response === void 0 ? void 0 : response.tracking_url_provider) && {
                tracking_url_provider: response.tracking_url_provider,
            })),
        };
    }
    /**
     * get all label urls for a transaction
     * First it gets the transaction for the given shippo_id, then it uses the
     * rate from the transaction to get all of the labels
     *
     * @param transaction shippo_id of the transaction the label belongs to
     */
    async getLabels(transaction) {
        var _a;
        const fullTransaction = await this.getTransaction(transaction);
        if (!fullTransaction.success || !(fullTransaction === null || fullTransaction === void 0 ? void 0 : fullTransaction.data))
            return { success: false, message: 'Labels not found' };
        const transactions = await shippo.transaction.list({ rate: fullTransaction.data.rate });
        if (!((_a = transactions === null || transactions === void 0 ? void 0 : transactions.results) === null || _a === void 0 ? void 0 : _a.length)) {
            return { success: false, message: 'Labels not found' };
        }
        return {
            success: true,
            message: 'List of label urls',
            data: transactions.results.map((trans) => {
                return trans.label_url;
            }),
        };
    }
    /**
     * Attempts to refund an unused label (transaction). Returns success: true if
     * successful, throws if not successful
     *
     * This function executes in this specific order because if shippo fails, we want to roll back the
     * ShippingOrder to not be refund pending. BUT if we just update the ShippingOrder after the refund
     * request goes through and the update fails, we have no way to track that a refund is in progress.
     * So we update to refund pending, then do the refund. If it fails we roll back. If it succeeds we
     * try to update ShippingOrder to success. If it is pending or queued we leave the ShippingOrder as
     * REFUND_PENDING
     *
     * @param transaction shippo_id for the transaction
     */
    async refund(transaction, options) {
        const shippingOrder = await this.shippingOrderRepository.find({ where: { shippo_id: transaction } }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        if (shippingOrder.length) {
            await this.shippingOrderRepository.updateById(shippingOrder[0]._id, { updatedAt: moment_1.default().utc().unix(), status: globals_1.ShippingOrderStatus.REFUND_PENDING }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        }
        const response = await shippo.refund.create({
            transaction: transaction,
            async: false,
        });
        if (!(response === null || response === void 0 ? void 0 : response.status)) {
            throw new Error('Refund failed');
        }
        if ((response === null || response === void 0 ? void 0 : response.status) === 'ERROR') {
            throw new Error('Refund failed, label has been used');
        }
        if (shippingOrder.length && (response === null || response === void 0 ? void 0 : response.status) === 'SUCCESS') {
            try {
                await this.shippingOrderRepository.updateById(shippingOrder[0]._id, {
                    updatedAt: moment_1.default().utc().unix(),
                    status: globals_1.ShippingOrderStatus.REFUNDED,
                });
            }
            catch (error) {
                this.logger.error(`Error updating shipping order ${shippingOrder === null || shippingOrder === void 0 ? void 0 : shippingOrder[0]._id} to REFUNDED`);
            }
        }
        return { success: true, message: `Refund ${response.status}`, data: transaction };
    }
    /**
     * This takes a list of bookings, splits them into shipable bookings (if any have too much quantity),
     * groups those by their ShippingPolicy and the place they ship from, further groups those into the
     * boxes they will be shipped in, then gets rates for each group of boxes that are shipped by the
     * same person
     *
     * @param bookings
     * @param shipToAddressId
     */
    async optimizeCart(bookings, shipToAddressId) {
        const shippingPolicyList = await this.getShippingPolicies(bookings);
        const splitBookings = this.splitBookings(bookings);
        const { groupedBookings, pickUpOrders, failedBookings, } = await this.groupBookings(splitBookings, shippingPolicyList);
        const merchantTotals = this.addMerchantTotals(splitBookings);
        const parcelGroups = this.createParcelGroups(groupedBookings, shippingPolicyList);
        const orderGroups = await this.createOrderGroups(merchantTotals, parcelGroups, shipToAddressId);
        return {
            success: true,
            message: 'Bookings that ship together share a group with a list of rate options for that group',
            data: { orderGroups: [...pickUpOrders, ...orderGroups], failedBookings: failedBookings },
        };
    }
    /////////////////////////////////
    // Helper Functions
    //////////////////////////
    /**
     * this gets the product out of a booking so we don't have to constantly
     * check if things are offers or products
     * @param booking the booking to get a product from
     */
    getProduct(booking) {
        if (globals_1.isOffer(booking.item)) {
            return booking.item.product;
        }
        else {
            return booking.item;
        }
    }
    /**
     * This adds the total money being spent per merchant. This is used to see
     * if customers are spending enough to hit free shipping thresholds
     * @param bookings
     */
    addMerchantTotals(bookings) {
        const totals = {};
        bookings.forEach((booking) => {
            var _a;
            const product = this.getProduct(booking);
            if (totals[product.merchantUID] === undefined) {
                totals[product.merchantUID] = { amount: 0, precision: 0, currency: 'USD', symbol: '$' };
            }
            totals[product.merchantUID] = globals_1.dineroToMoney(dinero_js_1.default(totals[product.merchantUID]).add(dinero_js_1.default(product.price).multiply((_a = booking.quantity) !== null && _a !== void 0 ? _a : 1)));
        });
        return totals;
    }
    /**
     * Gets the total weight from a booking. If the booking's product is missing packageDetails this returns 0 grams
     * @param booking
     */
    getBookingWeight(booking) {
        var _a;
        const product = this.getProduct(booking);
        if (!product.packageDetails) {
            return { value: 0, unit: globals_1.MassUnit.GRAM };
        }
        return {
            value: ((_a = booking.quantity) !== null && _a !== void 0 ? _a : 1) * product.packageDetails.weight,
            unit: product.packageDetails.massUnit,
        };
    }
    /**
     * This adds two weights of possible different units and returns the combined weight. If the units
     * do not match the weight is returned in grams.
     * @param w1
     * @param w2
     */
    addWeights(w1, w2) {
        // if one weight is undefined, return the other one
        if ((!w1 || !w2) && !(w1 && w2)) {
            if (!w1 && !w2) {
                return { value: 0, unit: globals_1.MassUnit.GRAM };
            }
            return w1 || w2;
        }
        // if a weight is ZERO return the other. This is used to preserve the units of the non-zero weight
        if (w1.value === 0)
            return w2;
        if (w2.value === 0)
            return w1;
        const convertToGram = {};
        convertToGram[globals_1.MassUnit.GRAM] = 1;
        convertToGram[globals_1.MassUnit.OUNCE] = 28.3495;
        convertToGram[globals_1.MassUnit.POUND] = 453.592000004704;
        convertToGram[globals_1.MassUnit.KILO] = 1000;
        if (w1.unit === w2.unit) {
            return { value: w1.value + w2.value, unit: w1.unit };
        }
        return {
            value: w1.value * convertToGram[w1.unit] + w2.value * convertToGram[w2.unit],
            unit: globals_1.MassUnit.GRAM,
        };
    }
    /**
     * Checks a ShippingPolicy and returns the shipping methods to be offered (including any free methods)
     * @param moneyTotals the total amount of money being spent by merchant
     * @param policy
     */
    chooseShipmentMethods(moneyTotals, policy) {
        if (policy.flatRate) {
            return [globals_1.ShipmentMethod.SELF_SHIP];
        }
        // Not sure what the best way to handle default methods is
        const chosenMethods = [globals_1.ShipmentMethod.UPS_GROUND, globals_1.ShipmentMethod.UPS_NEXT_DAY_AIR_SAVER];
        if (!policy.merchantId || !moneyTotals[policy.merchantId] || !policy.freeShippingThresholds) {
            return chosenMethods;
        }
        chosenMethods.push(...this.getFreeShipmentMethods(moneyTotals, policy));
        // remove duplicates if a free service overlaps with a default one
        return [...new Set(chosenMethods)];
    }
    getFreeShipmentMethods(moneyTotals, policy) {
        const freeMethods = [];
        if (!policy.freeShippingThresholds) {
            return freeMethods;
        }
        policy.freeShippingThresholds.forEach((element) => {
            if (dinero_js_1.default(moneyTotals[policy.merchantId]).greaterThanOrEqual(dinero_js_1.default(element.amountSpent))) {
                freeMethods.push(element.freeService);
            }
        });
        return freeMethods;
    }
    /**
     * Groups a list of bookings into units that are shipped from the same
     * address with the same shipping policy
     *
     * Non shippable bookings are grouped by the shipping policy ID only
     * @param bookings
     */
    async groupBookings(bookings, policies) {
        var _a, _b, _c;
        // this creates the index for each "group". a group is defined as shipping from the same
        // address and having the same shipping policy
        function getGroupID(p) {
            var _a;
            return ((_a = p.packageDetails) === null || _a === void 0 ? void 0 : _a.shipsFrom) + p.shippingPolicy;
        }
        const groups = {};
        const boxes = {};
        const failedBookings = [];
        const pickUpBookings = {};
        for (const booking of bookings) {
            const product = this.getProduct(booking);
            if (!product.shippingPolicy) {
                failedBookings.push(booking);
                continue;
            }
            if (policies[product.shippingPolicy].pickUpOnly) {
                if (pickUpBookings[product.shippingPolicy] === undefined) {
                    pickUpBookings[product.shippingPolicy] = {
                        bookings: [],
                        storeName: product.store.companyName,
                    };
                }
                pickUpBookings[product.shippingPolicy].bookings.push(booking);
                continue;
            }
            // If we get here, the product is being shipped so we need package details
            if (!product.packageDetails) {
                failedBookings.push(booking);
                continue;
            }
            //Get the box details
            if (boxes[product.packageDetails.boxId] === undefined) {
                try {
                    const box = await this.shippingBoxRepository.findById(product.packageDetails.boxId);
                    boxes[product.packageDetails.boxId] = {
                        height: box.height,
                        width: box.width,
                        length: box.length,
                        distanceUnit: box.unit,
                    };
                }
                catch (error) {
                    this.logger.error(`Failed to find Shipping Box ${product.packageDetails.boxId}`);
                    failedBookings.push(booking);
                    continue;
                }
            }
            //initialize the group for this product if it doesn't exist yet
            if (groups[getGroupID(product)] === undefined) {
                groups[getGroupID(product)] = {};
            }
            // create a BoxGroup within the current group and add the booking to it.
            // All bookings within a Group come from the same address and have the same
            // ShippingPolicy. Each booking within a BoxGroup belong to the same Group but also
            // share the same box type
            if (groups[getGroupID(product)][product.packageDetails.boxId] === undefined) {
                groups[getGroupID(product)][product.packageDetails.boxId] = {
                    items: [
                        {
                            booking: booking,
                            weight: this.getBookingWeight(booking),
                            boxFill: ((_a = booking.quantity) !== null && _a !== void 0 ? _a : 1) / product.packageDetails.itemsPerBox,
                        },
                    ],
                    distanceUnit: boxes[product.packageDetails.boxId].distanceUnit,
                    width: boxes[product.packageDetails.boxId].width,
                    length: boxes[product.packageDetails.boxId].length,
                    height: boxes[product.packageDetails.boxId].height,
                };
            }
            // else add the current booking to the existing boxGroup it belongs to
            else {
                groups[getGroupID(product)][product.packageDetails.boxId].items.push({
                    booking: booking,
                    weight: this.getBookingWeight(booking),
                    boxFill: ((_b = booking.quantity) !== null && _b !== void 0 ? _b : 1) / product.packageDetails.itemsPerBox,
                });
            }
        }
        const pickUpOrders = [];
        for (const key in pickUpBookings) {
            // merchant is set to store name if it exists, else nothing?
            pickUpOrders.push({
                store: (_c = pickUpBookings[key].storeName) !== null && _c !== void 0 ? _c : '',
                shippable: false,
                rates: [],
                bookings: pickUpBookings[key].bookings,
            });
        }
        return { groupedBookings: groups, pickUpOrders, failedBookings };
    }
    /**
     * reduce the BoxGroups data into the total boxes needed and each of those boxes final weight
     * @param groups
     */
    createParcelGroups(groups, policies) {
        const parcelGroups = [];
        for (const group in groups) {
            let policy = undefined;
            const parcels = [];
            for (const boxGroup in groups[group]) {
                const CAPACITY = 1;
                let currentFill = 0;
                const ZERO_WEIGHT = { value: 0, unit: globals_1.MassUnit.GRAM };
                let totalWeight = ZERO_WEIGHT;
                let bookingsList = [];
                // Sort groups[group][boxGroup].booking to put hardest elements to place first
                groups[group][boxGroup].items.sort((a, b) => {
                    return b.boxFill - a.boxFill;
                });
                groups[group][boxGroup].items.forEach((item) => {
                    if (policy === undefined) {
                        policy = policies[this.getProduct(item.booking).shippingPolicy];
                    }
                    if (currentFill + item.boxFill <= CAPACITY) {
                        currentFill += item.boxFill;
                        totalWeight = this.addWeights(totalWeight, item.weight);
                        bookingsList.push(item.booking);
                    }
                    else {
                        parcels.push({
                            bookings: bookingsList,
                            weight: totalWeight.value,
                            weightUnit: totalWeight.unit,
                            distanceUnit: groups[group][boxGroup].distanceUnit,
                            length: groups[group][boxGroup].length,
                            width: groups[group][boxGroup].width,
                            height: groups[group][boxGroup].height,
                        });
                        bookingsList = [item.booking];
                        totalWeight = item.weight;
                        currentFill = item.boxFill;
                    }
                });
                parcels.push({
                    bookings: bookingsList,
                    weight: totalWeight.value,
                    weightUnit: totalWeight.unit,
                    distanceUnit: groups[group][boxGroup].distanceUnit,
                    length: groups[group][boxGroup].length,
                    width: groups[group][boxGroup].width,
                    height: groups[group][boxGroup].height,
                });
            }
            /**
             * We now have the total boxes and total weights that are shipping from this location
             */
            if (policy)
                parcelGroups.push({ parcels: parcels, policy: policy });
        }
        return parcelGroups;
    }
    /**
     * Now that we have the ideal groups of packages with their total weight figured out, we try to get
     * rates for them. If we can't get a group rate on a ParcelGroup, we have to try to get rates for
     * each item in the ParcelGroup. If any of those items can't get a rate for some reason, we fall back
     * on some error rate we can show the customer (like $8 maybe?)
     *
     * @param moneyTotals list of total money spent per merchant
     * @param parcelGroups the ideal groups of items that would ship together
     *
     * @returns a list that groups the bookings that are shipping together with their rate options
     */
    async createOrderGroups(moneyTotals, parcelGroups, shipToAddressId) {
        var _a, _b, _c, _d, _e, _f, _g;
        const orderGroups = [];
        for (const element of parcelGroups) {
            const methods = this.chooseShipmentMethods(moneyTotals, element.policy);
            const policy = element.policy;
            const parcels = element.parcels.map((p) => {
                return {
                    length: p.length,
                    weight: p.weight,
                    height: p.height,
                    width: p.width,
                    distance_unit: p.distanceUnit,
                    mass_unit: p.weightUnit,
                };
            });
            // any bookings whos products packageDetails are undefined would have been filtered out in the groupOrders step so this is safe
            const addressFrom = this.getProduct(element.parcels[0].bookings[0]).packageDetails.shipsFrom;
            let rates;
            if (policy.flatRate) {
                let numberOfItems = 0;
                element.parcels.forEach((par) => {
                    par.bookings.forEach((b) => {
                        var _a;
                        numberOfItems += (_a = b.quantity) !== null && _a !== void 0 ? _a : 1;
                    });
                });
                rates = {
                    success: true,
                    message: 'Flat rate set by merchant',
                    data: [
                        {
                            amount: Object.assign(Object.assign({}, policy.flatRate), { amount: policy.flatRate.amount * numberOfItems }),
                            shippo_id: '',
                            attributes: [globals_1.RateAttributes.SELF_SHIP],
                            provider: '',
                            service_token: '',
                            service: '',
                            estimated_days: -1,
                            duration_terms: '',
                        },
                    ],
                };
            }
            else {
                rates = await this.getRates(shipToAddressId, addressFrom, parcels, undefined, undefined, methods);
            }
            if (!(rates === null || rates === void 0 ? void 0 : rates.success)) {
                let parcelIndex = 0;
                for (const p of parcels) {
                    let individualRate = await this.getRates(shipToAddressId, addressFrom, [p], undefined, undefined, methods);
                    if (!(individualRate === null || individualRate === void 0 ? void 0 : individualRate.success)) {
                        // Try getting rates without a shipmentMethods param if previous didn't work
                        individualRate = await this.getRates(shipToAddressId, addressFrom, [p]);
                    }
                    if (!(individualRate === null || individualRate === void 0 ? void 0 : individualRate.success)) {
                        // create a fake rate response if no rates were found
                        individualRate = { data: [], success: false, message: 'Error: No Rate Found' };
                    }
                    const freeRates = this.getFreeShipmentMethods(moneyTotals, policy);
                    if (individualRate.data) {
                        individualRate.data = (_a = individualRate.data) === null || _a === void 0 ? void 0 : _a.map((r) => {
                            if (freeRates.includes(r.service_token)) {
                                return Object.assign(Object.assign({}, r), { attributes: [globals_1.RateAttributes.FREE_SHIPPING], amount: globals_1.toMoney(0) });
                            }
                            return r;
                        });
                    }
                    // merchant is set to the store name or empty string
                    orderGroups.push({
                        store: (_d = this.getProduct((_c = (_b = element.parcels) === null || _b === void 0 ? void 0 : _b[0].bookings) === null || _c === void 0 ? void 0 : _c[0]).store.companyName) !== null && _d !== void 0 ? _d : '',
                        rates: (_e = individualRate === null || individualRate === void 0 ? void 0 : individualRate.data) !== null && _e !== void 0 ? _e : [],
                        bookings: element.parcels[parcelIndex].bookings,
                        shippable: true,
                    });
                    parcelIndex++;
                }
            }
            else {
                const freeRates = this.getFreeShipmentMethods(moneyTotals, policy);
                if (rates.data) {
                    rates.data = (_f = rates.data) === null || _f === void 0 ? void 0 : _f.map((r) => {
                        if (freeRates.includes(r.service_token)) {
                            return Object.assign(Object.assign({}, r), { attributes: [globals_1.RateAttributes.FREE_SHIPPING], amount: globals_1.toMoney(0) });
                        }
                        return r;
                    });
                }
                const bookings = [];
                let storeName = '';
                parcels.forEach((p, index) => {
                    element.parcels[index].bookings.forEach((e) => {
                        var _a;
                        if (storeName === '') {
                            storeName = (_a = this.getProduct(e).store.companyName) !== null && _a !== void 0 ? _a : '';
                        }
                        bookings.push(e);
                    });
                });
                orderGroups.push({
                    store: storeName,
                    rates: (_g = rates === null || rates === void 0 ? void 0 : rates.data) !== null && _g !== void 0 ? _g : [],
                    bookings: bookings,
                    shippable: true,
                });
            }
        }
        return orderGroups;
    }
    /**
     * This splits bookings that have too high of a quantity to ship together into smaller bookings
     * @param bookings
     */
    splitBookings(bookings) {
        const newBookings = [];
        bookings.forEach((booking) => {
            var _a, _b;
            const product = this.getProduct(booking);
            let quantity = (_a = booking.quantity) !== null && _a !== void 0 ? _a : 1;
            if (!((_b = product.packageDetails) === null || _b === void 0 ? void 0 : _b.itemsPerBox)) {
                return newBookings.push(booking);
            }
            while (quantity > product.packageDetails.itemsPerBox) {
                quantity -= product.packageDetails.itemsPerBox;
                newBookings.push(Object.assign(Object.assign({}, booking), { quantity: product.packageDetails.itemsPerBox }));
            }
            newBookings.push(Object.assign(Object.assign({}, booking), { quantity: quantity }));
        });
        return newBookings;
    }
    async getShippingPolicies(bookings) {
        const policyList = {};
        for (const element of bookings) {
            const product = this.getProduct(element);
            if (!product.shippingPolicy) {
                continue;
            }
            if (policyList[product.shippingPolicy] === undefined) {
                try {
                    const policy = await this.shippingPolicyRepository.findById(product.shippingPolicy);
                    policyList[product.shippingPolicy] = policy;
                }
                catch (error) {
                    this.logger.error(`Shipping policy ${product.shippingPolicy} for product ${product._id} was not found.`);
                }
            }
        }
        return policyList;
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: repository_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingService.prototype, "purchase", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: repository_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ShippingService.prototype, "refund", null);
ShippingService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ShippingOrderRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ShippingPolicyRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ShippingBoxRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ShippingOrderRepository,
        repositories_1.ShippingPolicyRepository,
        repositories_1.ShippingBoxRepository])
], ShippingService);
exports.ShippingService = ShippingService;
//# sourceMappingURL=shipping.service.js.map