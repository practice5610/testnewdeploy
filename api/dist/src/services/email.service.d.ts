import { AccountInfoQueryTypes, BoomUser } from '@boom-platform/globals';
import { ClientResponse } from '@sendgrid/client/src/response';
import { MailData } from '@sendgrid/helpers/classes/mail';
export declare class EmailService {
    gateway: any;
    mailGenerator: any;
    constructor();
    send(mailOptions: MailData): Promise<[ClientResponse, {}]>;
    sendAppError(subject: string, title: string, dictionary: Record<string, unknown>): Promise<void>;
    sendConfirmationToCustomer({ customer, customerEmail, subject, intro, instructions, buttonLabel, buttonLink, dictionary, }: {
        customer: BoomUser | null;
        customerEmail: string;
        subject: string;
        intro: string;
        instructions?: string;
        buttonLabel?: string;
        buttonLink?: string;
        dictionary?: Record<string, unknown>;
    }): Promise<[ClientResponse, {}]>;
    sendAccountInfoToUser({ user, pin, type, }: {
        user: BoomUser;
        pin: number;
        type: AccountInfoQueryTypes;
    }): Promise<[ClientResponse, {}]>;
}
