"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const testlab_1 = require("@loopback/testlab");
const controllers_1 = require("../../../controllers");
const purchase_error_1 = tslib_1.__importDefault(require("../../../errors/purchase-error"));
const repositories_1 = require("../../../repositories");
const email_service_1 = require("../../../services/email.service");
const purchase_service_1 = require("../../../services/purchase.service");
const database_helpers_1 = require("../../helpers/database.helpers");
/**
 * These tests can be worked on after BW-950 changes the checkout process
 */
xdescribe('CheckoutController (unit)', () => {
    let response;
    let response500;
    let responseSend;
    let responseSend500;
    let send;
    let send500;
    let purchaseService;
    let emailService;
    let productRepository;
    let offerRepository;
    let customer;
    beforeEach(database_helpers_1.givenEmptyDatabase);
    beforeEach(givenResponse);
    beforeEach(given500Response);
    beforeEach(givenPurchaseService);
    beforeEach(givenEmailer);
    beforeEach(givenProductRepository);
    beforeEach(givenOfferRepository);
    beforeEach(givenCustomerInstance);
    afterEach(restoreStubs);
    describe('Error handling', () => {
        it('returns 200 response, returning purchase service result error', async () => {
            var _a, _b;
            const bookings = await database_helpers_1.givenBookings();
            const controller = new controllers_1.CheckoutController(offerRepository, productRepository, response, purchaseService, emailService);
            offerRepository.stubs.exists.resolves(true);
            purchaseService.stubs.purchase.resolves({
                success: false,
                message: 'There was a problem.',
                customer,
                customerEmail: (_a = customer.contact.emails) === null || _a === void 0 ? void 0 : _a[0],
            });
            await controller.create(bookings);
            testlab_1.expect(send.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: 'There was a problem.',
                customer,
                customerEmail: (_b = customer.contact.emails) === null || _b === void 0 ? void 0 : _b[0],
            });
        });
        it('returns 500 response, when purchase service throws a PurchaseError during preparation', async () => {
            const bookings = await database_helpers_1.givenBookings();
            const controller = new controllers_1.CheckoutController(offerRepository, productRepository, response500, purchaseService, emailService);
            const failedBookings = [
                { booking: bookings[0], reason: 'Some reason' },
            ];
            const purchaseError = new purchase_error_1.default('Some error', 'Preparation Error', {
                checkedOut: [],
                failed: failedBookings,
                expired: [],
            });
            offerRepository.stubs.exists.resolves(true);
            purchaseService.stubs.purchase.throws(purchaseError);
            emailService.stubs.sendAppError.resolves();
            await controller.create(bookings);
            testlab_1.expect(send500.getCall(0).args[0]).to.deepEqual({
                success: false,
                message: 'Preparation Error',
            });
        });
    });
    function givenCustomerInstance() {
        customer = database_helpers_1.givenCustomer();
    }
    function givenResponse() {
        send = testlab_1.sinon.stub();
        responseSend = {
            send,
        };
        response = {
            status: testlab_1.sinon.stub().returns(responseSend),
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
    function givenPurchaseService() {
        purchaseService = testlab_1.createStubInstance(purchase_service_1.PurchaseService);
    }
    function givenEmailer() {
        emailService = testlab_1.createStubInstance(email_service_1.EmailService);
    }
    function restoreStubs() { }
    function givenProductRepository() {
        productRepository = testlab_1.createStubInstance(repositories_1.ProductRepository);
    }
    function givenOfferRepository() {
        offerRepository = testlab_1.createStubInstance(repositories_1.OfferRepository);
    }
});
//# sourceMappingURL=checkout.controller.unit.js.map