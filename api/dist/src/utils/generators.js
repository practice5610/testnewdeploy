"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProduct = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const app_error_1 = tslib_1.__importDefault(require("../errors/app-error"));
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
// @ts-ignore
const generateProduct = (product, user) => {
    var _a;
    let tempPrice = product.price;
    if (!((_a = user.store) === null || _a === void 0 ? void 0 : _a._geoloc))
        throw new app_error_1.default('User MUST have a store geolocation or the product will NOT be found in Search Engine', 'User MUST have a store geolocation or the product will NOT be found in Search Engine', user);
    if (product.price.toString().indexOf('.') === -1) {
        tempPrice = `${product.price.toString()}.00`;
    }
    const amount = globals_1.toMoney(tempPrice);
    const categoriesDecoded = entities.decode(product.categories);
    const categoriesArray = categoriesDecoded.split('||');
    const mainCategory = categoriesArray[0];
    const subCategory = categoriesArray[1];
    //TODO: Review this output to remove all @ts-ignore lines
    // @ts-ignore
    return {
        // @ts-ignore
        attributes: {
            // @ts-ignore
            upc: product.upc,
            // @ts-ignore
            product_id: product.product_id,
            // @ts-ignore
            item_id: product.item_id,
            // @ts-ignore
            stock: product.stock,
            // @ts-ignore
            supplier_id: product.supplier_id,
            // @ts-ignore
            supplier_name: product.supplier_name,
            // @ts-ignore
            brand_name: product.brand_name,
            // @ts-ignore
            item_sku: product.item_sku,
            // @ts-ignore
            ship_weight: product.ship_weight,
            // @ts-ignore
            warranty: product.warranty,
        },
        category: { name: mainCategory, subCategories: [subCategory] },
        // @ts-ignore
        imageUrl: product.image_file || product.additional_images,
        // @ts-ignore
        name: product.item_name || product.title,
        // @ts-ignore
        merchantUID: user.uid,
        price: amount,
        // @ts-ignore
        description: product.description,
        // @ts-ignore
        _tags: [],
        // @ts-ignore
        store: {
            _id: user.store._id,
            companyName: user.store.companyName,
            number: user.store.number,
            street1: user.store.street1,
            street2: user.store.street2,
            _geoloc: user.store._geoloc,
            merchant: {
                uid: user.uid,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        },
    };
};
exports.generateProduct = generateProduct;
//# sourceMappingURL=generators.js.map