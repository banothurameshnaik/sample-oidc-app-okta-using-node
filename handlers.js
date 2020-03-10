const axios = require('axios').default;

const { parseCookies } = require('./helpers.js');

const {
    oktaBaseUrl,
    oktaClientId,
    oktaRedirectUrl,
    accessTokenKey,
} = require('./config.js');

const welcomeHandler = async (req, res) => {
    const access_token = parseCookies(req).access_token;
    if (access_token) {
        const user = await getUserProfile(access_token);
        res.status(200).json({
            page: 'User Profile',
            user: user,
        });
    } else {
        const login_redirect_url = `${oktaBaseUrl}/v1/authorize?client_id=${oktaClientId}&redirect_uri=${oktaRedirectUrl}&response_type=token&response_mode=form_post&scope=openid%20profile%20email%20address%20phone&nonce=ce01ee1b-0670-4e92-9116-42c5cfa199c0&state=homepage`;
        console.log('login_redirect_url', login_redirect_url);
        return res.redirect(login_redirect_url);
    }
}


const callbackHandler = (req, res) => {
    if (req.body.access_token) {
        // Set the access_token to localStorage
        // localStorage.setItem(accessTokenKey, req.body.access_token);
        console.log(req.body);
        res.cookie(accessTokenKey, req.body.access_token);
        console.log('Login Success, redirecting user page', req.body.access_token);
        return res.redirect('/');
    } else {
        res.status(200).json({
            page: 'User Login Callback',
            params: req.params,
            query: req.query,
            body: req.body,
            cookies: parseCookies(req),
        });
    }
};

const logoutHandler = (req, res) => {
    res.status(200).json({
        page: 'User Logout',
        params: req.params,
        query: req.query,
        cookies: parseCookies(req),
    });
};

const getUserProfile = async (access_token) => {
    console.log('Getting user details with access token', access_token);
    try {
        const response = await axios.get(`${oktaBaseUrl}/v1/userinfo`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log('Error occurred while getting - No access token found', access_token, error);
        return {};
    }
}


module.exports = {
    callbackHandler,
    logoutHandler,
    welcomeHandler,
};