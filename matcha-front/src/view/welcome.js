import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';
import Register from '../auth/register';

class Intro extends Component {
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
          <div className="Intro">
            <h3>&nbsp;Hello, my name is</h3><br />
              <input type="text" className='form-element' placeholder="Your name goes here" />
                <div className="half fll">
                  <h4>&nbsp;I am a</h4>

                </div>
                <div className="half flr">
                <h4>&nbsp;looking for</h4>

                </div>

                <div className="tac" style={{marginTop:85 + 'px'}}>
                  <div className="form-element-group full">
                    <select className='form-element has-primary half'>
                      <option value="Man">Man</option>
                      <option value="Woman">Woman</option>
                    </select>
                    <select className='form-element has-danger half'>
                      <option value="Women">Women</option>
                      <option value="Men">Men</option>
                    </select>
                  </div>
                  <h4>And I was born in</h4>
                  <div className="form-element-group">
                  <select className='form-element half'>
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                    <option value="Apr">April</option>
                  </select>
                  <input type="text" className="form-element half" placeholder="Year" />
                </div>
                <a href="/register"><button className="btn btn-success full">Register</button></a>
              </div>
            </div>
        );
    }
}

class Welcome extends Component {
render() {
  return (
      <div className="welcome-bg">
      <div className="welcome-signin posa full">
        <a href=""><button className="btn btn-pill btn-success flr mar5">Log in</button></a>
      </div>
      <Intro />
      </div>
  );
}
}

export default Welcome;
