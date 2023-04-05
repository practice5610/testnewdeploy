"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Review = class Review extends repository_1.Entity {
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
], Review.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date a review was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date a review was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'content',
        description: 'The content provided within a review by a customer',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "content", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'memberUID',
        description: 'Unique merchant ID',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "memberUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "merchantUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'rating',
        description: 'The value (1 to 5) a customer provides to show their likeness of a store or product',
        /**
         * Can customers review stores too or only products?
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "rating", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'date',
        description: '',
        /**
         * There is already a created at and updated at date so what is this for???
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: 'The store a product is sold from',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Review.prototype, "store", void 0);
Review = tslib_1.__decorate([
    repository_1.model({ name: 'reviews', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Review);
exports.Review = Review;
//# sourceMappingURL=review.model.js.map