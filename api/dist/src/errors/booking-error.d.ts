import AppError from './app-error';
export default class BookingError extends AppError {
    constructor(message: string, publicMessage: string, diagnosticsData: unknown);
}
