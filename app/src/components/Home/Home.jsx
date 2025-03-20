import { useState, useEffect, useContext } from 'react'
import './Home.css'
import Login from '../Login/Login.jsx'

function Home() {

    return (
        <>
            <h1>Home Page</h1>
            <Login/>
        </>
    )
}

export default Home