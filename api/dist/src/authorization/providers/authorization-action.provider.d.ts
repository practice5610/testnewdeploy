import { RoleKey } from '@boom-platform/globals';
import { Getter, Provider } from '@loopback/context';
import { AuthorizationMetadata, AuthorizeFn } from '../types';
export declare class AuthorizeActionProvider implements Provider<AuthorizeFn> {
    private readonly getMetadata;
    constructor(getMetadata: Getter<AuthorizationMetadata>);
    value(): AuthorizeFn;
    action(userRoles: RoleKey[] | null | undefined): Promise<boolean>;
}
