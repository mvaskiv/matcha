import React, { Component } from 'react';

const Umessage = (props) => {
    return (
        <div className="message-header">
            <div className="usr-thumb-sm">
                <img className='usr-thumb-pic-sm' alt='' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOenGWBAWe8eQudov0SaTXTG4_H3rqQcWBpgGOTjjm8-9ppEO' />
            </div>
            <div className="message-prev">
                <span className='message-prev'><b>{props.user}</b><br />Hello, where the fuck are you?</span>
            </div>
        </div>
    );
}

export default Umessage;