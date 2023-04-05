import { TransactionalTestService } from '../services';
export declare class TransactionalTestsController {
    transactionalTestService: TransactionalTestService;
    constructor(transactionalTestService: TransactionalTestService);
    patch(): Promise<void>;
}
