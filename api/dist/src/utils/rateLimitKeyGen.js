"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitKeyGen = void 0;
const rateLimitKeyGen = (req) => {
    var _a, _b;
    const token = ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.replace(/Bearer /i, '')) || '';
    //console.log('token', token);
    return token;
};
exports.rateLimitKeyGen = rateLimitKeyGen;
//# sourceMappingURL=rateLimitKeyGen.js.map