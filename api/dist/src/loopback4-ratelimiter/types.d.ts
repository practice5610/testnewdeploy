/// <reference types="express" />
import { Request, Response } from '@loopback/rest';
import { Options } from 'express-rate-limit';
export interface DataSourceConfig {
    name: string;
}
export interface RateLimitAction {
    (request: Request, response: Response): Promise<void>;
}
export declare type RateLimitOptions = Options & DataSourceConfig;
/**
 * Rate limit metadata interface for the method decorator
 */
export interface RateLimitMetadata {
    enabled: boolean;
    options?: Options;
}
