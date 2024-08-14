import React, { useState } from 'react'
import "./Profile.css"
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(false)
    const [email, setEmail] = useState("")
    const [verified, setVerified] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(true)
            setEmail(user.email)
            setVerified(user.emailVerified)
        } else {
            setUser(false)
        }
    });

    const handleVerify = (e) => {
        e.preventDefault()
        sendEmailVerification(auth.currentUser).then(() => {
            alert("Email Sent");
        })
    }

    const navigate = useNavigate();
    const handleRedirect = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    const handelLogout = (e) => {
        e.preventDefault()
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            alert(error)
        });
    }

    const navigateGallery = (e) => {
        e.preventDefault()
        navigate('userGallery')
    }

    return (
        <div className='profile-parent'>
            {user ?
                // Signed IN
                (
                    <div className='signedIn'>
                        <h1> Email : {email}</h1>
                        {verified ? (
                            <>
                                <h1>Status: Verified
                                    <i className="fa-regular fa-circle-check"></i>
                                </h1>
                                <button className='imagesBtn' onClick={navigateGallery}>View My Images</button>
                            </>
                        ) :
                            (
                                <div className='verification'>
                                    <h1> Status: Not Verified
                                        <i className="fa-regular fa-circle-xmark"></i>
                                    </h1>
                                    <button onClick={handleVerify} className='verifyBtn'>Verify</button>
                                </div>
                            )
                        }
                        <button className='logoutBtn' onClick={handelLogout}>Logout</button>
                    </div>
                ) :
                // Not Signed In
                (
                    <button className='signInBtn' onClick={handleRedirect}>Sign In</button>
                )
            }
        </div>
    )
}

export default Profile