let express = require('express');
let router = express.Router();

const gcloud = require('../services/gcloud');
const oauth = require('../services/oauth');

router.get('/', (req, res, next) => {
  let resources = gcloud.cloudresourcemanager;

  resources.projects.list({ auth: oauth.getClient(req) }, (err, projects) => {
     if (!err) {
       res.status(200).send(projects);
     } else {
       res.status(500).send(err.toString());
     }
   });
});

module.exports = router;
