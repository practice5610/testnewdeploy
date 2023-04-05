"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IventoryOrderController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const inventory_order_specification_1 = require("../specifications/inventory-order-specification");
let IventoryOrderController = class IventoryOrderController {
    constructor(inventoryOrderRepository, currentUserGetter, response, inventoryOrderService) {
        this.inventoryOrderRepository = inventoryOrderRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.inventoryOrderService = inventoryOrderService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.ORDER_CONTROLLER);
    }
    async create(inventoryOrders) {
        try {
            const result = await this.inventoryOrderService.createInventoryOrders(inventoryOrders);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            return this.response.status(500).send({ success: false, message: error });
        }
    }
    async count(
    //@ts-ignore
    where) {
        try {
            const inventory_count = await this.inventoryOrderRepository.count(where);
            console.log('inventory_count', inventory_count);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(inventory_count);
        }
        catch (error) {
            this.logger.error(error);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, body) {
        try {
            await this.inventoryOrderService.updateInventoryOrders([Object.assign({ _id: id }, body)]);
        }
        catch (error) {
            let publicMessage = 'Server error. Try again.';
            if (error.name === 'OrderError') {
                publicMessage = error.publicMessage;
            }
            return this.response.status(500).send({ success: false, message: publicMessage });
        }
    }
    async updateList(list) {
        try {
            await this.inventoryOrderService.updateInventoryOrders(list);
        }
        catch (error) {
            let publicMessage = 'Server error. Try again.';
            if (error.name === 'OrderError') {
                publicMessage = error.publicMessage;
            }
            return this.response.status(500).send({ success: false, message: publicMessage });
        }
    }
    async find(
    //@ts-ignore
    filter) {
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const isMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
        if (isMerchant) {
            filter = Object.assign(Object.assign({}, filter), { where: {
                    and: [Object.assign({}, filter === null || filter === void 0 ? void 0 : filter.where), { 'merchant.uid': currentUser.uid }],
                } });
        }
        return this.inventoryOrderRepository.find(filter);
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/inventory-orders', {
        responses: {
            '200': {
                description: 'Inventory Order model instances',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.InventoryOrder } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IventoryOrderController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/inventory-orders/count', inventory_order_specification_1.GETInventoryOrderCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.InventoryOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IventoryOrderController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/inventory-orders/{id}', {
        responses: {
            '204': {
                description: 'Inventory Order PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IventoryOrderController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/inventory-orders', {
        responses: {
            '204': {
                description: 'Bulk Inventory Order PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], IventoryOrderController.prototype, "updateList", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/inventory-orders', {
        responses: {
            '200': {
                description: 'Inventory Order model instances',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.InventoryOrder } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.InventoryOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], IventoryOrderController.prototype, "find", null);
IventoryOrderController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryOrderRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.InventoryOrderService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryOrderRepository, Function, Object, services_1.InventoryOrderService])
], IventoryOrderController);
exports.IventoryOrderController = IventoryOrderController;
//# sourceMappingURL=inventory-order.controller.js.map