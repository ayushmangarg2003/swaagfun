import React, { useState } from 'react'
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom'
import LoginImg from "../../assets/login.svg"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import Loader from "../../components/Loader/Loader"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        if (email.length <= 0 || password.length <= 0) {
            setError("Enter Valid Credentials")
            setLoading(false)
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setLoading(false)
                navigate("/")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
                setLoading(false)
            });

    }
    return (
        <div className="login-parent">
            {
                loading ?
                    <Loader /> : <></>
            }
            <div className="login-left">
                <img src={LoginImg} alt="" />
            </div>
            <div className="login-form">
                <h1>Hello! <p>Welcome</p> Back</h1>
                <input onChange={(e) => setEmail(e.target.value)} name='email' value={email} type="text" placeholder='Enter Email' />
                <input onChange={(e) => setPassword(e.target.value)} name='password' value={password} type="password" placeholder='Enter Password' />
                <div className='login-btn' onClick={handleSubmit}>Login</div>
                <div className='login-newhere'>New Here ? <Link className='login-register-redirect' to={'/register'}> Register</Link></div>
                <div style={{ color: "red" }} className='login-newhere'>{error && <div>{error}</div>}</div>
            </div>
        </div>
    )
}

export default Login