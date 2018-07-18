import React from 'react';
import { Form, FormGroup, Input, Label, Container, Col, Row, Button, Collapse } from 'reactstrap';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import timeConverter from '../util/timeConverter';

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
  }
  reminderChange(e) {
    this.setState({
      reminder: e.target.value,
    });
  }

  submitMessage() {
   

    const data = {
      student: this.state.student,
      notes: this.state.notes,
      message: this.state.message,
      reminder: this.state.reminder,
    };
    const options = {
      method: 'POST',
      data,
      url: '/reflections/dash/postMessage',
    };
    axios(options);
    alert('Message Sent');
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reflections</h1>
        </header>
        <Collapse isOpen={!this.state.meetingDrop}>
          <h3>Loading...</h3>
          <PulseLoader />
        </Collapse>


        <Button
          outline
          color="secondary"
          onClick={() => { this.props.changeView('home'); }}
        >Home
        </Button>

        <h1>Meeting Screen for {this.props.student.split(',')[1]}</h1>
        <Collapse isOpen={this.state.meetingDrop}>
          <Button
            outline
            color="secondary"
            onClick={() => {
              this.props.changeView('home');
            }}
          >
            Home
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
              </FormGroup>
              <Button color="primary" onClick={this.submitMessage}>
                {' '}
                Submit{' '}
              </Button>
            </Form>
            {this.props.history.map((message) => (
              <div key={message.id}>
                <h3> ===== meeting Session ===== </h3>
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
