let express = require('express');
let router = express.Router();
let oauth = require('../services/oauth');

router.get('/', (req, res, next) => {
  res.redirect(oauth.getClient().generateAuthUrl({ scope: oauth.scopes }));
});

router.get('/success', (req, res, next) => {
  let code = req.query.code;

  oauth.getClient().getToken(code, (err, tokens) => {
    if (!err) {
      oauth.getClient().setCredentials(tokens);
      res.status(200).send(tokens);
    } else {
      res.status(500).send(err);
    }
  });

});


module.exports = router;
