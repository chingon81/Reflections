const { WebClient, RTMClient } = require('@slack/client');
const dotenv = require('dotenv');
const db = require('../db/database.js');

dotenv.config({ silent: true });
const token = process.env.BOT_OAUTH;
<<<<<<< HEAD
<<<<<<< HEAD
const authToken = process.env.SLACK_OAUTH
=======
const userToken = process.env.BOT_USER_OAUTH;
>>>>>>> b538312909f76f8373d616cd8017ed1ac4b07e68
=======
const userToken = process.env.SLACK_OAUTH;
>>>>>>> b86ffb56550cd8be74830248ddbe80268455d5db
const web = new WebClient(token);
const rtm = new RTMClient(token);

rtm.start();

const userList = {};
const channelList = {};

// user = 'UAYRAJH8W'
function postMessage(text, user = 'UAYRAJH8W') {
  web.im
    .open({ user })
    .then((data) => {
      rtm.sendMessage(text, data.channel.id).catch(console.error);
    })
    .catch(console.error);
}

function getUsers() {
  return userList;
}

function getChannels() {
  return channelList;
}

function reminder(time, text= 'response to reflection', user){
  console.log("REMINDER FUNCTION HITTT")
  web.apiCall('reminders.add',{authToken, time, text, user}).then(console.log).catch(console.error)
}

function updateInfo() {
  web.users // get list of users and format into object to reference userID to name
    .list()
    .then((res) => {
      res.members.map((item) => {
        userList[item.id] = item.name;
        return userList[item.id];
      });
    });

  web.channels // get list of channels and format into object to reference channelID to name
    .list()
    .then((res) => {
      res.channels.map((item) => {
        channelList[item.id] = { name: item.name, members: item.members };
        return channelList[item.id];
      });
      // format channels to their names in object format for easy reference
    });
}
function setReminder(text = 'Respond to LindenBot', time, user) {
  web
    .apiCall('reminders.add', {
      text,
      time,
      user,
      token: userToken,
    })
    .then(console.log)
    .catch(console.error);
}
// setReminder('respond to lindenbot', 'next thursday at 10AM', 'UAYRAJH8W');

updateInfo();
setInterval(updateInfo, 1800000);

rtm.on('slack_event', (type, event) => {
  if (type === 'message' && event.channel[0] === 'D' && event.user !== 'UB0KBE29G') {
    let meetId;
    db.findLastMeeting(event.user, (res) => {
      meetId = res.rows[res.rows.length - 1].id;
      db.addResponse(event.text, Date.now(), meetId);
    });
  }
});



module.exports.reminder = reminder
module.exports.postMessage = postMessage;
module.exports.getUsers = getUsers;
module.exports.getChannels = getChannels;
module.exports.setReminder = setReminder;
