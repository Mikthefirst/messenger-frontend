import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';

function Home({ username, setUsername, room, setRoom, password, setPassword, socket }) {
    const navigate = useNavigate()
    const joinRoom = async () => {
        if (room !== '' && username !== '' && password !== '') {
            console.log('working:', { username, room, password });
            try {
                const responce = await fetch('http://localhost:3002/app/getCookie', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    'body': JSON.stringify({
                        'username': username,
                        'room': room,
                        'password': password
                    }),
                    credentials: 'include'
                })
                console.log(responce.status);
                navigate('/chat', { replace: true })
            }
            catch (err) {
                console.log(err)
            }

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.WhiteSpace}>{`<>CHAT Rooms</>`}<br /></h1>
                <input className={styles.input} placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
                <input type="password" className={styles.input} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
                <select className={styles.input} onChange={(e) => { setRoom(e.target.value) }}>
                    <option>-- Select Room --</option>
                    <option value='javascript'>JavaScript</option>
                    <option value='node'>Node</option>
                    <option value='express'>Express</option>
                    <option value='react'>React</option>
                </select>

                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default Home;