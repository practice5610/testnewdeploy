"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
const generateRandomNumber = (min, max) => {
    return Math.floor(min + (max - min) * Math.random());
};
exports.generateRandomNumber = generateRandomNumber;
//# sourceMappingURL=math.js.map