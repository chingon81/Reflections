import React from 'react';
import axios from 'axios';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';
import Meeting from './components/meeting';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      show: 'home',
      isAuthenticated: false,
      student: '',
      history: '',
    };
    this.routes = {
      meeting: () => <Meeting />,
      login: () => <Login />,
      home: () => <Home />,
    };

    this.changeView = this.changeView.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getStudent = this.getStudent.bind(this);
  }

  // when component mounts, checks server authentication
  componentDidMount() {
    const options = {
      method: 'get',
      url: '/reflections/checkAuth',
    };
    axios(options).then((response) => {
      this.setState({
        isAuthenticated: response.data.isAuthenticated,
      });
    });
  }

  // when student is selected, changes state to the ID of selected student
  getStudent(e) {
    this.setState({
      student: e.target.value,
      show: 'meeting',
      history: JSON.parse(e.target.value)
        .slice(1)
        .reverse(),
    });
  }

  // function to change current view
  changeView(view) {
    this.setState({
      show: view,
    });
  }

  // helper function for logging in during development
  logIn() {
    this.setState({
      isAuthenticated: true,
    });
  }

  // function to log out of session
  logOut() {
    this.setState({
      isAuthenticated: false,
    });
    axios.get('/reflections/logout');
  }

  render() {
    switch (this.state.show) {
      case 'meeting':
        return (
          <Meeting
            changeView={this.changeView}
            student={this.state.student}
            history={this.state.history}
          />
        );

      default:
        return this.state.isAuthenticated ? (
          <Home logout={this.logOut} getStudent={this.getStudent} />
        ) : (
          <Login logIn={this.logIn} test={this.test} />
        );
    }
  }
}

export default App;
