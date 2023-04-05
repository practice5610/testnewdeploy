"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateActionProvider = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const admin = tslib_1.__importStar(require("firebase-admin"));
const keys_1 = require("../keys");
let AuthenticateActionProvider = class AuthenticateActionProvider {
    constructor(setCurrentUser) {
        this.setCurrentUser = setCurrentUser;
    }
    value() {
        return (response) => this.action(response);
    }
    async action(token) {
        let user = undefined;
        this.setCurrentUser(undefined);
        if (token) {
            try {
                const decoded = await admin.auth().verifyIdToken(token);
                if (decoded) {
                    user = { uid: decoded.uid, roles: decoded.roles };
                    this.setCurrentUser(user);
                }
                else {
                    console.error('Token was decoded but returned:', decoded);
                }
            }
            catch (error) {
                // throw new HttpErrors.Forbidden(error.code);
                console.error('Error getting current user:', error.code);
            }
        }
        return user;
    }
};
AuthenticateActionProvider = tslib_1.__decorate([
    tslib_1.__param(0, context_1.inject.setter(keys_1.AuthorizatonBindings.CURRENT_USER)),
    tslib_1.__metadata("design:paramtypes", [Function])
], AuthenticateActionProvider);
exports.AuthenticateActionProvider = AuthenticateActionProvider;
//# sourceMappingURL=authentication-action.provider.js.map