const scopes = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/cloudplatformprojects.readonly'
];

const redirectUrl = `http://localhost:5555/auth/success/`;

const  google = require('googleapis');
const  OAuth2 = google.auth.OAuth2;
const  GC_AUTH_CLIENT_ID = process.env.GC_AUTH_CLIENT_ID;
const  GC_AUTH_CLIENT_SECRET = process.env.GC_AUTH_CLIENT_SECRET;

const createNewClient = () => {
  return new OAuth2(
    GC_AUTH_CLIENT_ID,
    GC_AUTH_CLIENT_SECRET,
    redirectUrl
  );
}

const getClient = (req) => {
  if (req && req.query.token) {
    let oauthClient = createNewClient();
    oauthClient.setCredentials({ access_token: req.query.token });
    return oauthClient;
  } else {
    return defaultClient;
  }
};

const defaultClient = createNewClient();

module.exports = {
  getClient,
  scopes
};
