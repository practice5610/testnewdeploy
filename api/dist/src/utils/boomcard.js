"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allBoomcardsBelongToUser = exports.boomcardBelongsToUser = exports.getBoomCardLast4 = void 0;
const getBoomCardLast4 = (boomcard) => {
    const length = boomcard.cardNumber.length;
    const cardNumber = boomcard.cardNumber;
    return cardNumber.substring(length - 5, length - 1);
};
exports.getBoomCardLast4 = getBoomCardLast4;
/**
 * Checks a boom card database ID against a profile to determine if it belongs to the user
 * @param {BoomUser} user
 * @param {string} id
 * @returns {boolean}
 */
const boomcardBelongsToUser = (user, id) => {
    const boomcardIds = user.cards && user.cards.length ? user.cards : null;
    return !!boomcardIds && boomcardIds.findIndex((_id) => _id === id) > -1;
};
exports.boomcardBelongsToUser = boomcardBelongsToUser;
/**
 * Checks an array of boom card database IDs, against a profile to determine if all belong to the user
 * @param {BoomUser} user
 * @param {string[]} ids
 * @returns {boolean}
 */
const allBoomcardsBelongToUser = (user, ids) => {
    let belongs = true;
    for (const id of ids) {
        if (!exports.boomcardBelongsToUser(user, id)) {
            belongs = false;
            break;
        }
    }
    return belongs;
};
exports.allBoomcardsBelongToUser = allBoomcardsBelongToUser;
//# sourceMappingURL=boomcard.js.map