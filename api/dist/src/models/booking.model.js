"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
let Booking = class Booking extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date the booking was created / Date the item was placed in shopping cart',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date the item/booking was updated in the shopping cart',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'type',
        description: 'Booking type (offer or product) that a user can view',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(globals_1.BookingTypes),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'item',
        description: 'Item that is either an offer or a product that a user can add to their cart',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Booking.prototype, "item", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'quantity',
        description: 'The total number of a specific item that a user is adding to their cart.',
        type: 'number',
        required: true,
        jsonSchema: {
            minimum: 1,
            errorMessage: {
                maximum: 'Booking must have at least 1 item to book.',
            },
        },
    }),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'status',
        description: 'The status of the booking itself. Whether it is active, used by the user, or cancelled',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(globals_1.BookingStatus),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'memberUID',
        description: 'The unique member ID provided to each boom member',
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Booking.prototype, "memberUID", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'visits',
        description: 'How many times an offer can be used. This will also track how many times a customer has used an offer, allowing the customer to know how many visits they have left. (i.e. max of 5 visits. 3 visits left)',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Booking.prototype, "visits", void 0);
Booking = tslib_1.__decorate([
    repository_1.model({ name: 'bookings', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Booking);
exports.Booking = Booking;
//# sourceMappingURL=booking.model.js.map