const { WebClient, RTMClient } = require('@slack/client');
const dotenv = require('dotenv');
const db = require('../db/database.js');

dotenv.config({ silent: true });

const token = process.env.BOT_OAUTH;

const authToken = process.env.SLACK_OAUTH

const userToken = process.env.BOT_USER_OAUTH;

const userToken = process.env.SLACK_OAUTH;

const web = new WebClient(token);
const rtm = new RTMClient(token);


class Slack {
  constructor(botOauth, userOauth) {
    this.bot_oauth = botOauth;
    this.user_oauth = userOauth;
    this.web = new WebClient(this.bot_oauth);
    this.rtm = new RTMClient(this.bot_oauth);
    this.userList = {};
    this.channelList = {};

    this.rtm.start();
    this.updateInfo();
    setInterval(() => this.updateInfo, 1800000);
  }

  setReminder(text = 'Respond to Reflections Bot', time, user) {
    this.web.apiCall('reminders.add', {
      text,
      time,
      user,
      token: this.user_oauth,
    });
  }

  getUsers() {
    return this.userList;
  }

  getChannels() {
    return this.channelList;
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

  postMessage(text, user) {
    this.web.im
      .open({ user })
      .then((data) => {
        this.rtm.sendMessage(text, data.channel.id);
      })
      .catch(console.error);
  }

  async updateInfo() {
    const newUserList = await this.web.users.list();
    const newChannelList = await this.web.channels.list();

    this.userList = newUserList.members.reduce((acc, item) => {
      if (!item.is_bot && item.name !== 'slackbot') acc[item.id] = item.name;
      return acc;
    }, {});

    this.channelList = newChannelList.channels.reduce((acc, item) => {
      acc[item.id] = { name: item.name, members: item.members };
      return acc;
    }, {});
  }

  eventListener() {
    this.rtm.on('slack_event', async (type, event) => {
      if (type === 'message' && event.channel[0] === 'D' && event.user !== this.botID) {
        const lastMeeting = await db.findLastMeeting(event.user);
        const meetId = lastMeeting.rows.slice(-1)[0].id;
        db.addResponse(event.text, Date.now(), meetId);
      }
    });
  }
}

const test = new Slack(token, userToken);

// setReminder('respond to lindenbot', 'next thursday at 10AM', 'UAYRAJH8W');




module.exports.reminder = reminder
module.exports.postMessage = postMessage;
module.exports.getUsers = getUsers;
module.exports.getChannels = getChannels;
module.exports.setReminder = setReminder;
module.exports = test;

