"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const constants_1 = require("../constants");
const models_1 = require("../models");
const order_repository_1 = require("../repositories/order.repository");
const utils_1 = require("../utils");
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.ORDER_SERVICE);
    }
    //TODO: Update this method once purchase.service get updated to use handlerServiceResponse
    async create(order, options) {
        try {
            console.log('checkdborder1255', order);
            // const neworder = order?.transactions?.map((x) => {
            //   x.updatedAt = 1678676809;
            // });
            // console.log('neworder', neworder);
            // const neworder2 = { ...order, transactions: neworder };
            // console.log('neworder2', neworder2);
            //  order?.transactions&& order?.transactions[0].updatedAt = 1678676809;
            //  order?.transactions&&order?.transactions[1].updatedAt = 1678676809;
            //   console.log('checkdborder12', order.transactions);
            const response = await this.orderRepository
                .create(order)
                .then((response) => {
                console.log('checkordercreat', response);
                return response;
            })
                .catch((error) => {
                console.log('errorddd', error);
            });
            if (!response)
                return utils_1.APIResponseFalseOutput('error creating order instance.');
            return {
                success: true,
                message: 'Order instance created successful.',
            };
        }
        catch (error) {
            this.logger.error(error);
            return utils_1.APIResponseFalseOutput('db error.');
        }
    }
    async countOrders(where) {
        try {
            const counter = await this.orderRepository.count(where);
            return {
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: counter,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code) {
                return {
                    success: false,
                    statusCode: error.statusCode,
                    message: error.message,
                    privateMessage: error.details,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOrders(filter) {
        try {
            console.log('orderfiltere', filter);
            const orders = await this.orderRepository
                .find(filter)
                .then((result) => {
                console.log('orderchek', result);
                return result;
            })
                .catch((err) => {
                console.log('orderchekerre', err);
                return err;
            });
            console.log('checkorder', orders);
            if (orders.length) {
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: orders,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                message: constants_1.APIResponseMessages.RECORD_NOT_FOUND,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code) {
                return {
                    success: false,
                    statusCode: error.statusCode,
                    message: error.message,
                    privateMessage: error.details,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOrderById(id, filter) {
        try {
            const orders = await this.orderRepository.findById(id, filter);
            if (orders) {
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: orders,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                message: constants_1.APIResponseMessages.RECORD_NOT_FOUND,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code) {
                return {
                    success: false,
                    statusCode: error.code === constants_1.LoopbackErrorCodes.RECORD_NOT_FOUND
                        ? constants_1.ServiceResponseCodes.RECORD_NOT_FOUND
                        : error.statusCode,
                    message: error.message,
                    privateMessage: error.details,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async updateOrderById(id, order) {
        try {
            await this.orderRepository.updateById(id, order);
            return {
                success: true,
                statusCode: constants_1.ServiceResponseCodes.NO_CONTENT,
                message: constants_1.APIResponseMessages.SUCCESS,
            };
        }
        catch (error) {
            this.logger.error(error);
            if (error.code) {
                return {
                    success: false,
                    statusCode: error.code === constants_1.LoopbackErrorCodes.RECORD_NOT_FOUND
                        ? constants_1.ServiceResponseCodes.RECORD_NOT_FOUND
                        : error.statusCode,
                    message: error.code === constants_1.LoopbackErrorCodes.RECORD_NOT_FOUND
                        ? constants_1.OrderResponseMessages.NOT_FOUND
                        : error.message,
                    privateMessage: error.details,
                };
            }
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Order, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderService.prototype, "create", null);
OrderService = tslib_1.__decorate([
    core_1.injectable({ scope: core_1.BindingScope.TRANSIENT }),
    tslib_1.__param(0, repository_1.repository(order_repository_1.OrderRepository)),
    tslib_1.__metadata("design:paramtypes", [order_repository_1.OrderRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map