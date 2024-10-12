import { useEffect } from 'react';
import styles from './chat.module.css';
import Messages from './messages';
import SendMessage from './SendMessage';
import RoomAndUsers from './Users-in-Room';
function Chat({ username, room, password, socket }) {
    console.log(`username: ${username}, room: ${room}, password ${password}`);
    useEffect(() => {
        if (!username) {
            username = document.cookie.split(';')[0].split('=')[1];
        }
        if (!room) {
            room = document.cookie.split(';')[1].split('=')[1];
        }
        if (!password) {
            password = document.cookie.split(';')[2].split('=')[1];
        }
        const token = document.cookie.split(';')[3].split('=')[1];

        console.log(`Cookie data: username: ${username}, room: ${room}, password ${password}`);

        socket.emit('join_room', { username, room, password, token });

    }, [username, password, room, socket])
    return (
        <div className={styles.chatContainer}>
            <RoomAndUsers socket={socket} username={username} room={room} />
            <div>
                <Messages socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>);
}

export default Chat;