"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = exports.getProfileOptions = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
//import Ajv, { JSONSchemaType } from 'ajv'; // TODO: Enable when Loopback gets updated
const ajv_1 = tslib_1.__importDefault(require("ajv"));
const admin = tslib_1.__importStar(require("firebase-admin"));
//import { FromSchema } from 'json-schema-to-ts'; // TODO: Enable once loopback is updated and Schemas are all set
const log4js_1 = require("log4js");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../constants");
var getProfileOptions;
(function (getProfileOptions) {
    getProfileOptions["BY_ID"] = "by_id";
    getProfileOptions["BY_PHONE"] = "by_phone";
    getProfileOptions["BY_EMAIL"] = "by_email";
    getProfileOptions["BY_CARD"] = "by_card";
})(getProfileOptions = exports.getProfileOptions || (exports.getProfileOptions = {}));
const ajv = new ajv_1.default({ allErrors: true });
class ProfileService {
    constructor() {
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.PROFILE_SERVICE);
    }
    async createUser(user) {
        try {
            const userRecord = await admin
                .auth()
                .createUser({ email: user.email, password: user.password, disabled: false });
            const firestore = admin.firestore();
            // TODO: this was done previously on the frontend but now we can do it on the API itself, we should check the rules to see if we can block the users database later
            // for the web repo we could see if we can reuse this API endpoint
            const userDoc = firestore.doc(`users/${userRecord.uid}`);
            await userDoc.set({
                uid: userRecord.uid,
                roles: user.roles,
                contact: { emails: [user.email] },
                createdAt: moment_1.default().utc().unix(),
            });
            /*
            // This would allow to instantly update the roles, it could be useful later if we use the same endpoint for the web repository
             await admin.auth().setCustomUserClaims(userRecord.uid, {
              roles: newDoc.roles,
            });
            */
            return { success: true, statusCode: constants_1.ServiceResponseCodes.SUCCESS, data: userRecord };
        }
        catch (error) {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }
    async getProfile(value, { requiredFields = [], method = getProfileOptions.BY_ID, messageNoProfileFound = constants_1.ProfileResponseMessages.NO_PROFILE_FOUND, } = {}) {
        const firestore = admin.firestore();
        console.log('workingfine');
        // console.log('workingfine1', firestore);
        let id = value;
        let phone = value;
        const email = value;
        const cardId = value;
        let user;
        let userCollection = undefined;
        switch (method) {
            case getProfileOptions.BY_PHONE:
                if (phone.length === 10) {
                    // TODO: on ticket BW-1528 we should remove this validation the controller endpoint should check we get a number and verify that the +1 is present (Check line 102 api\src\controllers\users.controller.ts)
                    phone = '+1' + phone;
                }
                try {
                    user = await admin.auth().getUserByPhoneNumber(phone);
                }
                catch (_a) {
                    return {
                        success: false,
                        statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        privateMessage: 'Error with phone number provided',
                        message: messageNoProfileFound,
                    };
                }
                id = user.uid;
                break;
            case getProfileOptions.BY_EMAIL:
                try {
                    user = await admin.auth().getUserByEmail(email);
                }
                catch (_b) {
                    return {
                        success: false,
                        statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        privateMessage: 'Error with Email provided',
                        message: messageNoProfileFound,
                    };
                }
                id = user.uid;
                break;
            case getProfileOptions.BY_CARD:
                userCollection = await firestore
                    .collection('users')
                    .where('cards', 'array-contains', cardId)
                    .get();
                if (userCollection.empty) {
                    return {
                        success: false,
                        statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        //privateMessage: messageNoProfileFound,
                        message: messageNoProfileFound,
                    };
                }
                break;
            case getProfileOptions.BY_ID:
            default:
            //nothing is made line 151 would return error
        }
        let userDoc;
        if (method === getProfileOptions.BY_CARD && userCollection) {
            userDoc = userCollection.docs[0];
        }
        else if (method !== getProfileOptions.BY_CARD) {
            userDoc = await firestore.doc(`users/${id}`).get();
        }
        else {
            // just in case we sent a 'method' value not supported
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.NOT_IMPLEMENTED,
                //privateMessage: ProfileResponseMessages.METHOD_NOT_SUPPORTED,
                message: constants_1.ProfileResponseMessages.METHOD_NOT_SUPPORTED,
            };
        }
        if (userDoc.exists) {
            /*
            TODO: Enable when Loopback gets updated
            const ProfileSchemaRequiredType: JSONSchemaType<
              T & {
              uid: BoomUser['uid'];
              createdAt: BoomUser['createdAt'];
              updatedAt: BoomUser['updatedAt'];
            }
            > = {
            */
            // const ProfileSchemaRequired = {
            //   ...ProfileSchema,
            //   required: ['uid', 'createdAt', 'updatedAt', 'roles', ...requiredFields], // uid, createdAt, roles, and updatedAt are always requested
            // } as const;
            // const validate = ajv.compile(ProfileSchemaRequired); // TODO: Review if this can be memoized(validate.errors could be an issue though)
            const data = userDoc.data();
            // console.log('userdata', data);
            //const valid = await validate(data);
            if (data != null) {
                // TODO: Validate false first in case once ajv is updated this keeps not working as type guard
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    //data: data as FromSchema<typeof ProfileSchemaRequired>, // TODO: Enable once loopback is updated and Schemas are all set
                    data: data,
                };
            }
            else {
                this.logger.error(`${constants_1.ProfileResponseMessages.CORRUPT_PROFILE_DATA} ${id}`);
                // this.logger.error('Errors : ', validate.errors);
                return {
                    success: false,
                    statusCode: constants_1.ServiceResponseCodes.RECORD_CONFLICT,
                    //privateMessage: `${ProfileResponseMessages.CORRUPT_PROFILE_DATA} ${id}`,
                    message: `${constants_1.ProfileResponseMessages.CORRUPT_PROFILE_DATA} ${id}`,
                };
            }
        }
        else {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                //privateMessage: messageNoProfileFound,
                message: messageNoProfileFound,
            };
        }
    }
    async getFilteredProfiles(filter) {
        var _a, _b;
        const firestore = admin.firestore();
        // TODO: Review this function | Type guard
        function notEmpty(value) {
            return value !== null && value !== undefined;
        }
        // This part is only used for unit testing, specifications already supports this validation
        if (!filter)
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                message: constants_1.FilterResponseMessages.MISSING,
            };
        // This part is only used for unit testing, specifications already supports this validation
        if (!filter.where)
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                message: constants_1.FilterResponseMessages.INVALID,
            };
        // This part is only used for unit testing, specifications already supports this validation
        if (Object.keys(filter.where).length > 1)
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                message: constants_1.FilterResponseMessages.MORE_THAN_ONE_CONDITION,
            };
        try {
            if (filter.where.roles) {
                if (filter.where.roles.includes(globals_1.RoleKey.Merchant) ||
                    filter.where.roles.includes(globals_1.RoleKey.Member)) {
                    // TODO: if we allow more filters we need to block admin and superAdmin results they must not be included
                    const users = await firestore
                        .collection('users')
                        .where('roles', 'array-contains', filter.where.roles.includes(globals_1.RoleKey.Merchant) ? globals_1.RoleKey.Merchant : globals_1.RoleKey.Member // we only search by one role
                    )
                        .get();
                    let allProfiles = users.docs.map((userDoc) => {
                        //TODO: No validations to the records are done here, maybe we can apply one once all records are correct
                        return userDoc.data();
                    });
                    allProfiles = allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.filter(notEmpty);
                    if (!(allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.length))
                        return {
                            success: false,
                            statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                            message: constants_1.ProfileResponseMessages.NO_PROFILES_FOUND,
                        };
                    return {
                        success: true,
                        statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                        //data: data as FromSchema<typeof ProfileSchemaRequired>, // TODO: Enable once loopback is updated and Schemas are all set
                        data: allProfiles,
                    };
                }
                return {
                    // This part is only used for unit testing, specifications already supports this validation
                    success: false,
                    statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                    message: constants_1.GlobalResponseMessages.INVALID_ROLE,
                };
            }
            if (filter.where.uid) {
                const profile = await this.getProfile(filter.where.uid, {
                    method: getProfileOptions.BY_ID,
                });
                if (!profile.success || !profile.data)
                    // we could use here handleServiceResponseResult
                    return {
                        success: false,
                        statusCode: (_a = profile.statusCode) !== null && _a !== void 0 ? _a : constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        message: (_b = profile.message) !== null && _b !== void 0 ? _b : constants_1.ProfileResponseMessages.NO_PROFILE_FOUND,
                    };
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    //data: data as FromSchema<typeof ProfileSchemaRequired>, // TODO: Enable once loopback is updated and Schemas are all set
                    data: [profile.data],
                };
            } /* else { // this causes no to go further with other checks
              return {
                success: false,
                statusCode: ServiceResponseCodes.BAD_REQUEST,
                message: GlobalResponseMessages.INVALID_ID,
              };
            }*/
            if (filter.where.createdAt) {
                let users;
                if (String(filter.where.createdAt).includes(',')) {
                    const range = String(filter.where.createdAt).split(',');
                    const startDate = parseInt(range[0]);
                    const endDate = parseInt(range[1]);
                    if (startDate > endDate)
                        return {
                            success: false,
                            statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                            message: constants_1.FilterResponseMessages.INVALID_DATE_RANGE,
                        };
                    users = await firestore
                        .collection('users')
                        .where('createdAt', '>=', startDate)
                        .where('createdAt', '<=', endDate)
                        .get();
                }
                else {
                    const Date = parseInt(filter.where.createdAt);
                    users = await firestore.collection('users').where('createdAt', '>=', Date).get();
                }
                let allProfiles = users.docs.map((userDoc) => {
                    return userDoc.data();
                });
                allProfiles = allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.filter(notEmpty);
                if (!(allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.length))
                    return {
                        success: false,
                        statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        message: constants_1.ProfileResponseMessages.NO_PROFILES_FOUND,
                    };
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    //data: data as FromSchema<typeof ProfileSchemaRequired>, // TODO: Enable once loopback is updated and Schemas are all set
                    data: allProfiles,
                };
            }
            if (filter.where.hasCards !== undefined) {
                const users = await firestore
                    .collection('users')
                    .where('hasCards', '==', filter.where.hasCards)
                    .get();
                let allProfiles = users.docs.map((userDoc) => {
                    return userDoc.data();
                });
                allProfiles = allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.filter(notEmpty);
                if (!(allProfiles === null || allProfiles === void 0 ? void 0 : allProfiles.length))
                    return {
                        success: false,
                        statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                        message: constants_1.ProfileResponseMessages.NO_PROFILES_FOUND,
                    };
                return {
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    //data: data as FromSchema<typeof ProfileSchemaRequired>, // TODO: Enable once loopback is updated and Schemas are all set
                    data: allProfiles,
                };
            }
            return {
                // This part is only used for unit testing, specifications already supports this validation
                success: false,
                statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                message: constants_1.FilterResponseMessages.INVALID_FILTERS,
            };
        }
        catch (error) {
            return {
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async generateCustomToken(uid, options) {
        const token = await admin.auth().createCustomToken(uid, options);
        return token;
    }
    async updateProfileById(uid, data) {
        const firestore = admin.firestore();
        const userDoc = firestore.doc(`users/${uid}`);
        return userDoc.update(data);
    }
    async updateManyProfilesById(profiles) {
        const firestore = admin.firestore();
        const batch = firestore.batch();
        for (const profile of profiles) {
            const userDoc = firestore.doc(`users/${profile.uid}`);
            batch.update(userDoc, profile);
        }
        return batch.commit();
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map