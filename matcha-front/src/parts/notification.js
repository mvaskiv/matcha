import React, { Component } from 'react';

const NotificationPreview = (props) => {
    return (
        <li key={this}>
            <div className="noti-header">
                <div className="usr-thumb-xsm">
                    <img className='usr-thumb-pic-xsm' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' />
                </div>
                <div className="noti-prev">
                    <span className='noti-prev'><b>{props.user}</b>&nbsp;cheked you out.</span>
                </div>
            </div>
        </li>
    );
}

export default NotificationPreview;