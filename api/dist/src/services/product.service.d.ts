import { Category } from '@boom-platform/globals';
import { Options } from '@loopback/repository';
import { Logger } from 'log4js';
import { Product, SearchRecordProduct } from '../models';
import { CategoryRepository, ProductRepository } from '../repositories';
import { SearchEngineService } from '../services';
import { APIResponse } from '../types';
export declare class ProductService {
    productRepository: ProductRepository;
    searchEngineService: SearchEngineService;
    categoryRepository: CategoryRepository;
    logger: Logger;
    constructor(productRepository: ProductRepository, searchEngineService: SearchEngineService, categoryRepository: CategoryRepository);
    deleteById(objectID: string, mongoID: string, options?: Options): Promise<void>;
    updateById(searchProduct: SearchRecordProduct, objectID: string, mongoID: string, newProduct: Product, options?: Options): Promise<void>;
    create(newProduct: Product, now: number, options?: Options): Promise<Product>;
    /**
     * Async method to validate if a Category is valid.
     * feel free to add more validation over a valid category as needed.
     * @param category
     * @return {Promise<APIResponse>}
     */
    validateCategory(category: Category): Promise<APIResponse>;
    /**
     * Async Method to validate if a Product exist and is valid.
     * feel free to add as many validation you need.
     * @param product
     * @return {Promise<APIResponse>}
     */
    validateProduct(product: Product): Promise<APIResponse>;
}
