/// <reference types="express" />
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { BoomCardRepository } from '../repositories';
import { SNSService } from '../services/sns.service';
export declare class SMS {
    boomCardRepository: BoomCardRepository;
    private snsService;
    protected response: Response;
    logger: Logger;
    constructor(boomCardRepository: BoomCardRepository, snsService: SNSService, response: Response);
    create(body: {
        token: string;
        phone: string;
    }): Promise<Response>;
}
