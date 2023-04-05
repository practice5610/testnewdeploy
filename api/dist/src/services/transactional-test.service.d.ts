import { Options } from '@loopback/repository';
import { TransactionRepository } from '../repositories';
export declare class TransactionalTestService {
    private transactionRepository;
    constructor(transactionRepository: TransactionRepository);
    test(options?: Options): Promise<void>;
}
