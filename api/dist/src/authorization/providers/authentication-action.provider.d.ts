import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Provider, Setter } from '@loopback/context';
import { AuthenticateFn } from '../types';
export declare class AuthenticateActionProvider implements Provider<AuthenticateFn> {
    readonly setCurrentUser: Setter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    constructor(setCurrentUser: Setter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>);
    value(): AuthenticateFn;
    action(token: string | null): Promise<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
}
