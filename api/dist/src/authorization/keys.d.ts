import { BoomUser } from '@boom-platform/globals';
import { BindingKey } from '@loopback/context';
import { MetadataAccessor } from '@loopback/metadata';
import { AuthenticateFn, AuthorizationMetadata, AuthorizeFn } from './types';
/**
 * Binding keys used by this component.
 */
export declare namespace AuthorizatonBindings {
    const AUTHENTICATE_ACTION: BindingKey<AuthenticateFn>;
    const AUTHORIZE_ACTION: BindingKey<AuthorizeFn>;
    const METADATA: BindingKey<AuthorizationMetadata | undefined>;
    const CURRENT_USER: BindingKey<BoomUser | undefined>;
}
/**
 * Metadata accessor key for authorize method decorator
 */
export declare const AUTHORIZATION_METADATA_ACCESSOR: MetadataAccessor<AuthorizationMetadata, MethodDecorator>;
