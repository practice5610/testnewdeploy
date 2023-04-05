"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomCardService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
let BoomCardService = class BoomCardService {
    constructor(boomCardRepository) {
        this.boomCardRepository = boomCardRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOM_CARD_SERVICE);
    }
    async createBoomCards(boomCards) {
        const createdBoomCards = await this.boomCardRepository.createAll(boomCards);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.APIResponseMessages.SUCCESS,
            data: createdBoomCards,
        };
    }
    async countBoomCards(where) {
        const counter = await this.boomCardRepository.count(where);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.APIResponseMessages.SUCCESS,
            data: counter,
        };
    }
    async findBoomCards(filter) {
        const boomCards = await this.boomCardRepository.find(filter);
        if (boomCards.length) {
            return {
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: boomCards,
            };
        }
        return {
            success: false,
            statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
            message: constants_1.APIResponseMessages.RECORD_NOT_FOUND,
        };
    }
    async findBoomCardById(id) {
        const boomCard = await this.boomCardRepository.findById(id);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.APIResponseMessages.SUCCESS,
            data: boomCard,
        };
    }
};
BoomCardService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomCardRepository])
], BoomCardService);
exports.BoomCardService = BoomCardService;
//# sourceMappingURL=boom-card.service.js.map