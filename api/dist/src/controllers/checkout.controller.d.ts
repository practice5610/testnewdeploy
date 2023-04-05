/// <reference types="express" />
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Booking, Transaction } from '../models';
import { OfferRepository, ProductRepository } from '../repositories';
import { EmailService } from '../services/email.service';
import { PurchaseService } from '../services/purchase.service';
export declare class CheckoutController {
    offerRepository: OfferRepository;
    productRepository: ProductRepository;
    protected response: Response;
    private purchaseService;
    private emailService;
    logger: Logger;
    constructor(offerRepository: OfferRepository, productRepository: ProductRepository, response: Response, purchaseService: PurchaseService, emailService: EmailService);
    create(bookings: Booking[]): Promise<Transaction | Response>;
    placeOrder(order: any): Promise<Response>;
}
