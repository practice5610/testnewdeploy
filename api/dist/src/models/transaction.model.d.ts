import { AllOptionalExceptFor, BoomUser, Money, TaxCode, TransactionStatus, TransactionType } from '@boom-platform/globals';
import { Entity } from '@loopback/repository';
import { Booking } from './booking.model';
import { Offer } from './offer.model';
import { Product } from './product.model';
import { Store } from './store.model';
export declare class Transaction extends Entity {
    _id: string;
    createdAt?: number;
    updatedAt?: number;
    type: TransactionType;
    status?: TransactionStatus;
    amount: Money;
    cashback?: Money;
    nonce?: string;
    sender: AllOptionalExceptFor<BoomUser, 'uid'> | AllOptionalExceptFor<Store, '_id'>;
    receiver: AllOptionalExceptFor<BoomUser, 'uid'> | AllOptionalExceptFor<Store, '_id'>;
    title?: string;
    taxcode?: TaxCode;
    salestax?: Money;
    boomAccountID?: string;
    purchaseItem?: Partial<Offer> | Partial<Product>;
    booking?: Partial<Booking>;
    dateReceived?: number;
    commissionCollected?: Money;
    shippingOrderId?: string;
    shortId: string;
    constructor(data?: Partial<Transaction>);
}
export interface TransactionRelations {
}
export declare type TransactionWithRelations = Transaction & TransactionRelations;
