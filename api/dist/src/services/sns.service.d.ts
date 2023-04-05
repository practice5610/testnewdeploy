import AWS from 'aws-sdk';
export declare class SNSService {
    sns: AWS.SNS;
    constructor();
    sendSMS(params: AWS.SNS.PublishInput): Promise<{
        success: boolean;
        message?: string;
    }>;
}
