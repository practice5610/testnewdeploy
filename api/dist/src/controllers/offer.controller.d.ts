/// <reference types="express" />
import { Category } from '@boom-platform/globals';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Offer } from '../models';
import { CategoryRepository, OfferRepository, ProductRepository } from '../repositories';
import { SearchEngineService } from '../services/search-engine.service';
interface IsValidResponse {
    success: boolean;
    message: string;
}
export declare class OfferController {
    offerRepository: OfferRepository;
    productRepository: ProductRepository;
    searchEngineService: SearchEngineService;
    protected response: Response;
    categoryRepository: CategoryRepository;
    constructor(offerRepository: OfferRepository, productRepository: ProductRepository, searchEngineService: SearchEngineService, response: Response, categoryRepository: CategoryRepository);
    isCategoryValid(category: Category): Promise<IsValidResponse>;
    create(offer: Offer): Promise<Offer | Response>;
    count(where?: Where<Offer>): Promise<Count>;
    find(filter?: Filter<Offer>): Promise<Offer[]>;
    findById(id: string): Promise<Offer>;
    updateById(id: string, incomingOffer: Offer): Promise<void | Response>;
    deleteById(id: string): Promise<void | Response>;
}
export {};
