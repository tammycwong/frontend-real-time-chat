import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
//queryString helps to retrieve data from URL 
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from './../InfoBar/InfoBar';
import Input from './../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const ENDPOINT = 'localhost:5000';

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

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
        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        
        });
        // return() => {
        //     // socket.emit('disconnect');
        //     socket.disconnect();
        //     socket.off();
        // }

    }, [ENDPOINT, location.search]);
    //if endpoint and location.search, rerender useEffect
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({users}) => {
            setUsers(users);
        });
    }, []);
    
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
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                <Messages messages={messages}/>

            </div>
            <TextContainer users={users}/>
        </div>
    )
}
export default Chat;