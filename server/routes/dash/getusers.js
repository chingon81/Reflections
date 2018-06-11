const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

const x = function () {
  return new Promise((res, rej) => {
    const data = slackbot.getUsers();

    const users = Object.keys(data).map(user => [user, data[user]]);
    const queryList = Object.keys(data);
    const queryResult = [];
    const formattedUsers = {};


    db.collierSKYN(queryList).then((result) => {
      queryResult.push(...result.rows);
      queryResult.map((meeting) => {
        if (!(meeting.empslackid in formattedUsers)) {
          formattedUsers[meeting.empslackid] = [meeting];
          // console.log(formattedUsers[meeting.empslackid][0])
          formattedUsers[meeting.empslackid][0].name = data[meeting.empslackid];
        } else {
          formattedUsers[meeting.empslackid].push(meeting);
          formattedUsers[meeting.empslackid].slice(-1)[0].name = data[meeting.empslackid];
        }
      });
      const newUserList = users.map((user) => {
        if (!formattedUsers[user[0]]) {
          user.push(0);
          formattedUsers[user[0]] = [user];
        } else if (formattedUsers[user[0]].slice(-1)[0].meetid === null) {
          console.log('THISTHISTHIS:', formattedUsers[user[0]].slice(-1)[0].meetid);
          user.push(1);
          formattedUsers[user[0]].unshift(user);
        } else {
          user.push(2);
          formattedUsers[user[0]].unshift(user);
        }
      });
      console.log(formattedUsers);
      res(formattedUsers);
    }).catch(console.error);
  });
};


router.get('/', (req, res) => {
  x().then(result => res.send(result));
});

module.exports = router;
