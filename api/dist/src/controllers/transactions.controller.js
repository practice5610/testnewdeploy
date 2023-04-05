"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let TransactionController = class TransactionController {
    constructor(transactionRepository, shippingOrderRepository, boomCardRepository, currentUserGetter, response) {
        this.transactionRepository = transactionRepository;
        this.shippingOrderRepository = shippingOrderRepository;
        this.boomCardRepository = boomCardRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
    }
    async find(
    //@ts-ignore
    filter) {
        // fetch only those transactions in which the logged in user is either receiver or sender of a transaction
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        if (!filter) {
            filter =
                currentUser.roles.includes(globals_1.RoleKey.SuperAdmin) || currentUser.roles.includes(globals_1.RoleKey.Admin)
                    ? {}
                    : {
                        where: {
                            or: [
                                { 'sender.uid': currentUser.uid },
                                { 'receiver.uid': currentUser.uid },
                                { 'purchaseItem.merchantUID': currentUser.uid },
                            ],
                        },
                    };
        }
        else {
            filter =
                currentUser.roles.includes(globals_1.RoleKey.SuperAdmin) || currentUser.roles.includes(globals_1.RoleKey.Admin)
                    ? filter
                    : Object.assign(Object.assign({}, filter), { where: {
                            and: [
                                Object.assign({}, filter.where),
                                {
                                    or: [
                                        { 'sender.uid': currentUser.uid },
                                        { 'receiver.uid': currentUser.uid },
                                        { 'purchaseItem.merchantUID': currentUser.uid },
                                    ],
                                },
                            ],
                        } });
        }
        return this.transactionRepository
            .find()
            .then((result) => {
            console.log('thismodule working', result);
            return result;
        })
            .catch((err) => {
            console.log('transerror', err);
            return err;
        });
    }
    async replaceById(id, transaction) {
        const now = moment_1.default().utc().unix();
        transaction.updatedAt = now;
        await this.transactionRepository.replaceById(id, transaction);
    }
    async deleteById(id) {
        await this.transactionRepository.deleteById(id);
    }
    async findAll(
    //@ts-ignore
    filter) {
        return this.transactionRepository.find(filter);
    }
    /**
     * This used to add tracking onto a transaction but now it adds tracking to a shipping order
     * @param id _id of the transaction to add shipping info to
     * @param transactionItem the tracking link and/or the tracking number to be added
     */
    async addTracking(id, trackingInfo) {
        try {
            const transaction = await this.transactionRepository.findById(id);
            let newShippingOrder = await this.shippingOrderRepository.findById(transaction.shippingOrderId);
            newShippingOrder = Object.assign(Object.assign(Object.assign(Object.assign({}, newShippingOrder), (trackingInfo.trackingNumber && { trackingNumber: trackingInfo.trackingNumber })), (trackingInfo.trackingLink && { trackingLink: trackingInfo.trackingLink })), { updatedAt: moment_1.default().utc().unix() });
            await this.shippingOrderRepository.updateById(newShippingOrder._id, newShippingOrder);
        }
        catch (error) {
            if (rest_1.HttpErrors.isHttpError(error)) {
                this.response.status(error.status).send({ success: false, error });
            }
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/transactions', {
        responses: {
            '200': {
                description: 'Array of Transaction model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Transaction } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Transaction))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.SuperAdmin]),
    rest_1.put('/transactions/{id}', {
        responses: {
            '204': {
                description: 'Transaction PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Transaction]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "replaceById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/transactions/{id}', {
        responses: {
            '204': {
                description: 'Transaction DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "deleteById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/admin/transactions', {
        responses: {
            '200': {
                description: 'Array of Transaction model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Transaction } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Transaction))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "findAll", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin, globals_1.RoleKey.Merchant]),
    rest_1.patch('/transactions/{id}', {
        responses: {
            '200': {
                description: 'Tracking information added succesfully',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Transaction } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "addTracking", null);
TransactionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.ShippingOrderRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__param(3, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(4, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository,
        repositories_1.ShippingOrderRepository,
        repositories_1.BoomCardRepository, Function, Object])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transactions.controller.js.map