import React, { Component } from 'react';
import { PostData } from '../service/post.js';
import { Redirect } from 'react-router';

// class Messages extends Main {
//     render () {
//         return (
//             <h2>Main</h2>
//         );
//     }
// }

// class Profile extends Main {
//     render () {
//         return (
//             <h2>Main</h2>
//         );
//     }
// }

const TopBar = (props) => (
    <div className='topbar'>
    <nav className='full tac'>
        <p className='logo-sm'>matcha</p>
        {/* <a className='fll'><i className="fas fa-user-circle"></i></a> */}
        <a className='flr' onClick={() => Main.callNotif(1)}><i className="far fa-bell"></i></a>
    </nav>
    </div>    
)


const MenuBar = (props) => (
    <div className='menubar'>
    <nav className='full'>
        <a className='fll'><i className="fas fa-user-astronaut"></i></a>
        <a className='fll'><i className="far fa-envelope"></i></a>
        <a href=""><i className="fas fa-search search-btn"></i></a>
        <a className='flr'><i className="fas fa-sliders-h"></i></a>
        <a className='flr'><i className="far fa-heart"></i></a>
    </nav>
    </div>
)

class Main extends Component {
    constructor() {
        super();
        this.state = {
            notifications: false,
            settings: false
        };
        this.iniState = this.state;
        Main.callNotif = Main.callNotif.bind(this);
    }
    static callNotif(a) {
        if (a === 1) {this.setState({notifications: true});}
        else {this.setState({notifications: false});}
    }
    render () {
        return (
            <div>
                <div className='main-center' style={{left: this.state.notifications ? -100 + '%' : 0 +'%'}}>
                    <TopBar />
                    <MenuBar />
                </div>
                <div className='noti-panel-cnt' style={{left: this.state.notifications ? 0 + '%' : 100 +'%'}}>
                    <Notifications />
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
            <i className="far fa-times-circle flr mar5 close-noti" onClick={() => Main.callNotif(0)}></i>
            
        </div>
        );
    }
}

export default Main;