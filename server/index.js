const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const session = require('express-session');

// router
const employeeResponse = require('./routes/slack/employeeResponse');
const employeeConfig = require('./routes/dash/employeeConfig');
const meeting = require('./routes/dash/meeting');
const auth = require('./routes/slack/auth');
const slackMessage = require('./routes/dash/postMessage');
const slackUsers = require('./routes/dash/getusers');
const slackChannels = require('./routes/dash/getchannels');
const authRedirect = require('./routes/slack/authRedirect.js');

dotenv.config({
  silent: true,
});

const app = express();
const port = process.env.PORT || 8080;
//app.enable('trust proxy');
function log(message) {
  process.stdout.write(`${message}\n`);
}

app.use((req, res, next) => {
  req.url = req.url.substring(12);
  next();
});

app.use((req, res, next) => {
  log(`${req.method} on ${req.url}`);
  next();
});
//if (process.env.BUILD === 'prod') app.use(express.static('/home/node/plumstack/client/build'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 3600000,
    },
  }),
);
// checks whether user is authenticated whenever component is mounted
app.get('/checkAuth', (req, res) => {
  res.send(req.session);
});

app.get('/logout', (req) => req.session.destroy());

app.use('/dash/employeeConfig', employeeConfig);
app.use('/dash/meeting', meeting);
app.use('/dash/postmessage', slackMessage);
app.use('/dash/getusers', slackUsers);
app.use('/dash/getchannels', slackChannels);

app.use('/slack/auth/redirect', authRedirect);
app.use('/slack/auth', auth);
app.use('/slack/employeeResponse', employeeResponse);

app.listen(port, () => {
  log(`Server started on port ${port}!`);
});
