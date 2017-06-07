
const  google = require('googleapis');
const  OAuth2 = google.auth.OAuth2;
const  YOUR_CLIENT_ID = // add client
const  YOUR_CLIENT_SECRET = // add secret
const  AUTH_URL = "http://localhost:5555/auth/"

module.exports.auth =  (credentials =
  {clientID:YOUR_CLIENT_ID, secrets:YOUR_CLIENT_SECRET, url : AUTH_URL}, scope)=>
  {
var oauth2Client = new OAuth2(
  credentials.clientID,
  credentials.secrets,
  "http://localhost:5555/auth/"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/cloud-platform'
];

var url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
//  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,

  // Optional property that passes state parameters to redirect URI
  // state: { foo: 'bar' }
});
console.log(url);

return {authClient: oauth2Client, authUrl : url};
}
