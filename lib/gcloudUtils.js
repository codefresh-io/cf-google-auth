const kefir = require('kefir');
const Auth  = require('../index').auth;
const  google = require('googleapis');

class GCloudUtils{
  constructor(credentials){
    this.auth = Auth(credentials);
  }
  getUrl(){
    return this.auth.url;
  };

  setAuthClient(client){
    this.authClient = client;
  }
  getProjects(callback){
    let cloudResourceManager = google.cloudresourcemanager('v1');
    cloudResourceManager.projects.list({
      auth: this.authClient,
    },  callback)
  }

  getClusters(projetId, callback){
    let container = google.container('v1');
    let request = {
      projectId:projetId,
      zone: '-',  // TODO: Update placeholder value.
      auth: this.authClient
    }
    container.projects.zones.clusters.list(request, callback)

  }
}

module.exports = GCloudUtils;
