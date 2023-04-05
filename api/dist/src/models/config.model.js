"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const repository_1 = require("@loopback/repository");
/**
 * double check all of these as I have no idea what config is supposed to be...
 */
let Config = class Config extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        name: '_id',
        description: 'Unique ID created by MongoDB',
        mongodb: { dataType: 'ObjectID' },
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], Config.prototype, "_id", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Config.prototype, "createdAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: '',
        description: '',
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Config.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'type',
        description: 'The type of configuration being made',
        /**
         * I'm not sure if this is correct
         */
        type: 'string',
        jsonSchema: {
            enum: Object.values(globals_1.AdminConfigType),
        },
    }),
    tslib_1.__metadata("design:type", String)
], Config.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'label',
        description: 'The label a user will see of a particular configuration',
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Config.prototype, "label", void 0);
tslib_1.__decorate([
    repository_1.property({
        name: 'value',
        description: 'The value of the configuration',
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], Config.prototype, "value", void 0);
Config = tslib_1.__decorate([
    repository_1.model({ name: 'configs', settings: {} }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Config);
exports.Config = Config;
//# sourceMappingURL=config.model.js.map