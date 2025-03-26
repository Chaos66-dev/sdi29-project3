import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Personnel from './components/Personnel/Personnel.jsx'
import AllPersonnel from './components/AllPersonnel/AllPersonnel.jsx'
import Units from './components/Units/Units.jsx'
import Create from './components/Create/Create.jsx'
import Training from './components/Training/Training.jsx'
import { UserContext } from "./context/UserContext.jsx";
import { ThemeContext, ToggleThemeProvider } from './context/ThemeContext.jsx'

import { CssBaseline, Box, AppBar, Toolbar, Typography } from '@mui/material';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle.jsx'

function App() {
  const { userID, setUserID } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000")
      .then((res) => res.json())
      .then((data) => console.log(data))
  });

  const personnelNavClick = () => {
    if (userID != null) {
      navigate(`/Personnel/${userID}`);
    } else {
      navigate('/Personnel');
    }
  }

  return (
    <ToggleThemeProvider>
      <CssBaseline />
      <header>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => personnelNavClick(`/Personnel`)}>Personnel</button>
          {/* <button onClick={() => navigate('/Personnel')}>Personnel</button> */}
          <button onClick={() => navigate('/Units')}>Units</button>
          <button onClick={() => navigate('/Training')}>Training</button>

          {(userID === '5') ? (
            <button onClick={() => navigate('/Create')}>Create</button>
          ) : (
            null
          )}
          <ThemeToggle />
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AllPersonnel' element={<AllPersonnel />} />
        <Route path='/Personnel/:id' element={<Personnel />} />
        <Route path='/Units' element={<Units />} />
        <Route path='/Units/:id' element={<Units />} />
        <Route path='/Training' element={<Training />} />
        <Route path='/Create' element={<Create />} />
      </Routes>
    </ToggleThemeProvider>
  )
}

export default App
