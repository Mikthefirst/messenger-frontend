import React from "react";
import "./mainPage.css";


function MainPage() {
    return (
        <div className="container">
            <div className="sidebar">
                <h2>☰</h2>
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
                                <p className="name">User 2</p>
                                <p className="time">12.01.04</p>
                            </div>
                            <p className="message">Hi there!</p>
                        </div>
                    </div>
                    <div className="preprechat-item">
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