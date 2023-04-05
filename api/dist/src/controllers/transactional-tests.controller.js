"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionalTestsController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const rest_1 = require("@loopback/rest");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const services_1 = require("../services");
let TransactionalTestsController = class TransactionalTestsController {
    constructor(transactionalTestService) {
        this.transactionalTestService = transactionalTestService;
    }
    async patch() {
        await this.transactionalTestService.test();
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.patch('/transactional-test', {
        responses: {
            '200': {
                description: 'Test route for producing a transactional write operation that fails. Intended for testing rolling back of data on a transactional function.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionalTestsController.prototype, "patch", null);
TransactionalTestsController = tslib_1.__decorate([
    tslib_1.__param(0, loopback4_spring_1.service(services_1.TransactionalTestService)),
    tslib_1.__metadata("design:paramtypes", [services_1.TransactionalTestService])
], TransactionalTestsController);
exports.TransactionalTestsController = TransactionalTestsController;
//# sourceMappingURL=transactional-tests.controller.js.map