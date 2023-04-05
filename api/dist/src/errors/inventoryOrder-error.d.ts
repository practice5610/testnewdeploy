import AppError from './app-error';
export default class InventoryOrderError extends AppError {
    constructor(message: string, publicMessage: string, diagnosticsData: unknown);
}
