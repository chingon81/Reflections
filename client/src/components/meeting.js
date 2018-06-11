import {
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Col,
  Row,
  Button,
  Collapse,
} from 'reactstrap';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import React from 'react';

function timeConverter(timestamp) {
  const a = new Date(+timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
  const year = a.getFullYear();
  const time = `${month} ${date}, ${year} @ ${hour}:${min}`;
  console.log(a);
  return time;
}

class Meeting extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      student: JSON.parse(this.props.student.split(',')[0].slice(2)),
      notes: '',
      message: '',
      reminder: '',
      // students: [],
      // dropdownOpen: false,
      meetingDrop: false,
    };
    this.notesChange = this.notesChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.reminderChange = this.reminderChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.reminderChange =  this.reminderChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        meetingDrop: true,
      });
    }, 1000);
  }


  messageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }
  notesChange(e) {
    this.setState({
      notes: e.target.value,
    });
    // console.log(this.state.student.slice(2));
  }
  reminderChange(e) {
    this.setState({
      reminder: e.target.value,
    });
  }

  submitMessage() {
    axios
      .post('/dash/postmessage', {
        student: this.state.student,
        notes: this.state.notes,
        message: this.state.message,
<<<<<<< HEAD
        reminder: this.state.reminder
=======
        reminder: this.state.reminder,
>>>>>>> b538312909f76f8373d616cd8017ed1ac4b07e68
      });
    alert('Message Sent');
  }

<<<<<<< HEAD
  reminder(){
    axios
      .post('/' ,{
        reminder: this.state.reminder
      })
      console.log('Reminder Set')
  }
=======
>>>>>>> b538312909f76f8373d616cd8017ed1ac4b07e68

  render() {
    return (
      <div className="App">

        {/* <button onClick={() => { console.log(this.state); }}>Meeting State</button>
        <button onClick={() => { console.log(this.props); }}>Meeting Props</button> */}

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>
        <Collapse isOpen={!this.state.meetingDrop}>
          <h3>Loading...</h3>
          <PulseLoader />
        </Collapse>

<<<<<<< HEAD
        <Button
          outline
          color="secondary"
          onClick={() => { this.props.changeView('home'); }}
        >Home
        </Button>

        <h1>Meeting Screen for {this.props.student.split(',')[1]}</h1>
<<<<<<< Updated upstream
=======
>>>>>>> b538312909f76f8373d616cd8017ed1ac4b07e68
        <Collapse isOpen={this.state.meetingDrop}>
          <Button
            outline
            color="secondary"
            onClick={() => { this.props.changeView('home'); }}
          >Home
          </Button>

          <h1>Meeting Screen for {this.props.student.split(',')[1]}</h1>
          <Container>
            <Form>
              <FormGroup>
                <Label for="exampleText">Notes</Label>
                <Row>
                  <Col>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="1-on-1 notes"
                      value={this.state.notes}
                      onChange={this.notesChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Message</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  placeholder="Message to student"
                  value={this.state.message}
                  onChange={this.messageChange}
                />
              </FormGroup>
<<<<<<< HEAD
               <FormGroup>
              <Label for="reminder">set a reminder</Label>
          
                  <Input
                    type="textarea"
                    name="reminder"
                    id="reminder"
                    placeholder="ex: next thursday"
                    value={this.state.reminder}
                    onChange={this.reminderChange}
                  />
=======
              <FormGroup>
                <Label for="exampleText">Reminder</Label>
                <Row>
                  <Col>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="When should the student respond by?"
                      value={this.state.reminder}
                      onChange={this.reminderChange}
                    />
                  </Col>
                </Row>
>>>>>>> b538312909f76f8373d616cd8017ed1ac4b07e68
              </FormGroup>
              <Button color="primary" onClick={this.submitMessage}> Submit </Button>
            </Form>
            {this.props.history.map(message => (

           
              <div key={message.id}>
                <h3> ===== Meeting Session ===== </h3>
                <h5 className="admin">Notes: {message.notes}</h5>
                <h3 className="admin">Message: {message.message}</h3>
                <h6 className="admin">Date: {timeConverter(message.meetdate)}</h6>
                <h5> ------ Reflection ------ </h5>
                <h5 className="student">{message.restext}</h5>
                <h6 className="student">Sent on: {timeConverter(message.resdate)}</h6>
              </div>
            ))}


          </Container>
        </Collapse>
      </div>
    );
  }
}


export default Meeting;

Meeting.propTypes = {
  changeView: PropTypes.func.isRequired,
  student: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};
