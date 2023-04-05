import AppError from './app-error';
export default class OrderError extends AppError {
    constructor(message: string, publicMessage: string, diagnosticsData: unknown);
}
