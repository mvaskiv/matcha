import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

import LoginForm from './auth/login.js';
// import RegisterForm from './auth/register';
import Welcome from './view/welcome';
import Main from './view/main';

const LoginHeader = ({ title }) => (
  <div className="welcome-signin posa full" id='header'>
    <a href="/login"><p className='login-btn flr mar5'>Log in</p></a>
    <a href="/"><p className='logo fll mar5'>matcha</p></a>
  </div>
);

const Home = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <LoginHeader />
    <Welcome />
  </div>
  </div>
);

// const Register = (props) => (
//   <div>
//   <div className="welcome-bg"></div>
//   <div>
//     <LoginHeader />
//     <RegisterForm />
//   </div>
//   </div>
// );

const Login = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <LoginHeader />
    <LoginForm />
  </div>
  </div>
);

const About = (props) => (
<div>
  

</div>
);


const User = createReactClass ({
  render () {
    return (
    <div>
      <h2>{this.props.username}</h2>

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
  constructor() {
    super();
    this.state = {
      loggedin: false
    };
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} history={browserHistory}/>
        <Route path="/welcome" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        {/* <Route path="/register" component={Register}/> */}
        <Route path="/users" component={allUsers}/>
        <Route path="/user" component={allUsers}/>
        <Route path="/:username" component={User}/>
      </Router>
    );
}
}

export default App;
