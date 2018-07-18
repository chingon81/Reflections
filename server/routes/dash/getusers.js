const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

function formatUsers() {
  return new Promise((res) => {
    const data = slackbot.getUsers();

    const users = Object.keys(data).map((user) => [user, data[user]]);
    const queryList = Object.keys(data);
    const queryResult = [];
    const formattedUsers = {};

    db.checkStatus(queryList)
      .then((result) => {
        queryResult.push(...result.rows);
        queryResult.forEach((meeting) => {
          if (!(meeting.empslackid in formattedUsers)) {
            formattedUsers[meeting.empslackid] = [meeting];
            formattedUsers[meeting.empslackid][0].name = data[meeting.empslackid];
            return meeting.empslackid;
          }
          formattedUsers[meeting.empslackid].push(meeting);
          formattedUsers[meeting.empslackid].slice(-1)[0].name = data[meeting.empslackid];
          return meeting.empslackid;
        });
        users.map((user) => {
          if (!formattedUsers[user[0]]) {
            user.push(0);
            formattedUsers[user[0]] = [user];
            return user[0];
          } else if (formattedUsers[user[0]].slice(-1)[0].meetid === null) {
            user.push(1);
            formattedUsers[user[0]].unshift(user);
            return user[0];
          }
          user.push(2);
          formattedUsers[user[0]].unshift(user);
          return user[0];
        });
        res(formattedUsers);
      })
      .catch(console.error);
  });
}

router.get('/', (req, res) => {
  formatUsers().then(result => res.send(result));
});

module.exports = router;
