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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeToggle } from './components/ThemeToggle/ThemeToggle.jsx'
import Login from './components/Login/Login.jsx'

function App() {
   const [tabValue, setTabValue] = useState('1');
  const { userID, setUserID } = useContext(UserContext);

  const { invalidUser } = useContext(UserContext);

  const [showUserNotFoundMessage, setShowUserNotFoundMessage] = useState(false);


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

  const changeTab = (event, newTabValue) => {
    setTabValue(newTabValue);
  }

  return (
    <ToggleThemeProvider>
      <CssBaseline />

      {(userID === '' || invalidUser) ? (
        <ThemeToggle />
      ) : (
        <header>
          <nav>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={changeTab} aria-label="create tabs">
                    <Tab onClick={() => navigate('/')} label="Home" value="1" sx={{
                      '&:focus': {
                        outline: 'none'
                      }
                    }} />
                    <Tab onClick={() => personnelNavClick(`/Personnel`)} label="Personnel" value="2" sx={{
                      '&:focus': {
                        outline: 'none'
                      }
                    }} />
                    <Tab onClick={() => navigate('/Units')} label="Units" value="3" sx={{
                      '&:focus': {
                        outline: 'none'
                      }
                    }} />
                    <Tab onClick={() => navigate('/Training')} label="Trainings" value="4" sx={{
                      '&:focus': {
                        outline: 'none'
                      }
                    }} />

                    {(userID === '5') ? (
                      <Tab onClick={() => navigate('/Create')} label="Make Changes" value="5" sx={{
                        '&:focus': {
                          outline: 'none'
                        }
                      }} />
                    ) : (
                      null
                    )}
                      <ThemeToggle />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </nav>
        </header>
      )}

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
