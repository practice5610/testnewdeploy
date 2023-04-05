"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMS = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const axios_1 = tslib_1.__importDefault(require("axios"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const repositories_1 = require("../repositories");
const sns_service_1 = require("../services/sns.service");
const specifications_1 = require("../specifications");
let SMS = class SMS {
    constructor(boomCardRepository, snsService, response) {
        this.boomCardRepository = boomCardRepository;
        this.snsService = snsService;
        this.response = response;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    async create(body) {
        try {
            const { token, phone } = body;
            if (!token || !phone) {
                throw new rest_1.HttpErrors.BadRequest('Missing token or phone');
            }
            const response = await axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RE_CAPTCHA_SECRET_KEY}&response=${token}`, {}, {});
            if (!response.data.success)
                throw new rest_1.HttpErrors.Conflict(response.data['error-codes']);
            const result = await this.snsService.sendSMS({
                Message: `Thanks for visiting Boomcarding, here is a link to download our mobile app.
        \nFor IOS : https://www.apple.com/ios/app-store
        \nFor Android : https://play.google.com/store`,
                PhoneNumber: phone,
            });
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send(result);
        }
        catch (error) {
            if (rest_1.HttpErrors.isHttpError(error)) {
                throw error;
            }
            this.logger.error(error.message);
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/sms/app', specifications_1.POSTSmsAppSpecification),
    tslib_1.__param(0, rest_1.requestBody(specifications_1.POSTSmsAppRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SMS.prototype, "create", null);
SMS = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__param(1, loopback4_spring_1.service(sns_service_1.SNSService)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomCardRepository,
        sns_service_1.SNSService, Object])
], SMS);
exports.SMS = SMS;
//# sourceMappingURL=sms.controller.js.map