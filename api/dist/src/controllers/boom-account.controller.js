"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomAccountController = void 0;
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
const specifications_1 = require("../specifications/");
const utils_1 = require("../utils");
let BoomAccountController = class BoomAccountController {
    constructor(boomAccountRepository, response, profileService, currentUserGetter, boomAccountService) {
        this.boomAccountRepository = boomAccountRepository;
        this.response = response;
        this.profileService = profileService;
        this.currentUserGetter = currentUserGetter;
        this.boomAccountService = boomAccountService;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOM_ACCOUNT_CONTROLLER);
    }
    /**
     * Finds a boom account by its database ID
     * @param {string} id MongoDB Object ID
     * @returns {Promise<BoomAccount>} Promise BoomAccount
     * @memberof BoomAccountController
     */
    async findById(id) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const isCustomer = currentUser.roles.includes(globals_1.RoleKey.Member);
            const boomAccount = await this.boomAccountRepository.findById(id);
            if (!boomAccount) {
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomAccountResponseMessages.NOT_FOUND);
            }
            // Member can only access to account belong to.
            if (isCustomer && boomAccount.customerID !== currentUser.uid) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            return {
                success: true,
                message: 'Success',
                data: boomAccount,
            };
        }
        catch (error) {
            switch (error.message) {
                case constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND:
                case constants_1.BoomAccountResponseMessages.NOT_FOUND:
                case constants_1.GlobalResponseMessages.NOT_AUTHORIZED:
                    throw error;
                default:
                    throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
            }
        }
    }
    /**
     * Get the balance from specific user by his UID
     * @param {string} uid Boom user id.
     * @returns {Promise<Response>} Promise BoomAccount
     * @memberof BoomAccountController
     */
    async findByUserId(uid) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const profile = await this.profileService.getProfile(currentUser.uid);
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (!profileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            if (profileData.roles.includes(globals_1.RoleKey.Member) ||
                profileData.roles.includes(globals_1.RoleKey.Merchant)) {
                if (!profileData.boomAccounts)
                    throw new rest_1.HttpErrors.NotFound(constants_1.BoomAccountResponseMessages.NOT_FOUND);
                if (profileData.uid !== uid)
                    throw new rest_1.HttpErrors.Unauthorized(constants_1.BoomAccountResponseMessages.UNAUTHORIZED);
            }
            const dbAccount = await this.boomAccountService.verifyExistingAccounts(uid);
            if (!dbAccount.success || !dbAccount.data)
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomAccountResponseMessages.NOT_FOUND);
            /*
              Disabled the pending balance calculation. I don't think this is needed based on my understanding of this requirement.
              
              For customers:
              
              A pending balance on a transfer doesn't occur
              on purchases as the amount should be removed from account immediately.
      
              When funding an account, the balance is also added to the account immediately.
      
              When sending out a transfer to a friend, the balance should (according to recent requirements) remove the amount from the sender immediately.
      
              When receiving a transfer, the transfer IS in a pending state but not yet assigned to the receiver. So querying a balance would not include this amount.
      
              For merchants:
      
              A merchant transaction could have pending transfers but that is a separate database collection (merchant-transactions) which isn't being checked for here
      
              const pendingBalance: Money | undefined = handleServiceResponseResult<Money>(
                await this.boomAccountService.pendingBalance(currentUser.uid)
              );
      
              if (!pendingBalance)
                return this.response.status(ServiceResponseCodes.SUCCESS).send({
                  success: true,
                  message: APIResponseMessages.SUCCESS,
                  data: dbAccount.data.balance,
                });
      
              const realBalance: Money = toMoney(
                Dinero(dbAccount.data.balance).subtract(Dinero(pendingBalance)).toUnit()
              );
            */
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: dbAccount.data.balance,
            });
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
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-account/{id}', specifications_1.GETBoomAccountByIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomAccountController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-account/balance/{uid}', specifications_1.GETBalanceByUIDSpecification),
    tslib_1.__param(0, rest_1.param.path.string('uid')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomAccountController.prototype, "findByUserId", null);
BoomAccountController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomAccountRepository)),
    tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(2, loopback4_spring_1.service(services_1.ProfileService)),
    tslib_1.__param(3, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.BoomAccountService)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomAccountRepository, Object, services_1.ProfileService, Function, services_1.BoomAccountService])
], BoomAccountController);
exports.BoomAccountController = BoomAccountController;
//# sourceMappingURL=boom-account.controller.js.map