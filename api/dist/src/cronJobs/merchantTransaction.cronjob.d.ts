import { CronJob } from '@loopback/cron';
import { Logger } from 'log4js';
export declare class MerchantTransactionCronJob extends CronJob {
    logger: Logger;
    private leaseService;
    constructor();
}
