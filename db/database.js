const { Client } = require('pg');

const connectionString = 'postgresql://plumstack:plumstackgang@206.189.170.211:5432/plumstack';
// const connectionString = process.env.POSTGRESQL_AUTH;

// . postgresql://plumstack:plumstackgang@206.189.170.211:5432/plumstack

// const schema = require('./Schema1.sql');

// const pool = new Pool({
//   connectionString,
// });

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   pool.end();
// });

const client = new Client({
  connectionString,
});
client.connect();

function saveEmployee(empname, slackid, cohort) {
  const sql = 'INSERT INTO employees(empname, slackid, cohort) VALUES( $1, $2, $3 )';
  const x = [];
  client.query(sql, [empname, slackid, cohort]).catch((err) => x.push(err));
}

function saveMeetings(notes, message, empslackid, meetdate) {
  const sql = 'INSERT INTO meetings(notes, message, empslackid, meetdate) VALUES( $1, $2, $3, $4)';
  client.query(sql, [notes, message, empslackid, meetdate], (err, res) => {
    // console.log(res);
    if (err) {
      // console.log(err);
    } else {
      console.log(res);
    }
  });
}

function test() {
  client.query('SELECT * from response', (err, res) => {
    // console.log(res);
    if (err) {
      // console.log(err);
    } else {
      console.log(res);
    }
  });
}

// Adds a response to the response table
// Slack response => response
// Resdate = another Date.now();
// MeetId = id in meetings, foreign key in response
function addResponse(response, resdate, meetid) {
  const sql = 'INSERT INTO response(restext, resdate, meetid) VALUES( $1, $2, $3)';

  client.query(sql, [response, resdate, meetid], (err, res) => {
    if (err) {
      // console.log(err);
    } else {
      console.log(res);
    }
  });
}

function checkStatus(meetid, callback) {
  const sql2 = 'SELECT * FROM response WHERE meetid in($1)';
  client.query(sql2, [meetid], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // console.log("RESPONSE FROM CHECKSTATUS DBFUNCTINO:", res)
      callback(res);
    }
  });
}

function checkStatus2(users, callback) {
  const sql =
    'select distinct empslackid, id from MEETINGS where empslackid in ($1) and resid is NULL';
  client.query(sql, [users], (err, res) => {
    if (err) {
      console.log(err);
    } else {
      callback(res);
    }
  });
}

function collierSKYN(users, callback) {
  return new Promise((res, rej) => {
    const sql = `select *
  from meetings left join response
  on response.meetid = meetings.id 
  where meetings.empslackid = ANY($1::varchar(15)[])`;

    client
      .query(sql, [users])
      .then(res)
      .catch(rej);
  });
}

function findLastMeeting(empid, callback) {
  const sql = 'SELECT id FROM MEETINGS WHERE (empslackid = $1 AND resid IS NULL);';

  client.query(sql, [empid], (err, res) => {
    if (err) {
      // console.log(err);
    } else {
      // console.log(res);
      callback(res);
    }
  });
}

// Can only be called after the response table has been updated.
// resid is "id" in the response table, and is a foreign key in meetings
function updateMeetingRes(meetid, resid) {
  const sql = 'UPDATE meetings SET resid=($1) WHERE id=($2)';

  client.query(sql, [resid, meetid], (err, res) => {
    if (err) {
      // console.log(err);
    } else {
      console.log(res);
    }
  });
}

// Identifies which meetingID to connect the response to.
// empid = the employee slackid of the person currently responding
// The return value will then be used to identify where to connect
// the resid value (from the newly generated response)

// I'm going to need help with the callback.

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   client.end();
// });
module.exports.collierSKYN = collierSKYN;
module.exports.checkStatus = checkStatus;
module.exports.checkStatus2 = checkStatus2;
module.exports.addResponse = addResponse;
module.exports.updateMeetingRes = updateMeetingRes;
module.exports.findLastMeeting = findLastMeeting;
module.exports.saveMeetings = saveMeetings;
module.exports.test = test;
module.exports.saveEmployee = saveEmployee;
// const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

// const pool = new Pool({
//   connectionString: connectionString,
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
