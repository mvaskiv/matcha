import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

import Login from './auth/login.js';
import Register from './auth/register';
import Welcome from './view/welcome';

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

const Home = (props) => (
  <Welcome />
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
