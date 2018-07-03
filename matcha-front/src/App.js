import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

import Login from './login/login.js';

const Header = ({ title }) => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>{title}</h2>
    </div>
  </div>
);

const Page = ({ title }) => (
  <div className="App">
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/about">About</Link>
    </p>
    <p>
      <Link to="/settings">Settings</Link>
    </p>
    <p>
      <Link to="/asda">asda</Link>
    </p>
  </div>
);

const Register = (props) => (
  <div id="register_form" style={{width: 300 + 'px'}}>
    <Header title="Register" />
    <Page />
    <form name="desk" method="post" action="user/register.php">
        <span id="login_d">Register</span>
        <span id="blue_text">Choose your nikname</span>
        <input className="register_input desk" type="text" placeholder="Login" name="login" id="register-login" minLength="3" maxLength="32" pattern="[a-zA-Z0-9]+" required></input>
        <span id="blue_text">Type your password twice</span>
        <input className="register_input desk" type="password" placeholder="Password" name="password" id="register-pwd" minLength="3" maxLength="32" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required></input>
        <input className="register_input desk" type="password" placeholder="Repeat it" name="repeat" id="register-pwd-conf" minLength="3" maxLength="32" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$" required></input>
        <p className="footer">*Use one of each: upper, lower case letter &amp; digit</p>
        <span id="blue_text">Your full name here</span>
        <input className="register_small_input desk" type="text" placeholder="First name" name="first" id="register-first" minLength="3" maxLength="32" pattern="[a-ZA-Z]+" required></input>
        <input className="register_small_input desk" type="text" placeholder="Last name" name="last" id="register-last" minLength="3" maxLength="32" pattern="[a-ZA-Z]+" required></input>
        <span id="blue_text">And your email here</span>
        <input className="register_input desk" type="email" placeholder="Email" name="email" id="register-email" minLength="5" maxLength="32" required></input>
        <button className="btn btn-success">Register</button>
    </form>
  </div>
);

const Home = (props) => (
<div>
  <Header title = "Home" />
  <Page title="Home"/>
  <Login />
</div>
);

const About = (props) => (
<div>
  <Header title = "About" />
  <Page/>
</div>
);

const Settings = (props) => (
<div>
  <Header title = "Settings" />
  <Page/>
</div>
);

const User = createReactClass ({
  render () {
    return (
    <div>
      <Header title={this.props.params.username} />
        <Page />
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
      <Route path="/register" component={Register}/>
      <Route path="/users" component={allUsers}/>
      <Route path="/user" component={allUsers}/>
      <Route path="/:username" component={User}/>
    </Router>
  );
}
}

export default App;