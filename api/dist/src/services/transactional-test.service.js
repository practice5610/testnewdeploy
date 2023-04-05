"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalTestService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const loopback4_spring_1 = require("loopback4-spring");
const repositories_1 = require("../repositories");
let TransactionalTestService = class TransactionalTestService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async test(options) {
        const transaction = {
            createdAt: 0,
            updatedAt: 0,
            amount: { amount: 0, precision: 2, currency: 'USD', symbol: '$' },
            title: 'Test rollback transaction.',
        };
        await this.transactionRepository.create(transaction, options);
        throw new Error('Transaction test error thrown.');
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionalTestService.prototype, "test", null);
TransactionalTestService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository])
], TransactionalTestService);
exports.TransactionalTestService = TransactionalTestService;
//# sourceMappingURL=transactional-test.service.js.map