"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogOperatorRole = exports.ActivityLogOperation = void 0;
var ActivityLogOperation;
(function (ActivityLogOperation) {
    ActivityLogOperation["CREATED"] = "created";
    ActivityLogOperation["CANCELLED"] = "cancelled";
    ActivityLogOperation["SHIPPED"] = "shipped";
    ActivityLogOperation["CLOSED"] = "closed";
})(ActivityLogOperation = exports.ActivityLogOperation || (exports.ActivityLogOperation = {}));
var ActivityLogOperatorRole;
(function (ActivityLogOperatorRole) {
    ActivityLogOperatorRole["MERCHANT"] = "merchant";
    ActivityLogOperatorRole["CUSTOMER"] = "customer";
    ActivityLogOperatorRole["ADMIN"] = "admin";
    ActivityLogOperatorRole["SUPERADMIN"] = "superadmin";
    ActivityLogOperatorRole["SYSTEM"] = "system";
})(ActivityLogOperatorRole = exports.ActivityLogOperatorRole || (exports.ActivityLogOperatorRole = {}));
//# sourceMappingURL=activity-log.js.map