const ENVIRONMENT = {
    DEVELOPMENT: 'DEVELOPMENT',
    STAGING: 'STAGING',
    PRODUCTION: 'PRODUCTION',
} as const;

const HOST = {
    DEVELOPMENT: 'https://oldybe.herokuapp.com',
    STAGING: 'https://oldybe.herokuapp.com',
    PRODUCTION: 'https://oldybe.herokuapp.com',
} as const;

const environment = ENVIRONMENT.DEVELOPMENT;

export default {
    HOST_URL: HOST[environment],
    getLoginEndpoint(): string {
        return `${this.HOST_URL}/api/login`;
    },
    getRegistrationEndPoint(): string {
        return `${this.HOST_URL}/api/registration`;
    },
    getVerifyOTPEndPoint(): string {
        return `${this.HOST_URL}/api/registration/verification`;
    },
    getProfileEndPoint(): string {
        return `${this.HOST_URL}/api/profile`;
    },
    getForgotEndPoint(): string {
        return `${this.HOST_URL}/api/password/forgot`;
    },
    getChangePasswordEndPoint(): string {
        return `${this.HOST_URL}/api/profile/password`;
    },
};
