import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import FileBase64 from 'react-file-base64';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router-dom';
// import UserThumb from '../parts/userThumb';
// import NotificationPreview from '../parts/notification';
// import Umessage from '../parts/umessage';
import App from '../App';

const TopBar = (props) => (
    <div className='topbar'>
    <nav className='full tac'>
        <p className='logo-sm'>matcha</p>
        {/* <a style={{display: !props.return ? 'block' : 'none'}} className='fll'><i onClick={() => Main.showProfile(-42)} className="far fa-star"></i></a> */}
        <a style={{display: props.return ? 'block' : 'none'}} className='fll'><i onClick={() => Main.showProfile(-42)} className="fas fa-arrow-left"></i></a>
        <a href="#messages" className='flr' onClick={() => Main.callMessages(1)}><i className="far fa-envelope"></i></a>
    </nav>
    </div>
)

const UserThumb = (props) => {
    var username = props.data['f_name'];
    var userid = props.data['id'];
    var usergen = props.data['gender'];
    var userava = props.data['avatar'];    
    var src = usergen === "M" ? "https://randomuser.me/api/portraits/med/men/" + userid + ".jpg" : "https://randomuser.me/api/portraits/med/women/" + userid + ".jpg";

    return (
        <div className='u-thumb-wrapper'>
            <img onClick={() => Main.showProfile( userid )} className='user-avatar' key={this} alt={ username } src={ userava ? 'Matcha/uploads/' + userava : src } />
            <p className='u-thumb-name'> { username } </p>
        </div>
    );
}

const UserThumbList = (props) => {
    var username = props.data['f_name'];
    var surname = props.data['l_name'];
    var userid = props.data['id'];
    var usergen = props.data['gender'];
    var userava = props.data['avatar'];    
    var src = usergen === "M" ? "https://randomuser.me/api/portraits/med/men/" + userid + ".jpg" : "https://randomuser.me/api/portraits/med/women/" + userid + ".jpg";

    return (
        <div className='u-thumb-list-wrapper' onClick={() => Messages.setChatid(-42, userid, userava, username)}>
            <img className='user-xs-avatar' key={this} alt={ username } src={ userava ? 'Matcha/uploads/' + userava : src } />
            <p className='u-thumb-list-name'> { username } { surname } </p>
        </div>
    );
}

class BrowseUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbEnd: false,
            uid: '',
            users: '',
            sort: 'age',
            gender: false,
            start_age: 9,
            end_age: 99,
            start: '0',
            number: 21
        }
        this._onScroll = this._onScroll.bind(this);
        this._scrollListener = this._scrollListener.bind(this);
    }

    componentDidMount() {
        PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
    }

    componentDidUpdate() {
        this.ulist.addEventListener('scroll', this._scrollListener);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    _scrollListener() {
        if (this.ulist.scrollTop + this.ulist.clientHeight >= this.ulist.scrollHeight) {
            this._onScroll();
        }
    }

    async _onScroll() {
        var n = this.state.number + 21;
        await this.setState({number: n});
        PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
    }

    render() {
        if (!this.state.users) {
            return null;
        } else {
            // var users = [['Kate', '1'], ['John', '2'], ['Vasya', '3'], ['Alice', '4']];
            var UserMap = this.state.users.map((user, i) => {
                if (user.id !== localStorage.getItem('uid')) {
                    return (
                        <UserThumb key={i} data={ user } />
                    );
                }
            });
            
            return (
                <div className='showAllUsers' ref={ulist => {this.ulist = ulist;}}>
                    { UserMap }
                    <div className='preload-cnt'><img className='preloader' src="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif"
                    style={{display: this.state.dbEnd ? 'none' : 'block'}}/></div>
                </div>
            );
        }
    }
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
        <a className={(props.item === 'search' ? 'menulink-sel' : 'menulink')} onClick={() => Main._callSearch(1)}><i className="fas fa-search"></i></a>
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
            showSearch: false,
            display: 'home',
            previous: ''
        };
        this.iniState = this.state;
        Main.hideMenu = Main.hideMenu.bind(this);
        Main.callMessages = Main.callMessages.bind(this);
        Main.callMenuItem = Main.callMenuItem.bind(this);
        Main.showProfile = Main.showProfile.bind(this);
        Main.hideMenuBar = Main.hideMenuBar.bind(this);
        Main._callSearch = Main._callSearch.bind(this);
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

    static _callSearch(a) {
        if (a === 1 && !this.state.showSearch) {
            this.setState({showSearch: true});
        } else {
            this.setState({showSearch: false});
        }
    }

    static callMenuItem(a) {
        if (a === 'settings') {
            this.setState({showMenu: true});    
        } else {
            Messages.resetChat();
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
                <div className='content' style={{transform: this.state.showMessages ? 'translateX(-33%)' : 'translateX(0%)'}}>
                    <div className='main-center' style={{top: this.state.showMenu ? -15 + 'em' : 0 + 'em'}}>
                        <TopBar return={ this.state.viewProfile } />
                        <MainView item={ this.state.display } profile={ this.state.viewProfile } />
                    </div>
                    <div className='menus-panel' style={{bottom: this.state.showMenu ? 100 + '%' : 0 + 'px'}}>
                        <MenuBar display={this.state.display} />
                    </div>
                    <div className='search-panel' style={{bottom: this.state.showSearch ? 0 + 'em' : -30 + 'em'}}>
                        <SearchPanel />
                    </div>
                </div>
                <div className='noti-panel-cnt' style={{transform: this.state.showMessages ? 'translateX(-100%)' : 'translateX(0%)'}}>
                    <Messages />
                </div>
                
            </div>
        );
    }
}

