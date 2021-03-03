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
    getPostpoint(): string {
        return `${this.HOST_URL}/api/post`;
    },
};
