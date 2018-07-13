import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';
// import UserThumb from '../parts/userThumb';
// import NotificationPreview from '../parts/notification';
// import Umessage from '../parts/umessage';
import App from '../App';

const TopBar = (props) => (
    <div className='topbar'>
    <nav className='full tac'>
        <p className='logo-sm'>matcha</p>
        <a style={{display: props.return ? 'block' : 'none'}} className='fll'><i onClick={() => Main.showProfile(-42)} className="fas fa-arrow-left"></i></a>
        <a href="#messages" className='flr' onClick={() => Main.callMessages(1)}><i className="far fa-envelope"></i></a>
    </nav>
    </div>
)

const UserThumb = (props) => {
    var username = props.data[0];
    var userid = props.data[1];
    return (
        <img onClick={() => Main.showProfile( userid )} className='user-avatar' key={this} alt={ username } src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' />
    );
}

const BrowseUsers = (props) => {
    var users = [['Kate', '1'], ['John', '2'], ['Vasya', '3'], ['Alice', '4']];
    var UserMap = users.map((user, i) => {
        return (
            <UserThumb key={i} data={ user } />
        );
    });
    
    return (
        <div className='showAllUsers'>
           { UserMap }
        </div>
    );
}

const MainView = (props) => (
    <div>
        <div style={{display: props.item === 'home' ? 'block' : 'none'}}>
            <BrowseUsers />
        </div>
        <div style={{display: props.item === 'notifications' ? 'block' : 'none'}}>
            <Notifications />
        </div>
        <div style={{display: props.item === 'profile' ? 'block' : 'none'}}>
            <Profile />
        </div>
        <div style={{display: props.item === 'user' ? 'block' : 'none'}}>
            <UserProfile id={ props.profile } />
        </div>
    </div>
    // if (props.item === 'home') {return <BrowseUsers />}
    // else if (props.item === "notifications") {return <Notifications />}
    // else if (props.item === "profile") {return <Profile />}
    // else if (props.item === "likes") {return <Likes />}
    // else {return <BrowseUsers />}
)

const MenuSelf = (props) => (
    <div className='menubar' style={{marginTop: props.hide ? 3 + 'em' : 0 + 'em'}}>
        <nav className='full'>
        <a href='#home' className={(props.item === 'home' ? 'menulink-sel' : 'menulink')} onClick={() => Main.callMenuItem("home")}><i className="fas fa-home"></i></a>
        <a className={(props.item === 'notifications' ? 'menulink-sel' : 'menulink')} onClick={() => Main.callMenuItem("notifications")}><i className="far fa-bell"></i></a>
        <a className={(props.item === 'search' ? 'menulink-sel' : 'menulink')}><i className="fas fa-search"></i></a>
        <a className={(props.item === 'profile' ? 'menulink-sel' : 'menulink')} onClick={() => Main.callMenuItem("profile")}><i className="fas fa-user-astronaut"></i></a>
        <a className={(props.item === 'settings' ? 'menulink-sel' : 'menulink')} onClick={() => Main.callMenuItem("settings")}><i className="fas fa-sliders-h"></i></a>
        </nav>
    </div>
)

const MenuBar = (props) => (
    <div>
        <MenuSelf item={props.display} hide={props.hide} />
        {/* <MenuItem item={props.display} /> */}
        <Settings />
    </div>
)

class Main extends Component {
    constructor() {
        super();
        this.state = {
            viewProfile: '',
            notifications: false,
            hideMenuBar: false,
            showMenu: false,
            showMessages: false,
            display: 'home',
            previous: ''
        };
        this.iniState = this.state;
        Main.hideMenu = Main.hideMenu.bind(this);
        Main.callMessages = Main.callMessages.bind(this);
        Main.callMenuItem = Main.callMenuItem.bind(this);
        Main.showProfile = Main.showProfile.bind(this);
        Main.hideMenuBar = Main.hideMenuBar.bind(this);
    }

    static hideMenuBar(a) {
        if (a === 1) {
            this.setState({hideMenuBar: true});
        } else {
            this.setState({hideMenuBar: false})
        }
        
    }
    static hideMenu() {
        // this.setState(this.iniState);
        this.setState({showMenu: false});
    }
    static callMessages(a) {
        if (a === 1) {this.setState({showMessages: true});}
        else {this.setState({showMessages: false});}
    }
    static callMenuItem(a) {
        if (a === 'settings') {
            this.setState({showMenu: true});    
        } else {
            this.setState({viewProfile: ''});
            this.setState({display: a});
            this.setState({showMessages: false});
        }
        // this.setState({showMenu: true});
    }
    static showProfile(a) {
        if (a === -42) {
            if (this.state.previous) {this.setState({display: this.state.previous});}
            else {this.setState({display: 'home'});}
            this.setState({viewProfile: ''});
        } else {
            this.setState({previous: this.state.display});
            this.setState({display: 'user'});
            this.setState({viewProfile: a});
            this.setState({showMessages: false});     
        }
    }

