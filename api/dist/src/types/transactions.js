"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.senderHasUID = void 0;
// REMINDER: This typeguard should be deleted if Store is no longer needed as a Transaction.sender type.
const senderHasUID = (item) => {
    return !!item && !!item.uid;
};
exports.senderHasUID = senderHasUID;
//# sourceMappingURL=transactions.js.map