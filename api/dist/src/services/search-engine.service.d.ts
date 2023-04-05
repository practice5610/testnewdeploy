import { APIResponse } from '../types';
export declare class SearchEngineService {
    client: any;
    constructor();
    create(indexName: string, object: any, searchEngineOptions?: object): Promise<APIResponse>;
    update(indexName: string, id: string, object: any, searchEngineOptions?: object): Promise<APIResponse>;
    delete(objectID?: string, searchEngineOptions?: object): Promise<APIResponse>;
    searchByObjectId(indexName: string, objectIDs: string[], searchEngineOptions?: object): Promise<APIResponse>;
    updateManyObjects(indexName: string, objects: any, searchEngineOptions?: object): Promise<APIResponse>;
}
