"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFundsToMerchant = void 0;
const tslib_1 = require("tslib");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const money_1 = require("./money");
/**
 * Adds amount to BoomUser merchant, taking away the commission for Boom.
 * @param {BoomUser} merchant
 * @param {Money} amount
 * @param {number} boomCommissionRate
 * @param {Money} [cashback]
 * @returns {{ newGrossBalance: Money, newNetBalance: Money }}
 */
const addFundsToMerchant = (merchant, amount, taxAmount, boomCommissionRate, cashback) => {
    const logger = log4js_1.getLogger();
    logger.debug('\n---\naddFundsToMerchant called....');
    logger.debug(`Current Merchant balances: newGrossBalance: ${money_1.fromMoney(merchant.grossEarningsPendingWithdrawal)} newNetBalance: ${money_1.fromMoney(merchant.netEarningsPendingWithdrawal)}`);
    logger.debug(`Amount: ${money_1.fromMoney(amount)}`);
    logger.debug(`Tax: ${money_1.fromMoney(taxAmount)}`);
    logger.debug(`Commission Rate for this category is: ${boomCommissionRate}%`);
    const commissionAmount = dinero_js_1.default(amount).percentage(boomCommissionRate);
    if (logger.isDebugEnabled())
        logger.debug(`Commission amount:`, money_1.fromMoney(commissionAmount.toObject()));
    let netPayment = dinero_js_1.default(amount).subtract(commissionAmount).add(dinero_js_1.default(taxAmount));
    if (logger.isDebugEnabled())
        logger.debug(`Payment minus commission:`, money_1.fromMoney(netPayment.toObject()));
    if (cashback)
        netPayment = netPayment.subtract(dinero_js_1.default(cashback));
    const newGrossBalance = dinero_js_1.default(merchant.grossEarningsPendingWithdrawal)
        .add(dinero_js_1.default(amount))
        .add(dinero_js_1.default(taxAmount))
        .toObject();
    const newNetBalance = dinero_js_1.default(merchant.netEarningsPendingWithdrawal)
        .add(netPayment)
        .add(dinero_js_1.default(taxAmount))
        .toObject();
    if (logger.isDebugEnabled())
        logger.debug(`New merchant balances: newGrossBalance: ${money_1.fromMoney(newGrossBalance)} newNetBalance: ${money_1.fromMoney(newNetBalance)}`);
    logger.debug('addFundsToMerchant end.\n---\n');
    return { newGrossBalance, newNetBalance };
};
exports.addFundsToMerchant = addFundsToMerchant;
//# sourceMappingURL=purchases.js.map