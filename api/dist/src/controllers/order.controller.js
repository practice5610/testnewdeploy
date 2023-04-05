"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
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
const services_1 = require("../services");
const specifications_1 = require("../specifications");
const order_specifications_requestBody_1 = require("../specifications/examples/requestBody/order-specifications-requestBody");
const service_response_helpers_1 = require("../utils/service-response-helpers");
let OrderController = class OrderController {
    constructor(orderService, currentUserGetter, response) {
        this.orderService = orderService;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.ORDER_CONTROLLER);
    }
    async count(where) {
        try {
            console.log('workingwithid555');
            const data = service_response_helpers_1.handleServiceResponseResult(await this.orderService.countOrders(where));
            if (data) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: data,
                });
            }
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async find(incomingFilter) {
        try {
            console.log('workingwithid121');
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            const filterBuilder = new repository_1.FilterBuilder(incomingFilter);
            if (currentUser.roles.includes(globals_1.RoleKey.Member)) {
                filterBuilder.impose({ where: { customerUID: currentUser.uid } });
            }
            const filter = filterBuilder.build();
            const orders = service_response_helpers_1.handleServiceResponseResult(await this.orderService.findOrders(filter));
            if (!orders)
                throw new rest_1.HttpErrors.NotFound(constants_1.OrderResponseMessages.NOT_FOUND);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: orders,
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async findById(id, filter) {
        console.log('workingwithid');
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            const order = service_response_helpers_1.handleServiceResponseResult(await this.orderService.findOrderById(id, filter));
            if (!order)
                throw new rest_1.HttpErrors.NotFound(constants_1.OrderResponseMessages.NOT_FOUND);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: order,
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(id, order) {
        try {
            service_response_helpers_1.handleServiceResponseResult(await this.orderService.updateOrderById(id, order));
            return this.response.status(constants_1.ServiceResponseCodes.NO_CONTENT).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/orders/count', specifications_1.GETOrdersCountSpecification),
    tslib_1.__param(0, rest_1.param.where(models_1.Order)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/orders', specifications_1.GETOrdersSpecification),
    tslib_1.__param(0, rest_1.param.filter(models_1.Order)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/orders/{id}', specifications_1.GETOrdersByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Order, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/orders/{id}', specifications_1.PATCHOrdersByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(order_specifications_requestBody_1.PATCHORdersByIdRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Order]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "updateById", null);
OrderController = tslib_1.__decorate([
    tslib_1.__param(0, loopback4_spring_1.service(services_1.OrderService)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [services_1.OrderService, Function, Object])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map