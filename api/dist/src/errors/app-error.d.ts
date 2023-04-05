export default class AppError extends Error {
    data: unknown;
    publicMessage: string;
    constructor(message: string, publicMessage: string, diagnosticsData: unknown);
    toJSON(): string;
}
