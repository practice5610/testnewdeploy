/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { ProfileService } from '../services/profile.service';
import { CreateUserType, FilterAdminUsersType, VerifyPhoneNumberType } from '../validation/schemas';
export declare class UsersController {
    private profileService;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    logger: Logger;
    constructor(profileService: ProfileService, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    findAll(filter: FilterAdminUsersType): Promise<Response<APIResponse<BoomUser[]>>>;
    getUserById(uid: string): Promise<Response<APIResponse<any>>>;
    /**
     * When a user tries to send funds, verify is supposed to:
     * - warn the sender if the receiver isn’t a boom user (if the number doesn’t exist)
     * - warn the user if the account exists but the name they provided doesn’t match our record
     * - confirm that the info they entered is what we have on record for the given phone number
     * @returns
     */
    verifyPhoneNumber(req: VerifyPhoneNumberType): Promise<Response<APIResponse<any>>>;
    /**
     * This new route allow our app to show up name and profileImg from a receiver in transactions operation.
     * this should NOT be a public endpoint and should be called with a current member logged in the app for security.
     * @param uid Receiver BoomUser id from firebase
     * @returns Response with an specific field allowed to be showed in the front end.
     */
    getReceiverProfile(uid: string): Promise<Response>;
    createUser(user: CreateUserType): Promise<Response<APIResponse<any>>>;
}
