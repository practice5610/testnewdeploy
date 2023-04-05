"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRecordProduct = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let SearchRecordProduct = class SearchRecordProduct extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'productID',
        description: 'The unique ID for a product',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "productID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'id',
        description: '',
        /**
         * Is this a search id?
         */
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'categoryName',
        description: 'The name or title of a category',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "categoryName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'subCategoryName',
        description: 'The name or title of a sub category',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "subCategoryName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'hasOffer',
        description: 'Lets the customer know if there is an offer for the product in question',
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], SearchRecordProduct.prototype, "hasOffer", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_geoloc',
        description: 'The coordinates',
        /**
         * What are these coordinates for or to?
         */
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "_geoloc", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'offer',
        description: 'The offer related to a product',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "offer", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'priceNum',
        description: 'The price of a product',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordProduct.prototype, "priceNum", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date ...',
        /**
         * Date what was created? The product?
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordProduct.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: '',
        /**
         * Date what was updated? The product?
         */
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordProduct.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'imageUrl',
        description: 'The URL to the image of a product',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "imageUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchantUID',
        description: 'The unique merchant ID',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "merchantUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'category',
        description: 'The category in which a product is classified under',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "category", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'name',
        description: 'Name or title of the product',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'description',
        description: 'Description of the product',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordProduct.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'store',
        description: 'The store that sells the product',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "store", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'price',
        description: 'The price of the product',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "price", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'attributes',
        description: 'Key value pairs relating to the product (i.e. color, sku, etc)',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordProduct.prototype, "attributes", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_tags',
        description: '',
        /**
         * Not completely sure what the tags do or what they are for
         */
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], SearchRecordProduct.prototype, "_tags", void 0);
SearchRecordProduct = tslib_1.__decorate([
    repository_1.model({ name: 'products', settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SearchRecordProduct);
exports.SearchRecordProduct = SearchRecordProduct;
//# sourceMappingURL=search-record-product.model.js.map