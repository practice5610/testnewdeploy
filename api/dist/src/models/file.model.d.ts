import { Entity } from '@loopback/repository';
export declare class File extends Entity {
    name?: string;
    size?: number;
    constructor(data?: Partial<File>);
}
