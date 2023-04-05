"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = exports.StoreBasic = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
class StoreBasic extends repository_1.Entity {
}
tslib_1.__decorate([
    repository_1.property({
        mongodb: { dataType: 'ObjectID' },
        id: true,
        name: '_id',
        description: 'Store instance database unique identifier.',
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyName',
        description: 'Legal company name.',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Name should be at least 2 characters.',
                maxLength: 'Name should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "companyName", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'emails',
        description: 'Store email address list.',
        type: 'array',
        itemType: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], StoreBasic.prototype, "emails", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'phoneNumber',
        description: 'Store phone number.',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 10,
            maxLength: 15,
            pattern: globals_1.PhoneRegex.source,
            errorMessage: {
                minLength: 'Phone Number should be at least 10 characters.',
                maxLength: 'Phone Number should not exceed 15 characters.',
                pattern: 'Invalid phone number.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'number',
        description: 'House number or building number of HQ or store location.',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 10,
            errorMessage: {
                minLength: 'House number or building number should be at least 1 characters.',
                maxLength: 'House number or building number should not exceed 10 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "number", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'street1',
        description: 'Street address of HQ or store location',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Street should be at least 2 characters.',
                maxLength: 'Street should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "street1", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'street2',
        description: 'Apt or suite number of HQ or store location',
        type: 'string',
        jsonSchema: {
            minLength: 2,
            maxLength: 80,
            errorMessage: {
                minLength: 'Street2 should be at least 2 characters.',
                maxLength: 'Street2 should not exceed 80 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "street2", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'city',
        description: 'City of HQ or store location',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 30,
            errorMessage: {
                minLength: 'City should be at least 2 characters.',
                maxLength: 'City should not exceed 30 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "city", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'state',
        description: 'State of HQ or store location',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 2,
            errorMessage: 'State must be 2 characters.',
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "state", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'zip',
        description: 'Zip code of HQ or store location',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 30,
            errorMessage: {
                minLength: 'Zip should be at least 1 characters.',
                maxLength: 'Zip should not exceed 30 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "zip", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'country',
        description: 'Country of HQ or store location',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 2,
            maxLength: 2,
            errorMessage: 'Country must have 2 characters.',
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreBasic.prototype, "country", void 0);
exports.StoreBasic = StoreBasic;
let Store = class Store extends StoreBasic {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: 'pin',
        description: '5 digit control access pin used for tablet',
        type: 'number',
        jsonSchema: {
            minLength: 5,
            maxLength: 5,
            errorMessage: 'Pin must have 5 characters.',
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "pin", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'objectID',
        description: 'The Algolia document ID',
        type: 'string',
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "objectID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date Store was created with Boom',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date Store was updated by merchant',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyLogoUrl',
        description: 'Image URL for Company Logo',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 1000,
            errorMessage: {
                minLength: 'companyLogoUrl should be at least 1 characters.',
                maxLength: 'companyLogoUrl should not exceed 1000 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "companyLogoUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'coverImageUrl',
        description: 'Image URL for Company Cover Image',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 1,
            maxLength: 1000,
            errorMessage: {
                minLength: 'coverImageUrl should be at least 1 characters.',
                maxLength: 'coverImageUrl should not exceed 1000 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "coverImageUrl", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyType',
        description: 'Type of bussines registration LLC, S-Corp, etc',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 3,
            maxLength: 30,
            errorMessage: {
                minLength: 'companyType should be at least 3 characters.',
                maxLength: 'companyType should not exceed 30 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "companyType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'companyDescription',
        description: 'Description about the Company',
        type: 'string',
        required: true,
        jsonSchema: {
            minLength: 5,
            maxLength: 280,
            errorMessage: {
                minLength: 'companyDescription should be at least 5 characters.',
                maxLength: 'companyDescription should not exceed 280 characters.',
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "companyDescription", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'fein',
        description: 'Federal Tax Number',
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "fein", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'years',
        description: 'Years in business',
        years: 'number',
        required: true,
        jsonSchema: {
            maximum: 23,
            minimum: 0,
            errorMessage: {
                maximum: 'Years in business should not exceed 200 years.',
                minimum: 'Years in business should be at least 0 years.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "years", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'storeType',
        description: 'Online, Brick & Mortar, or Online and Brick & Mortar',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(globals_1.StoreTypes),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Store.prototype, "storeType", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'links',
        description: 'Website and social media list of links',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Store.prototype, "links", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_tags',
        description: 'Special Algolia field holding array of keywords that aid in search',
        type: 'array',
        itemType: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], Store.prototype, "_tags", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '_geoloc',
        description: 'Special Algolia field that aids in geolocation searches',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Store.prototype, "_geoloc", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'openingTime',
        description: '0-23 (24 hour time)',
        type: 'number',
        jsonSchema: {
            maximum: 23,
            minimum: 0,
            errorMessage: {
                maximum: 'closingTime should not exceed 23.',
                minimum: 'closingTime should be at least 0.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "openingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'closingTime',
        description: '0-23 (24 hour time)',
        type: 'number',
        jsonSchema: {
            maximum: 23,
            minimum: 0,
            errorMessage: {
                maximum: 'closingTime should not exceed 23.',
                minimum: 'closingTime should be at least 0.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Store.prototype, "closingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'days',
        description: 'Company operating days list',
        type: 'array',
        itemType: 'string',
        default: ['sun', 'mon', 'tue', 'wed', 'thr', 'fri', 'sat'],
    }),
    tslib_1.__metadata("design:type", Array)
], Store.prototype, "days", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'merchant',
        description: 'The store owner instance',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Store.prototype, "merchant", void 0);
Store = tslib_1.__decorate([
    repository_1.model({ name: 'stores', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Store);
exports.Store = Store;
//# sourceMappingURL=store.model.js.map