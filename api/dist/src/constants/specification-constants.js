"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccessDescription = exports.RequestBodyDescriptions = exports.SpecificationDescriptions = exports.SpecificationSummaries = exports.ExampleField = exports.CommonSummary = void 0;
// These must match api\src\constants\service-response-codes.ts
var CommonSummary;
(function (CommonSummary) {
    CommonSummary["SUCCESS"] = "On Success";
    CommonSummary["BAD_REQUEST"] = "Bad request";
    CommonSummary["UNAUTHORIZED"] = "Unauthorized to perform this action.";
    CommonSummary["FORBIDDEN"] = "Not allowed Access";
    CommonSummary["RECORD_NOT_FOUND"] = "Record not found";
    CommonSummary["NOT_ACCEPTABLE"] = "Not Acceptable";
    CommonSummary["UNPROCESSABLE"] = "Unprocessable Entity Error";
    CommonSummary["RECORD_CONFLICT"] = "Record conflict";
    CommonSummary["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    // ServiceResponseCodes.NOT_IMPLEMENTED
    // ServiceResponseCodes.SERVICE_UNAVAILABLE
})(CommonSummary = exports.CommonSummary || (exports.CommonSummary = {}));
// These must match CommonSummary
var ExampleField;
(function (ExampleField) {
    ExampleField["SUCCESS"] = "success";
    ExampleField["BAD_REQUEST"] = "badRequest";
    ExampleField["UNAUTHORIZED"] = "unauthorized";
    ExampleField["FORBIDDEN"] = "forbidden";
    ExampleField["RECORD_NOT_FOUND"] = "notFound";
    ExampleField["NOT_ACCEPTABLE"] = "notAcceptable";
    ExampleField["UNPROCESSABLE"] = "unprocessable";
    ExampleField["RECORD_CONFLICT"] = "conflict";
    ExampleField["INTERNAL_SERVER_ERROR"] = "internalServerError";
})(ExampleField = exports.ExampleField || (exports.ExampleField = {}));
var SpecificationSummaries;
(function (SpecificationSummaries) {
    // BoomCards Specifications
    SpecificationSummaries["POSTBoomCardsSpecification"] = "Create Boom Card(s) instance(s).";
    SpecificationSummaries["GETBoomCardsCountSpecification"] = "Boom Card(s) count by where condition.";
    SpecificationSummaries["GETBoomCardsByIdSpecification"] = "Return Boom Card instance by mongodb ID";
    SpecificationSummaries["GETBoomCardsSpecification"] = "Get Boom Card instances (filter optional).";
    SpecificationSummaries["GETBoomCardsMerchantByCardNumberSpecification"] = "Get Boom Card instances by CardNumber (for Merchants).";
    SpecificationSummaries["POSTBoomCardsMerchantActivateByIdSpecification"] = "Activate Boom Card(s) by ID (for Merchants).";
    SpecificationSummaries["PATCHBoomCardsByIdSpecification"] = "Update a Boom Card instance";
    SpecificationSummaries["DELBoomCardsByIdSpecifications"] = "Delete a Boom Card from database by ID";
    SpecificationSummaries["POSTBoomCardsLoginSpecification"] = "Boom Card Login";
    // User Specifications
    SpecificationSummaries["GETAdminUsersSpecification"] = "List all Users that match the FILTER field received.";
    SpecificationSummaries["GETAdminUserSpecification"] = "Return BoomUser profile for received ID.";
    SpecificationSummaries["POSTUsersVerifyPhoneNumberSpecification"] = "Verifies the information for a phone number (for sending funds)";
    SpecificationSummaries["GETTransferReceiverProfileSpecification"] = "Get receiver user profile data.";
    SpecificationSummaries["POSTAdminUserSpecification"] = "Create a new BoomUser instance";
    // Category Specifications
    SpecificationSummaries["POSTCategoriesSpecification"] = "Create a new Category instance.";
    SpecificationSummaries["GETCategoryCountSpecification"] = "Count Categories that match the WHERE field received";
    SpecificationSummaries["GETCategoriesSpecification"] = "List all Categories that match the FILTER field received.";
    SpecificationSummaries["GETCategoriesIdSpecification"] = "Return Category for the received ID.";
    SpecificationSummaries["PATCHCategoriesSpecification"] = "Update Categories that match the WHERE field received.";
    SpecificationSummaries["PATCHCategoriesIdSpecification"] = "Update Category for the received ID.";
    SpecificationSummaries["PUTCategoriesIdSpecifications"] = "Update Category for the received ID.";
    SpecificationSummaries["DELCategoriesIdSpecifications"] = "Delete Category for the received ID.";
    // Order Specifications
    SpecificationSummaries["GETOrdersCountSpecification"] = "Count Orders";
    SpecificationSummaries["GETInventoryOrdersCountSpecification"] = "Count Inventory Orders";
    SpecificationSummaries["GETOrdersSpecification"] = "Get Orders";
    SpecificationSummaries["GETOrdersByIdSpecification"] = "Get Order by id";
    SpecificationSummaries["PATCHOrdersByIdSpecification"] = "Update Order by id";
    // Return Specifications
    SpecificationSummaries["POSTReturnPolicySpecification"] = "Create a new ReturnPolicy instance";
    SpecificationSummaries["GETPolicySpecification"] = "List all Return Policies that match the FILTER field received";
    SpecificationSummaries["DELPolicyByIDSpecification"] = "Delete Return Policy for the received ID";
    SpecificationSummaries["POSTReturnRequestSpecifications"] = "Create a new ReturnRequest instance";
    SpecificationSummaries["GETReturnRequestSpecification"] = "List all Return Requests that match the FILTER field received";
    SpecificationSummaries["PATCHReturnRequestSpecification"] = "Update ReturnRequest for the received ID";
    SpecificationSummaries["POSTDisputeSpecifications"] = "Create a new ReturnDispute instance";
    SpecificationSummaries["GETDisputeSpecification"] = "Get Return Dispute for the received ID";
    SpecificationSummaries["PATCHDisputeSpecification"] = "Update ReturnDispute for the received ID";
    // Config Specifications
    SpecificationSummaries["POSTConfigSpecification"] = "Create a new Config instance.";
    SpecificationSummaries["GETConfigSpecification"] = "List all Configs that match the FILTER field received.";
    SpecificationSummaries["PATCHConfigSpecification"] = "Update Config for the received ID.";
    SpecificationSummaries["DELConfigIdSpecifications"] = "Delete Category for the received ID.";
    SpecificationSummaries["GETInventoryOrdersSpecification"] = "GETInventoryOrdersSpecification";
    // Merchant Withdrawal
    SpecificationSummaries["GETMerchantWithdrawalCountSpecification"] = "Count Merchant Withdrawal Transactions";
    SpecificationSummaries["GETMerchantWithdrawalSpecification"] = "Merchant Withdrawal Transactions.";
    SpecificationSummaries["GETMerchantWithdrawalByIdSpecification"] = "Get a Merchant Withdrawal Transaction by id";
    SpecificationSummaries["PATCHMerchantWithdrawalByIdSpecification"] = "Update a single Merchant Withdrawal Transaction by ID.";
})(SpecificationSummaries = exports.SpecificationSummaries || (exports.SpecificationSummaries = {}));
var SpecificationDescriptions;
(function (SpecificationDescriptions) {
    // BoomCards Specifications
    SpecificationDescriptions["POSTBoomCardsSpecification"] = "This endpoint should be used, to __POST__ one or more Boom cards instances in database.";
    SpecificationDescriptions["GETBoomCardsCountSpecification"] = "This endpoint should be used for __COUNT__ Boom cards instances in database.";
    SpecificationDescriptions["GETBoomCardsByIdSpecification"] = "This endpoint should be used, to __GET__ a __BoomCard instance__ by his mongodb ID.";
    SpecificationDescriptions["GETBoomCardsSpecification"] = "This endpoint should be used for __GET__ Boom cards instances in database.";
    SpecificationDescriptions["GETBoomCardsMerchantByCardNumberSpecification"] = "This endpoint should be used for __GET__ Boom cards instances in database.";
    SpecificationDescriptions["POSTBoomCardsMerchantActivateByIdSpecification"] = "Activates Boom Card  by its database ID. The card ID must have already been added to the user profile in order to authenticate.";
    SpecificationDescriptions["PATCHBoomCardsByIdSpecification"] = "This endpoint should be used, to __UPDATE__ a Boom Card instance__ matching the ID field in database.";
    SpecificationDescriptions["DELBoomCardsByIdSpecifications"] = "This endpoint should be used, to __DELETE__ a __Boom Card instance__ by ID from database.";
    SpecificationDescriptions["POSTBoomCardsLoginSpecification"] = "This endpoint should be used, to __LOGIN__ using __Boom Card instance__.";
    // User Specifications
    SpecificationDescriptions["GETAdminUsersSpecification"] = "This endpoint should be used, to __GET__ a __List of User instances__ matching the filter received in the database.";
    SpecificationDescriptions["GETAdminUserSpecification"] = "This endpoint should be used, to __GET__ a __BoomUser instance__ matching the ID field received in the database.";
    SpecificationDescriptions["POSTUsersVerifyPhoneNumberSpecification"] = "This endpoint should be used, to __POST__ values to search for a Valid phone number on our records.";
    SpecificationDescriptions["GETTransferReceiverProfileSpecification"] = "This endpoint should be used, to __GET__ \"name\" and \"profileImg\" from receiver user in database.";
    SpecificationDescriptions["POSTAdminUserSpecification"] = "This endpoint should be used, to __POST__ a __new BoomUser instance__ into the database.";
    // Category Specifications
    SpecificationDescriptions["POSTCategoriesSpecification"] = "This endpoint should be used, to __POST__ a __new Category instance__ into the database.";
    SpecificationDescriptions["GETCategoryCountSpecification"] = "This endpoint should be used, to __GET__ a __Count of Category instances__ matching the WHERE field received in the database.";
    SpecificationDescriptions["GETCategoriesSpecification"] = "This endpoint should be used, to __GET__ a __List of Category instances__ matching the FILTER field received in the database.";
    SpecificationDescriptions["GETCategoriesIdSpecification"] = "This endpoint should be used, to __GET__ a __Category instance__ matching the ID field received in the database.";
    SpecificationDescriptions["PATCHCategoriesSpecification"] = "This endpoint should be used, to __UPDATE__ a __List of Category instances__ matching the WHERE field received in the database.";
    SpecificationDescriptions["PATCHCategoriesIdSpecification"] = "This endpoint should be used, to __UPDATE__ a __Category instance__ matching the ID field received in the database.";
    SpecificationDescriptions["PUTCategoriesIdSpecifications"] = "This endpoint should be used, to __UPDATE__ a __Category instance__ matching the ID field received in the database.";
    SpecificationDescriptions["DELCategoriesIdSpecifications"] = "This endpoint should be used, to __DELETE__ a __Category instance__ matching the ID field received in the database.";
    // Order Specifications
    SpecificationDescriptions["GETOrdersCountSpecification"] = "This endpoint should be used, to __COUNT__ Orders instances in database. allow (where condition)";
    SpecificationDescriptions["GETOrdersSpecification"] = "This endpoint should be used, to __GET__ Orders instances in database.";
    SpecificationDescriptions["GETOrdersByIdSpecification"] = "This endpoint should be used, to __GET__ an Order instances in database by _id.";
    SpecificationDescriptions["PATCHOrdersByIdSpecification"] = "This endpoint should be used, to __Update__ an Order instances in database by _id.";
    // Return Specifications
    SpecificationDescriptions["POSTReturnPolicySpecification"] = "This endpoint should be used to __POST__a__new ReturnPolicy instance__ into the database.";
    SpecificationDescriptions["GETPolicySpecification"] = "This endpoint should be used to __GET__a__List of ReturnPolicy instances__ matching the FILTER field received in the database.";
    SpecificationDescriptions["DELPolicyByIDSpecification"] = "This endpoint should be used to __DELETE__a__ReturnPolicy instance__ matching the ID field received in the database.";
    SpecificationDescriptions["POSTReturnRequestSpecifications"] = "This endpoint should be used to __POST__a__new ReturnRequest instance__ into the database.";
    SpecificationDescriptions["GETReturnRequestSpecification"] = "This endpoint should be used to __GET__a__List of ReturnRequest instances__ matching the FILTER field received in the database.";
    SpecificationDescriptions["PATCHReturnRequestSpecification"] = "This endpoint should be used to __UPDATE__a__ReturnRequest instance__ matching the ID field received in the database.";
    SpecificationDescriptions["POSTDisputeSpecifications"] = "This endpoint should be used to __POST__a__new ReturnDispute instance__ into the database.";
    SpecificationDescriptions["GETDisputeSpecification"] = "This endpoint should be used to __GET__a__ReturnDispute instance__ matching the ID field received.";
    SpecificationDescriptions["PATCHDisputeSpecification"] = "This endpoint should be used to __UPDATE__a__ReturnDispute instance__ matching the ID field received in the database.";
    // Config Specifications
    SpecificationDescriptions["POSTConfigSpecification"] = "This endpoint should be used, to __POST__ a __new Config instance__ into the database.";
    SpecificationDescriptions["GETConfigSpecification"] = "This endpoint should be used, to __GET__ a __List of Config instances__ matching the FILTER field received in the database.";
    SpecificationDescriptions["PATCHConfigSpecification"] = "This endpoint should be used, to __UPDATE__ a __Config instance__ matching the ID field received in the database.";
    SpecificationDescriptions["DELConfigIdSpecifications"] = "This endpoint should be used, to __DELETE__ a __Config instance__ matching the ID field received in the database.";
    SpecificationDescriptions["GETInventoryOrdersSpecification"] = "GETInventoryOrdersSpecification";
    // Merchant Withdrawal
    SpecificationDescriptions["GETMerchantWithdrawalCountSpecification"] = "This endpoint should be used, to __COUNT__ Merchant Withdrawal Transactions in database. allow (where condition)";
    SpecificationDescriptions["GETMerchantWithdrawalSpecification"] = "This endpoint should be used, to __GET__ Merchant Withdrawal Transactions instances in database.";
    SpecificationDescriptions["GETMerchantWithdrawalByIdSpecification"] = "This endpoint should be used, to __GET__ a Merchant Withdrawal Transaction by ID.";
    SpecificationDescriptions["PATCHMerchantWithdrawalByIdSpecification"] = "This endpoint should be used, to __PATCH__ a single Merchant Withdrawal Transaction by ID.";
})(SpecificationDescriptions = exports.SpecificationDescriptions || (exports.SpecificationDescriptions = {}));
var RequestBodyDescriptions;
(function (RequestBodyDescriptions) {
    // Boom Cards
    RequestBodyDescriptions["POSTBoomCardsMerchantActivateByIdRequestBody"] = "Object containing the fields to __UPDATE a Boom card instance__ to active must pass this fields (pinNumber, uid, boomAccountID, storeId)";
    RequestBodyDescriptions["PATCHBoomCardsByIdRequestBody"] = "Object containing the fields to __UPDATE a Boom card instance__ you can update only any of this fields (pinNumber, uid, boomAccountID, storeId, status, customerID, storeMerchantID)";
    RequestBodyDescriptions["POSTBoomCardsLoginRequestBody"] = "Object containing the fields (cardNumber, pinNumber)";
    // User Specifications
    RequestBodyDescriptions["POSTUsersVerifyPhoneNumberRequestBody"] = "Object containing the fields to search for(firstName, lastName, and phone)";
    RequestBodyDescriptions["POSTAdminUserRequestBody"] = "Object containing the fields to __create a new BoomUser instance__ (email, password, and phone)";
    // Category Specifications
    RequestBodyDescriptions["POSTCategoriesRequestBody"] = "Object containing the fields to __CREATE a new Category instance__ (name, commissionRate, and subCategories)";
    RequestBodyDescriptions["PATCHCategoriesRequestBody"] = "Object containing the fields to __UPDATE Config instances__ matching the WHERE field received in the database.";
    RequestBodyDescriptions["PATCHCategoriesIdRequestBody"] = "Object containing the fields to __UPDATE a Category instance__ matching the ID (name, commissionRate, and subCategories)";
    RequestBodyDescriptions["PUTCategoriesIdRequestBody"] = "Object containing the fields to __UPDATE a Category instance__ matching the ID (name, commissionRate, and subCategories)";
    // Order Specifications
    RequestBodyDescriptions["PATCHORdersByIdRequestBody"] = "Object containing the fields for the existing Bookings";
    // Return Specifications
    RequestBodyDescriptions["POSTReturnPolicyRequestBody"] = "Object containing the fields to __CREATE a new ReturnPolicy instance__";
    RequestBodyDescriptions["POSTReturnRequestBody"] = "Object containing the fields to __CREATE a new ReturnRequest instance__";
    RequestBodyDescriptions["PATCHReturnRequestBody"] = "Object containing the fields to __UPDATE a ReturnRequest instance__ matching the ID";
    RequestBodyDescriptions["POSTDisputeRequestBody"] = "Object containing the fields to __CREATE a new ReturnDispute instance__";
    RequestBodyDescriptions["PATCHDisputeRequestBody"] = "Object containing the fields to __UPDATE a ReturnDispute instance__ matching the  ID";
    // Config Specifications
    RequestBodyDescriptions["POSTConfigRequestBody"] = "Object containing the fields to __CREATE a new Config instance__ (name, commissionRate, and subCategories)";
})(RequestBodyDescriptions = exports.RequestBodyDescriptions || (exports.RequestBodyDescriptions = {}));
var ResponseSuccessDescription;
(function (ResponseSuccessDescription) {
    // BoomCards Specifications
    ResponseSuccessDescription["POSTBoomCardsSpecification"] = "Boom Card model instance";
    ResponseSuccessDescription["GETBoomCardsCountSpecification"] = "Boom Card COUNT";
    ResponseSuccessDescription["GETBoomCardsByIdSpecification"] = "Boom Card instance";
    ResponseSuccessDescription["GETBoomCardsMerchantByCardNumberSpecification"] = "Boom Card by CardNumber";
    ResponseSuccessDescription["POSTBoomCardsMerchantActivateByIdSpecification"] = "Boom Card instance update success";
    ResponseSuccessDescription["POSTBoomCardsLoginSpecification"] = "Boom Card owner token";
    // Order Specifications
    ResponseSuccessDescription["GETOrdersSpecification"] = "APIResponse Data with an Array of Order model instances";
    ResponseSuccessDescription["GETOrdersByIdSpecification"] = "APIResponse Data with an Order model instance";
    ResponseSuccessDescription["PATCHOrdersByIdSpecification"] = "Order PATCH success";
    ResponseSuccessDescription["GETInventoryOrdersSpecification"] = "GETInventoryOrdersSpecification";
    // Merchant Withdrawal Specifications
    ResponseSuccessDescription["GETMerchantWithdrawalSpecification"] = "APIResponse data with merchant withdrawal transactions.";
    ResponseSuccessDescription["GETMerchantWithdrawalByIdSpecification"] = "APIResponse data with a single merchant withdrawal transaction requested by id";
    ResponseSuccessDescription["PATCHMerchantWithdrawalByIdSpecification"] = "Merchant Withdrawal Transaction PATCH succeed.";
})(ResponseSuccessDescription = exports.ResponseSuccessDescription || (exports.ResponseSuccessDescription = {}));
//# sourceMappingURL=specification-constants.js.map