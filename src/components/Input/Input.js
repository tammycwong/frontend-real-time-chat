import React from 'react';
import './Input.css';

const Input = ({message, setMessage, sendMessage}) => {

    return(
        <div>
        <form className="form">
        <input 
         className="input"
         type="text"
         placeholder="Type a message..."
         value={message}
         onChange={({target: {value}}) => setMessage(value)}
         onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null }

        />
        <button className="sendButton" onClick={event=> sendMessage(event)}>Send</button>
        </form>
        </div>
    )
}

export default Input