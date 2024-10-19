import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/homePage/Home';
import Chat from './pages/chatPage/Chat';
import Profile from './pages/profilePage/Profile';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={
            <Home
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              password={password}
              setPassword={setPassword}
              socket={socket}
            />} />
          <Route path='/chat' element={
            <Chat
              socket={socket}
              username={username}
              room={room}
              password={password}
              setPassword={setPassword}
            />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
