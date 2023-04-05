"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const email_service_1 = require("../services/email.service");
const sns_service_1 = require("../services/sns.service");
const utils_1 = require("../utils");
let AccountController = class AccountController {
    constructor(boomCardRepository, snsService, response, currentUserGetter, profileService, emailService) {
        this.boomCardRepository = boomCardRepository;
        this.snsService = snsService;
        this.response = response;
        this.currentUserGetter = currentUserGetter;
        this.profileService = profileService;
        this.emailService = emailService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.ACCOUNT);
    }
    async sendAccountInfoViaSMS(body) {
        var _a;
        try {
            const { type, id } = body;
            this.logger.debug('Requesting account info via SMS...', { type, id });
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const isCustomer = currentUser.roles.includes(globals_1.RoleKey.Member);
            let message = '';
            let phone = '';
            if (!isCustomer)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            this.logger.debug('User is a customer. Proceeding...');
            if (type === globals_1.AccountInfoQueryTypes.BoomcardPin) {
                this.logger.debug(`Customer requests for a boomcad pin. Will query profile by boomcard id ${id}`);
                const profile = await this.profileService.getProfile(id, {
                    requiredFields: ['contact'],
                    method: services_1.getProfileOptions.BY_CARD,
                });
                const profileData = utils_1.handleServiceResponseResult(profile);
                if (!profileData)
                    throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
                this.logger.debug(`Profile vs current user IDs match? ${profileData.uid === currentUser.uid}`);
                if (profileData.uid !== currentUser.uid)
                    throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
                const boomCard = await this.boomCardRepository.findById(id);
                this.logger.debug(`Found requested Boom card`, boomCard);
                message = `Your Boom card pin number is ${boomCard.pinNumber}`;
                phone = (_a = profileData.contact.phoneNumber) !== null && _a !== void 0 ? _a : '';
            }
            this.logger.debug(`Will send SMS with message:`, message, 'and number: ', phone);
            const result = await this.snsService.sendSMS({
                Message: message,
                PhoneNumber: phone,
            });
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async sendAccountInfoViaEmail(body) {
        var _a;
        try {
            const { type, id } = body;
            this.logger.debug('Requesting account info via Email...', { type, id });
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const isCustomer = currentUser.roles.includes(globals_1.RoleKey.Member);
            let message = '';
            if (!isCustomer)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            this.logger.debug('User is a customer. Proceeding...');
            if (type === globals_1.AccountInfoQueryTypes.BoomcardPin) {
                this.logger.debug(`Customer requests for a boomcad pin. Will query profile by boomcard id ${id}`);
                const profile = await this.profileService.getProfile(id, {
                    requiredFields: ['contact'],
                    method: services_1.getProfileOptions.BY_CARD,
                });
                const profileData = utils_1.handleServiceResponseResult(profile);
                if (!profileData)
                    throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
                this.logger.debug(`Profile vs current user IDs match? ${profileData.uid === currentUser.uid}`);
                if (profileData.uid !== currentUser.uid)
                    throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
                if (!((_a = profileData.contact.emails) === null || _a === void 0 ? void 0 : _a.length))
                    throw new rest_1.HttpErrors.NotFound(constants_1.GlobalResponseMessages.NO_EMAIL);
                const boomCard = await this.boomCardRepository.findById(id);
                this.logger.debug(`Found requested Boom card`, boomCard);
                message = `Your Boom card pin number is ${boomCard.pinNumber}`;
                this.logger.debug(`Will send email with mesage:`, message, 'and email: ', profileData.contact.emails[0]);
                await this.emailService.sendAccountInfoToUser({
                    user: profileData,
                    pin: boomCard.pinNumber,
                    type,
                });
            }
            else {
                throw new rest_1.HttpErrors.BadRequest(`The account type requested of ${type} is not supported. Only ${globals_1.AccountInfoQueryTypes.BoomcardPin} is allowed at this point.`);
            }
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({ success: true });
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
    authorization_1.authorize([globals_1.RoleKey.Member]),
    rest_1.post('/account-info/customer/sms', {
        responses: {
            '200': {
                description: 'Account info sent response',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "sendAccountInfoViaSMS", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member]),
    rest_1.post('/account-info/customer/email', {
        responses: {
            '200': {
                description: 'Account info sent response',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AccountController.prototype, "sendAccountInfoViaEmail", null);
AccountController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(sns_service_1.SNSService)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(5, loopback4_spring_1.service(email_service_1.EmailService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomCardRepository,
        sns_service_1.SNSService, Object, Function, services_1.ProfileService,
        email_service_1.EmailService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map