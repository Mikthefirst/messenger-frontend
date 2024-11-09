import { useEffect } from 'react';
import styles from './chat.module.css';
import Messages from './messages';
import SendMessage from './SendMessage';
import RoomAndUsers from './Users-in-Room';

let username, room, nickname, token;
function Chat({ room, username, nickname, socket }) {
    console.log(`username: ${username}, room: ${room}, nickname ${nickname}`);
    useEffect(() => {
        if (!username) {
            username = document.cookie.split(';')[1].split('=')[1];
        }
        if (!nickname) {
            nickname = document.cookie.split(';')[0].split('=')[1];
        }

        if (!token) {
            token = document.cookie.split(';')[2].split('=')[1];
        }

        console.log(`Cookie data: room: ${room}, nickname ${nickname}`);
        if (room, nickname) { socket.emit('join_room', { username, nickname, room, token }); }

    }, [nickname, room, socket])
    return (
        <div className={styles.chatContainer}>
            <div style={{ textAlign: 'left' }}>
                <Messages socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>);
}

export default Chat;