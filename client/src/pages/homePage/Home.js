import styles from './home.module.css';
import { useNavigate } from 'react-router-dom';
import AdviceLamp from './../../assets/adviceLamp.png'
function Home({ username, setUsername, nickname, setNickname, password, setPassword, socket }) {
    const navigate = useNavigate()
    const joinRoom = async () => {
        if (username !== '' && password !== '') {
            if (nickname[0] !== '@') {
                nickname = '@' + nickname;
            }
            console.log('working:', { username, password, nickname });
            try {
                const responce = await fetch('http://localhost:3002/app/getCookie', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    'body': JSON.stringify({
                        'username': username,
                        'password': password,
                        'nickname': nickname
                    }),
                    credentials: 'include'
                })
                console.log(responce.status);
                navigate('/main', { replace: true })
            }
            catch (err) {
                console.log(err)
            }

        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <h1 className={styles.WhiteSpace}>{`VesTochka`}<br /></h1>
                <input className={styles.input} placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
                <div className={styles.inputContainer}>
                    <input className={`${styles.input} ${styles.inputNick}`} placeholder='@nickname:' onChange={(e) => setNickname(e.target.value)} />
                    <div className={styles.tooltipContainer}>
                        <img src={AdviceLamp} alt="Advice Lamp" className={styles.tooltipIcon} />
                        <span className={styles.tooltipText}>Use only English letters, digits, underscores, and start with @</span>
                    </div>
                </div>
                <input type="password" className={styles.input} placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />

                <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
};

export default Home;