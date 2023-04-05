"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@boom-platform/globals");
const testlab_1 = require("@loopback/testlab");
const constants_1 = require("../../../constants");
const users_controller_1 = require("../../../controllers/users.controller");
const profile_service_1 = require("../../../services/profile.service");
const database_helpers_1 = require("../../helpers/database.helpers");
describe('Users Controller', () => {
    let profileService;
    let response;
    let response500;
    let responseSend;
    let responseSend500;
    let send;
    let sendStatus;
    let send500;
    let currentUserAdmin;
    beforeEach(givenProfileService);
    beforeEach(givenResponse);
    beforeEach(given500Response);
    beforeEach(givenCurrentUserAdmin);
    describe('Get Multiple Profiles', () => {
        it('getProfile by roles', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
            const customer = database_helpers_1.givenCustomer();
            profileService.stubs.getFilteredProfiles.resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: [customer],
            });
            const filter = {
                where: {
                    roles: [globals_1.RoleKey.Member],
                },
            };
            await controller.findAll(filter);
            //sinon.assert.calledOnceWithExactly(profileService.stubs.getFilteredProfiles, filter);
            testlab_1.expect(send.args[0][0]).deepEqual({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: [customer],
            });
        });
        describe('getProfile by id', () => {
            it('returns user profile by id as success', async () => {
                const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
                const customer = database_helpers_1.givenCustomer();
                profileService.stubs.getFilteredProfiles.resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: [customer],
                });
                const filter = {
                    where: {
                        uid: customer.uid,
                    },
                };
                await controller.findAll(filter);
                testlab_1.expect(send.args[0][0]).deepEqual({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: [customer],
                });
            });
            it('returns error when id not found', async () => {
                const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
                profileService.stubs.getFilteredProfiles.resolves({
                    success: false,
                    statusCode: constants_1.ServiceResponseCodes.RECORD_NOT_FOUND,
                    message: constants_1.ProfileResponseMessages.NO_PROFILE_FOUND,
                });
                const filter = {
                    where: {
                        uid: 'No id',
                    },
                };
                await testlab_1.expect(controller.findAll(filter)).to.be.rejectedWith(constants_1.ProfileResponseMessages.NO_PROFILE_FOUND);
            });
        });
        it('return false if more than one condition', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
            const customer = database_helpers_1.givenCustomer();
            profileService.stubs.getFilteredProfiles.resolves({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.BAD_REQUEST,
                message: constants_1.FilterResponseMessages.MORE_THAN_ONE_CONDITION,
            });
            const filter = {
                where: {
                    uid: customer.uid,
                    hasCards: false,
                },
            };
            await testlab_1.expect(controller.findAll(filter)).to.be.rejectedWith(constants_1.FilterResponseMessages.MORE_THAN_ONE_CONDITION);
        });
        describe('getProfile by DATE', () => {
            it('return profiles by createdAt date', async () => {
                const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
                const customer = database_helpers_1.givenCustomer();
                profileService.stubs.getFilteredProfiles.resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: [customer],
                });
                const filter = {
                    where: {
                        createdAt: '1600198939',
                    },
                };
                await controller.findAll(filter);
                testlab_1.expect(send.args[0][0]).deepEqual({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: [customer],
                });
            });
            it('return profiles by range between two createdAt date', async () => {
                const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
                const customer = database_helpers_1.givenCustomer();
                profileService.stubs.getFilteredProfiles.resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: [customer],
                });
                const filter = {
                    where: {
                        createdAt: '1600198000,1600198999',
                    },
                };
                await controller.findAll(filter);
                testlab_1.expect(send.args[0][0]).deepEqual({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: [customer],
                });
            });
        });
        describe('getProfiles by hasCards', () => {
            it('return profiles with cards', async () => {
                const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
                const customer = database_helpers_1.givenCustomer();
                profileService.stubs.getFilteredProfiles.resolves({
                    success: true,
                    statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                    data: [customer],
                });
                const filter = {
                    where: {
                        hasCards: true,
                    },
                };
                await controller.findAll(filter);
                testlab_1.expect(send.args[0][0]).deepEqual({
                    success: true,
                    message: constants_1.APIResponseMessages.SUCCESS,
                    data: [customer],
                });
            });
        });
    });
    describe('Get One Profile by id', () => {
        it('Successfully get profile', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
            const customer = database_helpers_1.givenCustomer();
            profileService.stubs.getProfile
                .withArgs(customer.uid, {
                requiredFields: ['contact'],
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            profileService.stubs.getProfile.resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            await controller.getUserById(customer.uid);
            testlab_1.expect(send.args[0][0]).deepEqual({
                success: true,
                message: constants_1.APIResponseMessages.SUCCESS,
                data: customer,
            });
        });
    });
    describe('Verify phone number', () => {
        it('Return valid data for phone number', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
            const customer = database_helpers_1.givenCustomer({
                contact: {
                    phoneNumber: '+1 555 555 5555',
                    emails: ['john@email.com'],
                },
            });
            profileService.stubs.getProfile
                .withArgs('+15555555555', {
                requiredFields: ['firstName', 'lastName'],
                method: profile_service_1.getProfileOptions.BY_PHONE,
            })
                .resolves({
                success: true,
                statusCode: constants_1.ServiceResponseCodes.SUCCESS,
                data: customer,
            });
            await controller.verifyPhoneNumber({
                firstName: customer.firstName,
                lastName: customer.lastName,
                phone: '+15555555555',
            });
            testlab_1.expect(send.args[0][0]).deepEqual({
                success: true,
                message: constants_1.APIResponseMessages.VERIFIED,
                data: { foundAccount: true },
            });
        });
    });
    describe('create User', () => {
        it('returns NOT_AUTHORIZED response, when trying to create existing user as admin', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response
            //<Response>response500
            );
            profileService.stubs.createUser.resolves({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: 'The email address is already in use by another account.',
            });
            const data = {
                email: 'BW-830-test1@test.com',
                password: '123456',
                roles: [globals_1.RoleKey.Admin],
            };
            await testlab_1.expect(controller.createUser(data)).to.be.rejectedWith(constants_1.GlobalResponseMessages.NOT_AUTHORIZED);
            /*expect(send500.getCall(0).args[0]).to.deepEqual({
              success: false,
              error: new HttpErrors.Forbidden(GlobalResponseMessages.NOT_AUTHORIZED),
            });*/
        });
        it('Fails when trying to create existing user', async () => {
            const controller = new users_controller_1.UsersController(profileService, currentUserAdmin, response);
            profileService.stubs.createUser.resolves({
                success: false,
                statusCode: constants_1.ServiceResponseCodes.INTERNAL_SERVER_ERROR,
                message: 'The email address is already in use by another account.',
            });
            const data = {
                email: 'BW-830-test1@test.com',
                password: '123456',
                roles: [globals_1.RoleKey.Member],
            };
            await testlab_1.expect(controller.createUser(data)).to.be.rejectedWith('The email address is already in use by another account.');
        });
    });
    function givenCurrentUserAdmin() {
        currentUserAdmin = testlab_1.sinon.stub().returns({ uid: '1111', roles: [globals_1.RoleKey.Admin] });
    }
    function givenResponse() {
        send = testlab_1.sinon.stub();
        sendStatus = testlab_1.sinon.stub();
        responseSend = {
            send,
        };
        response = {
            status: testlab_1.sinon.stub().returns(responseSend),
            sendStatus: sendStatus,
        };
    }
    function given500Response() {
        send500 = testlab_1.sinon.stub();
        responseSend500 = {
            send: send500,
        };
        response500 = {
            status: testlab_1.sinon.stub().withArgs(500).returns(responseSend500),
        };
    }
    function givenProfileService() {
        profileService = testlab_1.createStubInstance(profile_service_1.ProfileService);
    }
});
//# sourceMappingURL=users.controller.unit.js.map