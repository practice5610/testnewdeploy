/// <reference types="express" />
import { AllOptionalExceptFor, APIResponse, BoomUser, Category } from '@boom-platform/globals';
import { Getter } from '@loopback/core';
import { Count, Filter, Where } from '@loopback/repository';
import { Response } from '@loopback/rest';
import { Logger } from 'log4js';
import { Category as CategoryModel } from '../models';
import { CategoryRepository } from '../repositories';
export declare class CategoryController {
    categoryRepository: CategoryRepository;
    currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>;
    protected response: Response;
    logger: Logger;
    constructor(categoryRepository: CategoryRepository, currentUserGetter: Getter<AllOptionalExceptFor<BoomUser, 'roles' | 'uid'> | undefined>, response: Response);
    createCategory(category: Omit<Required<Category>, 'createdAt' | 'updatedAt' | '_id'>): Promise<Response<APIResponse<Category>>>;
    countCategories(where?: Where<CategoryModel>): Promise<Response<APIResponse<Count>>>;
    find(filter?: Filter<CategoryModel>): Promise<Response<APIResponse<Category>>>;
    findById(id: string): Promise<Response<APIResponse<Category>>>;
    updateAll(category: Omit<Required<Category>, 'createdAt' | 'updatedAt' | '_id'>, where: Where<CategoryModel>): Promise<Response>;
    updateById(id: string, category: Omit<Category, 'createdAt' | 'updatedAt' | '_id'>): Promise<Response>;
    replaceById(id: string, category: Omit<Required<Category>, 'createdAt' | 'updatedAt' | '_id'>): Promise<Response>;
    deleteById(id: string): Promise<Response>;
}
