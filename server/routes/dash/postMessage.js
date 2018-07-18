const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;
  console.log(req.body);
  res.send('Message Sent');

  db.saveMeetings(body.notes, body.message, body.student, Date.now());

  slackbot.postMessage(body.message, body.student);
  slackbot.setReminder('Respond to LindenBot', body.reminder, body.student);
});

module.exports = router;
