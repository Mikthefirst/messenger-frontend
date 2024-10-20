import { useState, useEffect } from 'react';
import styles from './profile.module.css';
//import AvatarIcon from './../../assets/avatarIcon.png';


function Profile() {
    const [imagePath, setImagePath] = useState('');
    let username, password, token;
    useEffect(() => {
        if (!token) {
            token = document.cookie.split(';')[3].split('=')[1];
        }
        if (!username) {
            username = document.cookie.split(';')[0].split('=')[1];
        }
        if (!password) {
            password = document.cookie.split(';')[2].split('=')[1];
        }
        if (password && username) {
            async function fetchImage() {
                const res =
                    await fetch(`http://localhost:3002/app/getImage?username=${username}&password=${password}`)
                if (res.ok) {
                    const blobik = await res.blob();
                    console.log(blobik);
                    setImagePath(URL.createObjectURL(blobik));
                    console.log(imagePath);
                }
                else {
                    console.error('Failed to fetch image:', res.statusText);
                }
            }
            fetchImage();
        };
        /*
         const response = await fetch('http://localhost:3002/app/getImage/avatarIcon.png');
            const imageBlob = await response.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageSrc(imageObjectURL);
        */
    }, [username]);
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                {imagePath && <ProfileImage imagePath={imagePath} />}
                {!imagePath &&
                    <AddImage />
                }
            </div>
        </div>
    );
};

function AddImage() {
    return (
        <form className={styles.custom__form} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Add image:</h1>
            <div className={styles.custom__image_container}>
                <label id="add-img-label" htmlFor="add-single-img">+</label>
                <input type="file" id="add-single-img" accept="image/jpeg" />
            </div>
            <input
                type="file"
                id="image-input"
                name="photos"
                accept="image/jpeg"
                multiple
            />
            <br />
            <button type="submit" className={styles.custom__form}>Submit</button>
        </form>
    );
}

function ProfileImage({ imagePath }) {
    return (
        <form className={styles.custom__form} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Your current image:</h1>
            <img src={imagePath} alt="Profile Image" />


            <h3>If you want to add new use this:</h3>

            <div className={styles.custom__image_container} style={{ width: '60px', height: '50px' }}>
                <label style={{ width: '60px', height: '50px' }} id="add-img-label" htmlFor="add-single-img" >+</label>
                <input type="file" id="add-single-img" accept="image/jpeg" />
            </div>
            <input
                type="file"
                id="image-input"
                name="photos"
                accept="image/jpeg"
                multiple
            />
            <br />
            <button type="submit" className={styles.custom__form}>Submit</button>
        </form>
    );
}

export default Profile;