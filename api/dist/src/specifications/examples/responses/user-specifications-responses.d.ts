import { APIResponseMessages } from '../../../constants';
export declare const GETAdminUsersResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: import("@boom-platform/globals").AllOptionalExceptFor<import("@boom-platform/globals").BoomUser, "roles" | "uid" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "contact" | "addresses">[];
    };
};
export declare const GETAdminUserResponseExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: import("@boom-platform/globals").AllOptionalExceptFor<import("@boom-platform/globals").BoomUser, "roles" | "uid" | "createdAt" | "updatedAt" | "firstName" | "lastName" | "contact" | "addresses">;
    };
};
export declare const GETUserTransferReceiverProfileExamples: {
    SUCCESS: {
        success: boolean;
        message: APIResponseMessages;
        data: import("@boom-platform/globals").BoomUser;
    };
};
export declare const POSTUsersVerifyPhoneNumberExamples: {
    SUCCESS: {
        success: boolean;
        message: string;
        data: {
            foundAccount: boolean;
        };
    };
};
export declare const POSTAdminUserExamples: {
    SUCCESS: {
        success: boolean;
        message: string;
        data: {
            uid: string;
            email: string | undefined;
            emailVerified: boolean;
            disabled: boolean;
            metadata: {
                lastSignInTime: null;
                creationTime: string;
            };
            tokensValidAfterTime: string;
            providerData: {
                uid: string | undefined;
                email: string | undefined;
                providerId: string;
            }[];
        };
    };
};
