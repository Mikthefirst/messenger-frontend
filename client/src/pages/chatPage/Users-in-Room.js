import styles from './chat.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomAndUsers = ({ socket, nickname, room, token }) => {
    const [roomUsers, setRoomUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            token = document.cookie.split(';')[2].split('=')[1];
        }


        socket.on('user_list', (data) => {
            //  console.log(data);
            setRoomUsers(data);
        });

        return () => socket.off('user_list');
    }, [socket]);

    const leaveRoom = () => {
        const __createdtime__ = Date.now();
        socket.emit('leave_room', { nickname, room, token, __createdtime__ });
        // Redirect to home page
        navigate('/', { replace: true });
    };

    return (
        <div className={styles.roomAndUsersColumn}>
            <h2 className={styles.roomTitle}>{room}</h2>

            <div>
                {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
                <ul className={styles.usersList}>
                    {
                        (roomUsers) ? (
                            roomUsers.map((user) => (
                                <li
                                    style={{
                                        fontWeight: `${user.nickname === nickname ? 'bold' : 'normal'}`,
                                    }}
                                    key={user.id}
                                >
                                    {user.nickname}
                                </li>
                            ))
                        )
                            : (
                                <li>No one here</li>
                            )
                    }
                </ul>
            </div>

            <button className='btn btn-outline' onClick={leaveRoom}>
                Leave
            </button>
        </div>
    );
};

export default RoomAndUsers;