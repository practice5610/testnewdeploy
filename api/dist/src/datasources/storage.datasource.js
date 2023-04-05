"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const service_proxy_1 = require("@loopback/service-proxy");
const config = tslib_1.__importStar(require("./storage.datasource.json"));
const finalConfig = Object.assign({}, config);
let StorageDataSource = class StorageDataSource extends service_proxy_1.juggler.DataSource {
    constructor(dsConfig = finalConfig) {
        super(dsConfig);
    }
};
StorageDataSource.dataSourceName = 'Storage';
StorageDataSource = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.config.Storage', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], StorageDataSource);
exports.StorageDataSource = StorageDataSource;
//# sourceMappingURL=storage.datasource.js.map