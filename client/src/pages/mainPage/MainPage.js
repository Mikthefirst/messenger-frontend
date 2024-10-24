import React, { useEffect, useState } from "react";
import "./mainPage.css";


function MainPage() {


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
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 1" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 1</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 2</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 3</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 4</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 6</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 7</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 8</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="prechat-item">
                        <img src="https://via.placeholder.com/40" alt="User 2" />
                        <div>
                            <div className="top-message-cont">
                                <p className="name">User 2</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="chat-content">
                <p>Choose someone to chat...</p>
            </div>
        </div>
    );
}

export default MainPage;