import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';
import UserThumb from '../parts/userThumb';
import Umessage from '../parts/umessage';
import App from '../App';

const TopBar = (props) => (
    <div className='topbar'>
    <nav className='full tac'>
        <p className='logo-sm'>matcha</p>
        {/* <a className='fll'><i className="fas fa-user-circle"></i></a> */}
        <a href="#notifications" className='flr' onClick={() => Main.callNotif(1)}><i className="far fa-bell"></i></a>
    </nav>
    </div>    
)

const MenuItem = (props) => {
    if (props.item === "messages") {return <Messages />}
    else if (props.item === "profile") {return <Profile />}
    else if (props.item === "likes") {return <Likes />}
    else if (props.item === "settings") {return <Settings />}
    else {return <Messages />}
}

const MenuSelf = () => (
    <div className='menubar'>
        <nav className='full'>
        <a className='fll' onClick={() => Main.callMenuItem("profile")}><i className="fas fa-user-astronaut"></i></a>
        <a className='fll' onClick={() => Main.callMenuItem("messages")}><i className="far fa-envelope"></i></a>
        <div className='search-btn'><i className="fas fa-search"></i></div>
        <a className='flr' onClick={() => Main.callMenuItem("settings")}><i className="fas fa-sliders-h"></i></a>
        <a className='flr' onClick={() => Main.callMenuItem("likes")}><i className="far fa-heart"></i></a>
        </nav>
    </div>
)

const MenuBar = (props) => (
    <div>
        <MenuSelf />
        <MenuItem item={props.display} />
    </div>
)

class Main extends Component {
    constructor() {
        super();
        this.state = {
            notifications: false,
            showMenu: false,
            display: '',
            settings: false
        };
        this.iniState = this.state;
        Main.hideMenu = Main.hideMenu.bind(this);
        Main.callNotif = Main.callNotif.bind(this);
        Main.callMenuItem = Main.callMenuItem.bind(this);
    }

    static hideMenu() {
        // this.setState(this.iniState);
        this.setState({showMenu: false});
    }
    static callNotif(a) {
        if (a === 1) {this.setState({notifications: true});}
        else {this.setState({notifications: false});}
    }
    static callMenuItem(a) {
        this.setState({display: a});
        this.setState({showMenu: true});
    }
    render () {
        var users = ['Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya'];
        return (
            <div className='container'>
                <div className='content' style={{top: this.state.showMenu ? -15 + 'em' : 0 + 'em'}}>
                    <div className='main-center tac' style={{left: this.state.notifications ? -100 + '%' : 0 +'%'}}>
                        <TopBar />
                        <div className='showAllUsers'>
                        <ul>
                            {users.map(function(user) {
                                return (<li><UserThumb name={user} /></li>);
                            })}
                        </ul>
                    </div>
                    </div>
                    <div className='noti-panel-cnt' style={{left: this.state.notifications ? 0 + '%' : 100 +'%'}}>
                        <Notifications />
                    </div>
                </div>
                <div className='menus-panel' style={{bottom: this.state.showMenu ? 100 + '%' : 0 + 'px'}}>
                    <MenuBar display={this.state.display} />
                </div>
            </div>
        );
    }
}

class Notifications extends Main {
    constructor() {
        super();
        this.state = {
            new: false
        };
    }
    render () {
        return (
        <div className='noti-panel'>
            <h2 className='fll'>&nbsp;Notifications</h2>
            <a href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.callNotif(0)}></i></a>
        </div>
        );
    }
}

class Messages extends Main {
    render () {
        var messages = ['Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya', 'Kate', 'John', 'Vasya'];        
        return (
            <div className='noti-panel'>
                <div className='menu-nav'>
                    <h2 className='fll'>&nbsp;Messages</h2>
                    <a href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.hideMenu()}></i></a>
                </div>
                <ul>
                    {messages.map(function(user) {
                        return (<li><Umessage user={user} /></li>);
                    })}
                </ul>
            </div>
        );
    }
}

class Profile extends Main {
    render () {
        return (
            <div className='noti-panel'>
            <h2 className='fll'>&nbsp;Profile</h2>
            <a href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.hideMenu()}></i></a>
            </div>
        );
    }
}

class Likes extends Main {
    render () {
        return (
            <div className='noti-panel'>
            <h2 className='fll'>&nbsp;Likes</h2>
            <a href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.hideMenu()}></i></a>
            </div>
        );
    }
}

class Settings extends Main {
    render () {
        return (
            <div className='noti-panel'>
            <h2 className='fll'>&nbsp;Settings</h2>
            <a href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.hideMenu()}></i></a>
            </div>
        );
    }
}

export default Main;
