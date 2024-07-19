import React, { useState } from 'react'
import RegisterIMG from "../../assets/signup.gif"
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase"
import Loader from "../../components/Loader/Loader"

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(false)


  const handelSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (email.length <= 0 || password.length <= 0) {
      setError("Enter Valid Credentials")
      setLoading(false)
      return
    }


    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false)
        navigate("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage)
        setLoading(false)
      });

  }


  return (
    <div className="register-parent">
      {
        loading ?
          <Loader /> : <></>
      }
      <div className="register-left">
        <img src={RegisterIMG} className='register-image' alt="Sign Up" />
      </div>
      <div className="register-right">
        <h1>Create an <p>Account</p></h1>
        <input type="text" name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
        <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />

        <div className='register-btn' onClick={handelSubmit}>Register</div>
        <div className='register-olduser'>Have an Account ? <Link className='register-login-redirect' to={'/login'}> Login</Link></div>
        <div style={{ color: 'red' }} className='register-olduser'>{error && <div>{error}</div>}</div>

      </div>
    </div>
  )
}

export default Register