class SearchPanel extends Component {
    constructor() {
        super();
        this.state = {
            age_l: 18,
            age_u: 36
        };
        this._sliderChange = this._sliderChange.bind(this);
    }

    _sliderChange(e) {
        // if (e.target.name === 'age_u' && e.target.value > this.state.age_l) {
            this.setState({[e.target.name]:e.target.value});            
        // } else if (e.target.name === 'age_l' && e.target.value > this.state.age_l) {
        //     this.setState({[e.target.name]:e.target.value});                        
        // } 
    }

    render () {

        return (
            <div>
                <h2> &nbsp; Search </h2>
                
                <div className='age-slider'>
                <p className='p-l'>{ this.state.age_l }</p>
                    <input min='18' max='100' step='1' type='range' value={this.state.age_l} onChange={this._sliderChange} name='age_l' />
                    <input min='18' max='100' step='1' type='range' value={this.state.age_u} onChange={this._sliderChange} name='age_u'/>
                <p className='p-u'>{ this.state.age_u }</p>
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

const MessagePreview = (props) => {
    var username = props.data.data.f_name;
    var chatid = props.data.id;
    var ava = props.data.data.avatar;
    var myid = localStorage.getItem('uid');
    var mateid = props.data.user1 === myid ? props.data.user2 : props.data.user1;

    // var previewText = props.data[2];
    return (
        <li key={this} onClick={() => Messages.setChatid(chatid, mateid, ava, username)}>
            <div className="message-header">
                <div className="usr-thumb-sm">
                    <img className='usr-thumb-pic-sm' alt='' src={props.data.data.avatar ? '/Matcha/uploads/' + props.data.data.avatar : '/Matcha/uploads/avatar-placeholder.png'}/>
                </div>
                <div className="message-prev" onClick={() => Messages.setChatid( chatid )}>
                    <span className='message-prev'><b>{ username }</b><br /> Click to open </span>
                </div>
            </div>
        </li>
    );
}

class Messages extends Main {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('udata'),
            id: localStorage.getItem('uid'),
            chats: false,
            chatid: '',
            mate: '',
            new: false
        }
        Messages.resetChat = Messages.resetChat.bind(this);
        Messages.setChatid = Messages.setChatid.bind(this);
        Messages.backToMessages = Messages.backToMessages.bind(this);
    }

    componentDidMount() {
        PostData('getchats', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({chats: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
    }

    static resetChat () {
        this.setState({chatid: ''});
        // this.setState({new: false});
    }

    static setChatid(chat, user, ava, username) {
        if (chat === -42) {
            this.state.chats.forEach(c => {
                if (c.user1 === user || c.user2 === user) {
                    this.setState({chatid: c.id});
                    return ;
                }
            });
        }
        this.setState({chatid: chat});
        this.setState({mate: {f_name: username, avatar: ava, id: user}});
        // this.setState({new: false});
    }

    static backToMessages() {
        this.setState({chatid: false});
        this.setState({new: false});
    }

    render () {
        var messages = [['Mike', '103', 'Hey, how are you?'], ['John', '2', 'Hello sweetie'], ['Vasya', '3', 'You stole my heart...']];        
        const chatmap = this.state.chats ? this.state.chats.map((chat, i) => {
            return (
                <MessagePreview
                    key={i}
                    data={chat} />
            );
        }) : null;
        if (this.state.chatid) {
            return (
                <Chat
                    id={this.state.chatid}
                    mate={this.state.mate} />
            );
        } else if (this.state.new) {
            return <NewMessage />
        } else {
            return (
                <div className='messages-panel'>
                    <div className='menu-nav tac'>
                        <a href="#"><i onClick={() => Main.callMessages(0)} className="fas fa-arrow-left fll"></i></a>
                        <a href="#new-message"><i onClick={() => this.setState({new: true})} className="fas fa-plus flr"></i></a>
                        <h4 className='menu-head'>Messages</h4>
                    </div>
                    <ul>
                        { chatmap }
                    </ul>
                </div>
            );
        }
    }
}

class NewMessage extends Messages {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            testsearch: false,
            users: false,
            message: false,
            sort: 'age',
            gender: false,
            start_age: 9,
            end_age: 99,
            start: 0,
            number: 15
        }
        this._getAvailableUsers = this._getAvailableUsers.bind(this);
        this._scrollListener = this._scrollListener.bind(this);        
    };

    async componentDidMount() {
        await this._getAvailableUsers();
        this.ulist.addEventListener('scroll', this._scrollListener);        
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    _scrollListener() {
        if (this.ulist.scrollTop + this.ulist.clientHeight >= this.ulist.scrollHeight) {
            this._onScroll();
        }
    }

    async _getAvailableUsers() {
        await PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
        await this.setState({loaded: true});
    }

    async _onScroll() {
        var n = this.state.number + 15;
        await this.setState({number: n});
        PostData('users', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson.data;
                this.setState({users: a});
                if (responseJson.status === 'dbEnd') {
                    this.setState({dbEnd: true});
                    // this.ulist.removeEventListener('scroll', this._scrollListener);
                    return ;
                }
            }
        });
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    <div className='menu-nav-new tac'>
                        <div>
                            <a href="#"><i onClick={() => Messages.backToMessages()} className="fas fa-arrow-left fll"></i></a>
                            <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
                            <h4 className='menu-head'>Messages</h4>
                        </div>
                        <div>
                            <div className='form-element-group chat-search-input'>
                                <input
                                    type='text'
                                    className='form-element search-in'
                                    placeholder='Search' />
                                <span onClick={() => this.testMessage()} className='form-element-extra search-snd-btn'><i className="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className='preloader-div'><img className='cool-preloader-img' src='https://media.giphy.com/media/26xBMTrIhFT1YYe7m/source.gif' alt='' /></div>
                </div>
            );
            // return <div className='preloader-div'><img className='cool-preloader-img' src='https://i.pinimg.com/originals/bb/9e/45/bb9e4523225243dacfd02ebc653b5b6d.gif' alt='' /></div>
        } else if (this.state.loaded) {
            if (this.state.users) {
                var userlist = this.state.users.map((user, i) => {
                    if (user.id !== localStorage.getItem('uid')) {
                        return (
                            <UserThumbList key={i} data={ user } />
                        );
                    }
                });
            }
            
            return (
                <div>
                    <div className='menu-nav-new tac'>
                        <div>
                            <a href="#"><i onClick={() => Messages.backToMessages()} className="fas fa-arrow-left fll"></i></a>
                            <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
                            <h4 className='menu-head'>Messages</h4>
                        </div>
                        <div>
                            <div className='form-element-group chat-search-input'>
                                <input
                                    type='text'
                                    className='form-element search-in'
                                    placeholder='Search' />
                                <span onClick={() => this.testMessage()} className='form-element-extra search-snd-btn'><i className="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className='messages-panel' ref={ulist => {this.ulist = ulist;}}>
                        { userlist }
                        <div className='preload-cnt'><img className='preloader-u-msg-lst' src="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif"
                        style={{display: this.state.dbEnd ? 'none' : 'block'}}/></div>
                    </div>
                </div>
            )
        }
    }    
}