    render () {
        return (
            <div className='container'>
                <div className='content' style={{top: this.state.showMenu ? -15 + 'em' : 0 + 'em'}}>
                    <div className='main-center' style={{transform: this.state.showMessages ? 'translateX(-100%)' : 'translateX(0%)'}}>
                        <TopBar return={ this.state.viewProfile } />
                        <MainView item={ this.state.display } profile={ this.state.viewProfile } />
                    </div>
                    
                </div>
                <div className='noti-panel-cnt' style={{transform: this.state.showMessages ? 'translateX(-100%)' : 'translateX(0%)'}}>
                    <Messages />
                </div>
                <div className='menus-panel' style={{bottom: this.state.showMenu ? 100 + '%' : 0 + 'px'}}>
                    <MenuBar display={this.state.display} hide={ this.state.hideMenuBar } />
                </div>
            </div>
        );
    }
}

const NotificationPreview = (props) => {
    return (
        <li key={this}>
            <div className="noti-header">
                <div className="usr-thumb-xsm">
                    <img onClick={() => Main.showProfile(props.user[1])} className='usr-thumb-pic-xsm' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' />
                </div>
                <div className="noti-prev">
                    <span className='noti-prev'><b onClick={() => Main.showProfile(props.user[1])}>{ props.user[0] }</b>&nbsp;cheked you out.</span>
                </div>
            </div>
        </li>
    );
}

class Notifications extends Main {
    constructor() {
        super();
        this.state = {
            new: false
        };
    }

    render () {
        var notifications = [['Kate', '1'], ['John', '2',], ['Vasya', 3]];
        const printNoti = notifications.map((user, i) => {
            return (
            <NotificationPreview
                key={i}
                user={user} />
            );
        });
        
        return (
        <div className='inner-cnt'>
            <ul>
                { printNoti }
            </ul>
        </div>
        );
    }
}

const NewMessage = (props) => (
    <div className='messages-panel'>
        <div className='menu-nav tac'>
            <a href="#"><i onClick={() => Messages.resetChat()} className="fas fa-arrow-left fll"></i></a>
            <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
            <h4 className='menu-head'>Messages</h4>
        </div>
    </div>
)

const MessagePreview = (props) => {
    var username = props.data[0];
    var chatid = props.data[1];
    var previewText = props.data[2];
    return (
        <li key={this}>
            <div className="message-header">
                <div className="usr-thumb-sm">
                    <img className='usr-thumb-pic-sm' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' />
                </div>
                <div className="message-prev" onClick={() => Messages.setChatid( chatid )}>
                    <span className='message-prev'><b>{ username }</b><br />{ previewText }</span>
                </div>
            </div>
        </li>
    );
}

class Messages extends Main {
    constructor() {
        super();
        this.state = {
            chatid: '',
            new: false
        }
        Messages.resetChat = Messages.resetChat.bind(this);
        Messages.setChatid = Messages.setChatid.bind(this);
    }

    static resetChat () {
        this.setState({chatid: ''});
        this.setState({new: false});
    }
    static setChatid(a) {
        this.setState({chatid: a});
    }


    render () {
        var messages = [['Kate', '1', 'Hey, how are you?'], ['John', '2', 'Hello sweetie'], ['Vasya', '3', 'You stole my heart...']];        
        if (this.state.new) {
            return <NewMessage />
        } else if (this.state.chatid) {
            return (
                <Chat
                    id={this.state.chatid} />
            );
        } else {
            return (
                <div className='messages-panel'>
                    <div className='menu-nav tac'>
                        <a href="#"><i onClick={() => Main.callMessages(0)} className="fas fa-arrow-left fll"></i></a>
                        <a href="#new-message"><i onClick={() => this.setState({new: true})} className="fas fa-plus flr"></i></a>
                        <h4 className='menu-head'>Messages</h4>
                    </div>
                    <ul>
                        {messages.map(function(user, i) {
                            return (
                                <MessagePreview
                                    key={i}
                                    data={user} />
                            );
                        })}
                    </ul>
                </div>
            );
        }
    }
}

