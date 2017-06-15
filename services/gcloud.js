const google = require('googleapis');

module.exports = {
  container: google.container('v1'),
  cloudresourcemanager: google.cloudresourcemanager('v1')
};
