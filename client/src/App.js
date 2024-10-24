import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/homePage/Home';
import Chat from './pages/chatPage/Chat';
import Profile from './pages/profilePage/Profile';
import MainPage from './pages/mainPage/MainPage';

const socket = io.connect(process.env.REACT_APP_IO_SERVER);

function App() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <Home
              username={username}
              setUsername={setUsername}
              nickname={nickname}
              setNickname={setNickname}
              password={password}
              setPassword={setPassword}
              socket={socket}
            />} />
          <Route path='/chat' element={
            <Chat
              socket={socket}
              username={username}
              nickname={nickname}
            />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
