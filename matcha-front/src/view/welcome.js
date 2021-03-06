import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';
import RegisterForm from '../auth/register';

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            submit: false,
            u_name: '',
            f_name: '',
            l_name: '',
            email: '',
            gender: '1',
            sex_preference: '2',
            location: '',
            tags: '',
            biography: '',
            year: '',
            month: '0',
            day: '',
            date: '',
            password: '',
            passwordConfirmation: '',
            required: false,
            pasNoMatch: false,
            redirectToReferrer: false
        };
        this.baseState = this.state;
        this.register = this.register.bind(this);
        this.expand = this.expand.bind(this);
        this.onChange = this.onChange.bind(this);
        // this.locationCheck = this.locationCheck.bind(this);
        // this.findLocation = this.findLocation.bind(this);
    }

    componentDidMount() {
        this.locationCheck();
    }

    register() {
        if (this.state.f_name && this.state.password) {
            this.state.date = this.state.year + '-' + this.state.month + '-' + this.state.day;
            PostData('registration', this.state).then((result) => {
                let responseJson = result;
                if (responseJson.name) {
                    localStorage.setItem('udata', JSON.stringify(responseJson));
                    this.setState({redirectToReferrer: true});                
                }
            });
        }
        
    }

    expand() {
        if (this.state.f_name) {
            this.setState({submit:true});
            this.setState({required: false});
        } else {
            this.setState({required: true});
        }
    }

    validityCheck() {
       if (this.state.password && this.state.passwordConfirmation &&
        this.state.password !== this.state.passwordConfirmation) {
            this.setState({pasNoMatch: true});
        }
    }

    findLocation() {
        var l = "zhopa";
        this.setState({location: l});
    }

    locationCheck() {

        var l = "SRAKA-MOTYKA";
        this.setState({location: l});
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        if (this.state.redirectToReferrer || sessionStorage.getItem('udata')) {
            // return (<Redirect to={'/Home'} />)
        }
        let nameInput = ['form-element'];
        if (this.state.required) {
            nameInput.push("f-is-danger");
        }
        if (this.state.f_name && this.state.submit) {
            return (
            <div className="Register" style={{top: this.state.submit ? -0.5 + 'em' : 8 + 'em'}}>
                <i className="far fa-times-circle flr mar5 close" onClick={() => this.setState(this.baseState)}></i>
                <h3>&nbsp;A bit more info needed</h3>
                <br />
                    <label>Nickname (optional):</label>
                    <input type="text" className='form-element full input-ln' placeholder="Can be used as login" name='u_name' onChange={this.onChange}/>
                    <label>First name:</label>
                    <input type="text" className={nameInput.join(' ')} placeholder="Real name" name='f_name' onChange={this.onChange} value={this.state.f_name} />
                    <label>Second name:</label>
                    <input type="text" className='form-element full input-ln' placeholder="Surname" name='l_name' onChange={this.onChange} />
                    <label>Email:</label>
                    <input type="email" className='form-element full input-ln' placeholder="Email" name='email' onChange={this.onChange} />
                    <label>Gender and preference:</label>
                    <div className="form-element-group full">
                        <select className='form-element has-primary half' name="gender" onChange={this.onChange} value={this.state.gender}>
                        <option value="1">Man seeking</option>
                        <option value="2">Woman seeking</option>
                        </select>
                        <select className='form-element has-danger half' name="sex_preference" onChange={this.onChange} value={this.state.sex_preference}>
                        <option value="2">Women</option>
                        <option value="1">Men</option>
                        <option value="3">Both</option>
                        </select>
                    </div>
                    <label>Tell us where you are:</label>
                    <div className='form-element-group full'>
                        <input type="text" className='form-element' placeholder="e.g. Kyiv" name='location' onChange={this.onChange} value={ this.state.location } />
                        <span onClick={() => this.findLocation()} className='form-element-extra msg-snd-btn'><i class="far fa-compass"></i></span>
                    </div>
                    <label>Specify your interests:</label>
                    <input type="text" className='form-element full input-ln' placeholder="e.g. 'Sex, drugs, rocknroll'" name='tags' onChange={this.onChange} />
                    <label>Tell us about yourself:</label>
                    <textarea rows='4' maxLength='140' className='form-element full input-ln' placeholder="Who are you, what do you do, whom do you like?" name='biography' onChange={this.onChange} />
                    <label>Date of birth:</label>
                    <input type="text" className="form-element half flr" placeholder="Year" name="year" value={this.state.year} onChange={this.onChange}/>
                    <div className="form-element-group half">
                        <select className='form-element half' name="month" value={this.state.month} onChange={this.onChange}>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        </select>
                        <input type="number" className="form-element half" placeholder="1" name="day" value={this.state.day} onChange={this.onChange}/>
                    </div>
                    <label>Your password twice:</label>
                    <input type="password" className='form-element full input-ln' placeholder="Your password" name='password' onChange={this.onChange}/>
                    <input type="password" className='form-element full input-ln has-danger' placeholder="Your password" name='passwordConfirmation' onChange={this.onChange}/>
                <button className="btn btn-success full" onClick={this.register} style={{marginBottom: 10 + 'px'}}>Sign up</button>
            </div>
        );
        }
        return (
          <div className="Intro">
            <h3>&nbsp;Hello, my name is</h3><br />
              <input type="text" className={nameInput.join(' ')} placeholder="Your name goes here" name="f_name" onChange={this.onChange} required/>
                <div className="half fll">
                  <h4>&nbsp;I am a</h4>
                </div>
                <div className="half flr">
                    <h4>&nbsp;looking for</h4>
                </div>
                <div style={{marginTop:85 + 'px'}}>
                  <div className="form-element-group full">
                    <select className='form-element has-primary half' name="gender" onChange={this.onChange} value={this.state.gender}>
                      <option value="1">Man</option>
                      <option value="2">Woman</option>
                    </select>
                    <select className='form-element has-danger half' name="sex_preference" onChange={this.onChange} value={this.state.sex_preference}>
                      <option value="2">Women</option>
                      <option value="1">Men</option>
                    </select>
                  </div>
                  <label>&nbsp;And I was born on</label>
                  <input type="text" className="form-element half flr" placeholder="Year" name="year" value={this.state.year} onChange={this.onChange}/>
                  <div className="form-element-group half">
                      <select className='form-element half' name="month" value={this.state.month} onChange={this.onChange}>
                      <option value="01">Jan</option>
                      <option value="02">Feb</option>
                      <option value="03">Mar</option>
                      <option value="04">Apr</option>
                      </select>
                      <input type="number" className="form-element half" placeholder="1" name="day" onChange={this.onChange}/>
                  </div>
                <button className="btn btn-success full" onClick={this.expand}>Register</button>
              </div>
            </div>
        );
    }
}

export default Welcome;
