"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const returns_1 = require("@boom-platform/globals/lib/enums/returns");
const repository_1 = require("@loopback/repository");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
let ReturnService = class ReturnService {
    constructor(returnPolicyRepository, transactionRepository, shippingOrderRepository, returnRequestRepository, returnDisputeRepository) {
        this.returnPolicyRepository = returnPolicyRepository;
        this.transactionRepository = transactionRepository;
        this.shippingOrderRepository = shippingOrderRepository;
        this.returnRequestRepository = returnRequestRepository;
        this.returnDisputeRepository = returnDisputeRepository;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.RETURNS);
    }
    /**
     * Create return policies
     */
    async createReturnPolicy(newReturnPolicy) {
        const now = moment_1.default().utc().unix();
        const result = await this.returnPolicyRepository.create(Object.assign(Object.assign({}, newReturnPolicy), { updatedAt: now, createdAt: now }));
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.POLICY_CREATED,
            data: result,
        };
    }
    /**
     * find policies by id or merchant id
     */
    async getReturnPolicies(id) {
        const filterBuilder = new repository_1.FilterBuilder();
        const filter = filterBuilder
            .where({ or: [{ _id: id }, { merchantID: id }] })
            .build();
        const existingPolicy = await this.returnPolicyRepository.find(filter);
        if (!existingPolicy.length) {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.POLICY_NOT_FOUND,
            };
        }
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.POLICY_FOUND,
            data: existingPolicy,
        };
    }
    /**
     * Delete Return Policies
     */
    async deleteById(id) {
        await this.returnPolicyRepository.deleteById(id);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.POLICY_DELETED,
        };
    }
    /**
     * Create return request
     */
    async createReturnRequest(newReturnRequest, options) {
        var _a, _b;
        const now = moment_1.default().utc().unix();
        const newRequest = Object.assign(Object.assign({}, newReturnRequest), { updatedAt: now, createdAt: now });
        const returnPolicy = await this.returnPolicyRepository.findById(newRequest.merchantPolicyID, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const originalTransaction = await this.transactionRepository.findById(newRequest.purchaseTransactionID, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const newTransaction = await this.transactionRepository.create({
            type: globals_1.TransactionType.RETURN,
            amount: originalTransaction.cashback
                ? Object.assign(Object.assign({}, dinero_js_1.default(originalTransaction.amount)
                    .subtract(dinero_js_1.default(originalTransaction.cashback))
                    .toObject()), { symbol: originalTransaction.amount.symbol }) : originalTransaction.amount,
            sender: originalTransaction.receiver,
            salestax: originalTransaction.salestax,
            receiver: originalTransaction.sender,
            status: globals_1.TransactionStatus.UNPROCESSED,
            commissionCollected: originalTransaction.commissionCollected,
            createdAt: now,
            updatedAt: now,
        }, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        if (((_a = returnPolicy.transactionTotalPartsToRefund) === null || _a === void 0 ? void 0 : _a.includes(returns_1.TransactionTotalParts.SHIPPING)) &&
            originalTransaction.shippingOrderId) {
            const oldShippingOrder = await this.shippingOrderRepository.findById(originalTransaction.shippingOrderId, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            newTransaction.amount = Object.assign(Object.assign({}, dinero_js_1.default(newTransaction.amount).add(dinero_js_1.default(oldShippingOrder.price)).toObject()), { symbol: newTransaction.amount.symbol });
        }
        /**
         * If a return cost is a flat fee we can subtract it now, if return cost includes shipping
         * it will have to be created when label is made
         */
        if ((_b = returnPolicy.returnCosts) === null || _b === void 0 ? void 0 : _b.length) {
            for (const cost of returnPolicy.returnCosts) {
                if (cost.type === returns_1.ReturnCostType.FLAT_FEE) {
                    newTransaction.amount = Object.assign(Object.assign({}, dinero_js_1.default(newTransaction.amount).subtract(dinero_js_1.default(cost.price)).toObject()), { symbol: newTransaction.amount.symbol });
                }
            }
        }
        newRequest.returnTransactionID = newTransaction._id;
        if (!newRequest.returnReason.includes(returns_1.ReturnReason.EXTRA_ITEM)) {
            newRequest.refundStatus = returns_1.Status.REQUESTED;
        }
        newRequest.returnStatus =
            returnPolicy.returnMethod === returns_1.ReturnMethod.NO_RETURN ? returns_1.Status.DENIED : returns_1.Status.REQUESTED;
        await this.transactionRepository.updateById(newTransaction._id, newTransaction, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const result = await this.returnRequestRepository.create(newRequest, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.REQUEST_CREATED,
            data: result,
        };
    }
    /**
     * Find return requeust
     */
    async getReturnRequest(filter) {
        const existingRequest = await this.returnRequestRepository.find(filter);
        if (!existingRequest.length) {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.REQUEST_NOT_FOUND,
            };
        }
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.REQUEST_FOUND,
            data: existingRequest,
        };
    }
    /**
     * Update return request
     */
    async updateReturnRequest(id, returnRequest, currentUser, options) {
        const now = moment_1.default().utc().unix();
        const found = await this.returnRequestRepository.findById(id, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        const currentUserIsMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
        if (currentUserIsMerchant && found.returnStatus === returns_1.Status.COMPLETE && found._id === id) {
            await this.returnRequestRepository.updateById(id, found, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.REQUEST_NOT_UPDATED,
            };
        }
        const newReturnRequest = Object.assign(Object.assign({}, returnRequest), { updatedAt: now });
        await this.returnRequestRepository.updateById(id, newReturnRequest, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.NO_CONTENT,
            message: constants_1.ReturnResponseMessages.REQUEST_UPDATED,
        };
    }
    /**
     * Create Return Dispute
     */
    async createDispute(newDispute) {
        const now = moment_1.default().utc().unix();
        const result = await this.returnDisputeRepository.create(Object.assign(Object.assign({}, newDispute), { updatedAt: now, createdAt: now }));
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.DISPUTE_CREATED,
            data: result,
        };
    }
    /**
     * Find Return Dispute by ID
     */
    async getDisputeByID(filter) {
        const result = await this.returnDisputeRepository.find(filter);
        if (!result.length) {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.DISPUTE_NOT_FOUND,
            };
        }
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.DISPUTE_FOUND,
            data: result,
        };
    }
    /**
     * Update Return Dispute
     */
    async updateDispute(id, dispute, options) {
        const now = moment_1.default().utc().unix();
        const found = await this.returnDisputeRepository.findById(id, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        if (found._id === id && !found.isOpen) {
            await this.returnDisputeRepository.updateById(id, found, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.ReturnResponseMessages.DISPUTE_NOT_UPDATED,
            };
        }
        const newDispute = Object.assign(Object.assign({}, dispute), { updatedAt: now });
        await this.returnDisputeRepository.updateById(id, newDispute, process.env.ALLOW_TRANSACTIONAL_FEATURE === 'true' ? options : undefined);
        return {
            success: true,
            statusCode: constants_1.ServiceResponseCodes.SUCCESS,
            message: constants_1.ReturnResponseMessages.DISPUTE_UPDATED,
        };
    }
};
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnService.prototype, "createReturnRequest", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnService.prototype, "updateReturnRequest", null);
tslib_1.__decorate([
    loopback4_spring_1.transactional({ isolationLevel: loopback4_spring_1.IsolationLevel.READ_COMMITTED }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReturnService.prototype, "updateDispute", null);
ReturnService = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ReturnPolicyRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.ShippingOrderRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.ReturnRequestRepository)),
    tslib_1.__param(4, repository_1.repository(repositories_1.ReturnDisputeRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ReturnPolicyRepository,
        repositories_1.TransactionRepository,
        repositories_1.ShippingOrderRepository,
        repositories_1.ReturnRequestRepository,
        repositories_1.ReturnDisputeRepository])
], ReturnService);
exports.ReturnService = ReturnService;
//# sourceMappingURL=returns.service.js.map