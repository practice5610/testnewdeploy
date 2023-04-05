"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
const category_model_1 = require("./category.model");
let Product = class Product extends repository_1.Entity {
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
], Product.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'objectID',
        description: 'Search engine objectID',
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "objectID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date a product was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date a product was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'imageUrl',
        description: 'The url to the image of a product',
        type: 'string',
        jsonSchema: {
            minLength: 1,
            maxLength: 1000,
            errorMessage: {
                minLength: 'imageUrl should be at least 1 characters.',
                maxLength: 'imageUrl should not exceed 1000 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantUID',
        description: 'The unique merchant ID',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 80,
            errorMessage: {
                minLength: 'merchantUID should be at least 1 characters.',
                maxLength: 'merchantUID should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "merchantUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'category',
        description: 'The category in which a product falls under',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", category_model_1.Category)
], Product.prototype, "category", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'The name or title of a product',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 80,
            errorMessage: {
                minLength: 'Name should be at least 1 characters.',
                maxLength: 'Name should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'description',
        description: 'The description of a product',
        type: 'string',
        jsonSchema: {
            minLength: 1,
            maxLength: 280,
            errorMessage: {
                minLength: 'Description should be at least 1 characters.',
                maxLength: 'Description should not exceed 280 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: 'The store that sells said product',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'price',
        description: 'The amount of money the product calls',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'attributes',
        description: 'Unique key-value pairs for a product (i.e. sku, color, etc)',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "attributes", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_tags',
        description: 'Tags to help categorize a products',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "_tags", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'shippingPolicy',
        description: 'The object ID of the ShippingPolicy document chosen for this product',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "shippingPolicy", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'packageDetails',
        description: 'Details about how this product ships that is needed to calculate rates',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Product.prototype, "packageDetails", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the product in the Boom system. approved, denied, pending',
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.ProductStatus),
        },
        default: globals_1.ProductStatus.PENDING,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'quantity',
        description: 'Quantity of products available to sell',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnPolicy',
        description: '_id of return policy',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "returnPolicy", void 0);
Product = tslib_1.__decorate([
    repository_1.model({ name: 'products', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Product);
exports.Product = Product;
//# sourceMappingURL=product.model.js.map