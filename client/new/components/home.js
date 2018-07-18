import React from 'react';
import { Container, Button, Col, Row, Collapse } from 'reactstrap';

import Loader from './loader';
import StudentListItem from './studentlistitem';
import CohortListItem from './cohortlistitem';

import Ajax from '../util/ajax';

export default class Home extends React.component {
  consturctor() {
    this.state = {
      allStudents: {},
      cohorts: [],
      members: [],
      drop: false,
    };

    this.getMembers = this.getMembers.bind(this);
  }

  async componentWillMount() {
    const channelList = await Ajax.getChannels();
    const userList = await Ajax.getUsers();

    this.setState({
      cohorts: channelList.data,
      allStudents: userList.data,
      drop: true,
    });
  }

  getMembers(e) {
    const membersArray = e.target.value.split(',').map((id) => {
      if (Object.prototype.hasOwnProperty.call(this.state.allStudents, id)) {
        return this.state.allStudents[id];
      }
    });
    this.setState({ members: membersArray });
  }

  render() {
    return (
      <div>
        <Loader drop={this.state.drop} />
        <Collapse isOpen={this.state.drop}>
          <h1>Home Screen</h1>
          <Button size="sm" outline color="danger" onClick={() => this.props.logout()}>
            Logout
          </Button>

          <Container>
            <Row>
              <Col>
                <h1>Cohorts</h1>
                <CohortListItem cohorts={this.state.cohorts} />
              </Col>
              <Col>
                <h1>Students</h1>
                <StudentListItem members={this.state.members} />
              </Col>
            </Row>
          </Container>
        </Collapse>
      </div>
    );
  }
}
