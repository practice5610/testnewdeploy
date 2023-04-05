"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxService = void 0;
const tslib_1 = require("tslib");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const taxjar_1 = tslib_1.__importDefault(require("taxjar"));
const constants_1 = require("../constants");
const apiKey = process.env.TAXJAR_SANDBOX_API_KEY || '';
const apiUrl = taxjar_1.default.SANDBOX_API_URL || '';
class TaxService {
    constructor() {
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.TAXES);
        this.client = new taxjar_1.default({
            apiKey,
            apiUrl,
        });
    }
    async getTotalTaxByProduct(fromAddress, toAddress, nexus, price) {
        try {
            console.log('checktoaddress', toAddress);
            const result = await this.client
                .taxForOrder({
                from_country: fromAddress.country,
                from_zip: fromAddress.zipcode,
                from_state: fromAddress.state,
                from_city: fromAddress.city,
                from_street: fromAddress.address,
                to_country: toAddress.country,
                to_zip: toAddress.zipcode,
                to_state: toAddress.state,
                to_city: toAddress.city,
                to_street: toAddress.address,
                amount: dinero_js_1.default(price).toUnit(),
                shipping: 0,
                nexus_addresses: nexus,
            })
                .then((result) => {
                console.log('taxresul', result);
                return result;
            })
                .catch((err) => {
                console.log('taxerror', err);
                return err;
            });
            console.log('checktexresult', result);
            if (!result) {
                return { success: false, message: 'TaxJar error.' };
            }
            return {
                success: true,
                message: 'Success',
                data: result,
            };
        }
        catch (err) {
            this.logger.error(err);
            return { success: false, message: 'TaxJar error.' };
        }
    }
}
exports.TaxService = TaxService;
//# sourceMappingURL=tax.service.js.map