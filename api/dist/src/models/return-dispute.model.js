"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnDisputeModel = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let ReturnDisputeModel = class ReturnDisputeModel extends repository_1.Entity {
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], ReturnDisputeModel.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date return dispute was created',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnDisputeModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date return dispute was updated',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], ReturnDisputeModel.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'returnRequest',
        description: 'The return request that is being disputed',
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", Object)
], ReturnDisputeModel.prototype, "returnRequest", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'isOpen',
        description: 'True or false to let the user know if the dispute is still open / pending resolution',
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], ReturnDisputeModel.prototype, "isOpen", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'comment',
        description: 'Space for a Boom Admin to provide any comments or notes regarding the dispute',
        type: 'string',
        jsonSchema: {
            minLength: 2,
            maxLength: 500,
            errorMessage: {
                minLength: 'Comments should be at least 2 characters',
                maxLength: 'Comments should not exceed 500 characters',
            },
        },
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ReturnDisputeModel.prototype, "comment", void 0);
ReturnDisputeModel = tslib_1.__decorate([
    repository_1.model({ name: 'return_dispute', settings: {} })
], ReturnDisputeModel);
exports.ReturnDisputeModel = ReturnDisputeModel;
//# sourceMappingURL=return-dispute.model.js.map