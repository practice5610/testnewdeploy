"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHORIZATION_METADATA_ACCESSOR = exports.AuthorizatonBindings = void 0;
const context_1 = require("@loopback/context");
const metadata_1 = require("@loopback/metadata");
/**
 * Binding keys used by this component.
 */
var AuthorizatonBindings;
(function (AuthorizatonBindings) {
    AuthorizatonBindings.AUTHENTICATE_ACTION = context_1.BindingKey.create('userAuthorization.actions.authenticate');
    AuthorizatonBindings.AUTHORIZE_ACTION = context_1.BindingKey.create('userAuthorization.actions.authorize');
    AuthorizatonBindings.METADATA = context_1.BindingKey.create('userAuthorization.operationMetadata');
    AuthorizatonBindings.CURRENT_USER = context_1.BindingKey.create('authentication.currentUser');
})(AuthorizatonBindings = exports.AuthorizatonBindings || (exports.AuthorizatonBindings = {}));
/**
 * Metadata accessor key for authorize method decorator
 */
exports.AUTHORIZATION_METADATA_ACCESSOR = metadata_1.MetadataAccessor.create('userAuthorization.accessor.operationMetadata');
//# sourceMappingURL=keys.js.map