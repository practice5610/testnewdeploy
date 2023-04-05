"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const utils_1 = require("../utils");
let TransferController = class TransferController {
    constructor(transactionRepository, response, transfersService, profileService, emailService, snsService, boomAccountService) {
        this.transactionRepository = transactionRepository;
        this.response = response;
        this.transfersService = transfersService;
        this.profileService = profileService;
        this.emailService = emailService;
        this.snsService = snsService;
        this.boomAccountService = boomAccountService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.DEFAULT);
    }
    async create(transaction) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            this.logger.info('Transfer Requested: ', transaction);
            const sender = transaction.sender;
            const receiver = transaction.receiver;
            // TODO: on ticket BW-1528 we should remove this validation the controller endpoint should check we get a number and verify that the +1 is present (Check line 102 api\src\controllers\users.controller.ts)
            let receiverPhone = (_b = (_a = receiver.contact) === null || _a === void 0 ? void 0 : _a.phoneNumber) !== null && _b !== void 0 ? _b : '';
            if (receiverPhone.length === 10) {
                receiverPhone = '+1' + receiverPhone;
            }
            if (!receiverPhone.match(globals_1.PhoneRegex2)) {
                // TODO: on ticket BW-1528 we should remove this, the controller validator should validate the number is ok
                this.logger.error(`Transfer failed: receiver phone number is not in correct format. Number: ${receiverPhone}`);
                throw new rest_1.HttpErrors.BadRequest(constants_1.FundTransferResponseMessages.BAD_PHONE_FORMAT);
            }
            if (!sender ||
                !sender.uid ||
                !receiverPhone ||
                !transaction.amount ||
                !transaction.amount.amount ||
                !transaction.amount.precision) {
                this.logger.error(`Transfer failed: missing information`);
                throw new rest_1.HttpErrors.BadRequest(constants_1.FundTransferResponseMessages.TRANSACTION_MISSING_INFO);
            }
            const senderProfile = await this.profileService.getProfile(sender.uid, {
                requiredFields: ['contact', 'firstName'],
            });
            const senderProfileData = utils_1.handleServiceResponseResult(senderProfile);
            if (!senderProfileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            let receiverProfile;
            if (receiverPhone) {
                receiverProfile = await this.profileService.getProfile(receiverPhone, {
                    requiredFields: ['contact', 'firstName'],
                    method: services_1.getProfileOptions.BY_PHONE,
                });
            }
            else if (receiver === null || receiver === void 0 ? void 0 : receiver.uid) {
                receiverProfile = await this.profileService.getProfile(receiver.uid, {
                    requiredFields: ['contact', 'firstName'],
                    method: services_1.getProfileOptions.BY_PHONE,
                });
            }
            else {
                throw new rest_1.HttpErrors.BadRequest(constants_1.FundTransferResponseMessages.TRANSACTION_MISSING_INFO);
            }
            if (receiverProfile.statusCode !== constants_1.ServiceResponseCodes.SUCCESS &&
                receiverProfile.statusCode !== constants_1.ServiceResponseCodes.RECORD_NOT_FOUND) {
                this.logger.error(`Transfer failed: profile service error`);
                throw new rest_1.HttpErrors.BadRequest((_c = receiverProfile.message) !== null && _c !== void 0 ? _c : constants_1.APIResponseMessages.RECORD_CONFLICT);
            }
            const receiverProfileData = receiverProfile.statusCode === constants_1.ServiceResponseCodes.SUCCESS
                ? utils_1.handleServiceResponseResult(receiverProfile)
                : undefined;
            if (receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.roles.includes(globals_1.RoleKey.Merchant)) {
                this.logger.error(`Transfer failed: receiver is merchant`);
                throw new rest_1.HttpErrors.BadRequest(constants_1.FundTransferResponseMessages.RECEIVER_IS_MERCHANT);
            }
            const senderEmail = (_d = senderProfileData.contact.emails) === null || _d === void 0 ? void 0 : _d[0];
            const receiverEmail = (_e = receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.contact.emails) === null || _e === void 0 ? void 0 : _e[0];
            const senderPhone = senderProfileData.contact.phoneNumber;
            if (!((_f = senderProfileData.boomAccounts) === null || _f === void 0 ? void 0 : _f.length)) {
                this.logger.error(`Transfer failed: user was missing boom account`);
                throw new rest_1.HttpErrors.NotFound(constants_1.GlobalResponseMessages.NO_BOOM_ACCOUNT);
            }
            if (!((_g = receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.boomAccounts) === null || _g === void 0 ? void 0 : _g.length) && receiver.uid) {
                // TODO: this only covers if the receiver has id to create account but when phone number is received we don't create account
                // This logic should be moved to the transfer service when the funds are added - ticket BW-1529 should fix this
                this.logger.info(`Creating Boom Account for Receiver. ${receiver.uid}`);
                const creatingResponse = await this.boomAccountService.create(receiver.uid);
                if (!creatingResponse.success) {
                    throw new rest_1.HttpErrors.BadRequest(creatingResponse.message);
                }
            }
            //we get the first account for this user
            const senderBoomAccountResponse = await this.boomAccountService.verifyExistingAccounts(senderProfileData.uid);
            if (!senderBoomAccountResponse.success || !senderBoomAccountResponse.data) {
                throw new rest_1.HttpErrors.NotFound(senderBoomAccountResponse.message);
            }
            const senderBoomAccount = senderBoomAccountResponse.data;
            if (dinero_js_1.default(senderBoomAccount.balance).lessThan(dinero_js_1.default(transaction.amount))) {
                this.logger.error(`Transfer failed: sender did not have enough funds`);
                throw new rest_1.HttpErrors.BadRequest(constants_1.FundTransferResponseMessages.INSUFFICIENT_FUNDS);
            }
            const preparedTransaction = Object.assign(Object.assign({}, transaction), { createdAt: moment_1.default().utc().unix(), updatedAt: moment_1.default().utc().unix(), type: globals_1.TransactionType.TRANSFER, status: globals_1.TransactionStatus.PENDING, sender: Object.assign(Object.assign({}, sender), { firstName: senderProfileData.firstName }), receiver: {
                    uid: receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.uid,
                    firstName: receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.firstName,
                    contact: {
                        phoneNumber: receiverPhone,
                        emails: receiverEmail ? [receiverEmail] : undefined,
                    },
                } });
            let result;
            try {
                result = await this.transactionRepository.create(preparedTransaction);
            }
            catch (err) {
                this.logger.error(`Transfer failed: transaction repository create failed`);
                throw new rest_1.HttpErrors.InternalServerError(constants_1.FundTransferResponseMessages.TRANSACTION_CREATION_ERROR);
            }
            if (receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.uid) {
                // receiver is a member
                try {
                    const receiverSNSResult = await this.snsService.sendSMS({
                        Message: `You have a pending transfer of ${dinero_js_1.default(transaction.amount).toFormat('$0,0.00')} to your Boom account! To receive this transfer, please follow this link: ${process.env.DOMAIN_SOURCE}/confirm-transfer/${result._id}`,
                        PhoneNumber: receiverPhone.replace(/\s/g, ''),
                    });
                    this.logger.info(`SMS to transfer receiver was successful: ${receiverSNSResult.success}\nSNSService message: ${receiverSNSResult.message}`);
                }
                catch (err) {
                    this.logger.error(`Transfer SNS failed: ${err.message}`);
                }
            }
            else {
                // receiver is not a member
                try {
                    const receiverSNSResult = await this.snsService.sendSMS({
                        Message: `${(_h = senderProfileData.firstName) !== null && _h !== void 0 ? _h : 'Your friend'} sent you ${dinero_js_1.default(transaction.amount).toFormat('$0,0.00')} in Boom Rewards! To receive this transfer, download the app and create an account using this phone number!`,
                        PhoneNumber: receiverPhone.replace(/\s/g, ''),
                    });
                    this.logger.info(`SMS to transfer receiver was successful: ${receiverSNSResult.success}\nSNSService message: ${receiverSNSResult.message}`);
                }
                catch (err) {
                    this.logger.error(`Transfer SNS failed: ${err.message}`);
                }
            }
            try {
                const senderSNSResult = await this.snsService.sendSMS({
                    Message: `You have initiated a transfer of ${dinero_js_1.default(transaction.amount).toFormat('$0,0.00')} to ${receiverPhone}! You may cancel this transfer here: ${process.env.DOMAIN_SOURCE}/cancel-transfer/${result._id}`,
                    PhoneNumber: senderPhone === null || senderPhone === void 0 ? void 0 : senderPhone.replace(/\s/g, ''),
                });
                this.logger.info(`SMS to transfer sender was successful: ${senderSNSResult.success}\nSNSService message: ${senderSNSResult.message}`);
            }
            catch (err) {
                this.logger.error(`Transfer SNS failed: ${err.message}`);
            }
            if (senderEmail) {
                this.logger.info('Transfer Saved. Will send sender email: ', senderEmail);
                try {
                    await this.emailService.send({
                        to: senderEmail,
                        from: 'Boom Rewards <noreply@boomcarding.com>',
                        subject: 'Transfer started from your account',
                        html: this.emailService.mailGenerator.generate({
                            body: {
                                name: senderProfileData.firstName +
                                    (senderProfileData.lastName ? ' ' + senderProfileData.lastName : ''),
                                intro: `You have initiated a transfer of ${dinero_js_1.default(transaction.amount).toFormat('$0,0.00')} to ${receiverEmail}!`,
                                action: {
                                    instructions: 'If you did not intend to make this transfer, you can cancel it below.',
                                    button: {
                                        color: '#d52c25',
                                        text: 'Cancel transfer',
                                        link: `${process.env.DOMAIN_SOURCE}/cancel-transfer/${result._id}`,
                                    },
                                },
                            },
                        }),
                    });
                }
                catch (err) {
                    this.logger.error(`Transfer email failed: ${err.message}`);
                }
            }
            if (receiverEmail) {
                try {
                    this.logger.info('Transfer Saved. Will send receiver email: ', receiverEmail);
                    await this.emailService.send({
                        to: receiverEmail,
                        from: 'Boom Rewards <noreply@boomcarding.com>',
                        subject: 'Request for Transfer of Funds',
                        html: this.emailService.mailGenerator.generate({
                            body: {
                                name: (receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.firstName) +
                                    ((receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.lastName) ? ' ' + (receiverProfileData === null || receiverProfileData === void 0 ? void 0 : receiverProfileData.lastName) : ''),
                                intro: `You have a pending transfer of ${dinero_js_1.default(transaction.amount).toFormat('$0,0.00')} to your Boom account!`,
                                action: {
                                    instructions: 'To receive this transfer, please click the button below.',
                                    button: {
                                        color: '#d52c25',
                                        text: 'Accept transfer',
                                        link: `${process.env.DOMAIN_SOURCE}/confirm-transfer/${result._id}`,
                                    },
                                },
                                hideSignature: true,
                            },
                        }),
                    });
                }
                catch (err) {
                    this.logger.error(`Transfer email failed: ${err.message}`);
                }
            }
            this.logger.info('Transfer Request Created:', result);
            return { success: true, message: 'Success', data: result };
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    async count(
    //@ts-ignore
    where) {
        //@TODO: The logged in user id and the id you passed over must match, else throw 403
        return this.transactionRepository.count(where);
    }
    async find(
    //@ts-ignore
    filter) {
        return this.transactionRepository.find(filter);
    }
    async updateById(id, transaction) {
        try {
            const exists = await this.transactionRepository.exists(id);
            if (!exists) {
                return { success: false, message: 'This transfer was not found' };
            }
            const current = await this.transactionRepository.findById(id);
            if (transaction.status === globals_1.TransactionStatus.CANCELLED) {
                if (current.status !== globals_1.TransactionStatus.PENDING) {
                    return { success: false, message: `This transfer has already been ${current.status}!` };
                }
                const updatedTransaction = Object.assign(Object.assign({}, current), { status: transaction.status, updatedAt: moment_1.default().utc().unix() });
                await this.transactionRepository.updateById(id, updatedTransaction);
                return { success: true, message: 'Transfer cancelled' };
            }
            else if (transaction.status === globals_1.TransactionStatus.COMPLETED) {
                if (current.status !== globals_1.TransactionStatus.PENDING) {
                    return {
                        success: false,
                        message: `This transfer has already been ${current.status}!`,
                        data: { isStillPending: false },
                    };
                }
                if (!(current === null || current === void 0 ? void 0 : current.createdAt) || moment_1.default().utc().unix() - current.createdAt > 3 * 24 * 60 * 60) {
                    return {
                        success: false,
                        message: `This transfer is expired!`,
                        data: { isStillPending: false },
                    };
                }
                try {
                    await this.transfersService.transferFunds(current);
                    return { success: true, message: 'Success' };
                }
                catch (err) {
                    this.logger.error(err);
                    return { success: false, message: 'Transfer Failed', data: { isStillPending: true } };
                }
            }
            return { success: false, message: 'Request not found', data: { isStillPending: false } };
        }
        catch (error) {
            this.logger.error(error);
            return { success: false, message: 'Update Failed' };
        }
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/transfers', {
        responses: {
            '200': {
                description: 'Transfers funds from one user to another.',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Transaction } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Transaction]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/transfers/count', {
        responses: {
            '200': {
                description: 'Transaction model count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Transaction))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/transfers', {
        responses: {
            '200': {
                description: 'Array of Transaction model instances',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: { 'x-ts-type': models_1.Transaction } },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.Transaction))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/transfers/{id}', {
        responses: {
            '204': {
                description: 'Transaction PUT success',
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Transaction]),
    tslib_1.__metadata("design:returntype", Promise)
], TransferController.prototype, "updateById", null);
TransferController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, loopback4_spring_1.service(services_1.TransfersService)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.EmailService)),
    tslib_1.__param(5, loopback4_spring_1.service(services_1.SNSService)),
    tslib_1.__param(6, loopback4_spring_1.service(services_1.BoomAccountService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository, Object, services_1.TransfersService,
        services_1.ProfileService,
        services_1.EmailService,
        services_1.SNSService,
        services_1.BoomAccountService])
], TransferController);
exports.TransferController = TransferController;
//# sourceMappingURL=transfers.controller.js.map