import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import createReactClass from 'create-react-class';
import logo from './logo.svg';
import './App.css';
import { PostData } from './service/post';

import LoginForm from './auth/login.js';
// import RegisterForm from './auth/register';
import Welcome from './view/welcome';
import Main from './view/main';
import { Redirect } from 'react-router';
import { Messages } from './view/main';

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
      notification: false
    };
    App._loginCall = App._loginCall.bind(this);
    this._callNotif = this._callNotif.bind(this);
    this.conn = new WebSocket('ws://localhost:8200?id=' + localStorage.getItem('uid'));
    this.conn.onmessage = (e) => {    
        if (Messages.returnChatid()) {       
          this._callNotif(e.data);
        }
    };
  }

  async componentWillMount() {
    // await PostData('myprofile', this.state).then((result) => {
    //   let responseJson = result;
    //   if (responseJson && localStorage.getItem('udata') && localStorage.getItem('uname')) {
    //       var a = responseJson;
    //       if (a.status === "ko" ) {
    //         localStorage.removeItem('uname');
    //         localStorage.removeItem('udata');
    //         localStorage.removeItem('uava');
    //         window.location = '/';
    //       }
    //   }
    // });
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
  async _openChat(chatid, id, ava, name) {
    await Messages.setChatid(chatid, id, ava, name);
    setTimeout(
        function() {
            Main.callMessages(1);
        }
        .bind(this),
        500
      );
    // await Main.showProfile(-42);
    // 
    
}
//   async _openChat(id, ava, name) {
//     await Messages.setChatid(-42, id, ava, name);
//     setTimeout(
//         function() {
//             Main.callMessages(1);
//         }
//         .bind(this),
//         500
//       );
//     // await Main.showProfile(-42);
//     // 
// }

  async _callNotif(a) {
    await this.setState({notification: JSON.parse(a)});
    setTimeout(
      function() {
        this.setState({notification: false});
      }
      .bind(this),
      4000
    );
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
        <div>
          <div className='noti-popup' style={{display: this.state.notification ? 'block' : 'none'}}>
            <img className='popup-u-thumb' src={'/Matcha/uploads/' + this.state.notification.s_ava} alt=''/>
            <p>New Message</p><p><b>{ this.state.notification.s_name }</b>: { this.state.notification.message } </p>
            <p className='popup-open' onClick={() => this._openChat(this.state.notification.chatid, this.state.notification.sender, this.state.notification.s_ava, this.state.notification.s_name)}>open</p>
          </div>
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
        </div>
      );
    // }
  }
}

export default App;
