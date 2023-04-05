/// <reference types="node" />
import { Stream } from 'stream';
import { File, StorageContainer } from '../models';
export declare type Callback<T> = (err: Error | null, reply: T) => void;
export interface IStorageService {
    createContainer(container: Partial<StorageContainer>, cb: Callback<StorageContainer>): void;
    destroyContainer(containerName: string, cb: Callback<boolean>): void;
    getContainers(cb: Callback<StorageContainer[]>): void;
    getContainer(containerName: string, cb: Callback<StorageContainer>): void;
    getFiles(containerName: string, options?: Record<string, any>, cb?: Callback<File[]>): void;
    getFile(containerName: string, fileName: string, cb: Callback<File>): void;
    removeFile(containerName: string, fileName: string, cb: Callback<boolean>): void;
    upload(containerName: string, req: any, res: any, options: Record<string, any>, cb: Callback<any>): void;
    download(containerName: string, fileName: string, req: any, res: any, cb: Callback<any>): void;
    downloadStream(container: string, fileName: string, options?: object): Stream;
    uploadStream(container: string, fileName: string, options?: object): Stream;
}
