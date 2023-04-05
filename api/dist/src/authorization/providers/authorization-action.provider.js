"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeActionProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const lodash_1 = require("lodash");
const keys_1 = require("../keys");
let AuthorizeActionProvider = class AuthorizeActionProvider {
    constructor(getMetadata) {
        this.getMetadata = getMetadata;
    }
    value() {
        return (response) => this.action(response);
    }
    async action(userRoles) {
        const metadata = await this.getMetadata();
        if (!metadata) {
            // If the route was not annotated with an authorization decorator, or there was no role defined on the decorator, deny access
            return false;
        }
        else if (metadata.roles.indexOf('*') === 0) {
            // If the role of '*' is used, then this is a public route. Allow request right away.
            return true;
        }
        //Extract only matching roles between the user and the acceptable roles to the current route
        let matchingRoleCount = 0;
        if (userRoles) {
            const routeRoles = metadata.roles;
            matchingRoleCount = lodash_1.intersection(userRoles, routeRoles).length;
        }
        //If there is at least one set of roles matched, then the request is allowed, else it is not
        return matchingRoleCount > 0;
    }
};
AuthorizeActionProvider = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject.getter(keys_1.AuthorizatonBindings.METADATA)),
    tslib_1.__metadata("design:paramtypes", [Function])
], AuthorizeActionProvider);
exports.AuthorizeActionProvider = AuthorizeActionProvider;
//# sourceMappingURL=authorization-action.provider.js.map