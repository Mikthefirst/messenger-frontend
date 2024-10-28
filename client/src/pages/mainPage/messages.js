import styles from './chat.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('send_user_message', (data) => {
            console.log('messages:', data);
            setMessagesReceived((state) => {
                if (Array.isArray(data)) {
                    return [...state, ...data];
                }
                else if (typeof data === 'object') {
                    return [...state, data];
                }
                else {
                    return state;
                }
            });
        });

        // Remove event listener on component unmount
        return () => socket.off('send_user_message');
    }, [socket]);

    function formatDateFromTimestamp(timestamp) {
        console.log('formatDateFromTimestamp:', typeof timestamp, '\t', timestamp);
        let date;
        try {
            date = new Date().parse(timestamp);
        }
        catch (err) {
            date = new Date(timestamp);
            /*  let str_time_date = timestamp.split('T')[0].split('-');
              let str_time = timestamp.split('T')[1].split(':');
              console.log('timeDate:', str_time_date);
              str_time[2].lenght = 2;
              console.log('hours:', str_time);
              date = new Date(str_time_date[0], str_time_date[1], str_time_date[2], str_time[0], str_time[1], str_time[2]);
              //Date(year: number, monthIndex: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)
              //"2024-09-24T14:03:26.447Z"*/
        }
        //console.log(date);
        return date.toLocaleString();
    }

    return (
        <div className={styles.messagesColumn}>
            {messagesRecieved.map((msg, i) => (
                <div className={styles.message} key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className={styles.msgMeta}>{msg.username}</span>
                        <span className={styles.msgMeta}>
                            {formatDateFromTimestamp(msg.__createdtime__)}
                        </span>
                    </div>
                    <p className={styles.msgText}>{msg.data}</p>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default Messages;