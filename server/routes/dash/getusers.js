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
  // console.log('USERS', users);
  const userStatus = [];
  users.forEach((user) => {
    let meetId;
    const oneUser = [];
    oneUser.push(user[0], user[1]);
    db.findLastMeeting(user[0], (res) => {
      console.log('FINDLASTMEETINGRES:', res);
      if (res.rows.length) {
        meetId = res.rows[res.rows.length - 1].id;
      }else{
        oneUser.push(0)
      }
      console.log('THIS IS THE MEET ID:', meetId);
    });

    db.checkStatus(meetId, (res) => {
      console.log('result for each student:', res);
      if (res === null) {
        oneUser.push(1);
      } else {
        oneUser.push(2);
      }
    });
    userStatus.push(oneUser);
  });

  console.log('USERSTATUS:', userStatus);

  res.send(userStatus);
});

module.exports = router;
