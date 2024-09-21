import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './pages/homePage/Home';
import Chat from './pages/chatPage/Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

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
              socket={socket}
            />} />
          <Route path='/chat' element={<Chat socket={socket} username={username} room={room} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
