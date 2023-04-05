import { AllOptionalExceptFor, APIResponse, BoomUser } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { Booking, Order } from '../models';
import { BookingRepository, CategoryRepository, ConfigRepository, TransactionRepository } from '../repositories';
import { BoomAccountService, ProfileService, TaxService } from '../services';
import { PurchaseResult } from '../types';
import { BookingService } from './booking.service';
import { OrderService } from './order.service';
import { ShippingService } from './shipping.service';
export declare class PurchaseService {
    bookingRepository: BookingRepository;
    categoryRepository: CategoryRepository;
    configRepository: ConfigRepository;
    transactionRepository: TransactionRepository;
    profileService: ProfileService;
    taxService: TaxService;
    boomAccountService: BoomAccountService;
    bookingService: BookingService;
    shippingService: ShippingService;
    orderService: OrderService;
    logger: Logger;
    constructor(bookingRepository: BookingRepository, categoryRepository: CategoryRepository, configRepository: ConfigRepository, transactionRepository: TransactionRepository, profileService: ProfileService, taxService: TaxService, boomAccountService: BoomAccountService, bookingService: BookingService, shippingService: ShippingService, orderService: OrderService);
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
    purchase(bookings: Booking[], options?: Options): Promise<PurchaseResult>;
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
    clearMerchantPayoutAmount(merchants: AllOptionalExceptFor<BoomUser, 'uid'>[], options?: Options): Promise<object>;
    newPurchase(order: Order, options?: Options): Promise<APIResponse<any>>;
}
