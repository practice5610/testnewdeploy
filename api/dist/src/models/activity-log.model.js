"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLog = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const constants_1 = require("../constants");
let ActivityLog = class ActivityLog extends repository_1.Entity {
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
], ActivityLog.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'createdAt',
        description: 'Date that a new activity gets logged',
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ActivityLog.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'updatedAt',
        description: 'Date that an activity is updated',
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], ActivityLog.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property.array(Object),
    tslib_1.__metadata("design:type", Array)
], ActivityLog.prototype, "documents", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'operation',
        description: 'The operation of each activity logged (i.e. created, cancelled, shipped, closed)',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(constants_1.ActivityLogOperation),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ActivityLog.prototype, "operation", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'user',
        description: '',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], ActivityLog.prototype, "user", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'operatorRole',
        description: 'The role of the activity log operator (i.e. merchant, customer, admin, superadmin, system)',
        type: 'string',
        required: true,
        jsonSchema: {
            enum: Object.values(constants_1.ActivityLogOperatorRole),
        },
    }),
    tslib_1.__metadata("design:type", String)
], ActivityLog.prototype, "operatorRole", void 0);
ActivityLog = tslib_1.__decorate([
    repository_1.model({ name: 'activity_logs', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ActivityLog);
exports.ActivityLog = ActivityLog;
//# sourceMappingURL=activity-log.model.js.map