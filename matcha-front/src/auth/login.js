import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    login() {
        if(this.state.username && this.state.password) {
            PostData('login', this.state).then((result) => {
                let responseJson = result;
                if (responseJson.name) {
                    sessionStorage.setItem('udata', JSON.stringify(responseJson));
                    this.setState({redirectToReferrer: true});
                    alert(sessionStorage.getItem('udata'));
                }
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('udata')) {
            // return (<Redirect to={'/Home'} />)

        }
        return (
            <div className="Intro">
                <a href="/"><i className="far fa-times-circle flr mar5 close"></i></a>
                <h3>&nbsp;Welcome back</h3><br />
                    <input type="text" className='form-element full input-ln' placeholder="Your email or login" name='username' onChange={this.onChange}/>
                    <input type="password" className='form-element full input-ln' placeholder="Your password" name='password' onChange={this.onChange}/>
                <button className="btn btn-primary full" onClick={this.login}>Enter</button>
            </div>
        );
    }
}

export default LoginForm;
