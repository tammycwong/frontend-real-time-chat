import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
//queryString helps to retrieve data from URL 
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from './InfoBar'

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'localhost:5000';
    //cleaner code ^

    useEffect(() => {
        // const data = queryString.parse(location.search)
        const {name, room} = queryString.parse(location.search)
        //location is from react router=> gets URL back
        // socket = io('localhost:5000');
        socket = io(ENDPOINT);
        
        // console.log(location.search);
        // console.log(data);
        //can destructure data = {name, room} //console.log(name, room);

        setName(name);
        setRoom(room);
        // console.log(socket);
        socket.emit('join', {name, room}, () => {
        
        })
        return() => {
            // socket.emit('disconnect');
            socket.disconnect();
            socket.off();
        }

    }, [ENDPOINT, location.search]);
    //if endpoint and location.search, rerender useEffect
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);
    
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
            //setMessage empty string to clear message 
        }
    }


    
    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}/>
                {/* <input value={message} 
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={event=>event.key === 'Enter' ? setMessage(event) : null }
                /> */}

            </div>
        </div>
    )
}
export default Chat;