import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homePage/Home';
import Profile from './pages/profilePage/Profile';
import MainPage from './pages/mainPage/MainPage';

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
            />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/main' element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
