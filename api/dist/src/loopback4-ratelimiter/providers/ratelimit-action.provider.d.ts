/// <reference types="express" />
import { Provider } from '@loopback/core';
import { Getter } from '@loopback/repository';
import { Request, Response } from '@loopback/rest';
import { RateLimitAction, RateLimitMetadata, RateLimitOptions } from '../types';
export declare class RatelimitActionProvider implements Provider<RateLimitAction> {
    private readonly getMetadata;
    private readonly config;
    constructor(getMetadata: Getter<RateLimitMetadata>, config: RateLimitOptions);
    value(): RateLimitAction;
    action(request: Request, response: Response): Promise<void>;
}
