"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoomCardController = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const log4js_1 = require("log4js");
const loopback4_spring_1 = require("loopback4-spring");
const authorization_1 = require("../authorization");
const constants_1 = require("../constants");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const profile_service_1 = require("../services/profile.service");
const boom_card_specifications_1 = require("../specifications/boom-card-specifications");
const utils_1 = require("../utils");
const boomcard_1 = require("../utils/boomcard");
const math_1 = require("../utils/math");
let BoomCardController = class BoomCardController {
    constructor(boomCardRepository, storeRepository, response, profileService, boomAccountService, boomCardService, currentUserGetter) {
        this.boomCardRepository = boomCardRepository;
        this.storeRepository = storeRepository;
        this.response = response;
        this.profileService = profileService;
        this.boomAccountService = boomAccountService;
        this.boomCardService = boomCardService;
        this.currentUserGetter = currentUserGetter;
        this.logger = log4js_1.getLogger(constants_1.LoggingCategory.BOOM_CARD_CONTROLLER);
    }
    /**
     * Creates new Boom card records
     * @param {BoomCard[]} boomCards
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    async create(boomCards) {
        try {
            const data = utils_1.handleServiceResponseResult(await this.boomCardService.createBoomCards(boomCards));
            if (!data)
                throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR); // TODO: this line should be removed on handleServiceResponseResult update to work properly with TS.
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: data,
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
     * Gets the count of all stored Boom cards
     * @param {Where<BoomCard>} [where]
     * @returns {Promise<Count>}
     * @memberof BoomCardController
     */
    async count(where) {
        try {
            const data = utils_1.handleServiceResponseResult(await this.boomCardService.countBoomCards(where));
            if (!data)
                throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR); // TODO: this line should be removed on handleServiceResponseResult update to work properly with TS.
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: data,
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
     * Get all Boom cards or by filter
     * @param {Filter<BoomCard>} [filter]
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    async find(filter) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const boomCards = utils_1.handleServiceResponseResult(await this.boomCardService.findBoomCards(filter));
            if (!boomCards)
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomCardResponseMessages.NOT_FOUND); // TODO: this line should be removed on handleServiceResponseResult update to work properly with TS.
            if (currentUser.roles.includes(globals_1.RoleKey.Member)) {
                const profile = await this.profileService.getProfile(currentUser.uid);
                const profileData = utils_1.handleServiceResponseResult(profile);
                if (!profileData)
                    throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
                const belongs = boomcard_1.allBoomcardsBelongToUser(profileData, boomCards.map((card) => card._id));
                if (!belongs)
                    throw new rest_1.HttpErrors.Forbidden(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: boomCards,
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
     * Finds a boom card by its database ID
     * @param {string} id
     * @returns {Promise<BoomCard>}
     * @memberof BoomCardController
     */
    async findById(id) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const boomCard = utils_1.handleServiceResponseResult(await this.boomCardService.findBoomCardById(id));
            if (!boomCard)
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomCardResponseMessages.NOT_FOUND); // TODO: this line should be removed on handleServiceResponseResult update to work properly with TS.
            if (currentUser.roles.includes(globals_1.RoleKey.Member)) {
                const profile = await this.profileService.getProfile(currentUser.uid);
                const profileData = utils_1.handleServiceResponseResult(profile);
                if (!profileData)
                    throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
                const belongs = boomcard_1.boomcardBelongsToUser(profileData, id);
                if (!belongs)
                    throw new rest_1.HttpErrors.Forbidden(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            }
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: boomCard,
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
     * Finds card by the card number
     * @param {string} cardNumber The card number printed on the front of the card
     * @returns {Promise<BoomCard[]>}
     * @memberof BoomCardController
     */
    async findByCardNumber(cardNumber) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder.where({ cardNumber }).build();
            if (currentUser.roles.includes(globals_1.RoleKey.Merchant)) {
                filterBuilder.impose({ where: { storeMerchantID: currentUser.uid } });
            }
            const boomCards = utils_1.handleServiceResponseResult(await this.boomCardService.findBoomCards(filter));
            if (!boomCards)
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomCardResponseMessages.NOT_FOUND); // TODO: this line should be removed on handleServiceResponseResult update to work properly with TS.
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: boomCards,
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
     * Assigns a boom card to a particular Boom user
     * @param {string} id The card number printed on the front of the card OR the MongoDB ID of the card record
     * @param {{ pinNumber: number; uid: string }} data The pin number and customer uid
     * @returns {Promise<BoomCard>}
     * @memberof BoomCardController
     */
    async activate(id, data) {
        var _a, _b, _c, _d, _e, _f;
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder
                .where({ or: [{ _id: id }, { cardNumber: id }] })
                .build();
            const boomCard = await this.boomCardRepository.findOne(filter);
            if (!data.uid) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.BoomCardResponseMessages.UID_REQUIRED);
            }
            if (!data.boomAccountID) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.BoomCardResponseMessages.BOOM_ACCOUNT_REQUIRED);
            }
            if (!boomCard) {
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomCardResponseMessages.NOT_FOUND);
            }
            if (boomCard.status === globals_1.BoomCardStatus.ACTIVE) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.BoomCardResponseMessages.BOOM_CARD_ALREADY_ACTIVE);
            }
            if (boomCard.status === globals_1.BoomCardStatus.BLOCKED) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.BoomCardResponseMessages.BLOCKED);
            }
            let customer = await this.profileService.getProfile(data.uid, {
                messageNoProfileFound: constants_1.ProfileResponseMessages.CUSTOMER_NOT_FOUND,
            });
            let customerData = utils_1.handleServiceResponseResult(customer);
            if (!customerData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            if (!((_a = customerData.roles) === null || _a === void 0 ? void 0 : _a.includes(globals_1.RoleKey.Member))) {
                throw new rest_1.HttpErrors.Unauthorized(constants_1.APIResponseMessages.UNAUTHORIZED);
            }
            let newBoomAccount = undefined;
            if (!customerData.boomAccounts) {
                const response = await this.boomAccountService.create(customerData.uid);
                if (!(response === null || response === void 0 ? void 0 : response.success) || !response) {
                    throw new rest_1.HttpErrors.BadRequest(constants_1.BoomAccountResponseMessages.CREATE_ERROR);
                }
                newBoomAccount = response.data;
                customer = await this.profileService.getProfile(data.uid, {
                    messageNoProfileFound: constants_1.ProfileResponseMessages.CUSTOMER_NOT_FOUND,
                });
                customerData = utils_1.handleServiceResponseResult(customer);
                if (!customerData)
                    throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            }
            if (!((_b = customerData.boomAccounts) === null || _b === void 0 ? void 0 : _b.includes(data.boomAccountID))) {
                throw new rest_1.HttpErrors.BadRequest(constants_1.BoomAccountResponseMessages.UNAUTHORIZED);
            }
            await this.profileService.updateProfileById(data.uid, {
                cards: [boomCard._id, ...((_c = customerData.cards) !== null && _c !== void 0 ? _c : [])],
                hasCards: true,
            });
            const pinNumber = data.pinNumber || boomCard.pinNumber || math_1.generateRandomNumber(1000, 9999);
            const isMerchant = currentUser.roles.includes(globals_1.RoleKey.Merchant);
            let fullCurrentUser;
            if (isMerchant) {
                fullCurrentUser = await this.profileService.getProfile(currentUser.uid);
            }
            if (isMerchant && (!(fullCurrentUser === null || fullCurrentUser === void 0 ? void 0 : fullCurrentUser.success) || !(fullCurrentUser === null || fullCurrentUser === void 0 ? void 0 : fullCurrentUser.data))) {
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MERCHANT_NOT_FOUND);
            }
            if (!((_e = (_d = fullCurrentUser === null || fullCurrentUser === void 0 ? void 0 : fullCurrentUser.data) === null || _d === void 0 ? void 0 : _d.store) === null || _e === void 0 ? void 0 : _e._id)) {
                throw new rest_1.HttpErrors.NotFound(constants_1.StoreResponseMessages.NOT_FOUND);
            }
            const storeID = isMerchant
                ? fullCurrentUser.data.store._id
                : data.storeId;
            if (!storeID) {
                throw new rest_1.HttpErrors.NotFound(constants_1.StoreResponseMessages.NOT_FOUND);
            }
            const storeFilterBuilder = new repository_1.FilterBuilder();
            const storeFilter = storeFilterBuilder.where({ _id: storeID }).build();
            const store = await this.storeRepository.findOne(storeFilter);
            if (!store) {
                throw new rest_1.HttpErrors.NotFound(constants_1.StoreResponseMessages.NOT_FOUND);
            }
            if (!newBoomAccount || !newBoomAccount._id) {
                throw new rest_1.HttpErrors.NotFound(constants_1.BoomAccountResponseMessages.NOT_FOUND);
            }
            const updateBoomCard = {
                status: globals_1.BoomCardStatus.ACTIVE,
                pinNumber,
                boomAccountID: newBoomAccount._id,
                customerID: data.uid,
                storeID: storeID,
                storeMerchantID: store ? (_f = store.merchant) === null || _f === void 0 ? void 0 : _f.uid : '',
            };
            await this.boomCardRepository.updateById(boomCard._id, updateBoomCard);
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: Object.assign(Object.assign({}, boomCard), updateBoomCard),
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
     * Updates a Boom card
     * @param {string} id
     * @param {BoomCard} boomCard
     * @returns {Promise<void>}
     * @memberof BoomCardController
     */
    async updateById(id, boomCard) {
        try {
            const currentUser = await this.currentUserGetter();
            if (!currentUser)
                throw new rest_1.HttpErrors.NotFound(constants_1.ProfileResponseMessages.MEMBER_NOT_FOUND);
            const profile = await this.profileService.getProfile(currentUser.uid);
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (!profileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            const isCustomer = currentUser.roles.includes(globals_1.RoleKey.Member);
            if (!isCustomer) {
                await this.boomCardRepository.updateById(id, boomCard);
            }
            const belongs = boomcard_1.boomcardBelongsToUser(profileData, id);
            if (!belongs)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            // Customer can't modify these
            if (boomCard.boomAccountID ||
                boomCard.status === globals_1.BoomCardStatus.ACTIVE ||
                boomCard.status === globals_1.BoomCardStatus.INACTIVE ||
                boomCard.status === globals_1.BoomCardStatus.INACTIVE_ISSUED)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.BoomCardResponseMessages.UNAUTHORIZED_BOOMCARD_UPDATE);
            if (boomCard.status === globals_1.BoomCardStatus.BLOCKED && !boomCard.pinNumber)
                throw new rest_1.HttpErrors.BadRequest(constants_1.BoomCardResponseMessages.PIN_REQUIRED);
            if (boomCard.status === globals_1.BoomCardStatus.BLOCKED && boomCard.pinNumber) {
                const targetBoomcard = await this.boomCardRepository.findById(id);
                if (targetBoomcard.status !== globals_1.BoomCardStatus.ACTIVE)
                    throw new rest_1.HttpErrors.BadRequest(constants_1.BoomCardResponseMessages.UNACTIVE_TO_BLOCK);
                if (targetBoomcard.pinNumber !== boomCard.pinNumber)
                    throw new rest_1.HttpErrors.BadRequest(constants_1.BoomCardResponseMessages.PIN_INCORRECT);
            }
            await this.boomCardRepository.updateById(id, boomCard);
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /** // TODO: review this endpoint about Boom Business Logic, i don't see any reason to delete a boomcard instance, also the record is not removed from Firestore user profile.
     * Deletes a Boom card
     * @param {string} id
     * @returns {Promise<void>}
     * @memberof BoomCardController
     */
    async deleteById(id) {
        try {
            await this.boomCardRepository.deleteById(id);
            return this.response.sendStatus(constants_1.ServiceResponseCodes.NO_CONTENT);
        }
        catch (error) {
            this.logger.error(error);
            if (rest_1.HttpErrors.isHttpError(error))
                throw error;
            throw new rest_1.HttpErrors.InternalServerError(constants_1.APIResponseMessages.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Login endpoint for Boom cards. Will return a firebase token that can be used to authenticate with the API
     * @param {{ cardNumber: string; pinNumber: string }} data The Boom card number and pin
     * @returns {(Promise<string | Response>)}
     * @memberof BoomCardController
     */
    async login(data) {
        try {
            let token = '';
            const filterBuilder = new repository_1.FilterBuilder();
            const filter = filterBuilder
                .where({ and: [{ cardNumber: data.cardNumber }, { pinNumber: data.pinNumber }] })
                .build();
            const boomCards = await this.boomCardRepository.find(filter);
            if (!boomCards.length) {
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND);
            }
            const boomCard = boomCards[0];
            if (boomCard.status === globals_1.BoomCardStatus.BLOCKED)
                throw new rest_1.HttpErrors.Unauthorized(constants_1.BoomCardResponseMessages.BLOCKED);
            const profile = await this.profileService.getProfile(boomCard._id, {
                method: profile_service_1.getProfileOptions.BY_CARD,
            });
            const profileData = utils_1.handleServiceResponseResult(profile);
            if (!profileData)
                throw new rest_1.HttpErrors.NotFound(constants_1.APIResponseMessages.RECORD_NOT_FOUND); // This line is only to keep TS ok, handleServiceResponseResult will automatically do this for us
            token = await this.profileService.generateCustomToken(profileData.uid, { roles: ['member'] }); // Should we send the role of the user ??
            return this.response.status(constants_1.ServiceResponseCodes.SUCCESS).send({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: token,
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
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/boom-cards', boom_card_specifications_1.POSTBoomCardsSpecification),
    tslib_1.__param(0, rest_1.requestBody.array(rest_1.getModelSchemaRef(models_1.BoomCard, {
        // TODO: Review if this Model schema need to be replaced by a custom schema
        exclude: [
            '_id',
            'createdAt',
            'updatedAt',
            'pinNumber',
            'status',
            'boomAccountID',
            'qrcode',
            'storeID',
            'storeMerchantID',
            'customerID',
        ],
    }), {
        description: 'an array of boom cards',
        required: true,
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "create", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-cards/count', boom_card_specifications_1.GETBoomCardsCountSpecification),
    tslib_1.__param(0, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.BoomCard))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "count", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-cards', boom_card_specifications_1.GETBoomCardsSpecification),
    tslib_1.__param(0, rest_1.param.query.object('filter', rest_1.getFilterSchemaFor(models_1.BoomCard))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "find", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-cards/{id}', boom_card_specifications_1.GETBoomCardsByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "findById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.get('/boom-cards/merchant/{cardNumber}', boom_card_specifications_1.GETBoomCardsMerchantByCardNumberSpecification),
    tslib_1.__param(0, rest_1.param.path.string('cardNumber')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "findByCardNumber", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Merchant, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.post('/boom-cards/merchant/activate/{id}', boom_card_specifications_1.POSTBoomCardsMerchantActivateByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(boom_card_specifications_1.POSTBoomCardsMerchantActivateByIdRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "activate", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Member, globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.patch('/boom-cards/{id}', boom_card_specifications_1.PATCHBoomCardsByIdSpecification),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody(boom_card_specifications_1.PATCHBoomCardsByIdRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.BoomCard]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "updateById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.Admin, globals_1.RoleKey.SuperAdmin]),
    rest_1.del('/boom-cards/{id}', boom_card_specifications_1.DELBoomCardsByIdSpecifications),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "deleteById", null);
tslib_1.__decorate([
    authorization_1.authorize([globals_1.RoleKey.All]),
    rest_1.post('/boom-cards/login', boom_card_specifications_1.POSTBoomCardsLoginSpecification),
    tslib_1.__param(0, rest_1.requestBody(boom_card_specifications_1.POSTBoomCardsLoginRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], BoomCardController.prototype, "login", null);
BoomCardController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.BoomCardRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.StoreRepository)),
    tslib_1.__param(2, core_1.inject(rest_1.RestBindings.Http.RESPONSE)),
    tslib_1.__param(3, loopback4_spring_1.service(profile_service_1.ProfileService)),
    tslib_1.__param(4, loopback4_spring_1.service(services_1.BoomAccountService)),
    tslib_1.__param(5, loopback4_spring_1.service(services_1.BoomCardService)),
    tslib_1.__param(6, core_1.inject.getter(authorization_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.BoomCardRepository,
        repositories_1.StoreRepository, Object, profile_service_1.ProfileService,
        services_1.BoomAccountService,
        services_1.BoomCardService, Function])
], BoomCardController);
exports.BoomCardController = BoomCardController;
//# sourceMappingURL=boom-card.controller.js.map