import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true)
        } else {
            setUser(false)
        }
    });

    const [user, setUser] = useState(false) 

    return (
        <div className='navbar-parent'>
            <div className="nav-left">
                <Link to={'/'} className='logo-link'>
                    <div className="logo-name">SWAAG<p>.FUN</p></div>
                </Link>
            </div>
            <div className="nav-right">

                {user && (
                    <Link to={'./profile'} className='user-nav'>
                        <div className='user-icon'><i className="fa-solid fa-user"></i></div>
                    </Link>
                )}
                {!user && (
                    <div className="login-btn"><Link className='navbar-login-link' to={'/login'}>Login</Link></div>
                )}
            </div>
        </div>
    )
}

export default Navbar