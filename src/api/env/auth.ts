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
    getRefreshTokenPoint(): string {
        return `${this.HOST_URL}/api/login/refreshToken`;
    },
    getRegistrationEndPoint(): string {
        return `${this.HOST_URL}/api/registration`;
    },
    getVerifyOTPEndPoint(): string {
        return `${this.HOST_URL}/api/registration/verification`;
    },
    getForgotEndPoint(): string {
        return `${this.HOST_URL}/api/password/forget`;
    },
    getChangePasswordEndPoint(): string {
        return `${this.HOST_URL}/api/password/change-password`;
    },
};
