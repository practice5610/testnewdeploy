"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testdb = void 0;
const repository_1 = require("@loopback/repository");
exports.testdb = new repository_1.juggler.DataSource({
    name: 'db',
    connector: 'memory',
});
//# sourceMappingURL=testdb.datasource.js.map