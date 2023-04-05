"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterAdminUsersSchemaObject = void 0;
const globals_1 = require("@boom-platform/globals");
const tempLocation_1 = require("../../utils/tempLocation");
/*export const FilterAdminUsersSchema = {
  ...FilterAdminUsersSchemaObject,
} as const;*/
exports.FilterAdminUsersSchemaObject = {
    //$schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    description: 'Filter used to get users records from Firebase',
    properties: {
        where: {
            type: 'object',
            properties: {
                uid: { type: 'string', description: "User's id to search for" },
                hasCards: { type: 'boolean', description: "Filter by users who have cards or haven't" },
                roles: {
                    type: 'array',
                    items: { enum: [globals_1.RoleKey.Member, globals_1.RoleKey.Merchant] },
                    description: 'Filter by roles, only one role can be set, member or merchant, not both',
                },
                createdAt: {
                    type: 'string',
                    pattern: tempLocation_1.TimeRangeRegex.source,
                    description: 'Unix time, it could be a fixed time to start the search, or a time range',
                },
            },
            additionalProperties: false,
        },
    },
    required: ['where'],
    additionalProperties: false,
};
//# sourceMappingURL=filters.js.map