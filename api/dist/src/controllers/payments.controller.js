"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const dinero_js_1 = tslib_1.__importDefault(require("dinero.js"));
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const authorization_2 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const bank_info_repository_1 = require("../repositories/bank-info.repository");
const services_1 = require("../services");
const utils_1 = require("../utils");
let PaymentController = class PaymentController {
    constructor(transactionRepository, boomCardRepository, bankInfoRepository, billingRepository, response, transfersService, profileService, emailService, bankInfoService, paymentProcessorService, currentUserGetter) {
        this.transactionRepository = transactionRepository;
        this.boomCardRepository = boomCardRepository;
        this.bankInfoRepository = bankInfoRepository;
        this.billingRepository = billingRepository;
        this.response = response;
        this.transfersService = transfersService;
        this.profileService = profileService;
        this.emailService = emailService;
        this.bankInfoService = bankInfoService;
        this.paymentProcessorService = paymentProcessorService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.CUSTOMER_BILLING);
    }
    async create(req) {
        var _a, _b, _c, _d;
        const { nonce, uid, amount, plaidItemId, plaidAccountId } = req;
        // const { transaction, billingTransaction } = await this.transfersService.addFunds(
        //   uid,
        //   amount,
        //   nonce
        // );
        const value = amount.amount / 100;
        const profile = await this.profileService.getProfile(uid, {
            requiredFields: ['firstName', 'lastName', 'contact', 'addresses'],
        });
        const profileData = utils_1.handleServiceResponseResult(profile);
        if (!profileData)
            throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
        const plaidInfo = (_a = profileData.plaidInfo) === null || _a === void 0 ? void 0 : _a.find((info) => info.item.itemId === plaidItemId);
        if (!plaidInfo) {
            throw new rest_1.HttpErrors.NotFound('Plaid info for user not found');
        }
        const plaidAccessToken = plaidInfo.item.accessToken;
        const { firstName, lastName, contact, addresses } = profileData;
        const { phoneNumber } = contact;
        if (!globals_1.isArray(addresses) || !addresses.length) {
            throw new rest_1.HttpErrors.BadRequest('There are no addresses for this user');
        }
        const { number, street1, city, state, zip } = addresses[0];
        if (!firstName || !lastName || !number || !street1 || !city || !phoneNumber || !state || !zip) {
            throw new rest_1.HttpErrors.BadRequest('One or more fields are missing: first name, last name, address number, street, city, phone number, state, zip code');
        }
        const email = (_c = (_b = profileData.contact.emails) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : '';
        this.logger.debug(`Add funds requested for ${uid} for ${utils_1.fromMoney(amount)}, using nonce: ${nonce}`);
        const balanceResult = await this.bankInfoService.getPlaidBalance(plaidAccessToken);
        //console.log('Plaid Balance Result', balanceResult);
        if (!balanceResult.success) {
            return {
                success: false,
                message: balanceResult.message,
                errorCode: balanceResult.error_code,
            };
        }
        const balances = (_d = balanceResult.accounts.find((item) => item.account_id === plaidAccountId)) === null || _d === void 0 ? void 0 : _d.balances;
        if (!balances) {
            return { success: false, message: constants_1.BankAccountResponseMessages.BALANCE_CHECK_FAILED };
        }
        /**
         *  Because we do not instantly charge people, we need to keep track of the number of charges a user
         *  is making in addition to checking their balance with Plaid.
         *  For example, if a user has $100 in an account, the old system would let them add $100 to their boom
         *  account as many times as they want until we actually take the money.
         *  To get around this, we check if the real time current total balance is equal to the total balance we
         * have saved for them. If it is, we can assume that means they have added funds more than once since the
         *  last time we charged them, so we should use their "available" balance that we saved rather than their
         *  real time Plaid available balance
         */
        const { available, current } = balances;
        let savedAccountInfo;
        try {
            savedAccountInfo = await this.bankInfoRepository.findOne({
                where: { plaidID: plaidAccountId, userID: uid },
            });
        }
        catch (err) {
            this.logger.error('There was an error finding the bank account');
            return { success: false, message: 'Error finding account' };
        }
        /**
         * This says:
         * if the current real time balance is the same as the balance we have saved, check if the amount being charged is
         *  less than the available funds we have saved.
         * else check if the amount being charged is less than the real time available balance
         *
         * if the saved available balance is undefined (it never should be), just deny the transaction.
         */
        const canPay = current === (savedAccountInfo === null || savedAccountInfo === void 0 ? void 0 : savedAccountInfo.balances.current)
            ? value <= ((savedAccountInfo === null || savedAccountInfo === void 0 ? void 0 : savedAccountInfo.balances.available) ? savedAccountInfo === null || savedAccountInfo === void 0 ? void 0 : savedAccountInfo.balances.available : 0)
            : value <= available;
        if (!canPay) {
            return { success: false, balanceInfo: { available, current, canPay } };
        }
        if (canPay) {
            const { transaction, billingTransaction } = await this.transfersService.addFunds(uid, amount, nonce);
            try {
                // update the balance in our saved account info
                if (savedAccountInfo) {
                    savedAccountInfo.balances.available =
                        current === (savedAccountInfo === null || savedAccountInfo === void 0 ? void 0 : savedAccountInfo.balances.current)
                            ? savedAccountInfo.balances.available - value
                            : available - value;
                    savedAccountInfo.balances.current = current;
                    await this.bankInfoRepository.updateById(savedAccountInfo._id, savedAccountInfo);
                }
            }
            catch (err) {
                this.logger.error('There was an error deducting the charge from the account balance');
                return { success: false, message: 'Error updating account' };
            }
            this.logger.debug('Will prepare email body...');
            let html = this.emailService.mailGenerator.generate({
                body: {
                    title: profileData.firstName + (profileData.lastName ? ' ' + profileData.lastName : ''),
                    intro: utils_1.fromMoney(amount) + ' was added to your Boom Rewards card.',
                    action: {
                        instructions: 'You can check your current balance and transaction history in your dashboard:',
                        button: {
                            color: '#d52c25',
                            text: 'Go to Dashboard',
                            link: `${process.env.DOMAIN_SOURCE}/account/history`,
                        },
                    },
                    outro: 'Thank you for your business.',
                },
            });
            const css = '.email-masthead { background-color: #d52c25; } .email-footer { background-color: #191919; }</style>';
            html = html.replace(/<\/style>/, css);
            this.logger.debug('Email body prepared. Will email fund added confirmation to', email);
            await this.emailService.send({
                to: email,
                from: 'Boom Rewards <noreply@boomcarding.com>',
                subject: 'Funds Added to your Boom Card Account',
                html: html,
            });
            this.logger.info('Funds added successfully');
            //save to collection bank_account, transactions
            const resultSaveDB = await this.billingRepository.create({
                transaction: billingTransaction,
                plaidItemId,
                plaidAccountId,
            });
            this.logger.debug('billing: ', resultSaveDB);
            if (!resultSaveDB) {
                return { success: false, message: 'Failed to save into DB' };
            }
            else {
                return {
                    success: true,
                    transaction,
                };
            }
        }
        else {
            this.logger.error('Checkout unsuccessful');
            return { success: false, message: 'Incomplete Transaction' };
        }
    }
    // Add Funds via credit card
    async ProcessCreditCardPayment(req) {
        const { 
        // boomCardId,
        amount, ksn, EMVSREDData, numberOfPaddedBytes, userEmail, userFirstName, userLastName, userUid, } = req;
        if (!(amount ||
            ksn ||
            EMVSREDData ||
            numberOfPaddedBytes ||
            userEmail ||
            userUid ||
            userFirstName ||
            userLastName))
            throw new rest_1.HttpErrors.BadRequest(`One Of these is missing: amount || ksn || EMVSREDData || numberOfPaddedBytes || userEmail || userUid || userFirstName || userLastName`);
        this.logger.info('Will add funds for user ', userUid, ' to his boom account With amount: ', utils_1.fromMoney(amount));
        // charge the credit card
        const requestJsonCardInfo = [
            {
                KeyValuePairOfstringstring: [
                    {
                        key: 'NonremovableTags',
                        value: '<![CDATA[<NonremovableTags><Tag>CCTrack2</Tag><Tag>CCNum</Tag><Tag>YY</Tag><Tag>MM</Tag ></NonremovableTags>]]>',
                    },
                    {
                        key: 'PayloadResponseFieldsToMask',
                        value: '<![CDATA[<FieldsToMask><Field><FieldStart>&lt;AcctNum&gt;</FieldStart><FieldEnd>&lt;/Ac ctNum&gt;</FieldEnd></Field></FieldsToMask>]]>',
                    },
                ],
                EMVSREDInput: {
                    EMVSREDData,
                    EncryptionType: '80',
                    KSN: ksn,
                    NumberOfPaddedBytes: numberOfPaddedBytes,
                    PaymentMode: 'EMV',
                },
                TransactionInput: {
                    Amount: dinero_js_1.default(amount).toUnit(),
                    TransactionInputDetails: {
                        KeyValuePairOfstringstring: {
                            key: '',
                            value: '',
                        },
                    },
                    TransactionType: 'SALE',
                },
            },
        ];
        this.logger.debug('Will request EMVSRED process with data:', requestJsonCardInfo);
        const processorResult = await this.paymentProcessorService.ProcessEMVSRED(requestJsonCardInfo);
        this.logger.debug('ProcessEMVSRED-Response(JSON)', processorResult);
        if (processorResult.success) {
            const currentUser = await this.currentUserGetter();
            //if (!currentUser) throw new HttpErrors.NotFound(ProfileResponseMessages.MEMBER_NOT_FOUND); // We could use this one probably, we need to check the Frontend
            if (!currentUser) {
                return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                    success: false,
                    message: 'No token provided...will not process request.',
                });
            }
            // get userInfo
            const uid = userUid;
            const email = userEmail;
            const firstName = userFirstName;
            const lastName = userLastName;
            // add funds
            await this.transfersService.addFunds(uid, amount, '', false);
            // send email
            this.logger.info('Will prepare email body...');
            let html = this.emailService.mailGenerator.generate({
                body: {
                    title: (firstName || '') + (lastName ? ' ' + lastName : ''),
                    intro: utils_1.fromMoney(amount) + ' was added to your Boom Rewards card.',
                    action: {
                        instructions: 'You can check your current balance and transaction history in your dashboard:',
                        button: {
                            color: '#d52c25',
                            text: 'Go to Dashboard',
                            link: `${process.env.DOMAIN_SOURCE}/account/history`,
                        },
                    },
                    outro: 'Thank you for your business.',
                },
            });
            const css = '.email-masthead { background-color: #d52c25; } .email-footer { background-color: #191919; }</style>';
            html = html.replace(/<\/style>/, css);
            this.logger.info('Email body prepared. Will email fund added confirmation to', email);
            await this.emailService.send({
                to: email,
                from: 'Boom Rewards <noreply@boomcarding.com>',
                subject: 'Funds Added to your Boom Card Account',
                html: html,
            });
            this.logger.info('Funds added successfully');
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: processorResult.message,
                data: processorResult.data,
            });
        }
        else
            return this.response
                .status(constants_1.ServiceResponseCodes.SUCCESS)
                .send({ success: false, message: processorResult.message });
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/payments', {
        responses: {
            '200': {
                description: 'Adds funds to user account',
                content: {
                    'application/json': { schema: { 'x-ts-type': models_1.Transaction } },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member]),
    rest_1.post('payments/credit-card', {
        responses: {
            '200': {
                description: 'Add funds via credit card',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "ProcessCreditCardPayment", null);
PaymentController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.TransactionRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__param(2, repository_1.repository(bank_info_repository_1.BankInfoRepository)),
    tslib_1.__param(3, repository_1.repository(repositories_1.CustomerBillingRepository)),
    tslib_1.__param(4, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(5, loopback4_spring_1.service(services_1.TransfersService)),
    tslib_1.__param(6, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(7, loopback4_spring_1.service(services_1.EmailService)),
    tslib_1.__param(8, loopback4_spring_1.service(services_1.BankInfoService)),
    tslib_1.__param(9, loopback4_spring_1.service(services_1.PaymentProcessorService)),
    tslib_1.__param(10, core_1.inject.getter(authorization_2.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TransactionRepository,
        repositories_1.BoomCardRepository,
        bank_info_repository_1.BankInfoRepository,
        repositories_1.CustomerBillingRepository, Object, services_1.TransfersService,
        services_1.ProfileService,
        services_1.EmailService,
        services_1.BankInfoService,
        services_1.PaymentProcessorService, Function])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payments.controller.js.map