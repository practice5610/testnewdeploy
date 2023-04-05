"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const tslib_1 = require("tslib");
const globals_1 = require("@boom-platform/globals");
const mail_1 = tslib_1.__importDefault(require("@sendgrid/mail"));
// @ts-ignore
const mailgen_1 = tslib_1.__importDefault(require("@silverstone/mailgen"));
const boomAdminEmail = process.env.BOOM_TECHNICAL_ADMIN_EMAIL || 'noel@boomcarding.com';
class EmailService {
    constructor() {
        this.mailGenerator = new mailgen_1.default({
            theme: 'default',
            product: {
                name: 'Boom',
                link: process.env.DOMAIN_SOURCE,
                logo: `${process.env.DOMAIN_SOURCE}/assets/logo-business.png`,
            },
        });
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || '');
    }
    async send(mailOptions) {
        return mail_1.default.send(mailOptions);
    }
    async sendAppError(subject, title, dictionary) {
        let html = this.mailGenerator.generate({
            body: {
                title,
                dictionary,
                hideSignature: true,
            },
        });
        const css = '.email-masthead { background-color: #d52c25; } .email-footer { background-color: #191919; }</style>';
        html = html.replace(/<\/style>/, css);
        await this.send({
            to: boomAdminEmail,
            from: 'Boom Admin <noreply@boomcarding.com>',
            subject: subject,
            html: html,
        });
    }
    async sendConfirmationToCustomer({ customer, customerEmail, subject, intro, instructions, buttonLabel, buttonLink, dictionary, }) {
        return this.send({
            to: customerEmail,
            from: 'Boom Rewards <noreply@boomcarding.com>',
            subject: subject,
            html: this.mailGenerator.generate({
                body: {
                    name: ((customer === null || customer === void 0 ? void 0 : customer.firstName) || '') + ((customer === null || customer === void 0 ? void 0 : customer.lastName) ? ' ' + (customer === null || customer === void 0 ? void 0 : customer.lastName) : ''),
                    intro,
                    dictionary,
                    action: {
                        instructions,
                        button: buttonLabel && buttonLink
                            ? {
                                color: '#d52c25',
                                text: buttonLabel,
                                link: buttonLink,
                            }
                            : {},
                    },
                    hideSignature: true,
                },
            }),
        });
    }
    async sendAccountInfoToUser({ user, pin, type, }) {
        var _a, _b;
        if (!((_b = (_a = user === null || user === void 0 ? void 0 : user.contact) === null || _a === void 0 ? void 0 : _a.emails) === null || _b === void 0 ? void 0 : _b.length)) {
            throw new Error('Could not complete request. User does not have an email address..');
        }
        // We may support other kinds later
        if (type !== globals_1.AccountInfoQueryTypes.BoomcardPin) {
            throw new Error('Currently this function only supports a Boom card pin info request');
        }
        return this.send({
            to: user.contact.emails[0],
            from: 'Boom Rewards <noreply@boomcarding.com>',
            subject: 'Your account info',
            html: this.mailGenerator.generate({
                body: {
                    name: (user.firstName || '') + (user.lastName ? ' ' + user.lastName : ''),
                    intro: `Your Boom card pin is ${pin}`,
                    hideSignature: true,
                },
            }),
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map