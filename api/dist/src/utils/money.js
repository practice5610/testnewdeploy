"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromMoney = void 0;
const tslib_1 = require("tslib");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const fromMoney = (money, includeSymbol = true, customFormatting = '0,0.00') => {
    return dinero_js_1.default(money || { amount: 0, precision: 2 }).toFormat(`${money && includeSymbol ? money.symbol || '$' : ''}${customFormatting}`);
};
exports.fromMoney = fromMoney;
//# sourceMappingURL=money.js.map