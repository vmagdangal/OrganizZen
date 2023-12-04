import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupScreen from './components/SignupScreen'
import LoginScreen from './components/LoginScreen'
import WelcomeScreen from './components/WelcomeScreen'
import App from './MyApp'

const LoginApp = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        // Fetch the list of events when the component mounts
        fetch('http://localhost:8001/users')
            .then((response) => response.json())
            .then((data) => setUsers(data.users_list))
            .catch((error) => console.log(error))
    }, []) // Empty dependency array ensures it runs only once on mount

    function postUser(user) {
        // Add the new event to the backend
        const promise = fetch('http://localhost:8001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        return promise
    }

    function updateUsers(user) {
        postUser(user)
            .then(() => {
                setUsers([...users, user])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomeScreen />} />
                <Route
                    path="/signup"
                    element={<SignupScreen handleSubmit={updateUsers} />}
                />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/dashboard" element={<App />} />
            </Routes>
        </Router>
    )
}

export default LoginApp