const ENVIRONMENT = {
    DEVELOPMENT: "DEVELOPMENT",
    STAGING: "STAGING",
    PRODUCTION: "PRODUCTION",
} as const;
  
const HOST = {
    DEVELOPMENT: "https://fitec-system.dumban.com",
    STAGING: "https://fitec-system.dumban.com",
    PRODUCTION: "https://fitec-system.dumban.com",
} as const;

const environment = ENVIRONMENT.DEVELOPMENT;

export default {
    HOST_URL: HOST[environment],
    getLoginEndpoint() {
      return this.HOST_URL + "/api/login";
    },
    getRegistrationEndPoint() {
      return this.HOST_URL + "/api/registration";
    },
    getVerifyOTPEndPoint() {
      return this.HOST_URL + "/api/registration/verification";
    },
    getProfileEndPoint() {
      return this.HOST_URL + "/api/profile";
    },
    getForgotEndPoint() {
      return this.HOST_URL + "/api/password/forgot";
    },
    getChangePasswordEndPoint() {
      return this.HOST_URL + "/api/profile/password";
    },
};
  