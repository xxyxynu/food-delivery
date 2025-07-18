import React, { useContext } from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext)

    const [currentState, setCurrentState] = useState('Sign Up')
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (currentState === 'Login') {
            newUrl += 'api/user/login'
        } else {
            newUrl += 'api/user/register';
        }

        const res = await axios.post(newUrl, data);

        if (res.data.success) {
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            setShowLogin(false)
        } else {
            alert(res.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {currentState === 'Login' ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name' required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your password' required />
                </div>
                <button type='submit'>{currentState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
                </div>
                {currentState === 'Login'
                    ? <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }

            </form>
        </div>
    )
}

export default LoginPopup
