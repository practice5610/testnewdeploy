"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchEngineService = void 0;
const { Client } = require('@elastic/elasticsearch');
class SearchEngineService {
    constructor() {
        if (process.env.ELASTIC_SEARCH_CLOUD_ID && process.env.ELASTIC_SEARCH_ENDPOINT) {
            this.client = new Client({
                node: process.env.ELASTIC_SEARCH_ENDPOINT,
                maxRetries: 5,
                requestTimeout: 60000,
                cloud: {
                    id: process.env.ELASTIC_SEARCH_CLOUD_ID,
                },
                auth: {
                    username: process.env.ELASTIC_SEARCH_USER,
                    password: process.env.ELASTIC_SEARCH_PW,
                },
            });
        }
        else {
            throw new Error('At least one Elastic Search environment variable was not found.');
        }
    }
    async create(indexName, 
    //TODO: define type
    // eslint-disable-next-line
    object, searchEngineOptions = {}) {
        var _a;
        try {
            const result = await this.client.index(Object.assign({ index: indexName, body: object }, searchEngineOptions));
            /*
            result looks like this:
            {
              body: object | boolean
              statusCode: number
              headers: object
              warnings: [string],
              meta: object
            }
            https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-usage.html
             */
            return {
                success: true,
                message: 'Success',
                data: { _id: result.body._id, statusCode: result.statusCode },
            };
        }
        catch (error) {
            if ((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.body)
                console.error(error.meta.body);
            console.error(error);
            return { success: false, message: 'Failed to submit item to search engine' };
        }
    }
    //The diff between update and create is that update will expect and id attribute as part of the body object:
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/update_examples.html
    async update(indexName, id, 
    //TODO: define type
    // eslint-disable-next-line
    object, searchEngineOptions = {}) {
        var _a;
        try {
            //TODO: Must test if this way of doing it lets you do partial updates. The idea with update is for partial updating if I remember correctly
            await this.client.update(Object.assign({ index: indexName, id, body: {
                    doc: object,
                } }, searchEngineOptions));
        }
        catch (error) {
            if ((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.body)
                console.error(error.meta.body);
            console.error(`Error updating object with ID of: ${id}`, error);
            return { success: false, message: 'Failed to update item on search engine' };
        }
        return { success: true, message: 'Success' };
    }
    async delete(objectID, searchEngineOptions = {}) {
        var _a;
        try {
            await this.client.delete(Object.assign({ id: objectID, index: process.env.SEARCH_ENGINE_STORES_INDEX }, searchEngineOptions));
        }
        catch (error) {
            if ((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.body)
                console.error(error.meta.body);
            console.error(error);
            return { success: false, message: `Error deleting item: ${objectID}` };
        }
        return { success: true, message: 'Success' };
    }
    async searchByObjectId(indexName, objectIDs, searchEngineOptions = {}) {
        var _a;
        try {
            const result = await this.client.search(Object.assign(Object.assign({ index: indexName }, searchEngineOptions), { body: {
                    query: {
                        terms: {
                            _id: objectIDs,
                        },
                    },
                } }));
            return { success: true, message: 'Success', data: result.hits };
        }
        catch (error) {
            if ((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.body)
                console.error(error.meta.body);
            console.error(error);
            return { success: false, message: `Error searching objects by ID: ${objectIDs.join(',')}` };
        }
    }
    async updateManyObjects(indexName, 
    //TODO: define type
    // eslint-disable-next-line
    objects, searchEngineOptions = {}) {
        var _a;
        try {
            //https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/7.x/bulk_examples.html
            await this.client.bulk(Object.assign(Object.assign({ index: indexName }, searchEngineOptions), { body: objects }));
            return { success: true, message: 'Success' };
        }
        catch (error) {
            if ((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.body)
                console.error(error.meta.body);
            console.error(error);
            return { success: false, message: 'Error updating search engine items in bulk.' };
        }
    }
}
exports.SearchEngineService = SearchEngineService;
//# sourceMappingURL=search-engine.service.js.map