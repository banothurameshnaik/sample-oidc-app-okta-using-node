require('dotenv').config();

module.exports = {
    oktaBaseUrl: process.env.OKTA_BASE_URL,
    oktaClientId: process.env.OKTA_CLINET_ID,
    oktaRedirectUrl: process.env.OKTA_REDIRECT_URL,
    accessTokenKey: process.env.ACCESS_TOKEN_KEY ? process.env.ACCESS_TOKEN_KEY : 'access_token',
};