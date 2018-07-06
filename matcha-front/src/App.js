import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

import LoginForm from './auth/login.js';
import RegisterForm from './auth/register';
import Welcome from './view/welcome';

const Header = ({ title }) => (
  <div className="welcome-signin posa full" id='header'>
    <a href="/login"><button className="btn btn-pill btn-danger flr mar5">Log in</button></a>
    <a href="/"><p className='logo fll mar5'>matcha</p></a>
  </div>
);

const Home = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <Header />
    <Welcome />
  </div>
  </div>
);

const Register = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <Header />
    <RegisterForm />
  </div>
  </div>
);

const Login = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <Header />
    <LoginForm />
  </div>
  </div>
);

const About = (props) => (
<div>
  <Header title = "About" />

</div>
);

const Settings = (props) => (
<div>
  <Header title = "Settings" />

</div>
);

const User = createReactClass ({
  render () {
    return (
    <div>
      <Header title={this.props.params.username} />

    </div>
    );
  }
});

const allUsers = createReactClass ({
  render () {
    return <h1>All users here</h1>
  }
});

class App extends Component {
render() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/users" component={allUsers}/>
      <Route path="/user" component={allUsers}/>
      <Route path="/:username" component={User}/>
    </Router>
  );
}
}

export default App;
