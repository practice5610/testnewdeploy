import { ApplicationConfig } from '@loopback/core';
import { BoomPlatformApiApplication } from './application';
export declare class ExpressServer {
    private readonly app;
    readonly lbApp: BoomPlatformApiApplication;
    private server?;
    host: string;
    port: number;
    constructor(options?: ApplicationConfig);
    boot(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}
