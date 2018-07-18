import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Button,
  Col,
  Row,
  Collapse,
} from 'reactstrap';
import { PulseLoader } from 'react-spinners';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudents: {},
      cohorts: [],
      members: [],
      drop: false,
    };

    this.getMembers = this.getMembers.bind(this);
  }

  componentWillMount() {
    axios.get('/reflections/dash/getchannels', {})
      .then((response) => {
        this.setState({
          cohorts: response.data,
        });
      })
      .catch((error) => {
      });

    axios.get('/reflections/dash/getusers', {})
      .then((response) => {
        this.setState({
          allStudents: response.data,
        }, () => {
        });
        this.setState({
          drop: true,
        });
      })
      .catch(console.error);
  }

  getMembers(e) {
    const membersArray = [];

    e.target.value.split(',').forEach((id) => {
      if (Object.prototype.hasOwnProperty.call(this.state.allStudents, id)) {
        membersArray.push(this.state.allStudents[id]);
      }
    });
    this.setState({ members: membersArray });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>
        <Collapse isOpen={!this.state.drop}>
          <h3>Loading...</h3>
          <PulseLoader />
        </Collapse>

        <Collapse
          isOpen={this.state.drop}
        >
          <h1>Home Screen</h1>
          <Button size="sm" outline color="danger" onClick={() => this.props.logout()}>Logout</Button>

          <Container>
            <Row>
              <Col>
                <h1>Cohorts</h1>
                {this.state.cohorts.map(cohort => (
                  <Col key={cohort.id} >
                    <Button
                      outline
                      color="primary"
                      key={cohort.id}
                      value={cohort.cohort.members}
                      onClick={this.getMembers}
                    >{cohort.cohort.name}
                    </Button>
                  </Col>
            ))}
              </Col>
              <Col>
                <h1>Students</h1>
                {this.state.members.map((person) => {
                switch (person[0][2]) {
                      default: return (
                        <Col key={person[0][0]}>
                          <Button outline color="secondary" onClick={this.props.getStudent} value={JSON.stringify(person)}>{person[0][1]}</Button>
                        </Col>);
                      case 1: return (
                        <Col key={person[0][0]}>
                          <Button outline color="warning" onClick={this.props.getStudent} value={JSON.stringify(person)}>{person[0][1]}</Button>
                        </Col>);
                      case 2: return (
                        <Col key={person[0][0]}>
                          <Button outline color="success" onClick={this.props.getStudent} value={JSON.stringify(person)}>{person[0][1]}</Button>
                        </Col>);
                    }
                })}
              </Col>
            </Row>
          </Container>
        </Collapse>

      </div>
    );
  }
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
};


export default Home;
