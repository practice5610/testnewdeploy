"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SNSService = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const secretAccessKey = process.env.AWS_API_KEY;
const accessKeyId = process.env.AWS_API_KEY_ID;
const region = 'us-west-2';
class SNSService {
    constructor() {
        aws_sdk_1.default.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: region,
        });
        this.sns = new aws_sdk_1.default.SNS();
    }
    async sendSMS(params) {
        try {
            await this.sns.publish(params).promise();
            return { success: true };
        }
        catch (error) {
            console.error(error);
            return { success: false, message: 'Could not send SMS message' };
        }
    }
}
exports.SNSService = SNSService;
//# sourceMappingURL=sns.service.js.map