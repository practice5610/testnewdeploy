import { AllOptionalExceptFor, BoomUser, RoleKey } from '@boom-platform/globals';
export interface AuthenticateFn {
    (token: string | null): Promise<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
}
/**
 * Authorize action method interface
 * This is going to be the interface for authorization action business logic.
 */
export interface AuthorizeFn {
    (userRoles: RoleKey[] | null | undefined): Promise<boolean>;
}
/**
 * Authorization metadata interface for the method decorator
 * This interface represents the information to be passed via decorator for each individual controller method.
 */
export interface AuthorizationMetadata {
    roles: string[];
}
/**
 * User Permission model
 * used for explicit allow/deny any permission at user level
 * This is the interface to be used for associating user level permissions. It is actually doing explicit allow/deny at user level, over and above role permissions.
 */
export interface UserRole {
    role: RoleKey;
    allowed: boolean;
}
