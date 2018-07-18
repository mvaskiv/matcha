import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';

import LoginForm from './auth/login.js';
// import RegisterForm from './auth/register';
import Welcome from './view/welcome';
import Main from './view/main';
import { Redirect } from 'react-router';

const LoginHeader = ({ title }) => (
  <div className="welcome-signin posa full" id='header'>
    <a onClick={() => App._loginCall(1)}><p className='login-btn flr mar5'>Log in</p></a>
    <a href="/"><p className='logo fll mar5'>matcha</p></a>
  </div>
);

const Home = (props) => (
  <div>
  <div className="welcome-bg"></div>
  <div>
    <LoginHeader />
    {props.login ? <LoginForm /> : <Welcome />}
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

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      this.state.loggedin === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

const SetRoute = (props) => {
  if (localStorage.getItem('udata')) {
    return <Main />
  } else {
    return <Home login={props.login} />
  }
}

const LoginRoute = (props) => {
  if (localStorage.getItem('udata')) {
    browserHistory.push('/');    
    return <Main />
  } else {
    return <Login />
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
    };
    App._loginCall = App._loginCall.bind(this);
  }

  static _loginCall(a) {
    if (a === 1) {
      this.setState({login: true});
      browserHistory.push('login');
    } else {
      this.setState({login: false});
      browserHistory.push('/');
    }
  }

  loggedIn() {
    if (localStorage.getItem('udata')) {return true;}
    else {return false;}
  }

  render() {
    // if (!sessionStorage.getItem('udata')) {
    //   return (
    //     <Router history={browserHistory}>
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/welcome" component={Home}/>
    //       <Route exact path="/login" component={Login}/>
    //       <Route component={Home} />
    //     </Router>
    //   );
    // } else {
      return (
        <Router history={browserHistory}>
          <Route exact path="*" component={() => <SetRoute login={this.state.login} />} />
          {/* <Route exact path="/login" component={LoginRoute}/> */}

          {/* <Route path="/login" component={Login}/> */}
          {/* <Route path="/register" component={Register}/> */}
          {/* <Route path="/users" component={allUsers}/>
          <Route path="/user" component={allUsers}/>
          <Route path="/:username" component={User}/> */}
          {/* <Route component={Main} /> */}
        </Router>
      );
    // }
  }
}

export default App;
