import { BoomUser, Money } from '@boom-platform/globals';
/**
 * Adds amount to BoomUser merchant, taking away the commission for Boom.
 * @param {BoomUser} merchant
 * @param {Money} amount
 * @param {number} boomCommissionRate
 * @param {Money} [cashback]
 * @returns {{ newGrossBalance: Money, newNetBalance: Money }}
 */
export declare const addFundsToMerchant: (merchant: BoomUser, amount: Money, taxAmount: Money, boomCommissionRate: number, cashback?: Money | undefined) => {
    newGrossBalance: Money;
    newNetBalance: Money;
};
