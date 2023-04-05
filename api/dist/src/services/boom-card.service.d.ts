import { Count, Filter, Where } from '@loopback/repository';
import { Logger } from 'log4js';
import { BoomCard } from '../models';
import { BoomCardRepository } from '../repositories';
import { ServiceResponse } from '../types';
export declare class BoomCardService {
    boomCardRepository: BoomCardRepository;
    logger: Logger;
    constructor(boomCardRepository: BoomCardRepository);
    createBoomCards(boomCards: BoomCard[]): Promise<ServiceResponse<BoomCard[]>>;
    countBoomCards(where: Where<BoomCard> | undefined): Promise<ServiceResponse<Count>>;
    findBoomCards(filter: Filter<BoomCard> | undefined): Promise<ServiceResponse<BoomCard[]>>;
    findBoomCardById(id: string): Promise<ServiceResponse<BoomCard>>;
}
