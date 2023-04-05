"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ReviewController = class ReviewController {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async create(review) {
        const now = moment_1.default().utc().unix();
        review.createdAt = now;
        review.updatedAt = now;
        return this.reviewRepository.create(review);
    }
    async count(
    //@ts-ignore
    where) {
        return this.reviewRepository.count(where);
    }
    async find(
    //@ts-ignore
    filter) {
        return this.reviewRepository.find(filter);
    }
    async updateAll(review, 
    //@ts-ignore
    where) {
        review.updatedAt = moment_1.default().utc().unix();
        return this.reviewRepository.updateAll(review, where);
    }
    async findById(id) {
        return this.reviewRepository.findById(id);
    }
    async updateById(id, review) {
        review.updatedAt = moment_1.default().utc().unix();
        await this.reviewRepository.updateById(id, review);
    }
    async replaceById(id, review) {
        const now = moment_1.default().utc().unix();
        review.createdAt = now;
        review.updatedAt = now;
        await this.reviewRepository.replaceById(id, review);
    }
    async deleteById(id) {
        await this.reviewRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/reviews', {
        responses: {
            '200': {
                description: 'Review model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Review } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Review]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/reviews/count', {
        responses: {
            '200': {
                description: 'Review model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Review))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/reviews', {
        responses: {
            '200': {
                description: 'Array of Review model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Review } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Review))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/reviews', {
        responses: {
            '200': {
                description: 'Review PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Review))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Review, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "updateAll", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/reviews/{id}', {
        responses: {
            '200': {
                description: 'Review model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Review } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/reviews/{id}', {
        responses: {
            '204': {
                description: 'Review PATCH success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Review]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.put('/reviews/{id}', {
        responses: {
            '204': {
                description: 'Review PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Review]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "replaceById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/reviews/{id}', {
        responses: {
            '204': {
                description: 'Review DELETE success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteById", null);
ReviewController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ReviewRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ReviewRepository])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map