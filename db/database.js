const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const connectionString = process.env.POSTGRESQL_AUTH;

const client = new Client({
  connectionString,
});
client.connect();

async function saveEmployee(empname, slackid, cohort) {
  const sql =
    'INSERT INTO employees(empname, slackid, cohort) VALUES( $1, $2, $3 ) ON CONFLICT (slackid) DO NOTHING';
  const result = await client.query(sql, [empname, slackid, cohort]).catch(console.error);
  return result;
}

async function saveMeetings(notes, message, empslackid, meetdate) {
  const sql = 'INSERT INTO meetings(notes, message, empslackid, meetdate) VALUES( $1, $2, $3, $4)';
  client.query(sql, [notes, message, empslackid, meetdate]).catch(console.err);
}

// Adds a response to the response table
// Slack response => response
// Resdate = another Date.now();
// MeetId = id in meetings, foreign key in response
function addResponse(response, resdate, meetid) {
  const sql = 'INSERT INTO response(restext, resdate, meetid) VALUES( $1, $2, $3)';
<<<<<<< HEAD
// console.log('hi')
  client.query(sql, [response, resdate, meetid]).then(console.log);
=======
  client.query(sql, [response, resdate, meetid]);
>>>>>>> 9382fc05ac798b97a6f09445013ad6ae112ec40e
}

async function checkStatus(users) {
  const sql = `select *
  from meetings left join response
  on response.meetid = meetings.id 
  where meetings.empslackid = ANY($1::varchar(15)[])`;
  const result = await client.query(sql, [users]).catch(console.err);
  return result;
}

function findLastMeeting(empid, callback) {
  const sql = 'SELECT id FROM MEETINGS WHERE (empslackid = $1 AND resid IS NULL);';
  client.query(sql, [empid]).then(callback);
}

// Can only be called after the response table has been updated.
// resid is "id" in the response table, and is a foreign key in meetings
function updateMeetingRes(meetid, resid) {
  const sql = 'UPDATE meetings SET resid=($1) WHERE id=($2)';
  client.query(sql, [resid, meetid]);
}

// Identifies which meetingID to connect the response to.
// empid = the employee slackid of the person currently responding
// The return value will then be used to identify where to connect
// the resid value (from the newly generated response)

// I'm going to need help with the callback.

module.exports.checkStatus = checkStatus;
module.exports.addResponse = addResponse;
module.exports.updateMeetingRes = updateMeetingRes;
module.exports.findLastMeeting = findLastMeeting;
module.exports.saveMeetings = saveMeetings;
module.exports.saveEmployee = saveEmployee;
