let express = require('express');
let router = express.Router();

const gcloud = require('../services/gcloud');
const oauth = require('../services/oauth');

router.get('/', (req, res, next) => {
  let container = gcloud.container;

  container.projects.zones.clusters.list({
    auth: oauth.getClient(req),
    projectId: req.query.project,
    zone: '-'
  }, (err, clusters) => {
     if (!err) {
       res.status(200).send(clusters);
     } else {
       res.status(500).send(err.toString());
     }
   });

});

module.exports = router;
