import { AllOptionalExceptFor, BoomUser, BoomUserPlaidInfo, Money, PackageDetails } from '@boom-platform/globals';
import { Count } from '@loopback/repository';
import { BankInfo, Booking, BoomAccount, BoomCard, Category, CustomerBilling, Offer, Product, ReturnDisputeModel, ReturnPolicyModel, ReturnRequestModel, ShippingBox, ShippingPolicy, Store } from '../../models';
export declare function givenEmptyDatabase(): Promise<void>;
export declare const givenOffer: (data?: Partial<Offer> | undefined) => Promise<Offer>;
export declare const givenProduct: (data?: Partial<Product> | undefined) => Promise<Product>;
export declare const givenShippingPolicy: (data?: Partial<ShippingPolicy> | undefined) => Promise<ShippingPolicy>;
export declare const givenShippingBox: (data?: Partial<ShippingBox> | undefined) => Promise<ShippingBox>;
export declare const givenPackageDetails: (data?: Partial<PackageDetails> | undefined) => PackageDetails;
export declare const givenStore: (data?: Partial<Store> | undefined) => Promise<Store>;
export declare const givenMerchant: (data?: BoomUser | undefined) => AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName' | 'contact' | 'addresses' | 'createdAt' | 'updatedAt' | 'roles'>;
export declare const givenCustomer: (data?: BoomUser | undefined) => AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName' | 'contact' | 'addresses' | 'createdAt' | 'updatedAt' | 'roles'>;
export declare const givenAdmin: (data?: BoomUser | undefined) => AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName' | 'contact' | 'createdAt' | 'updatedAt' | 'roles'>;
export declare const givenSuperAdmin: (data?: BoomUser | undefined) => AllOptionalExceptFor<BoomUser, 'uid' | 'firstName' | 'lastName' | 'contact' | 'createdAt' | 'updatedAt' | 'roles'>;
export declare const givenProductBooking: (data?: Partial<Booking> | undefined) => Promise<Booking>;
export declare const givenOfferBooking: (data?: Partial<Booking> | undefined) => Promise<Booking>;
export declare const givenBookings: (bookings?: Partial<Booking>[] | undefined) => Promise<Booking[]>;
/**
 * Represents a plaid entry from a user's firebase document
 */
export declare const givenPlaidEntry: () => BoomUserPlaidInfo;
export declare const givenMoney: (dollarAmmount?: number | undefined) => Money;
export declare const givenBankInfo: (data?: Partial<BankInfo> | undefined) => Promise<BankInfo>;
export declare const givenCategory: (data?: Partial<Category> | undefined) => Category;
export declare const givenTaxResponse: () => any;
export declare const givenCount: () => Count;
export declare const givenBoomAccountVerifyResponse: (data?: Partial<BoomAccount> | undefined) => any;
export declare const givenBoomCard: (data?: Partial<BoomCard> | undefined) => Promise<BoomCard>;
export declare const givenBoomAccount: (data?: Partial<BoomAccount> | undefined) => Promise<BoomAccount>;
export declare const givenCustomerBilling: (data?: Partial<CustomerBilling> | undefined) => Promise<CustomerBilling>;
export declare const givenTransferReceiverProfileData: () => BoomUser;
export declare const givenReturnPolicy: (data?: Partial<ReturnPolicyModel> | undefined) => Promise<ReturnPolicyModel>;
export declare const givenReturnRequest: (data?: Partial<ReturnRequestModel> | undefined) => Promise<ReturnRequestModel>;
export declare const givenReturnDispute: (data?: Partial<ReturnDisputeModel> | undefined) => Promise<ReturnDisputeModel>;
