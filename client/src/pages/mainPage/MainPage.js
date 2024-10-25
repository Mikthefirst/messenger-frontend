import React, { useEffect, useState } from "react";
import "./mainPage.css";
import io from 'socket.io-client';
//import ChatForm from './../chatPage/messages';
const server = process.env.REACT_APP_SERVER;


const socket = io.connect(process.env.REACT_APP_IO_SERVER);
let nickname, username, token;
function MainPage() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        nickname = document.cookie.split(';')[0].split('=')[1];
        username = document.cookie.split(';')[1].split('=')[1];
        token = document.cookie.split(';')[2].split('=')[1];

        console.log(`Cookie data: nickname: ${nickname}, username: ${username}`);
        /*if (nickname && username && token)
            socket.emit('join_room', { nickname, username, token });*/
        async function fetchRooms() {
            const RoomsResponce = await fetch(`${server}/rooms/GetRoomsNickname`, {
                credentials: 'include',
            });
            if (RoomsResponce.ok) {
                const roomsString = await RoomsResponce.text();
                setRooms(JSON.parse(roomsString));
                console.log('Rooms:\n', rooms);
                console.log(await RoomsResponce);
            }
            else {
                console.error('Failed to fetch rooms:', RoomsResponce.statusText);
            }
        }
        fetchRooms();
    }, [nickname, username, token, socket])








    //
    //Pop Up left Menu
    //
    const [menuVisible, setMenuVisible] = useState(false);

    const changeMenu = () => {
        setMenuVisible(!menuVisible);
    }

    useEffect(() => {
        document.addEventListener('click', (event) => {
            const clickedElement = event.target;

            if (clickedElement.className === "menu_button");
            else {
                let currentElement = clickedElement;
                let hasMenuParent = false;
                while (currentElement.parentElement !== null) {
                    if (currentElement.className === "menu show") {
                        hasMenuParent = true;
                        break;
                    }
                    currentElement = currentElement.parentElement;
                }

                if (clickedElement.className !== "menu show" && menuVisible === true && hasMenuParent === false) {
                    setMenuVisible(false);
                }
            }
        });
    }, [menuVisible]);

    //
    //End of pop Up menu
    //

    return (
        <div className="container">
            <div className="sidebar">
                <h2 className="menu_button" onClick={changeMenu}>☰</h2>
                <div className="group-icon">
                    <img src="https://via.placeholder.com/50" alt="Group 1" />
                    <p>Group 1</p>
                </div>
                <div className="group-icon">
                    <img src="https://via.placeholder.com/50" alt="Group 2" />
                    <p>Group 2</p>
                </div>
                <div className="group-icon">
                    <img src="https://via.placeholder.com/50" alt="Group 3" />
                    <p>Group 3</p>
                </div>
            </div>
            <div className={`menu ${menuVisible ? 'show' : ''}`}>
                <div className="menu-avatar">
                    <img src="https://via.placeholder.com/60" alt="User Avatar" />
                    <div className="nickname">User Name</div>
                </div>
                <div className="menu-item">
                    <img src="https://via.placeholder.com/30" alt="Icon 1" />
                    <p>Menu Item 1</p>
                </div>
                <div className="menu-item">
                    <img src="https://via.placeholder.com/30" alt="Icon 2" />
                    <p>Menu Item 2</p>
                </div>
                <div className="menu-item">
                    <img src="https://via.placeholder.com/30" alt="Icon 3" />
                    <p>Menu Item 3</p>
                </div>

            </div>
            <div className="main-content">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="prechat-list">
                    {rooms && rooms.map((room) =>
                        <PrechatItem key={room.room_id} room={room} />
                    )}
                </div>

            </div>
            <div className="chat-content">
                <p>Choose someone to chat...</p>

            </div>
        </div>
    );
}

function formatDateFromTimestamp(timestamp) {
    console.log('formatDateFromTimestamp:', typeof timestamp, '\t', timestamp);
    let date;
    try {
        date = new Date().parse(timestamp);
    }
    catch (err) {
        date = new Date(timestamp);
    }
    return date.toLocaleString();
}

function PrechatItem({ room }) {
    return (<div className="prechat-item">
        <img src={room.image_id ? `path/to/images/${room.image_id}` : "https://via.placeholder.com/40"} alt={room.room_name} />
        <div>
            <div className="top-message-cont">
                <p className="name">{room.title}</p>
                <p className="time">{formatDateFromTimestamp(room.last_time)}</p>
            </div>
            <p className="message">{room.last_message_data}</p>
        </div>
    </div>);
}

export default MainPage;