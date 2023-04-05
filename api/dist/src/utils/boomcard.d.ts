import { BoomUser } from '@boom-platform/globals';
import { BoomCard } from '../models/index';
export declare const getBoomCardLast4: (boomcard: BoomCard) => string;
/**
 * Checks a boom card database ID against a profile to determine if it belongs to the user
 * @param {BoomUser} user
 * @param {string} id
 * @returns {boolean}
 */
export declare const boomcardBelongsToUser: (user: BoomUser, id: string) => boolean;
/**
 * Checks an array of boom card database IDs, against a profile to determine if all belong to the user
 * @param {BoomUser} user
 * @param {string[]} ids
 * @returns {boolean}
 */
export declare const allBoomcardsBelongToUser: (user: BoomUser, ids: string[]) => boolean;
