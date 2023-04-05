"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongodbDataSource = void 0;
const tslib_1 = require("tslib");
require('dotenv').config();
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const devConfig = tslib_1.__importStar(require("./mongodb.datasource--dev.json"));
const dockerConfig = tslib_1.__importStar(require("./mongodb.datasource--docker.json"));
const localDevConfig = tslib_1.__importStar(require("./mongodb.datasource--local-dev.json"));
const localProdConfig = tslib_1.__importStar(require("./mongodb.datasource--local-production.json"));
const prodConfig = tslib_1.__importStar(require("./mongodb.datasource--prod.json"));
const qaConfig = tslib_1.__importStar(require("./mongodb.datasource--qa.json"));
const configMap = {
    'local-dev': localDevConfig,
    dev: devConfig,
    qa: qaConfig,
    prod: prodConfig,
    'local-prod': localProdConfig,
    docker: dockerConfig,
};
const key = process.env.DB_ENV || 'local-dev';
console.log('Will use', key, 'database config');
const config = configMap[key];
let MongodbDataSource = class MongodbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
MongodbDataSource.dataSourceName = 'mongodb';
MongodbDataSource = tslib_1.__decorate([
    core_1.bind({
        tags: ['transactional'],
    }),
    tslib_1.__param(0, core_1.inject('datasources.config.mongodb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], MongodbDataSource);
exports.MongodbDataSource = MongodbDataSource;
//# sourceMappingURL=mongodb.datasource.js.map