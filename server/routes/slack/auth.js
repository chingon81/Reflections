const express = require('express');
const request = require('request-promise-native');
const dotenv = require('dotenv');

const router = express.Router();

dotenv.config({
  silent: true,
});

router.get('/', (req, res) => {
  const code = req.query.code;
  const options = {
    method: 'GET',
    url: `https://slack.com/api/oauth.access?client_id=${
      process.env.LOGIN_CLIENT_ID
    }&client_secret=${
      process.env.LOGIN_CLIENT_SECRET
    }&code=${code}&redirect_uri=http://206.189.170.211/reflections/slack/auth`,
  };
  request(options)
    .then((user) => {
      console.log(user);
      const parsed = JSON.parse(user);
      if (parsed.access_token) {
        req.session.isAuthenticated = true;
        res.redirect('/reflections');
      } else {
        res.redirect('/reflections/failedLogin'); // TODO
      }
    })
    .catch(console.error);
});

module.exports = router;
