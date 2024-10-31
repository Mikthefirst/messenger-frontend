import React, { useEffect, useState } from "react";
import "./mainPage.css";
import io from 'socket.io-client';
import ChatForm from './../chatPage/Chat';
//import SendMessage from './SendMessage';
import PrechatItem from "./PreChatItem";

const server = process.env.REACT_APP_SERVER;


const socket = io.connect(process.env.REACT_APP_IO_SERVER);
let nickname, username, token;

function MainPage() {

    const [rooms, setRooms] = useState([]);
    const [chatPicked, setChatPicked] = useState(false);
    const [pickedRoom, setPickedRoom] = useState(null);

    function CallChat(room) {
        setPickedRoom(room);
        console.log('CallChat:', pickedRoom);
        console.log('ChatPicked', chatPicked);
        socket.emit('join_room', { nickname, username, token, room });
        setChatPicked(true);
    }

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
                        <PrechatItem key={room.room_id} room={room} onClick={() => { console.log('click at preChatItem'); CallChat(room.room_id) }} />
                    )}
                </div>

            </div>
            <div className="chat-content">
                {!chatPicked && <div className="alignClass"><p id="emptyLink">Choose someone to chat...</p></div>}
                {chatPicked && pickedRoom && (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                        <h1 className="roomName">Room: {pickedRoom}</h1>
                        <ChatForm socket={socket} nickname={nickname} username={username} room={pickedRoom} />
                    </div>
                )}
            </div>
        </div>
    );
}




export default MainPage;