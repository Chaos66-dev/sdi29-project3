import { useState, useEffect, useContext } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import Personnel from './components/Personnel/Personnel.jsx'
import Units from './components/Units/Units.jsx'
import Create from './components/Create/Create.jsx'
import Training from './components/Training/Training.jsx'
import { UserContext } from "./context/UserContext.jsx";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    <>
      <header>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => personnelNavClick(`/Personnel`)}>Personnel</button>
          {/* <button onClick={() => navigate('/Personnel')}>Personnel</button> */}
          <button onClick={() => navigate('/Units')}>Units</button>
          <button onClick={() => navigate('/Training')}>Training</button>
          <button onClick={() => navigate('/Create')}>Create</button>
        </nav>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Personnel' element={<Personnel />} />
        <Route path='/Personnel/:id' element={<Personnel />} />
        <Route path='/Units' element={<Units />} />
        <Route path='/Units/:id' element={<Units />} />
        <Route path='/Training' element={<Training />} />
        <Route path='/Create' element={<Create />} />
      </Routes>
    </>
  )
}

export default App
