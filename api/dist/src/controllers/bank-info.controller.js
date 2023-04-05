"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankInfoController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const moment_1 = tslib_1.__importDefault(require("moment"));
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const bank_info_repository_1 = require("../repositories/bank-info.repository");
const services_1 = require("../services");
const utils_1 = require("../utils");
/**
 * This controller routes bank account information requests to/from user profiles and our bank account info service
 */
let BankInfoController = class BankInfoController {
    constructor(bankInfoRepository, response, profileService, boomAccountService, bankInfoService, currentUserGetter) {
        this.bankInfoRepository = bankInfoRepository;
        this.response = response;
        this.profileService = profileService;
        this.boomAccountService = boomAccountService;
        this.bankInfoService = bankInfoService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BANK_INFO_SERVICE);
    }
    /**
     * Get the environment defined for Plaid on the API environment. Plaid environment and front end environments must match
     */
    getPlaidEnvInfo() {
        const result = this.bankInfoService.getPlaidEnvInfo();
        return {
            success: true,
            plaidEnv: result.env,
            message: 'Successfully fetched plaid env info',
        };
    }
    /**
     * Get Plaid public token to authorize user with the Plaid front-end interface
     * @param req
     */
    async getPlaidPublicToken(req) {
        const { itemId, uid } = req;
        const profile = await this.profileService.getProfile(uid, {
            requiredFields: ['plaidInfo'],
        });
        const profileData = utils_1.handleServiceResponseResult(profile);
        if (!profileData)
            throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
        const plaidInfo = profileData.plaidInfo.find((info) => info.item.itemId === itemId);
        const plaidAccessToken = plaidInfo ? plaidInfo.item.accessToken : null;
        if (!plaidAccessToken)
            throw new rest_1.HttpErrors.NotFound();
        const result = await this.bankInfoService.getPlaidPublicToken(plaidAccessToken);
        return result;
    }
    async exchangeToken(req) {
        const { publicToken } = req;
        const result = await this.bankInfoService.exchangeToken(publicToken);
        return { success: true, item: result };
    }
    async saveAccounts(req) {
        var _a, _b, _c, _d;
        // accounts to be added to the database
        const bankInfoList = [];
        const currentUser = await this.currentUserGetter();
        if (!currentUser)
            throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
        if (currentUser.uid !== req.user.uid) {
            // throw new HttpErrors.Forbidden(GlobalResponseMessages.NOT_AUTHORIZED); We probably need to use this one
            return { success: false, message: constants_1.GlobalResponseMessages.NOT_AUTHORIZED };
        }
        try {
            // Creating a new boom account related to current user in order to store/handle the balance.
            // This proccess should NOT stop here if the boom account fails, we will be paying Plaid ~$1 for every time we have to try again.
            if (!currentUser.boomAccounts) {
                const response = await this.boomAccountService.create(currentUser.uid);
                this.logger.debug(`Boom account created: ${response.success}`);
            }
            const itemID = req.plaidInfo.item.itemId;
            const institution = req.plaidInfo.institution.name;
            const accessToken = req.plaidInfo.item.accessToken;
            const authResult = await this.bankInfoService.getAuth(accessToken);
            if (!authResult.success || !authResult.data) {
                return {
                    success: false,
                    message: constants_1.BankAccountResponseMessages.NO_ACCOUNT_NUMBERS_FROM_PLAID,
                };
            }
            const identityResult = await this.bankInfoService.getIdentity(accessToken);
            // if the identity call gave us info we replace the auth accounts with identity accounts
            if (authResult.data && identityResult.success && ((_a = identityResult.data) === null || _a === void 0 ? void 0 : _a.accounts)) {
                authResult.data.accounts = identityResult.data.accounts;
            }
            const ownerInfo = {
                phone: '',
                names: [],
                address: '',
                city: '',
                state: '',
                zip: '',
                emails: [],
                gotInfoFromBank: false,
            };
            // fill the ownerInfo with the BoomUser data in case the bank does not provide data
            if ((_b = req.user.addresses) === null || _b === void 0 ? void 0 : _b.length) {
                if ((_c = req.user.contact) === null || _c === void 0 ? void 0 : _c.phoneNumber) {
                    ownerInfo.phone = req.user.contact.phoneNumber;
                }
                if (req.user.addresses[0].number && req.user.addresses[0].street1) {
                    //TODO: use new compose address function when it is created getComposedAddressFromStore
                    ownerInfo.address = req.user.addresses[0].number + ' ' + req.user.addresses[0].street1;
                }
                if (req.user.addresses[0].city) {
                    ownerInfo.city = req.user.addresses[0].city;
                }
                if (req.user.addresses[0].state) {
                    ownerInfo.state = req.user.addresses[0].state;
                }
                if (req.user.addresses[0].zip) {
                    ownerInfo.zip = req.user.addresses[0].zip;
                }
            }
            if ((_d = req.user.contact) === null || _d === void 0 ? void 0 : _d.emails) {
                ownerInfo.emails = req.user.contact.emails;
            }
            let userName = '';
            if (req.user.firstName)
                userName += req.user.firstName + ' ';
            if (req.user.lastName)
                userName += req.user.lastName;
            ownerInfo.names = [userName];
            /**
             *  when a user connects to a bank, Plaid gets all of the accounts that the user has at that bank.
             *  We now have:
             *  1) the plaid info summary for a single institution that is saved in the user document (req.plaidInfo)
             *  2) the account numbers we got from an Auth call to Plaid (authResult.data.numbers.achNumbers)
             *  3) the account owner info from an Identity call to Plaid (authResult.data.accounts)
             *
             *    We now go through each account that the user just added to their plaidInfo, find the matching account
             *    numbers and the matching identity info, then combine it all into a new account document.
             * */
            req.plaidInfo.accounts.forEach((account) => {
                var _a, _b, _c;
                if (!authResult.data) {
                    throw new rest_1.HttpErrors.NotFound(constants_1.BankAccountResponseMessages.NO_ACCOUNT_NUMBERS_FROM_PLAID);
                }
                //this only gets american numbers and returns if there isnt an american ach number
                const foundNumbers = authResult.data.numbers.achNumbers.find((achNum) => achNum.account_id === account.id);
                if (!foundNumbers) {
                    throw new rest_1.HttpErrors.NotFound(constants_1.BankAccountResponseMessages.NO_ACCOUNT_NUMBERS_FROM_PLAID);
                }
                // copy the base ownerInfo for this iteration of plaidInfo.accounts
                const accountOwner = JSON.parse(JSON.stringify(ownerInfo));
                // find the account data for the current plaid account id
                const authAccountInfo = authResult.data.accounts.find((acc) => acc.account_id === account.id);
                if (!authAccountInfo) {
                    throw new rest_1.HttpErrors.NotFound(constants_1.BankAccountResponseMessages.NO_IDENTITY_DATA_FROM_PLAID);
                }
                //we have the account data and the account numbers
                //check if we have owners and at least an address from identity
                /***
                 * owners is an array, but if there are multiple owners they are all in the first
                 * element. I do not think we will miss anything by just accessing owners[0]
                 */
                if ((_c = (_b = (_a = authAccountInfo.owners) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.addresses) === null || _c === void 0 ? void 0 : _c.length) {
                    //we know we have at least an address from the bank so we mark this user data as confirmed
                    accountOwner.gotInfoFromBank = true;
                    // if plaid gave us a name list with at least one name, use it
                    if (authAccountInfo.owners[0].names && authAccountInfo.owners[0].names.length)
                        accountOwner.names = authAccountInfo.owners[0].names;
                    // add the list of emails from the bank if they exist
                    if (authAccountInfo.owners[0].emails && authAccountInfo.owners[0].emails.length) {
                        accountOwner.emails = [
                            ...accountOwner.emails,
                            ...authAccountInfo.owners[0].emails.map((email) => email.data),
                        ];
                    }
                    if (authAccountInfo.owners[0].addresses.length > 0) {
                        let primary = authAccountInfo.owners[0].addresses.find((address) => address.primary);
                        if (!primary) {
                            primary = authAccountInfo.owners[0].addresses[0];
                        }
                        accountOwner.address = primary.data.street;
                        accountOwner.city = primary.data.city;
                        accountOwner.state = primary.data.region ? primary.data.region : 'NULL';
                        accountOwner.zip = primary.data.postal_code || 'Not Provided';
                    }
                }
                const bankInfo = {
                    createdAt: moment_1.default().utc().unix(),
                    updatedAt: moment_1.default().utc().unix(),
                    accountNumber: foundNumbers.account,
                    routingNumber: foundNumbers.routing,
                    wireRoutingNumber: foundNumbers.wire_routing,
                    plaidID: account.id,
                    plaidItemID: itemID,
                    plaidAccessToken: accessToken,
                    name: institution + ' ' + account.subtype,
                    userID: req.user.uid,
                    balances: {
                        available: authAccountInfo.balances.available.toString(),
                        current: authAccountInfo.balances.current.toString(),
                        limit: authAccountInfo.balances.limit
                            ? authAccountInfo.balances.limit.toString()
                            : null,
                    },
                    accountOwner: accountOwner,
                };
                bankInfoList.push(bankInfo);
            });
        }
        catch (err) {
            return { success: false, message: err.message };
        }
        try {
            for (const account of bankInfoList) {
                const savedAccount = await this.bankInfoRepository.find({
                    where: { and: [{ plaidID: account.plaidID }, { userID: account.userID }] },
                });
                if (savedAccount.length)
                    throw new Error('Account exists');
            }
            for (const account of bankInfoList) {
                await this.bankInfoRepository.create(account);
            }
        }
        catch (err) {
            return { success: false, message: err.message };
        }
        return { success: true };
    }
    /**  we access account data from 2 places, customer billings and merchant transactions.
     *
     *    CustomerBillings have a plaidID on them and a userID so we want to check for an account with
     *    both of those things because it is the safest way to make sure we are getting the right account
     *    info. When we call this from the CustomerBillings page we just set the merchant flag to false.
     *
     *    MerchantTransactions do not include a plaidID. Since merchants can only add one bank account,
     *   we can search for an account by userID only. When we call this from the MerchantTransactions page
     *   we can just set the isMerchant flag to true.
     *
     * @param req
     */
    async getAccountInfo(req) {
        let account;
        if (req.isMerchant) {
            account = await this.bankInfoRepository.findOne({ where: { userID: req.uid } });
        }
        else {
            account = await this.bankInfoRepository.findOne({
                where: { and: [{ plaidID: req.accountID }, { userID: req.uid }] },
            });
        }
        if (!account) {
            return { success: false, message: constants_1.BankAccountResponseMessages.BANK_ACCOUNT_INFO_NOT_FOUND };
        }
        return { success: true, data: account };
    }
    async deleteAccount(req) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            if (!(req.length && currentUser.uid === req[0].userID)) {
                // throw new HttpErrors.Forbidden(GlobalResponseMessages.NOT_AUTHORIZED); We probably need to use this one
                return { success: false, message: 'you can only delete accounts with your own userID' };
            }
            await this.bankInfoService.deleteAccounts(req);
        }
        catch (err) {
            this.logger.error(err.message);
            if (err.message === constants_1.BankAccountResponseMessages.BANK_DELETE_BLOCKED) {
                return this.response
                    .status(500)
                    .send({ success: false, message: constants_1.BankAccountResponseMessages.BANK_DELETE_BLOCKED });
            }
            else {
                return this.response
                    .status(500)
                    .send({ success: false, message: constants_1.BankAccountResponseMessages.BANK_DELETE_FAILED });
            }
        }
        return { success: true };
    }
};
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.get('/bank-info/auth/getPlaidEnvInfo', {
        responses: {
            '200': {
                description: 'Retrieves a public key from the payment processor.',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Object)
], BankInfoController.prototype, "getPlaidEnvInfo", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/bank-info/auth/getPublicToken', {
        responses: {
            '200': {
                description: 'Retrieves public token from the Plaid service.',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoController.prototype, "getPlaidPublicToken", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/bank-info/auth/exchangeToken', {
        responses: {
            '200': {
                description: 'Retrieves access token from the Plaid service.',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoController.prototype, "exchangeToken", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant]),
    rest_1.post('/bank-info/saveAccounts', {
        responses: {
            '200': {
                description: 'Saves new account info',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoController.prototype, "saveAccounts", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/bank-info/getAccountInfo', {
        responses: {
            '200': {
                description: 'Find any user bank account information by their user ID and the accounts plaid id',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoController.prototype, "getAccountInfo", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/bank-info/deleteAccount', {
        responses: {
            '200': {
                description: 'deletes saved account info',
                content: { 'application/json': { schema: { 'x-ts-type': Object } } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], BankInfoController.prototype, "deleteAccount", null);
BankInfoController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(bank_info_repository_1.BankInfoRepository)),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(3, loopback4_spring_1.service(services_1.BoomAccountService)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.BankInfoService)),
    tslib_1.__param(5, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [bank_info_repository_1.BankInfoRepository, Object, services_1.ProfileService,
        services_1.BoomAccountService,
        services_1.BankInfoService, Function])
], BankInfoController);
exports.BankInfoController = BankInfoController;
//# sourceMappingURL=bank-info.controller.js.map