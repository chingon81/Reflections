const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getUsers();
  const users = [];

  Object.keys(data).forEach((item) => {
    users.push([item, data[item]]);
  });
  const userStatus = [];
  let meetId;
  users.forEach((user) => {
    userStatus.push(user[0], [1]);
    db.findLastMeeting(event.user, (dbData) => {
      meetId = dbData.rows[dbData.rows.length - 1].id;
      db.checkStatus(meetId, (response) => {
        if (response === null) {
          return user.status.push(0);
        }
        return user.status.push(1);
      });
    });
  });

  res.send(userStatus);
});

module.exports = router;
