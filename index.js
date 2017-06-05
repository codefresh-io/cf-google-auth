
const  google = require('googleapis');
const  OAuth2 = google.auth.OAuth2;
const  YOUR_CLIENT_ID = ""; // add client
const  YOUR_CLIENT_SECRET = ""; // add secret

var oauth2Client = new OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  "http://localhost:5555/auth/"
);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/calendar'
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

module.exports.URL = url;
module.exports.client  = oauth2Client;
