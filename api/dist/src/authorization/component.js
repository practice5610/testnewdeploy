"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationComponent = void 0;
const keys_1 = require("./keys");
const authentication_action_provider_1 = require("./providers/authentication-action.provider");
const authorization_action_provider_1 = require("./providers/authorization-action.provider");
const authorization_metadata_provider_1 = require("./providers/authorization-metadata.provider");
class AuthorizationComponent {
    constructor() {
        this.providers = {
            [keys_1.AuthorizatonBindings.AUTHENTICATE_ACTION.key]: authentication_action_provider_1.AuthenticateActionProvider,
            [keys_1.AuthorizatonBindings.AUTHORIZE_ACTION.key]: authorization_action_provider_1.AuthorizeActionProvider,
            [keys_1.AuthorizatonBindings.METADATA.key]: authorization_metadata_provider_1.AuthorizationMetadataProvider,
        };
    }
}
exports.AuthorizationComponent = AuthorizationComponent;
//# sourceMappingURL=component.js.map