class Chat extends Messages {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('udata'),
            id: localStorage.getItem('uid'),
            chatId: false,
            viewId: false,
            focus: false,
            updated: false,
            data: false,
            newMessage: '',
            messages: [['Hey', '0']]
        }
        this.testMessage = this._sendMesssage.bind(this);
        this.InputOnFocus = this.InputOnFocus.bind(this);
        this.onChange = this.onChange.bind(this);
        this._getInfo = this._getInfo.bind(this);
        this.changeView = this.changeView.bind(this);
        this.conn = new WebSocket('ws://localhost:8200?id=' + localStorage.getItem('uid'));
        this.conn.onmessage = (e) => {
            console.log(e.data);            
            this._msgReceived(e.data);
        };
    }

    async _msgReceived(e) {
        var str = JSON.parse(e);
        // console.log(str.message);
        if (str.message) {
            await this.state.messages.push({msg: str.message, sender: str.sender});
        } else if (str.message && str.status !== "ok") {
            alert ("Ooops, something's gone wrong. Please, try again.");
        }
        this.setState({updated: true});
    }

    changeView() {
        this.setState({viewId: this.props.id});
        this.setState({data: this.props.mate});
    }

    async _getInfo() {
        await this.changeView();
        PostData('msghistory', this.state).then((result) => {
            let responseJson = result;
            if (responseJson.data) {
                var a = responseJson.data;
                this.setState({messages: a});
            }
        });
    }

    componentDidMount() {
        // this.msglst.lastChild.scrollIntoView(!0);
        if (this.props.id && (this.props.id !== this.state.viewId)) {
            this._getInfo();
        }
        this.conn.onopen = function(e) {
            console.log("Connection established!");
        };
        
    }

    componentDidUpdate() {
        if (this.props.id && (this.props.id !== this.state.viewId)) {
            this._getInfo();
        }
        if (this.msglst.lastChild) {
            this.msglst.lastChild.scrollIntoView({behavior: 'smooth'});
        }
        // if (this.state.updated) {
        //     this.setState({updated: false});
        // }
    }

    onChange(e) {
        this.setState({[e.target.name]:e.target.value});
    }

    async _msgToDb(msg) {
        await PostData('send', msg).then((result) => {
            let responseJson = result;
            if (responseJson.status === 'ok') {
                return true;
            } else {
                return false;
            }
        });
    }

    async _sendMesssage() {
        if (this.state.newMessage) {
            var message = {message: this.state.newMessage, sender: localStorage.getItem('uid'), s_name: localStorage.getItem('uname')};
            var messageState = {status: 'msg', to: this.state.data.id, token: localStorage.getItem('udata'), id: localStorage.getItem('uid'), msg: JSON.stringify(message)};
            if (this._msgToDb(messageState)) {
                this.conn.send(JSON.stringify(messageState));
                // this._getInfo();
                this.state.messages.push({msg: this.state.newMessage, sender: this.state.id});
                this.setState({newMessage: ''});
            }
        }
    }

    _getMsgTime(t) {
        if (t) {
            var s = t.split(" ");
            var x = s[1].split(":");
            return x[0] + ":" + x[1];
        }        
    }

    InputOnFocus(a) {
        // // Main.hideMenuBar(a);
        if (a === 1) {this.setState({focus: true});}
        else {this.setState({focus: false});}
        this.msglst.lastChild.scrollIntoView({behavior: 'smooth'});
    }

    render () {
        var myid = localStorage.getItem('uid');
        var display =  this.props.id === -42 ? null : this.state.messages.map((message, i) => {
            var timestamp = this._getMsgTime(message.date);
            return (
                <li className='msg-cps' key={i}>
                    <img className='chat-u-thumb' src={this.state.data.avatar ? '/Matcha/uploads/' + this.state.data.avatar : 'Matcha/uploads/avatar-placeholder.png'} style={{ display: message.sender === myid ? 'none' : 'block' }}/>
                    <p className={(message.sender === myid ? 'sent-message btn' : 'received-message btn')}>{message.msg}<span className={(message.sender === myid ? 'msg-time-r' : 'msg-time-l')}>{ timestamp }</span></p>
                </li>
            );
        })
        if (this.state.data) {
            var username = this.state.data['f_name'];
        }
        return (
            <div>
                <div className='chat-panel'>
                    <div className='menu-nav tac'>
                        <a href="#"><i onClick={() => Messages.resetChat()} className="fas fa-arrow-left fll"></i></a>
                        <a href="#new-message"><i onClick={() => Messages.resetChat()} className="fas fa-plus flr"></i></a>
                        <h4 className='menu-head'> { username } </h4>
                    </div>
                    <div className='chat-self'>
                        <ul ref={msglst => {this.msglst = msglst;}}>
                            { display }
                        </ul>
                    </div >
                </div>
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
                    <span onClick={() => this._sendMesssage()} className='form-element-extra msg-snd-btn'><i className="fab fa-telegram-plane"></i></span>
                </div>
            </div>
        );
    }
}

