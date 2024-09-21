import styles from './chat.module.css';
import Messages from './messages';
import SendMessage from './SendMessage';
function Chat({ username, room, socket }) {
    return (
        <div className={styles.chatContainer}>
            <div>
                <Messages socket={socket} />
                <SendMessage socket={socket} username={username} room={room} />
            </div>
        </div>);
}

export default Chat;