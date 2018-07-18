const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

async function formatUsers() {
  const data = slackbot.getUsers();

  const users = Object.keys(data).map(user => [user, data[user]]);
  const queryList = Object.keys(data);
  const queryResult = [];

  const result = await db.checkStatus(queryList).catch(err => err);
  queryResult.push(...result.rows);

  const formattedUsers = queryResult.reduce((acc, meeting) => {
    const slackid = meeting.empslackid;
    if (!(slackid in acc)) {
      acc[slackid] = [meeting];
      acc[slackid][0].name = data[slackid];
      return acc;
    }
    acc[meeting.empslackid].push(meeting);
    acc[meeting.empslackid].slice(-1)[0].name = data[meeting.empslackid];
    return acc;
  }, {});

  users.forEach(function userMap(user) {
    const userid = user[0];
    if (!this[userid]) {
      user.push(0);
      this[userid] = [user];
      return userid;
    } else if (this[userid].slice(-1)[0].meetid === null) {
      user.push(1);
      this[userid].unshift(user);
      return userid;
    }
    user.push(2);
    this[userid].unshift(user);
    return userid;
  }, formattedUsers);
  return formattedUsers;
}

router.get('/', async (req, res) => {
  const result = await formatUsers();
  res.send(result);
});

module.exports = router;