class UserProfile extends Main {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('udata'),
            id: localStorage.getItem('uid'),
            viewId: '',
            data: ''
        }
    }

    componentDidUpdate() {
        if (this.props.id && (this.props.id !== this.state.viewId)) {
            this._getInfo();
        } else if (!this.props.id && this.state.data) {
            this.setState({viewId: false});
            this.setState({data: false});
        }
    }

    changeView() {
        this.setState({viewId: this.props.id});
    }

    async _getInfo() {
        await this.changeView();
        PostData('myprofile', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson[0];
                this.setState({data: a});
            }
        });
    }

    _userAge(d) {
        var dD = new Date(d);
        var aD = Date.now() - dD.getTime();
        var aT = new Date(aD);
        return Math.abs(aT.getUTCFullYear() - 1970);
    }

    async _openChat(id, ava, name) {
        await Messages.setChatid(-42, id, ava, name);
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

    render() {
        if (this.state.data) {
            // this._getInfo();
            var userid = this.state.data['id'];
            var userdob = this.state.data['date'];
            var username = this.state.data['f_name'];
            var userage = this._userAge(userdob);
            var usergender = this.state.data['gender'] === 'M' ? 'Male' : 'Female';
            var userpref = this.state.data['sex_preference'] === 'M' ? 'Men' : 'Women';
            var usertag = this.state.data['tags'];
            var userbio = this.state.data['biography'];
            var usergen = this.state.data['gender'];
            var src = usergen === "M" ? "https://randomuser.me/api/portraits/med/men/" + userid + ".jpg" : "https://randomuser.me/api/portraits/med/women/" + userid + ".jpg";        
            return (
            <div className='inner-cnt'>
                <div className='basic-u-info-cnt'>
                    <div className='profile-img'>
                        <img className='profile-img' src={ this.state.data.avatar ? 'Matcha/uploads/' + this.state.data.avatar : src } alt=''/>
                    </div>
                    <div className='basic-u-info'>
                        <h3> { username }, { userage } </h3>
                        <div className='btn-group'>
                            <button onClick={() => this._openChat(userid, this.state.data.avatar, username)} className='btn btn-default'>Message</button>
                            <button className='btn btn-default third'><i className="far fa-star"></i></button>
                        </div>
                    </div>
                </div>
                <div className='ext-u-info' style={{ marginTop: this.state.avaUploadBox ? 8.8 + 'em' : 5.4 + 'em' }} >
                    <div className='ext-u-info2'>
                        <div className='full u-int'>
                            <div className='fll half'>
                                <label>Gender</label>
                                <span> { usergender } </span>
                                <label>Born on</label>
                                <span> { userdob } </span>
                            </div>
                            <div className='fll half'>
                                <label>Seeking</label>
                                <span> { userpref } </span>
                                <label>Interested in</label>
                                <span> { usertag } </span>
                            </div> 
                        </div>
                        <div className='full u-bio'>
                            <label>Bio</label>
                            <span> { userbio } </span>
                        </div>
                        
                        <div className='ext-u-photos'>
                            <label>Pictures</label>
                            {/* { userphotos } */}
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            // return <div className='preloader-div'><img className='cool-preloader-img' src='https://i.pinimg.com/originals/bb/9e/45/bb9e4523225243dacfd02ebc653b5b6d.gif' alt='' /></div>
            return <div className='preloader-div'><img className='cool-preloader-img' src='https://media.giphy.com/media/26xBMTrIhFT1YYe7m/source.gif' alt='' /></div>
        }
    }
}

class Profile extends Main {
    constructor() {
        super();
        this.state = {
            update: false,
            avaUploadBox: false,
            edit: false,
            imgUpload: false,
            me: '',
            id: localStorage.getItem('uid'),
            token: localStorage.getItem('udata'),
            displayPicture: false
        }
        this._imgBase64 = this._imgBase64.bind(this);
        this._onFileUpload = this._onFileUpload.bind(this);
    }
    
    componentDidMount() {
        this._getMyInfo();
    }

    componentDidUpdate() {
        if (this.state.update) {
            this._getMyInfo();
        }
    }

    async _getMyInfo() {
        await PostData('myprofile', this.state).then((result) => {
            let responseJson = result;
            if (responseJson) {
                var a = responseJson[0];
                this.setState({ me: a });
                localStorage.setItem('uname', a.f_name);
            }
        });
        this.setState({update: false});        
    }

    _imgBase64(f) {
        var imgState = { img: f['base64'], id: this.state.id, token: this.state.token };
        this.setState({ imgUpload: imgState });
    }

    async _onFileChange(f) {
        await this._imgBase64(f);
    }

    async _setAvatar(a) {
        var imgState = { photo: a, id: this.state.id, token: this.state.token };
        await this.setState({imgUpload: false});
        // console.log(a);
        if (window.confirm("Would you like to use this photograph as your profile picture?")) {
            PostData('myprofile/avatar', imgState).then((result) => {
                let responseJson = result;
                if (responseJson) {
                    if (responseJson.status === 'ok') {
                        this.setState({update: true});
                        this.setState({imgUpload: false});
                        return true;
                    } else {
                        return false;
                    }
                }
            });
        }
    }

    async _onFileUpload() {
        await PostData('uploadphoto', this.state.imgUpload).then((result) => {
            let responseJson = result;
            if (responseJson) {
                if (responseJson.status === 'ok') {
                    this._setAvatar(responseJson.index);
                    this.setState({update: true});
                    this.setState({avaUploadBox: false});
                    this.setState({imgUpload: false});
                    alert("Your image has been successfully uploaded!");
                } else {
                    alert("Ooops... Something's gone wrong. Please try again.");
                }
            }
        });
    }

    async _showPicture(i) {
        if (i === -42) {
            await this.setState({displayPicture: false});
        } else {
            await this.setState({displayPicture: i});
        }
    }

    _userAge(d) {
        var dD = new Date(d);
        var aD = Date.now() - dD.getTime();
        var aT = new Date(aD);
        return Math.abs(aT.getUTCFullYear() - 1970);
    }

    _avaUploadBox(a) {
        if (a === 1 && !this.state.avaUploadBox) {
            this.setState({avaUploadBox: true});
        } else {
            this.setState({avaUploadBox: false});
            this.setState({imgUpload: false});
        }
    }


    _editProfile(a) {
        if (a === 1) {
            this.setState({edit: true});
        } else {
            this.setState({edit: false});
        }
    }

    async _deletePic(i) {
        if (window.confirm('Do you really wanna delete it?')) {
            var imgState = { delphoto: i, id: this.state.id, token: this.state.token };        
            await PostData('delphoto', imgState).then((result) => {
                let responseJson = result;
                if (responseJson) {
                    if (responseJson.status === 'ok') {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            this.setState({displayPicture: false});
            this.setState({update: true});
        }
    }

    render () {
        let nameInput = ['form-element'];
        if (this.state.required) {
            nameInput.push("f-is-danger");
        }
        if (this.state.edit) {
            return (
            <div className="Edit-Info">
                <i className="far fa-times-circle flr mar5 close" onClick={() => this._editProfile(0)}></i>
                <h3>&nbsp;Change your info</h3>
                <br />
                    <label>Nickname (optional):</label>
                    <input type="text" className='form-element full input-ln' placeholder="Can be used as login" name='u_name' onChange={this.onChange} value={this.state.me.u_name}/>
                    <label>First name:</label>
                    <input type="text" className={nameInput.join(' ')} placeholder="Real name" name='f_name' onChange={this.onChange} value={this.state.me.f_name} />
                    <label>Email:</label>
                    <input type="email" className='form-element full input-ln' placeholder="Email" name='email' onChange={this.onChange} value={this.state.me.email} />
                    <label>Gender and preference:</label>
                    <div className="form-element-group full">
                        <select className='form-element has-primary half' name="gender" onChange={this.onChange} value={this.state.me.gender}>
                        <option value="1">Man seeking</option>
                        <option value="2">Woman seeking</option>
                        </select>
                        <select className='form-element has-danger half' name="sex_preference" onChange={this.onChange} value={this.state.me.sex_preference}>
                        <option value="2">Women</option>
                        <option value="1">Men</option>
                        <option value="3">Both</option>
                        </select>
                    </div>
                    <label>Your interests:</label>
                    <input type="text" className='form-element full input-ln' placeholder="e.g. 'Sex, drugs, rocknroll'" name='tags' onChange={this.onChange} value={this.state.me.tags}/>
                    <label>Your Bio:</label>
                    <textarea rows='4' maxLength='140' className='form-element full input-ln' placeholder="Who are you, what do you do, whom do you like?" name='biography' onChange={this.onChange} value={this.state.me.biography} />
                    {/* <label>Change your password:</label>
                    <input type="password" className='form-element full input-ln' placeholder="Your old password" name='password' onChange={this.onChange}/>
                    <input type="password" className='form-element full input-ln has-danger' placeholder="Your new password" name='passwordConfirmation' onChange={this.onChange}/> */}
                    {/* <div className='btn-group full'>
                        <button className="btn btn-success half" onClick={this.register} style={{marginBottom: 10 + 'px'}}>Modify</button>    
                        <button className="btn btn-danger half" onClick={this.register} style={{marginBottom: 10 + 'px'}}>Cancel</button>
                    </div> */}
            </div>
            )
        } else if (this.state.me) {
            var userid = this.state.me['id'];
            var userdob = this.state.me['date'];
            var username = this.state.me['f_name'];
            var userage = this._userAge(userdob);
            var usergender = this.state.me['gender'] === 'M' ? 'Male' : 'Female';
            var userpref = this.state.me['sex_preference'] === 'M' ? 'Men' : 'Women';
            var usertag = this.state.me['tags'];
            var userbio = this.state.me['biography'];
            var userava = this.state.me['avatar'];
            var upics = this.state.me['all_foto'] ? JSON.parse(this.state.me['all_foto']) : null;
            
                const userphotos = upics ? upics.map((photo, i) => {
                    return (
                        <div className='photo-thumb-cnt'>
                            {/* <i onClick={() => this._deletePic(i)} className="far fa-times-circle flr mar5 del-pic"></i> */}
                            <img onClick={() => this._showPicture(i)} className='photos-thumb' src={ '/Matcha/uploads/' + photo } alt={i} />
                        </div>
                    );
                }) : null;
            
            const pictureDisplay = (
                <div>
                    <div className='photo-v-head'>
                        <h2 className="posa fll">&nbsp;Preview &amp; Edit </h2>
                        <a href="#" style={{zIndex: 12}}><i className="far fa-times-circle flr mar5 close-photo-v-lg" onClick={() => this._showPicture(-42)}></i></a>
                        {/* <p className="pic-v-lg-del">delete</p>
                        <p className="pic-v-lg-seta">set as profile pic</p>               */}
                        <div className="btn-group pic-control">
                            <button onClick={() => this._setAvatar(upics[this.state.displayPicture])} className='btn btn-default third'><i className="fas fa-user-astronaut"></i></button>
                            <button className='btn btn-default third'><i className="far fa-star"></i></button>
                            <button onClick={() => this._deletePic(this.state.displayPicture)} className='btn btn-default third'><i className="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <img className='picture-v-lg' src={this.state.displayPicture ? '/Matcha/uploads/' + upics[this.state.displayPicture] : ''} alt='' />
                </div>
            );
            return (
            <div className='inner-cnt'>
                <div className='picture-view-lg' style={{display: this.state.displayPicture ? 'block' : 'none'}} >
                    {pictureDisplay}
                </div>
                <div className='basic-u-info-cnt'>
                    <div className='profile-img'>
                        <i onClick={() => this._avaUploadBox(1)} class="fas fa-plus-circle ava-plus-icon"></i>
                        <img className='profile-img' src={ userava ? 'Matcha/uploads/' + userava : '/Matcha/uploads/avatar-placeholder.png' } alt=''/>
                    </div>
                    <div className='basic-u-info'>
                        <h3> { username }, { userage } </h3>
                        <button onClick={() => this._editProfile(1)} className='btn btn-default'>Edit Your Profile</button>
                    </div>
                </div>
                <div className='ext-u-info' style={
                    { marginTop: this.state.avaUploadBox ? 
                        this.state.imgUpload ? 128 + 'vw' : 8.8 + 'em' :
                        this.state.imgUpload ? 9 + 'em' : 5.4 + 'em'
                    }
                    } >
                    <img className='picture-v-lg-prev' src={this.state.imgUpload ? this.state.imgUpload.img : null} />
                    <div className='full ava-upl rel'>
                        <div className='btn-group w80 fll'>
                            <button className='btn btn-default half img-upl'><FileBase64 onDone={ this._onFileChange.bind(this) } /></button>
                            <button className='btn btn-primary half' onClick={ this._onFileUpload }>Upload</button>
                        </div>
                        <a href="#" style={{zIndex: 9}}><i className="far fa-times-circle flr mar5 close-ava-upl" onClick={() => this._avaUploadBox(0)}></i></a>
                    </div>
                    <div className='ext-u-info2'>
                        <div className='full u-int'>
                            <div className='fll half'>
                                <label>Gender</label>
                                <span> { usergender } </span>
                                <label>Born on</label>
                                <span> { userdob } </span>
                            </div>
                            <div className='fll half'>
                                <label>Seeking</label>
                                <span> { userpref } </span>
                                <label>Interested in</label>
                                <span> { usertag } </span>
                            </div> 
                        </div>
                        <div className='full u-bio'>
                            <label>Bio</label>
                            <span> { userbio } </span>
                        </div>
                        
                        <div className='ext-u-photos'>
                            <label>My Photos</label>
                            { userphotos }
                        </div>
                    </div>
                </div>
            </div>
        )} else {
            return null
        }
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

    logout() {
        if (window.confirm('Do you really wanna log out?')) {
            localStorage.removeItem('udata');
            browserHistory.push('/');
        }
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
                    <a className="logout-btn" onClick={ this.logout }>Log out</a>
                </div>
            </div>
        );
    }
}

export default Main;
