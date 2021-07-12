import React from 'react';
import './Messages.css';
import * as Scroll from 'react-scroll';
import Message from '../Message/Message'

const Messages = ({messages, name}) => {
    return (
        <div>
            {messages.map((message, index) =>
            <div key={index}><Message message={message} name={name}/></div>
            )}
        </div>
    )
}

export default Messages;