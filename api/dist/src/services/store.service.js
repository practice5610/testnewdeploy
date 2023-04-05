"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
let StoreService = class StoreService {
    constructor(storeRepository) {
        this.storeRepository = storeRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.STORE_SERVICE);
    }
    async findStoreById(id) {
        try {
            const storeData = await this.storeRepository.findById(id);
            if (storeData) {
                return { success: true, message: 'Success', data: storeData };
            }
            else {
                return utils_1.APIResponseFalseOutput(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
            }
        }
        catch (error) {
            this.logger.error(error);
            if (error.code)
                return utils_1.APIResponseFalseOutput(error.code);
            return utils_1.APIResponseFalseOutput(constants_1.GlobalResponseMessages.DB_ERROR);
        }
    }
};
StoreService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.StoreRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.StoreRepository])
], StoreService);
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map