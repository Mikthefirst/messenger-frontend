import styles from './chat.module.css';
import React, { useState } from 'react';

const SendMessage = ({ socket, nickname, room, token }) => {
    const [message, setMessage] = useState('');

    const HandleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('enter pressed')
            sendMessage();
        }
    }
    const sendMessage = () => {
        if (!token) {
            token = document.cookie.split(';')[2].split('=')[1];
        }
        if (message !== '') {
            const __createdtime__ = Date.now();
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socket.emit('send_message', { nickname, room, message, token, __createdtime__ });
            setMessage('');
        }
    };

    return (
        <div className={styles.sendMessageContainer}>
            <input
                className={styles.messageInput}
                placeholder='Message...'
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={HandleKeyPress}
                value={message}
            />
            <button className='btn btn-primary' onClick={sendMessage}>
                Send Message
            </button>
        </div>
    );
};

export default SendMessage;