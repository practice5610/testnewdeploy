/// <reference types="express" />
import { AccountInfoQueryTypes, AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { BoomCardRepository } from '../repositories';
import { ProfileService } from '../services';
import { EmailService } from '../services/email.service';
import { SNSService } from '../services/sns.service';
export declare class AccountController {
    boomCardRepository: BoomCardRepository;
    private snsService;
    protected response: Response;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    private profileService;
    private emailService;
    logger: Logger;
    constructor(boomCardRepository: BoomCardRepository, snsService: SNSService, response: Response, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, profileService: ProfileService, emailService: EmailService);
    sendAccountInfoViaSMS(body: {
        type: AccountInfoQueryTypes;
        id: string;
    }): Promise<Response>;
    sendAccountInfoViaEmail(body: {
        type: AccountInfoQueryTypes;
        id: string;
    }): Promise<Response>;
}
