"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItemsController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const nanoid_1 = require("nanoid");
// import { rateLimitKeyGen } from '../utils/rateLimitKeyGen';
const rate_limit_redis_1 = tslib_1.__importDefault(require("rate-limit-redis"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const loopback4_ratelimiter_1 = require("../loopback4-ratelimiter");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const profile_service_1 = require("../services/profile.service");
let InventoryItemsController = class InventoryItemsController {
    constructor(inventoryItemRepository, currentUserGetter, response, profileService) {
        this.inventoryItemRepository = inventoryItemRepository;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.profileService = profileService;
    }
    async create(inventoryItem) {
        const now = moment_1.default().utc().unix();
        const newInventoryItem = Object.assign(Object.assign({}, inventoryItem), { status: constants_1.InventoryItemStatus.INACTIVE, createdAt: now, updatedAt: now, friendlyID: nanoid_1.nanoid(10) });
        const result = await this.inventoryItemRepository.create(newInventoryItem);
        return result;
    }
    async updateById(id, inventoryItem) {
        var _a;
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        const isAdmin = currentUser.roles.includes(globals_1.RoleKey.Admin) || currentUser.roles.includes(globals_1.RoleKey.SuperAdmin);
        const now = moment_1.default().utc().unix();
        if (isAdmin) {
            const newInventoryItem = Object.assign(Object.assign({}, inventoryItem), { updatedAt: now });
            await this.inventoryItemRepository.updateById(id, newInventoryItem);
        }
        else {
            const targetItem = await this.inventoryItemRepository.findById(id);
            if (((_a = targetItem.merchant) === null || _a === void 0 ? void 0 : _a.uid) !== currentUser.uid)
                throw new rest_1.HttpErrors.BadRequest(constants_1.InventoryItemResponseMessages.MERCHANT_UNAUTHORIZED);
            if (!inventoryItem.itemID && !inventoryItem.nickname)
                throw new rest_1.HttpErrors.BadRequest(constants_1.APIResponseMessages.INVALID_JSON);
            if (inventoryItem.itemID) {
                if (targetItem.status !== constants_1.InventoryItemStatus.INACTIVE_ISSUED)
                    throw new rest_1.HttpErrors.BadRequest(constants_1.InventoryItemResponseMessages.ITEM_STATUS_INVALID);
                const newInventoryItem = Object.assign(Object.assign({}, targetItem), { updatedAt: now, itemID: inventoryItem.itemID, status: constants_1.InventoryItemStatus.ACTIVE });
                await this.inventoryItemRepository.updateById(id, newInventoryItem);
            }
            else if (inventoryItem.nickname) {
                const newInventoryItem = Object.assign(Object.assign({}, targetItem), { updatedAt: now, nickname: inventoryItem.nickname });
                await this.inventoryItemRepository.updateById(id, newInventoryItem);
            }
        }
    }
    async updateList(list) {
        for (const item of list) {
            const newInventoryItem = await this.inventoryItemRepository.findById(item._id);
            newInventoryItem.status = item.status;
            newInventoryItem.inactiveReason = item.inactiveReason;
            newInventoryItem.updatedAt = moment_1.default().utc().unix();
            await this.inventoryItemRepository.updateById(item._id, newInventoryItem);
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
        return this.inventoryItemRepository.find(filter);
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/inventory', {
        responses: {
            '200': {
                description: 'Inventory Item model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.InventoryItem } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.InventoryItem]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/inventory/{id}', {
        responses: {
            '204': {
                description: 'Inventory Item PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.InventoryItem]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/inventory', {
        responses: {
            '204': {
                description: 'Inventory List PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "updateList", null);
tslib_1.__decorate([
    loopback4_ratelimiter_1.ratelimit(true, {
        store: constants_1.REDIS_ENABLED
            ? new rate_limit_redis_1.default({
                client: require('redis').createClient(constants_1.REDIS_CONFIGURATION),
                expiry: 30,
                prefix: 'inventory:',
                resetExpiryOnChange: true,
            })
            : undefined,
        windowMs: 30000,
        max: 3,
        message: '[Inventory] You have exceeded the 3 requests in 30 seconds limit!',
    }),
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/inventory', {
        responses: {
            '200': {
                description: 'Array of InventoryItem model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.InventoryItem } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.InventoryItem))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InventoryItemsController.prototype, "find", null);
InventoryItemsController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InventoryItemRepository)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InventoryItemRepository, Function, Object, profile_service_1.ProfileService])
], InventoryItemsController);
exports.InventoryItemsController = InventoryItemsController;
//# sourceMappingURL=inventory-items.controller.js.map