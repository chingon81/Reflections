import React from 'react';
import { Form, FormGroup, Input, Label, Container, Col, Row, Button, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import timeConverter from '../util/timeConverter';
import Ajax from '../util/ajax';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: JSON.parse(this.props.student.split(',')[0].slice(2)),
      notes: '',
      message: '',
      reminder: '',
      meetingDrop: false,
    };

    this.notesChange = this.notesChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.reminderChange = this.reminderChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
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

  async submitMessage() {
    const data = {
      student: this.state.student,
      notes: this.state.notes,
      message: this.state.message,
      reminder: this.state.reminder,
    };

    //TODO
    
    const result = await 'TODO';
    alert('message sent');
  }
  

}
