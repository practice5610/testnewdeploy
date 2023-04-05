"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLeasesController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const globals_2 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
let InventoryLeasesController = class InventoryLeasesController {
    constructor(inventoryLeaseRepository, inventoryItemRepository, leaseService, response) {
        this.inventoryLeaseRepository = inventoryLeaseRepository;
        this.inventoryItemRepository = inventoryItemRepository;
        this.leaseService = leaseService;
        this.response = response;
    }
    /**
     * Gets a list of all inventory leases
     * @param filter filters the leases to return
     */
    async find(
    //@ts-ignore
    filter) {
        return this.inventoryLeaseRepository.find(filter);
    }
    /**
     * Updates the Inventory Leases fuilfilment state
     * @param leases
     */
    async updateLeases(leases) {
        try {
            for (const lease of leases) {
                const inventoryLease = await this.inventoryLeaseRepository.findById(lease._id);
                inventoryLease.fulfillmentStatus = lease.fulfillmentStatus;
                inventoryLease.updatedAt = moment_1.default().utc().unix();
                await this.inventoryLeaseRepository.updateById(lease._id, inventoryLease);
            }
            return this.response.json({ success: true });
        }
        catch (err) {
            return this.response.json({ success: false, message: err.message });
        }
    }
    async replace(body) {
        try {
            /*
              This first line of this filter should be:
              _id: { neq: body.item.inventoryItem._id },
              but neq won't work. We are using nin (not-in)
              and putting the id in an array as a workaround
             */
            const replacement = await this.inventoryItemRepository.findOne({
                where: {
                    _id: { nin: [body.item.inventoryItem._id] },
                    itemType: body.item.inventoryItem.itemType,
                    status: globals_2.InventoryItemStatus.INACTIVE,
                    inactiveReason: globals_2.InventoryItemInactiveReason.NOT_ISSUED,
                },
            });
            if (!replacement) {
                return this.response.json({
                    success: false,
                    message: constants_1.InventoryLeaseResponseMessages.REPLACEMENT_INVENTORY_NOT_FOUND,
                });
            }
            const oldItem = body.item.inventoryItem;
            oldItem.status = globals_2.InventoryItemStatus.INACTIVE;
            oldItem.inactiveReason = body.reason;
            oldItem.updatedAt = moment_1.default().utc().unix();
            const newLease = Object.assign(Object.assign({}, body.item), { updatedAt: moment_1.default().utc().unix(), inventoryItem: Object.assign(Object.assign({}, replacement), { updatedAt: moment_1.default().utc().unix(), status: globals_2.InventoryItemStatus.INACTIVE_ISSUED, inactiveReason: undefined }), getId: body.item.getId, getIdObject: body.item.getIdObject, toJSON: body.item.toJSON, toObject: body.item.toObject });
            await this.leaseService.swapItems(oldItem, newLease.inventoryItem, newLease);
        }
        catch (err) {
            return this.response.json({ success: false, message: err.message });
        }
        return this.response.json({
            success: true,
            message: constants_1.InventoryLeaseResponseMessages.REPLACEMENT_INVENTORY_FOUND,
        });
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/inventory-leases', {
        responses: {
            '200': {
                description: 'Inventory Lease Data',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': Object } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.InventoryLease))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryLeasesController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/inventory-leases', {
        responses: {
            '200': {
                description: 'Bulk Inventory Lease PATCH success',
                content: { 'application/json': { schema: Object } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryLeasesController.prototype, "updateLeases", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/inventory-leases/replace', {
        responses: {
            '200': {
                description: 'Inventory Lease Replacement',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': Object } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryLeasesController.prototype, "replace", null);
InventoryLeasesController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryLeaseRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.InventoryItemRepository)),
    tslib_1.__param(2, core_1.service(services_1.LeaseService)),
    tslib_1.__param(3, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryLeaseRepository,
        repositories_1.InventoryItemRepository,
        services_1.LeaseService, Object])
], InventoryLeasesController);
exports.InventoryLeasesController = InventoryLeasesController;
//# sourceMappingURL=inventory-leases.controller.js.map