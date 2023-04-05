import { AddressInfo, AddressValidationResponse, AllOptionalExceptFor, APIResponse, Parcel, Rate, ShipmentExtras, ShipmentMethod, ShippoLabelType, ShippoTransaction } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { Booking, Product, ShippingPolicy } from '../models';
import { ShippingBoxRepository, ShippingOrderRepository, ShippingPolicyRepository } from '../repositories';
import { Groups, MerchantTotals, OrderGroup, ParcelGroups, ShippingPolicyList, Weight } from '../types';
export declare class ShippingService {
    shippingOrderRepository: ShippingOrderRepository;
    shippingPolicyRepository: ShippingPolicyRepository;
    shippingBoxRepository: ShippingBoxRepository;
    logger: Logger;
    constructor(shippingOrderRepository: ShippingOrderRepository, shippingPolicyRepository: ShippingPolicyRepository, shippingBoxRepository: ShippingBoxRepository);
    /**
     *  Validates an address, returns the address as it is stored in shippo and messages with warnings or
     *  errors.
     *  @param address the address to be validated
     */
    validateAddress(address: AllOptionalExceptFor<AddressInfo, 'name' | 'street1' | 'city' | 'state' | 'zip' | 'country'>): Promise<APIResponse<AddressValidationResponse>>;
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
    getRates(shipToAddressId: string, shipFromAddressId: string, parcels: Parcel[], extra?: ShipmentExtras, returnAll?: boolean, shipmentMethods?: ShipmentMethod[]): Promise<APIResponse<Rate[]>>;
    /**
     * Retrieves rate details for a given rate
     * @param id the Shippo id of the rate
     */
    getRate(id: string): Promise<Rate>;
    /**
     * Purchase lables from a rate. Create a ShippingOrder with the new shipping info
     * @param rate rate to purchase
     * @param purchaser the uid of the account paying for shipping
     * @param labelFileType file type for label. Default is set in shippo settings
     *
     * @returns the _id of the new ShippingOrder
     */
    purchase(shippoRateId: string, purchaserId: string, labelFileType?: ShippoLabelType, options?: Options): Promise<APIResponse<string>>;
    /**
     * This retrieves a shippo transaction and returns the info in a useful way
     *
     * @param id id of the ShippoTransaction
     */
    getTransaction(id: string): Promise<APIResponse<ShippoTransaction>>;
    /**
     * get all label urls for a transaction
     * First it gets the transaction for the given shippo_id, then it uses the
     * rate from the transaction to get all of the labels
     *
     * @param transaction shippo_id of the transaction the label belongs to
     */
    getLabels(transaction: string): Promise<APIResponse<string[]>>;
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
    refund(transaction: string, options?: Options): Promise<APIResponse<string>>;
    /**
     * This takes a list of bookings, splits them into shipable bookings (if any have too much quantity),
     * groups those by their ShippingPolicy and the place they ship from, further groups those into the
     * boxes they will be shipped in, then gets rates for each group of boxes that are shipped by the
     * same person
     *
     * @param bookings
     * @param shipToAddressId
     */
    optimizeCart(bookings: Booking[], shipToAddressId: string): Promise<APIResponse<{
        orderGroups: OrderGroup[];
        failedBookings: Booking[];
    }>>;
    /**
     * this gets the product out of a booking so we don't have to constantly
     * check if things are offers or products
     * @param booking the booking to get a product from
     */
    getProduct(booking: Booking): Product;
    /**
     * This adds the total money being spent per merchant. This is used to see
     * if customers are spending enough to hit free shipping thresholds
     * @param bookings
     */
    addMerchantTotals(bookings: Booking[]): MerchantTotals;
    /**
     * Gets the total weight from a booking. If the booking's product is missing packageDetails this returns 0 grams
     * @param booking
     */
    getBookingWeight(booking: Booking): Weight;
    /**
     * This adds two weights of possible different units and returns the combined weight. If the units
     * do not match the weight is returned in grams.
     * @param w1
     * @param w2
     */
    addWeights(w1: Weight, w2: Weight): Weight;
    /**
     * Checks a ShippingPolicy and returns the shipping methods to be offered (including any free methods)
     * @param moneyTotals the total amount of money being spent by merchant
     * @param policy
     */
    chooseShipmentMethods(moneyTotals: MerchantTotals, policy: ShippingPolicy): ShipmentMethod[];
    getFreeShipmentMethods(moneyTotals: MerchantTotals, policy: ShippingPolicy): ShipmentMethod[];
    /**
     * Groups a list of bookings into units that are shipped from the same
     * address with the same shipping policy
     *
     * Non shippable bookings are grouped by the shipping policy ID only
     * @param bookings
     */
    groupBookings(bookings: Booking[], policies: ShippingPolicyList): Promise<{
        groupedBookings: Groups;
        pickUpOrders: OrderGroup[];
        failedBookings: Booking[];
    }>;
    /**
     * reduce the BoxGroups data into the total boxes needed and each of those boxes final weight
     * @param groups
     */
    createParcelGroups(groups: Groups, policies: ShippingPolicyList): ParcelGroups[];
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
    createOrderGroups(moneyTotals: MerchantTotals, parcelGroups: ParcelGroups[], shipToAddressId: string): Promise<OrderGroup[]>;
    /**
     * This splits bookings that have too high of a quantity to ship together into smaller bookings
     * @param bookings
     */
    splitBookings(bookings: Booking[]): Booking[];
    getShippingPolicies(bookings: Booking[]): Promise<ShippingPolicyList>;
}
