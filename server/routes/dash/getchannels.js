const express = require('express');
const slackbot = require('../../../slackbot/index');
const db = require('../../../db/database.js');

const router = express.Router();

router.get('/', (req, res) => {
  const data = slackbot.getChannels();
  const users = slackbot.getUsers();
  const cohorts = [];

  Object.keys(data).forEach((item) => {
    cohorts.push({
      id: item,
      cohort: data[item],
    });
  });

  cohorts.forEach((item) => {
    const cohortName = item.cohort.name;
    item.cohort.members.forEach((member) => {
      db.saveEmployee(users[member], member, cohortName);
    });
  });

  res.send(cohorts);
});

module.exports = router;
