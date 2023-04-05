"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOrderService = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const order_error_1 = tslib_1.__importDefault(require("../errors/order-error"));
const repositories_1 = require("../repositories");
let InventoryOrderService = class InventoryOrderService {
    constructor(inventoryOrderRepository, merchantTransactionRepository, inventoryItemRepository) {
        this.inventoryOrderRepository = inventoryOrderRepository;
        this.merchantTransactionRepository = merchantTransactionRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.INVENTORY_ORDERS);
    }
    /**
     * Creates inventory orders and merchant transactions,
     * so when an inventory item is ordered, a record of an inventory order and a merchant transaction with 'pending' status is created
     * @param {(BoomUserBasic | null)} merchant A merchant orders inventory items
     * @param {(InventoryOrder[] | null)} orders orders contain order information
     * @param {Options} [options] This is a param auto-filled by the transactional decorator. It should not be passed when calling this method.
     * @returns {Promise<InventoryOrderResult>}
     * @memberof InventoryOrderService
     */
    async createInventoryOrders(orders, options) {
        this.logger.info('Starting inventory orders create request');
        console.log('orderdetails', orders);
        try {
            if (!orders || orders.length === 0) {
                throw new order_error_1.default('Cannot create inventory order without required params', 'Request param error', {});
            }
            const inventoryOrders = [];
            const merchantTransactions = [];
            const now = moment_1.default().utc().unix();
            // prepare inventory order & merchant transaction records
            for (const order of orders) {
                const inventoryOrder = Object.assign(Object.assign({}, order), { createdAt: now, updatedAt: now, status: constants_1.InventoryOrderStatus.PENDING });
                inventoryOrders.push(inventoryOrder);
                const merchantTransactionType = order.billingType === constants_1.InventoryOrderBillingType.ONE_TIME
                    ? constants_1.MerchantTransactionType.ONE_TIME
                    : constants_1.MerchantTransactionType.RECURRING;
                const merchantTransaction = {
                    createdAt: now,
                    updatedAt: now,
                    status: constants_1.MerchantTransactionStatus.PENDING,
                    type: merchantTransactionType,
                    amount: order.amount,
                    merchant: order.merchant,
                    store: order.store,
                    purchaseItem: order.item,
                };
                merchantTransactions.push(merchantTransaction);
            }
            console.log('checkorder1', inventoryOrders);
            const checkk = await this.inventoryItemRepository
                .find()
                .then((result) => {
                console.log('getresult11', result);
            })
                .catch((err) => {
                console.log('error121', err);
            });
            console.log('result111121', checkk);
            // create inventory order & merchant transaction records
            const createdInventoryOrders = await this.inventoryOrderRepository
                .createAll(inventoryOrders, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined)
                .then((result) => {
                console.log('result22', result);
                return result;
            })
                .catch((err) => {
                console.log('err22', err);
                return err;
            });
            this.logger.debug(`created inventory orders count is ${createdInventoryOrders.length}`);
            const createdMerchantTransactions = await this.merchantTransactionRepository.createAll(merchantTransactions, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            this.logger.debug(`created merchant transactions count is ${createdMerchantTransactions.length}`);
            return {
                success: true,
                message: constants_1.OrderResponseMessages.SUCCESS,
                inventoryOrders: createdInventoryOrders,
                merchantTransactions: createdMerchantTransactions,
            };
        }
        catch (error) {
            this.logger.error(error);
            throw new order_error_1.default(error.toString(), 'Db error', {});
        }
    }
    async updateInventoryOrders(orders) {
        // TODO: Seems like this function is not using the transactional features correctly, missing options
        try {
            for (const order of orders) {
                let extraData = {};
                // consider boom card activation only when order request is CLOSED
                if (order.status === constants_1.InventoryOrderStatus.CLOSED) {
                    const inventoryOrder = await this.inventoryOrderRepository.findOne({
                        where: {
                            _id: order._id,
                            'item.itemType': 'Boom cards',
                            'item.status': { ne: constants_1.InventoryItemStatus.ACTIVE },
                            status: { ne: constants_1.InventoryOrderStatus.CLOSED },
                        },
                    });
                    if (inventoryOrder) {
                        extraData = {
                            item: Object.assign(Object.assign({}, inventoryOrder.item), { status: constants_1.InventoryItemStatus.ACTIVE }),
                        };
                        // make inventory_item status = ACTIVE
                        await this.inventoryItemRepository.updateById(inventoryOrder.item._id, {
                            status: constants_1.InventoryItemStatus.ACTIVE,
                            updatedAt: moment_1.default().utc().unix(),
                        });
                    }
                }
                await this.inventoryOrderRepository.updateById(order._id, Object.assign(Object.assign(Object.assign({}, order), extraData), { updatedAt: moment_1.default().utc().unix() }));
            }
        }
        catch (error) {
            this.logger.error(error);
            throw new order_error_1.default(error.toString(), 'Db error', {});
        }
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryOrderService.prototype, "createInventoryOrders", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryOrderService.prototype, "updateInventoryOrders", null);
InventoryOrderService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryOrderRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.MerchantTransactionRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.InventoryItemRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryOrderRepository,
        repositories_1.MerchantTransactionRepository,
        repositories_1.InventoryItemRepository])
], InventoryOrderService);
exports.InventoryOrderService = InventoryOrderService;
//# sourceMappingURL=inventory-order.service.js.map