import { Offer } from '../models';
import { OfferRepository } from '../repositories';
import { APIResponse } from '../types';
import { ProductService } from './product.service';
export declare class OfferService {
    offerRepository: OfferRepository;
    productService: ProductService;
    constructor(offerRepository: OfferRepository, productService: ProductService);
    validateOffer(offer: Offer): Promise<APIResponse>;
}