class Chat extends Messages {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            newMessage: '',
            messages: [['Hey', '1'], ['Go away', '0'], ['Why??!?!?!??!?!?!?!', '1'], ['Because', '0'], ['Noooo', '1'], ['Pleaseeeee', '1'], ['Hey', '1'], ['Go away', '0'], ['Why??!?!?!??!?!?!?!', '1'], ['Because', '0'], ['Noooo', '1'], ['Pleaseeeee', '1']]
        }
        this.testMessage = this.testMessage.bind(this);
        this.InputOnFocus = this.InputOnFocus.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.msglst.lastChild.scrollIntoView({behavior: 'smooth'});
    }

    componentDidUpdate() {
        this.msglst.lastChild.scrollIntoView({behavior: 'smooth'});
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    testMessage() {
        if (this.state.newMessage) {
            this.state.messages.push([this.state.newMessage, '0']);
            this.setState({newMessage: ''});
        }
    }

    InputOnFocus(a) {
        Main.hideMenuBar(a);
        if (a === 1) {this.setState({focus: true});}
        else {this.setState({focus: false});}
        this.msglst.lastChild.scrollIntoView({behavior: 'smooth'});
    }

    render () {
        if (this.props.id == 1) {
            var display = this.state.messages.map((message) => {
                return <li><p className={(message[1] == '0' ? 'sent-message btn' : 'received-message btn')}>{message[0]}</p></li>
            })
        } else {
            var display = null;
        }
        return (
            <div className='chat-panel'>
                <div className='menu-nav tac'>
                    <a href="#"><i onClick={() => Messages.resetChat()} className="fas fa-arrow-left fll"></i></a>
                    <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
                    <h4 className='menu-head'>Messages</h4>
                </div>
                <div className='chat-self' style={{paddingBottom: this.state.focus ? 4.5 + 'em' : 7.7 + 'em'}}>
                    <ul ref={msglst => {this.msglst = msglst;}}>
                        { display }
                    </ul>
                </div >
                <div className='message-input' style={{bottom: this.state.focus ? 0.5 + 'em' : 3.5 + 'em'}}>
                    <div className='form-element-group msg-input'>
                        <input
                            type='text'
                            className='form-element msg-in'
                            placeholder='Your message here'
                            name='newMessage'
                            value={ this.state.newMessage }
                            onChange={this.onChange}
                            onFocus={() => this.InputOnFocus(1)}
                            onBlur={() => this.InputOnFocus(0)} />
                        <span onClick={() => this.testMessage()} className='form-element-extra msg-snd-btn'><i class="fab fa-telegram-plane"></i></span>
                    </div>
                </div>
            </div>
        );
    }
}

const UserProfile = (props) => {
    if (props.user) {
        var username = props.user.name;
        var userage = props.user.age;
    } else if (props.id) {
        var username = props.id;
    } else {
        var none = true;
    }
    
    if (none) { return null }
    else {
        return (
        <div className='inner-cnt'>
            <div className='profile-img'>
                <img className='profile-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' alt=''/>
            </div>
            <div className='basic-u-info'>
                <h3>{ username }, { userage }</h3>
                <button className='btn btn-default'>Edit Your Profile</button>
            </div>
            <div className='ext-u-info'>
                <div className='fll half'>
                    <label>Gender</label>
                    <span>Female</span>
                    <label>Born on</label>
                    <span>17.02.1995</span>
                </div>
                <div className='fll half'>
                    <label>Seeking</label>
                    <span>Men</span>
                    <label>Interested in</label>
                    <span>Rock, Heavy Metal, Doobious Affairs</span>
                </div> 
                <label>Bio</label>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                <div className='ext-u-photos'>
                    <label>My Photos</label>
                </div>
            </div>
        </div>
        )
    }
}

class Profile extends Main {
    constructor() {
        super();
        this.state = {
            edit: false,
            name: "Jane",
            age: 23
        }
    }
    
    render () {
        if (this.state.edit) {
            return null
        } else {
            return (
                <UserProfile
                    user={this.state} /> 
        )}
    }
}

class EditInfo extends Profile {
    constructor() {
        super();
    }

    render () {
        return (
            <div>
               
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
    constructor() {
        super();
        this.state = {
            mod: false,
            emailNoti: false
        }
        this.iniState = this.state;
        this.MailNotiPref = this.MailNotiPref.bind(this);
        this.resetChanges = this.resetChanges.bind(this);
    }

    MailNotiPref(a) {
        if (a === 1) {this.setState({emailNoti: true});}
        else {this.setState({emailNoti: false});}
        this.setState({mod: true})
    }

    resetChanges() {
        this.setState(this.iniState);
        this.forceUpdate();
    }

    render () {
    var mailNotiBtnOn = (this.state.emailNoti ? 'btn half btn-success' : 'btn half btn-default');
    var mailNotiBtnOff = (this.state.emailNoti ? 'btn half btn-default' : 'btn half btn-danger');
        return (
            <div className='settings-panel'>
                <div className='settings-head'>
                    <h2 className='fll'>&nbsp;Settings</h2>
                    <div className='settings-save' style={{display: this.state.mod ? 'block' : 'none'}}>
                        <a onClick={this.resetChanges}><span style={{color: 'red'}}>reset</span></a>
                        <a><span>save</span></a>
                    </div>
                    <a style={{display: !this.state.mod ? 'block' : 'none'}} href="#"><i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.hideMenu()}></i></a>
                </div>
                <div className='settings-self'>
                    <label>Email notifications:</label>
                    <div className="btn-group rel mma half">
                        <button className={mailNotiBtnOn} onClick={() => this.MailNotiPref(1)}>ON</button>
                        <button className={mailNotiBtnOff} onClick={() => this.MailNotiPref(0)}>OFF</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
