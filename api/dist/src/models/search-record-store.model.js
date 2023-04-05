"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchRecordStore = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let SearchRecordStore = class SearchRecordStore extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'id',
        description: 'Unique ID',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'The date the store was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordStore.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'The date the store was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordStore.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyLogoUrl',
        description: 'The URL to the company logo',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "companyLogoUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'coverImageUrl',
        description: 'The URL to the company cover image',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "coverImageUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyType',
        description: 'The type of company. Whether it is an LLC, Corp, etc',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "companyType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyName',
        description: 'Name of the company',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "companyName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyDescription',
        description: 'Description of the company',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "companyDescription", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'years',
        description: 'How many years the company has been in business',
        years: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], SearchRecordStore.prototype, "years", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'storeType',
        description: 'The type of store. Whether it is an online store, brick and mortar, or both',
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.StoreTypes),
        },
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "storeType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'links',
        description: 'Any links pertaining to the store/company like Facebook, Instagram, etc',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], SearchRecordStore.prototype, "links", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'emails',
        description: 'Any email addresses pertaining to the store/company that a customer can use to reach out to a merchant',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], SearchRecordStore.prototype, "emails", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'phoneNumber',
        description: 'The phone number to the store/company that a customer can use to reach out to a merchant',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'number',
        description: 'The building number in the store/company address',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "number", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'street1',
        description: 'The street address of the store/company address',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "street1", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'street2',
        description: 'The suite number of the store/company',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "street2", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'city',
        description: 'The city the store/company is located in',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "city", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'state',
        description: 'The state the store/company is located in',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'zip',
        description: 'The zipcode the store/company is located in',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "zip", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'country',
        description: 'The country the store/company is located in',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "country", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_tags',
        description: '',
        /**
         * Still not sure how to classify tags
         */
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], SearchRecordStore.prototype, "_tags", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_geoloc',
        description: 'The coordinates of the store/company',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordStore.prototype, "_geoloc", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'openingTime',
        description: 'The opening hours of the store/company',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "openingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'closingTime',
        description: 'The closing hours of the store/company',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], SearchRecordStore.prototype, "closingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'days',
        description: 'The days of the week the store/company is open',
        type: 'array',
        itemType: 'string',
        default: ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'],
    }),
    tslib_1.__metadata("design:type", Array)
], SearchRecordStore.prototype, "days", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: 'The merchant for the store/company. Usually a store/company owner or admin',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], SearchRecordStore.prototype, "merchant", void 0);
SearchRecordStore = tslib_1.__decorate([
    repository_1.model({ name: 'stores', settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], SearchRecordStore);
exports.SearchRecordStore = SearchRecordStore;
//# sourceMappingURL=search-record-store.model.js.map