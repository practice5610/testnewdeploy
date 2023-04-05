"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
const product_service_1 = require("./product.service");
let OfferService = class OfferService {
    constructor(offerRepository, productService) {
        this.offerRepository = offerRepository;
        this.productService = productService;
    }
    async validateOffer(offer) {
        try {
            const now = moment_1.default().utc().unix();
            // empty offer or empty offer id validation.
            if (!offer || !offer._id)
                return utils_1.APIResponseFalseOutput(constants_1.OfferResponseMessages.INVALID);
            // query offer from our database.
            const dbOffer = await this.offerRepository.findById(offer._id);
            // unsuccessful query validation.
            if (!dbOffer)
                return utils_1.APIResponseFalseOutput(constants_1.OfferResponseMessages.NO_LONGER_EXIST);
            // expiration date validation
            if (dbOffer.expiration <= now)
                return utils_1.APIResponseFalseOutput(constants_1.OfferResponseMessages.EXPIRED);
            // Offer product validation
            if (!dbOffer.product || !dbOffer.product._id)
                return utils_1.APIResponseFalseOutput(constants_1.ProductResponseMessages.INVALID);
            const productValidation = await this.productService.validateProduct(offer.product);
            if (!productValidation.success)
                return utils_1.APIResponseFalseOutput(productValidation.message);
            return {
                success: true,
                message: constants_1.OfferResponseMessages.VALID,
            };
        }
        catch (error) {
            if (error.code)
                return utils_1.APIResponseFalseOutput(error);
            return utils_1.APIResponseFalseOutput();
        }
    }
};
OfferService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OfferRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(product_service_1.ProductService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OfferRepository,
        product_service_1.ProductService])
], OfferService);
exports.OfferService = OfferService;
//# sourceMappingURL=offer.service.js.map