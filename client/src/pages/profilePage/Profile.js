import { useState, useEffect } from 'react';
import styles from './profile.module.css';
import addStyles from './addimage.module.css'
import setStyles from './setimage.module.css'

//import AvatarIcon from './../../assets/avatarIcon.png';
let username, password, token;

function Profile() {
    const [imagePath, setImagePath] = useState('');

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
        <form className={addStyles.custom__form} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Add image:</h1>
            <div className={addStyles.custom__image_container}>
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
            <button type="submit" className={addStyles.custom__form}>Submit</button>
        </form>
    );
}

function ProfileImage({ imagePath }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const SetImage = async (event) => {
        event.preventDefault();

        if (username && password && selectedFile) {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            const res = await fetch(`http://localhost:3002/app/setImage?username=${username}&password=${password}`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                alert(`New image has been added correctly.`);
            } else {
                alert(`Failed to add the image.`);
            }
        } else {
            alert('No file selected or missing username/password.');
        }
    };


    return (
        <form className={setStyles.custom__form}>
            <h1>Your current image:</h1>
            <div className={setStyles.custom__image_container}>
                <img src={imagePath} alt="Profile Image" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '70%', fontWeight: 'bold' }}>Add avatar:</span>
                    <label htmlFor="add-single-img" id="add-img-label" >📤</label>
                </div>
                <input type="file" id="add-single-img" accept="image/jpeg" onChange={handleFileChange} />
            </div>
            <input type="file" id="image-input" name="photos" accept="image/jpeg" multiple />
            <br />
            <button type="submit" className={setStyles.custom__form} onClick={SetImage}>Submit</button>
        </form>

    );
}

export default Profile;