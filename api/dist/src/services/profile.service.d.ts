import { AllOptional, AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { WriteResult } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import { Logger } from 'log4js';
import { ProfileResponseMessages } from '../constants';
import { ServiceResponse } from '../types';
import { CreateUserType, FilterAdminUsersType } from '../validation/schemas';
export declare enum getProfileOptions {
    BY_ID = "by_id",
    BY_PHONE = "by_phone",
    BY_EMAIL = "by_email",
    BY_CARD = "by_card"
}
export interface getProfileProperties {
    requiredFields?: (keyof BoomUser)[];
    method?: getProfileOptions;
    messageNoProfileFound?: ProfileResponseMessages;
}
export declare class ProfileService {
    logger: Logger;
    createUser(user: CreateUserType): Promise<ServiceResponse<admin.auth.UserRecord>>;
    getProfile<T = AllOptional<BoomUser>>(value: string, { requiredFields, method, messageNoProfileFound, }?: getProfileProperties): Promise<ServiceResponse<T & AllOptionalExceptFor<BoomUser, 'uid' | 'createdAt' | 'updatedAt' | 'roles'>>>;
    getFilteredProfiles(filter: FilterAdminUsersType): Promise<ServiceResponse<BoomUser[]>>;
    generateCustomToken(uid: string, options: object): Promise<string>;
    updateProfileById(uid: string, data: BoomUser): Promise<WriteResult>;
    updateManyProfilesById(profiles: AllOptionalExceptFor<BoomUser, 'uid'>[]): Promise<WriteResult[]>;
}
