import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginScreen.css'

function SignupScreen(props) {
    const navigate = useNavigate()
    const [userFormData, setUserFormData] = useState({
        userId: '',
        username: '',
        password: '',
        email: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserFormData({
            ...userFormData,
            [name]: value,
        })
    }

    function submitForm() {
        props.handleSubmit(userFormData)
        setUserFormData({
            userId: '',
            username: '',
            password: '',
            email: '',
        })
        navigate('/dashboard')
    }

    return (
        <div className="loginScreen">
            <div className="loginBox">
                <h1>Sign up here!</h1>
                <form className="loginForm" onSubmit={submitForm}>
                    <label htmlFor="username">Username: </label>
                    <br></br>
                    <input
                        id="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <br></br> <br></br>
                    <label htmlFor="password">Password: </label>
                    <br></br>
                    <input
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                    <br></br> <br></br>
                    <label htmlFor="password">Email: </label>
                    <br></br>
                    <input id="email" name="email" onChange={handleChange} />
                    <br></br> <br></br>
                    <input type="submit" value="Sign up" id="submitform" />
                </form>
                <br></br>
                <p>
                    <Link to="/login">Already on OrganizZen? Log in here!</Link>
                </p>
            </div>
        </div>
    )
}

export default SignupScreen
