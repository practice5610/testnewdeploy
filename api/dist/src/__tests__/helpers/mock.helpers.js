"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fakeDefaultExport = void 0;
const fakeDefaultExport = (moduleRelativePath, stubs) => {
    if (require.cache[require.resolve(moduleRelativePath)]) {
        delete require.cache[require.resolve(moduleRelativePath)];
    }
    Object.keys(stubs).forEach((dependencyRelativePath) => {
        require.cache[require.resolve(dependencyRelativePath)] = {
            exports: stubs[dependencyRelativePath],
        };
    });
    return require(moduleRelativePath);
};
exports.fakeDefaultExport = fakeDefaultExport;
//# sourceMappingURL=mock.helpers.js.map