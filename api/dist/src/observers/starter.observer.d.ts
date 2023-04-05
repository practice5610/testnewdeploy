import { LifeCycleObserver } from '@loopback/core';
import { Logger } from 'log4js';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class StarterObserver implements LifeCycleObserver {
    logger: Logger;
    private app;
    constructor();
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
