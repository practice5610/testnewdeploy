"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Category = class Category extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date the category was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date the category was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'Name of the category',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'commissionRate',
        description: 'The rate given to determine the commission amount that goes to boom',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "commissionRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'subCategories',
        description: 'Categories that all fall under a specific category',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "subCategories", void 0);
Category = tslib_1.__decorate([
    repository_1.model({ name: 'categories', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Category);
exports.Category = Category;
//# sourceMappingURL=category.model.js.map