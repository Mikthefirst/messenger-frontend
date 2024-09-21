import styles from './chat.module.css';
import Messages from './messages';
import SendMessage from './SendMessage';
import RoomAndUsers from './Users-in-Room';
function Chat({ username, room, socket }) {
    console.log(`username: ${username}, room: ${room}`);
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