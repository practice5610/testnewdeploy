"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, publicMessage, diagnosticsData) {
        super(message);
        this.name = 'AppError';
        this.message = message;
        this.publicMessage = publicMessage;
        this.data = diagnosticsData;
    }
    toJSON() {
        return JSON.stringify({
            error: {
                name: this.name,
                message: this.message,
                data: this.data,
            },
        });
    }
}
exports.default = AppError;
//# sourceMappingURL=app-error.js.map