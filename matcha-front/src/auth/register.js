import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectToReferrer: false
        };
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    register() {
        if(this.state.username && this.state.password) {
            PostData('register', this.state).then((result) => {
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
            <div id="register">
                <h2>register or Register</h2>
                <label>Username</label>
                <input type="text" name="username" placeholder="Name" onChange={this.onChange}></input>
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" onChange={this.onChange}></input>
                <br /><br />
                <button className="btn btn-primary" onClick={this.register}>Log In</button>&nbsp;
                <a href="/register"><button className="btn btn-success">Register</button></a>
            </div>
        );
    }
}

export default Register;
