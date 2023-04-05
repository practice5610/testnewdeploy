"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomCardRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let BoomCardRepository = class BoomCardRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.BoomCard, dataSource);
    }
};
BoomCardRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongodb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongodbDataSource])
], BoomCardRepository);
exports.BoomCardRepository = BoomCardRepository;
//# sourceMappingURL=boom-card.repository.js.map