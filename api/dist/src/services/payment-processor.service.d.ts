import { ProcessEMVSREDRequest } from '../types/processEMVSRED-request';
/**
 * Class in charge of processing payments from the POS Tablet's chip card reader
 */
export declare class PaymentProcessorService {
    client: any;
    logger: import("log4js").Logger;
    ProcessEMVSRED(payinfo: ProcessEMVSREDRequest[]): Promise<any>;
}
