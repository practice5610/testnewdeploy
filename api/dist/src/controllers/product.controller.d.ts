/// <reference types="express" />
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Product } from '../models';
import { ProductRepository } from '../repositories';
import { ProductService, ProfileService, SearchEngineService } from '../services';
export declare class ProductController {
    productRepository: ProductRepository;
    searchEngineService: SearchEngineService;
    protected response: Response;
    profileService: ProfileService;
    productService: ProductService;
    logger: import("log4js").Logger;
    constructor(productRepository: ProductRepository, searchEngineService: SearchEngineService, response: Response, profileService: ProfileService, productService: ProductService);
    /**
     * Converts Doba product xml into smaller json files of 1,000 products each
     * @param {Object} obj
     * @returns {Promise<Response>}
     * @memberof ProductController
     */
    batchCreate(obj: Record<string, any>): Promise<Response>;
    /**
     * Converts Doba product xml into smaller json files of 1,000 products each
     * @param {Object} obj
     * @returns {Promise<Response>}
     * @memberof ProductController
     */
    batchCreateResume(obj: Record<string, any>): Promise<Response>;
    create(products: Product[]): Promise<Response>;
    count(where?: Where<Product>): Promise<Response<Count>>;
    find(filter?: Filter<Product>): Promise<Response>;
    findById(id: string): Promise<Response>;
    updateById(id: string, product: Partial<Product>): Promise<Response>;
    deleteById(id: string): Promise<Response>;
}
