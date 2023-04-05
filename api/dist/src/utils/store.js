"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComposedAddressFromStore = void 0;
// TODO: This functions is used on other repositories please move it to globals
// TODO: Review if this utility matches all cases where it is used
const getComposedAddressFromStore = (store, excludedFields = []) => {
    if (store) {
        const address = [];
        if (!excludedFields.includes('number') && store.number !== undefined)
            address.push(store.number);
        if (!excludedFields.includes('street1') && store.street1 !== undefined)
            address.push(store.street1);
        if (!excludedFields.includes('street2') && store.street2 !== undefined)
            address.push(store.street2);
        return address.join(', ');
    }
    else {
        return '';
    }
};
exports.getComposedAddressFromStore = getComposedAddressFromStore;
//# sourceMappingURL=store.js.map