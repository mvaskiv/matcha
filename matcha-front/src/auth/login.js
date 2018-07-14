import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { browserHistory, Router, Route, Redirect } from 'react-router';
import Main from '../view/main';
import App from '../App';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        if(this.state.login && this.state.password) {
            PostData('login', this.state).then((result) => {
                let responseJson = result;
                // alert(JSON.stringify(responseJson));
                if (responseJson.status === "ok" && responseJson.token) {
                    sessionStorage.setItem('udata', responseJson.token);
                    sessionStorage.setItem('uid', responseJson.id);
                    this.setState({redirectToReferrer: true});
                }
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('udata')) {
            // return (<Router history={browserHistory}><Route path="/" Component={ Main } /><Redirect from='/login' to='/' /></Router>)
        }
        return (
            <div className="Intro">
                <a href="/"><i className="far fa-times-circle flr mar5 close"></i></a>
                <h3>&nbsp;Welcome back</h3><br />
                    <input type="text" className='form-element full input-ln' placeholder="Your email or login" name='login' onChange={this.onChange}/>
                    <input type="password" className='form-element full input-ln' placeholder="Your password" name='password' onChange={this.onChange}/>
                <button className="btn btn-primary full" onClick={this.login}>Enter</button>
            </div>
        );
    }
}

export default LoginForm;
