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
import PropTypes from 'prop-types';
import React from 'react';

class Meeting extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      student: JSON.parse(this.props.student.split(',')[0].slice(2)),
      notes: '',
      message: '',
      reminder: ''
      // students: [],
      // dropdownOpen: false,
      meetingDrop: false,
    };
    this.notesChange = this.notesChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        meetingDrop: true,
      });
    }, 1500);
  }

  notesChange(e) {
    this.setState({
      notes: e.target.value,
    });
    // console.log(this.state.student.slice(2));
  }

  messageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  submitMessage() {
    axios
      .post('/dash/postmessage', {
        student: this.state.student,
        notes: this.state.notes,
        message: this.state.message,
        reminder: this.state.reminder
      });
    console.log('Message Sent');
    alert('Message Sent');
  }

  reminder(){
    axios
      .post('/' ,{
        reminder: this.state.reminder
      })
      console.log('Reminder Set')
  }

  render() {
    return (
      <div className="App">

        {/* <button onClick={() => { console.log(this.state); }}>Meeting State</button>
        <button onClick={() => { console.log(this.props); }}>Meeting Props</button> */}

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>

        <Button
          outline
          color="secondary"
          onClick={() => { this.props.changeView('home'); }}
        >Home
        </Button>

        <h1>Meeting Screen for {this.props.student.split(',')[1]}</h1>
        <Collapse isOpen={this.state.meetingDrop}>
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
              <Button color="primary" onClick={this.submitMessage}> Submit </Button>
            </Form>
            {this.props.history.map(message => (
              <div key={message.id}>
                <h3> ===== Meeting Session ===== </h3>
                <h4 className="admin">Notes: {message.notes}</h4>
                <h3 className="admin">Message: {message.message}</h3>
                <h5> ------ Reflection ------ </h5>
                <h5 className="student">{message.restext}</h5>
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
