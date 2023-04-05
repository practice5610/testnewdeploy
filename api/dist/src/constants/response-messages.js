"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnResponseMessages = exports.ShippingErrorMessages = exports.OfferResponseMessages = exports.ProductResponseMessages = exports.BoomAccountResponseMessages = exports.BookingResponseMessages = exports.InventoryItemResponseMessages = exports.InventoryLeaseResponseMessages = exports.BankAccountResponseMessages = exports.BoomCardResponseMessages = exports.OrderResponseMessages = exports.StoreResponseMessages = exports.ConfigResponseMessages = exports.TransactionResponseMessages = exports.APIResponseMessages = exports.GlobalResponseMessages = exports.FilterResponseMessages = exports.ProfileResponseMessages = exports.PurchaseResponseMessages = exports.CheckOutResponseMessages = exports.FundTransferResponseMessages = void 0;
var FundTransferResponseMessages;
(function (FundTransferResponseMessages) {
    FundTransferResponseMessages["INACTIVE_CARD"] = "At least one user did not have an active Boom Card.";
    FundTransferResponseMessages["INSUFFICIENT_FUNDS"] = "Not enough funds to transfer.";
    FundTransferResponseMessages["BOOM_CARD_ERROR"] = "There was an error while looking up Boom Cards.";
    FundTransferResponseMessages["TRANSACTION_MISSING_INFO"] = "This transaction is missing information and can not be completed";
    FundTransferResponseMessages["SENDER_NOT_FOUND"] = "The senders account could not be found";
    FundTransferResponseMessages["RECEIVER_NOT_FOUND"] = "The receivers account could not be found";
    FundTransferResponseMessages["RECEIVER_IS_MERCHANT"] = "The receivers account cannot be a of merchant type";
    FundTransferResponseMessages["BAD_PHONE_FORMAT"] = "The phone number provided is not valid";
    FundTransferResponseMessages["SENDER_BOOM_ACCOUNT_NOT_FOUND"] = "The senders boom account could not be found";
    FundTransferResponseMessages["RECEIVER_BOOM_ACCOUNT_NOT_FOUND"] = "The receivers boom account could not be found";
    FundTransferResponseMessages["TRANSACTION_CREATION_ERROR"] = "There was a problem saving the transaction";
})(FundTransferResponseMessages = exports.FundTransferResponseMessages || (exports.FundTransferResponseMessages = {}));
var CheckOutResponseMessages;
(function (CheckOutResponseMessages) {
    CheckOutResponseMessages["SUCCESS"] = "Check out complete.";
    CheckOutResponseMessages["DELETED_OFFER"] = "This offer no longer exists.";
    CheckOutResponseMessages["DELETED_PRODUCT"] = "This product no longer exists.";
    CheckOutResponseMessages["MISSING_CASHBACK"] = "The offer booked did not have a cashback value. This is not supported.";
    CheckOutResponseMessages["NO_FUNDS"] = "Could not find a BoomCard with enough funds for this booking. Please add more funds to a card and try again.";
    CheckOutResponseMessages["BOOKING_INACTIVE"] = "This booking was already used, or it was cancelled.";
    CheckOutResponseMessages["MISSING_BOOKING"] = "This booking no longer exists.";
    CheckOutResponseMessages["BAD_REQUEST_NO_BOOKINGS"] = "You did not provide bookings to check out.";
    CheckOutResponseMessages["BAD_REQUEST_MISSING_OFFER"] = "An offer booking was provided without an offer.";
    CheckOutResponseMessages["BAD_REQUEST_MISSING_PRODUCT"] = "A product booking was provided without a product.";
    CheckOutResponseMessages["INVALID_CATEGORY"] = "The category for this product was invalid";
    CheckOutResponseMessages["TAX_ERROR"] = "Tax calculation failure.";
})(CheckOutResponseMessages = exports.CheckOutResponseMessages || (exports.CheckOutResponseMessages = {}));
var PurchaseResponseMessages;
(function (PurchaseResponseMessages) {
    PurchaseResponseMessages["COMPLETED"] = "Purchase complete successful";
    PurchaseResponseMessages["FAILURE"] = "Purchase Failure";
    PurchaseResponseMessages["ERROR_PRODUCT_CATEGORY"] = "Error getting product category.";
    PurchaseResponseMessages["ERROR_GETTING_BOOMACCOUNT"] = "Error getting merchant boomAccount";
})(PurchaseResponseMessages = exports.PurchaseResponseMessages || (exports.PurchaseResponseMessages = {}));
var ProfileResponseMessages;
(function (ProfileResponseMessages) {
    ProfileResponseMessages["MERCHANT_NOT_FOUND"] = "The merchant account requested was not found.";
    ProfileResponseMessages["CUSTOMER_NOT_FOUND"] = "Customer not found. Is the customer registered?";
    ProfileResponseMessages["MEMBER_NOT_FOUND"] = "The customer account requested was not found.";
    ProfileResponseMessages["USER_NOT_FOUND"] = "User account was not found";
    ProfileResponseMessages["MERCHANT_EMPTY_TAX_NEXUS"] = "Merchant with ID of do not have taxable nexus states";
    ProfileResponseMessages["MISSING_PROFILE_PARAMETERS"] = "Missing Parameters for Profile with id:";
    ProfileResponseMessages["CORRUPT_PROFILE_DATA"] = "Missing or Extra Parameters for Profile with id:";
    ProfileResponseMessages["METHOD_NOT_SUPPORTED"] = "Method not supported";
    ProfileResponseMessages["NO_PROFILE_FOUND"] = "No Profile Found";
    ProfileResponseMessages["NO_PROFILES_FOUND"] = "No Profiles Found";
    ProfileResponseMessages["PHONE_NUMBER_WITHOUT_ACCOUNT"] = "This phone number does not have a boom account.";
    ProfileResponseMessages["ACCOUNT_NAME_CANNOT_BE_CONFIRMED"] = "The name on this account can not be confirmed.";
    ProfileResponseMessages["NAME_DOESNT_MATCH"] = "Name does not match account.";
})(ProfileResponseMessages = exports.ProfileResponseMessages || (exports.ProfileResponseMessages = {}));
var FilterResponseMessages;
(function (FilterResponseMessages) {
    FilterResponseMessages["MISSING"] = "Invalid, filter needed.";
    FilterResponseMessages["INVALID"] = "Invalid filter.";
    FilterResponseMessages["MORE_THAN_ONE_CONDITION"] = "More than one condition.";
    FilterResponseMessages["INVALID_DATE_RANGE"] = "Start date can't be bigger than end Date.";
    FilterResponseMessages["INVALID_FILTERS"] = "Invalid condition for filter.";
})(FilterResponseMessages = exports.FilterResponseMessages || (exports.FilterResponseMessages = {}));
var GlobalResponseMessages;
(function (GlobalResponseMessages) {
    GlobalResponseMessages["NO_CATEGORY"] = "The requested category was not found.";
    GlobalResponseMessages["NO_BOOMCARDS"] = "No Boom cards where found for this user.";
    GlobalResponseMessages["NOT_AUTHORIZED"] = "Not authorized to perform this action.";
    GlobalResponseMessages["NO_CURRENT_USER_PUBLIC_PATH"] = "Ignoring undefined user found on public route.";
    GlobalResponseMessages["CANNOT_CREATE_ALREADY_EXISTS"] = "Could not create item. It already exists.";
    GlobalResponseMessages["NO_EMAIL"] = "This user has no email address.";
    GlobalResponseMessages["NO_BOOM_ACCOUNT"] = "No Boom account where found for this user.";
    GlobalResponseMessages["UNPROCESSABLE_PURCHASE"] = "Unprocessable purchase.";
    GlobalResponseMessages["UNEXPECTED"] = "Unexpected error.";
    GlobalResponseMessages["DB_ERROR"] = "Db error";
    GlobalResponseMessages["INVALID_ROLE"] = "Invalid role.";
    GlobalResponseMessages["INVALID_ID"] = "Invalid id.";
})(GlobalResponseMessages = exports.GlobalResponseMessages || (exports.GlobalResponseMessages = {}));
// These must match api\src\constants\service-response-codes.ts
var APIResponseMessages;
(function (APIResponseMessages) {
    APIResponseMessages["SUCCESS"] = "Success";
    // ServiceResponseCodes.NO_CONTENT
    APIResponseMessages["BAD_REQUEST"] = "Request body is required";
    APIResponseMessages["UNAUTHORIZED"] = "Unauthorized";
    APIResponseMessages["FORBIDDEN"] = "Not Allowed Access";
    APIResponseMessages["RECORD_NOT_FOUND"] = "Record not found";
    APIResponseMessages["NOT_ACCEPTABLE"] = "Not Acceptable";
    APIResponseMessages["UNPROCESSABLE"] = "Wrong Data";
    APIResponseMessages["RECORD_CONFLICT"] = "Record conflict";
    APIResponseMessages["INTERNAL_SERVER_ERROR"] = "Internal Server Error";
    APIResponseMessages["NOT_IMPLEMENTED"] = "Not Implemented";
    // ServiceResponseCodes.SERVICE_UNAVAILABLE
    //Others
    APIResponseMessages["SUCCESS_MERCHANT_TRANSACTION_PATCH"] = "Merchant Transaction Successfully Updated";
    APIResponseMessages["INVALID_JSON"] = "Invalid JSON request.";
    APIResponseMessages["VERIFIED"] = "Information is verified";
})(APIResponseMessages = exports.APIResponseMessages || (exports.APIResponseMessages = {}));
var TransactionResponseMessages;
(function (TransactionResponseMessages) {
    TransactionResponseMessages["ERROR"] = "Error creating transactions";
})(TransactionResponseMessages = exports.TransactionResponseMessages || (exports.TransactionResponseMessages = {}));
var ConfigResponseMessages;
(function (ConfigResponseMessages) {
    ConfigResponseMessages["ERROR_COUNT_INVENTORY"] = "Minimum count of Inventory item type (required) is 1";
})(ConfigResponseMessages = exports.ConfigResponseMessages || (exports.ConfigResponseMessages = {}));
var StoreResponseMessages;
(function (StoreResponseMessages) {
    StoreResponseMessages["CURRENT_MERCHANT_HAS_STORE"] = "This merchant already has a store.";
    StoreResponseMessages["INVALID_DATA"] = "Invalid store data.";
    StoreResponseMessages["NOT_FOUND"] = "Store not found";
})(StoreResponseMessages = exports.StoreResponseMessages || (exports.StoreResponseMessages = {}));
var OrderResponseMessages;
(function (OrderResponseMessages) {
    OrderResponseMessages["SUCCESS"] = "Order complete.";
    OrderResponseMessages["INVALID_ORDER"] = "Invalid order";
    OrderResponseMessages["NOT_FOUND"] = "Order not found.";
})(OrderResponseMessages = exports.OrderResponseMessages || (exports.OrderResponseMessages = {}));
var BoomCardResponseMessages;
(function (BoomCardResponseMessages) {
    BoomCardResponseMessages["NOT_FOUND"] = "Boom card(s) not found.";
    BoomCardResponseMessages["NOT_ISSUED"] = "This Boom card is not issued to this user";
    BoomCardResponseMessages["UNAUTHORIZED_BOOMCARD_UPDATE"] = "Not authorized to update some Boom Card values";
    BoomCardResponseMessages["BLOCKED"] = "This Boom card is blocked, and cannot be used";
    BoomCardResponseMessages["PIN_REQUIRED"] = "PIN number is required to block this Boom card.";
    BoomCardResponseMessages["PIN_INCORRECT"] = "Incorrect PIN number, not authorized to block this Boom card.";
    BoomCardResponseMessages["UNACTIVE_TO_BLOCK"] = "Boom card status should be Active to be blocked.";
    BoomCardResponseMessages["UID_REQUIRED"] = "A uid is required.";
    BoomCardResponseMessages["BOOM_ACCOUNT_REQUIRED"] = "A Boom Account ID is required.";
    BoomCardResponseMessages["BOOM_CARD_ALREADY_ACTIVE"] = "This Boom Card is already active for a customer.";
})(BoomCardResponseMessages = exports.BoomCardResponseMessages || (exports.BoomCardResponseMessages = {}));
var BankAccountResponseMessages;
(function (BankAccountResponseMessages) {
    BankAccountResponseMessages["BANK_ACCOUNT_INFO_NOT_FOUND"] = "No bank info was found for this user";
    BankAccountResponseMessages["NO_ACCOUNT_NUMBERS_FROM_PLAID"] = "Could not find account numbers for this Plaid data";
    BankAccountResponseMessages["NO_IDENTITY_DATA_FROM_PLAID"] = "Could not find identity info for this Plaid data";
    BankAccountResponseMessages["BALANCE_CHECK_FAILED"] = "Could not get account balance from Plaid";
    BankAccountResponseMessages["BANK_DELETE_FAILED"] = "Error deleting bank account. Try again later.";
    BankAccountResponseMessages["BANK_DELETE_BLOCKED"] = "You can not delete an account with pending charges. Try again later.";
})(BankAccountResponseMessages = exports.BankAccountResponseMessages || (exports.BankAccountResponseMessages = {}));
var InventoryLeaseResponseMessages;
(function (InventoryLeaseResponseMessages) {
    InventoryLeaseResponseMessages["REPLACEMENT_INVENTORY_NOT_FOUND"] = "There is no replacement currently available for this inventory item";
    InventoryLeaseResponseMessages["REPLACEMENT_INVENTORY_FOUND"] = "Inventory item replacement has been assigned";
})(InventoryLeaseResponseMessages = exports.InventoryLeaseResponseMessages || (exports.InventoryLeaseResponseMessages = {}));
var InventoryItemResponseMessages;
(function (InventoryItemResponseMessages) {
    InventoryItemResponseMessages["ITEM_STATUS_INVALID"] = "Error this inventory item it's not ready to active";
    InventoryItemResponseMessages["MERCHANT_UNAUTHORIZED"] = "Error Merchant unauthorized to update this item";
})(InventoryItemResponseMessages = exports.InventoryItemResponseMessages || (exports.InventoryItemResponseMessages = {}));
var BookingResponseMessages;
(function (BookingResponseMessages) {
    BookingResponseMessages["SUCCESS"] = "Booking complete.";
    BookingResponseMessages["INVALID_BOOKING"] = "This booking is not valid";
    BookingResponseMessages["UNEXPECTED"] = "Something goes wrong looking for bookings.";
    BookingResponseMessages["EMPTY_ARRAY"] = "Empty array.";
    BookingResponseMessages["NOT_FOUND"] = "Booking not found";
    BookingResponseMessages["INVALID_ITEM"] = "Invalid item, must be an Offer or a Product.";
    BookingResponseMessages["INVALID_TYPE"] = "Invalid booking type";
    BookingResponseMessages["INVALID_OFFER_TYPE"] = "Invalid booking type, item is an Offer.";
    BookingResponseMessages["INVALID_PRODUCT_TYPE"] = "Invalid booking type, item is an Product.";
    BookingResponseMessages["VISITS_EXCEEDED"] = "Can't book this offer, the max visits have been reached.";
    BookingResponseMessages["OFFER_EXCEEDED"] = "Offer quantity exceeded.";
    BookingResponseMessages["OFFER_EXPIRED"] = "This offer has expired.";
    BookingResponseMessages["MISSING_ID"] = "Booking must have an id";
    BookingResponseMessages["ITEM_NOT_FOUND"] = "Booking item no longer exist";
    BookingResponseMessages["PRODUCT_EXCEEDED"] = "Not enough quantity available of this product";
    BookingResponseMessages["VALIDATION_SUCCESS"] = "Booking validation complete";
    BookingResponseMessages["QUANTITY_ERROR"] = "Booking quantity error.";
})(BookingResponseMessages = exports.BookingResponseMessages || (exports.BookingResponseMessages = {}));
var BoomAccountResponseMessages;
(function (BoomAccountResponseMessages) {
    BoomAccountResponseMessages["CANCELLED"] = "This Boom Account is cancelled, and cannot be used";
    BoomAccountResponseMessages["NOT_FOUND"] = "Boom Account NOT found.";
    BoomAccountResponseMessages["UPDATE_SUCCESS"] = "Boom account update successfully.";
    BoomAccountResponseMessages["UPDATE_ERROR"] = "Error updating boom account.";
    BoomAccountResponseMessages["CREATE_SUCCESS"] = "Boom account created successfully.";
    BoomAccountResponseMessages["CREATE_ERROR"] = "Database error, something wrong creating new boom account.";
    BoomAccountResponseMessages["ALREADY_HAVE_ACCOUNT"] = "The user, already have a boom account.";
    BoomAccountResponseMessages["MORE_THAN_ONE_ACCOUNT"] = "Error user can't have more than one account at this moment.";
    BoomAccountResponseMessages["NOT_FUNDS"] = "Not enough funds.";
    BoomAccountResponseMessages["NOT_VALID"] = "Customer boom account not valid.";
    BoomAccountResponseMessages["UNAUTHORIZED"] = "Unauthorized to request others boom accounts.";
})(BoomAccountResponseMessages = exports.BoomAccountResponseMessages || (exports.BoomAccountResponseMessages = {}));
var ProductResponseMessages;
(function (ProductResponseMessages) {
    ProductResponseMessages["NOT_FOUND"] = "Could not find any product.";
    ProductResponseMessages["INVALID"] = "Invalid product.";
    ProductResponseMessages["MISSING_ID"] = "Missing product _id";
    ProductResponseMessages["MISSING_CATEGORY"] = "Product must have category";
    ProductResponseMessages["NOT_LONGER_EXIST"] = "Product no longer exist.";
    ProductResponseMessages["VALID"] = "Valid product.";
})(ProductResponseMessages = exports.ProductResponseMessages || (exports.ProductResponseMessages = {}));
var OfferResponseMessages;
(function (OfferResponseMessages) {
    OfferResponseMessages["VALID"] = "Valid offer.";
    OfferResponseMessages["INVALID"] = "Invalid offer.";
    OfferResponseMessages["NO_LONGER_EXIST"] = "Offer no longer exist.";
    OfferResponseMessages["EXPIRED"] = "Offer expired.";
})(OfferResponseMessages = exports.OfferResponseMessages || (exports.OfferResponseMessages = {}));
var ShippingErrorMessages;
(function (ShippingErrorMessages) {
    ShippingErrorMessages["REFUND_ALREADY_EXISTS"] = "ShippoAPIError: Refund with this Transaction already exists";
})(ShippingErrorMessages = exports.ShippingErrorMessages || (exports.ShippingErrorMessages = {}));
var ReturnResponseMessages;
(function (ReturnResponseMessages) {
    ReturnResponseMessages["POLICY_FOUND"] = "Return Policy found";
    ReturnResponseMessages["POLICY_NOT_FOUND"] = "Return Policy not found";
    ReturnResponseMessages["POLICY_CREATED"] = "Return Policy successfully created";
    ReturnResponseMessages["POLICY_DELETED"] = "Return Policy succesfully deleted";
    ReturnResponseMessages["REQUEST_CREATED"] = "Return Request successfully created";
    ReturnResponseMessages["REQUEST_FOUND"] = "Return Request found";
    ReturnResponseMessages["REQUEST_NOT_FOUND"] = "Return Request not found";
    ReturnResponseMessages["REQUEST_UPDATED"] = "Return Request successfully updated";
    ReturnResponseMessages["REQUEST_NOT_UPDATED"] = "Return Request has already been completed. No further updates available.";
    ReturnResponseMessages["DISPUTE_CREATED"] = "Return Dispute successfully created";
    ReturnResponseMessages["DISPUTE_FOUND"] = "Return Dispute found";
    ReturnResponseMessages["DISPUTE_NOT_FOUND"] = "Return Dispute not found";
    ReturnResponseMessages["DISPUTE_UPDATED"] = "Return Dispute successfully updated";
    ReturnResponseMessages["DISPUTE_NOT_UPDATED"] = "Return Dispute has already been closed. No further updates available.";
})(ReturnResponseMessages = exports.ReturnResponseMessages || (exports.ReturnResponseMessages = {}));
//# sourceMappingURL=response-messages.js.map