"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PATCHDisputeSchemaObjectPartial = exports.POSTDisputeSchemaObjectPartial = void 0;
const tslib_1 = require("tslib");
const _1 = require(".");
const _a = _1.DisputeSchema.properties, { _id, createdAt, updatedAt } = _a, POSTDisputeSchemaPartialProperties = tslib_1.__rest(_a, ["_id", "createdAt", "updatedAt"]);
exports.POSTDisputeSchemaObjectPartial = Object.assign(Object.assign({}, _1.DisputeSchemaObject), { properties: Object.assign(Object.assign({}, POSTDisputeSchemaPartialProperties), { returnRequest: Object.assign(Object.assign({}, POSTDisputeSchemaPartialProperties.returnRequest), { required: [...POSTDisputeSchemaPartialProperties.returnRequest.required] }) }), required: ['returnRequest', 'isOpen', 'comment'] });
const _b = _1.DisputeSchema.properties, { returnRequest } = _b, PATCHDisputeSchemaPartialProperties = tslib_1.__rest(_b, ["returnRequest"]);
exports.PATCHDisputeSchemaObjectPartial = Object.assign(Object.assign({}, _1.DisputeSchemaObject), { properties: Object.assign({}, PATCHDisputeSchemaPartialProperties), required: ['isOpen', 'comment'] });
//# sourceMappingURL=return-dispute-partial.js.map