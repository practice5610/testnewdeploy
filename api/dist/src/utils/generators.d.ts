import { AllOptionalExceptFor, BoomUser } from '@boom-platform/globals';
import { Product } from '../models';
import { XMLSourceProduct } from '../types/sources';
export declare const generateProduct: (product: XMLSourceProduct, user: AllOptionalExceptFor<BoomUser, 'uid' | 'store' | 'firstName' | 'lastName'>) => Product;
