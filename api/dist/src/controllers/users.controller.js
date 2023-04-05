"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const profile_service_1 = require("../services/profile.service");
const specifications_1 = require("../specifications");
const utils_1 = require("../utils");
const schemas_1 = require("../validation/schemas");
let UsersController = class UsersController {
    constructor(profileService, currentUserGetter, response) {
        this.profileService = profileService;
        this.currentUserGetter = currentUserGetter;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.USERS);
    }
    async findAll(filter) {
        try {
            const result = await this.profileService.getFilteredProfiles(filter);
            const resultData = utils_1.handleServiceResponseResult(result);
            // we can change this so we sent empty arrays but due to the error codes are forward same as the messages we can provide better feedback
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: resultData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(uid) {
        var _a;
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const currentUserIsSuperAdmin = currentUser.roles.includes(globals_1.RoleKey.SuperAdmin);
            const profile = await this.profileService.getProfile(uid, {
                requiredFields: ['contact'],
            });
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (((_a = profileData === null || profileData === void 0 ? void 0 : profileData.roles) === null || _a === void 0 ? void 0 : _a.includes(globals_1.RoleKey.SuperAdmin)) && !currentUserIsSuperAdmin) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: profileData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * When a user tries to send funds, verify is supposed to:
     * - warn the sender if the receiver isn’t a boom user (if the number doesn’t exist)
     * - warn the user if the account exists but the name they provided doesn’t match our record
     * - confirm that the info they entered is what we have on record for the given phone number
     * @returns
     */
    async verifyPhoneNumber(req) {
        var _a, _b;
        try {
            const { firstName, lastName } = req;
            let { phone } = req;
            // This part is only used for unit testing, specifications already supports this validation
            if (!firstName || !lastName || !phone) {
                throw new rest_1.HttpErrors.InternalServerError(constants_1.ProfileResponseMessages.MISSING_PROFILE_PARAMETERS);
            }
            if (phone.length === 10) {
                // TODO: on ticket BW-1528 we should remove this validation the controller endpoint should check we get a number and verify that the +1 is present (Check line 141 api\src\services\profile.service.ts )
                phone = '+1' + phone;
            }
            const profile = await this.profileService.getProfile(phone, {
                requiredFields: ['firstName', 'lastName'],
                method: profile_service_1.getProfileOptions.BY_PHONE,
            });
            if (!profile.success) {
                switch (profile.statusCode) {
                    case constants_1.ServiceResponseCodes.RECORD_NOT_FOUND:
                        throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.PHONE_NUMBER_WITHOUT_ACCOUNT);
                    case constants_1.ServiceResponseCodes.RECORD_CONFLICT:
                        throw new rest_1.HttpErrors.Conflict(constants_1.APIResponseMessages.RECORD_CONFLICT);
                    default:
                        throw new rest_1.HttpErrors.InternalServerError(constants_1.ProfileResponseMessages.ACCOUNT_NAME_CANNOT_BE_CONFIRMED);
                }
            }
            if (((_a = profile.data) === null || _a === void 0 ? void 0 : _a.firstName.toLowerCase()) !== firstName.toLowerCase() ||
                ((_b = profile.data) === null || _b === void 0 ? void 0 : _b.lastName.toLowerCase()) !== lastName.toLowerCase()) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.ProfileResponseMessages.NAME_DOESNT_MATCH);
            }
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.VERIFIED,
                data: { foundAccount: true },
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * This new route allow our app to show up name and profileImg from a receiver in transactions operation.
     * this should NOT be a public endpoint and should be called with a current member logged in the app for security.
     * @param uid Receiver BoomUser id from firebase
     * @returns Response with an specific field allowed to be showed in the front end.
     */
    async getReceiverProfile(uid) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const profile = await this.profileService.getProfile(uid, {
                requiredFields: ['firstName', 'lastName', 'profileImg'],
            });
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (!profileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            const profileWithFieldAllowed = {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                profileImg: profileData.profileImg,
            };
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: profileWithFieldAllowed,
            });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(user) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const currentUserIsSuperAdmin = currentUser.roles.includes(globals_1.RoleKey.SuperAdmin);
            if ((user.roles.includes(globals_1.RoleKey.SuperAdmin) || user.roles.includes(globals_1.RoleKey.Admin)) &&
                !currentUserIsSuperAdmin) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            if (user.roles.length === 0) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.GlobalResponseMessages.INVALID_ROLE);
            }
            const profile = await this.profileService.createUser(user);
            const profileData = utils_1.handleServiceResponseResult(profile);
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: true, message: constants_1.APIResponseMessages.SUCCESS, data: profileData });
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/admin/users', specifications_1.GETAdminUsersSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', schemas_1.FilterAdminUsersSchemaObject)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/admin/user/{uid}', specifications_1.GETAdminUserSpecification),
    tslib_1.__param(0, rest_1.param.path.string('uid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/users/verifyPhoneNumber', specifications_1.POSTUsersVerifyPhoneNumberSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTUsersVerifyPhoneNumberRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "verifyPhoneNumber", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/users/transfer-receiver-profile/{uid}', specifications_1.GETTransferReceiverProfileSpecification),
    tslib_1.__param(0, rest_1.param.path.string('uid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "getReceiverProfile", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/admin/user', specifications_1.POSTAdminUserSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTAdminUserRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
UsersController = tslib_1.__decorate([
    tslib_1.__param(0, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__param(1, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [profile_service_1.ProfileService, Function, Object])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map