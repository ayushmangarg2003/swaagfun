import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.css"
import { FACEBOOK, INSTAGRAM, MAIL, PINTEREST, TWITTER, IMAGES } from "../../utils/constants"

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-left">
                <div className="footer-logo">
                    <div className="footer-logo-name">SWAAG<p>.FUN</p></div>
                </div>
                <div className="footer-copyright">Copyright @ All Rights Reserved</div>
                <div className="footer-socials">
                    <a href={MAIL} target={'blank'} className='linkedin'>
                        <i className="fa-solid fa-envelope"></i>
                    </a>

                    <a href={TWITTER} target={'blank'} className='twitter'>
                        <i className="fa-brands fa-twitter"></i>
                    </a>

                    <a href={FACEBOOK} target={'blank'} className='tiktok'>
                        <i className="fa-brands fa-facebook"></i>
                    </a>

                    <a href={PINTEREST} target={'blank'} className='pinterest'>
                        <i className="fa-brands fa-pinterest"></i>
                    </a>

                    <a href={INSTAGRAM} target={'blank'} className='instagram'>
                        <i className="fa-brands fa-instagram"></i>
                    </a>

                </div>
            </div>
            <div className="footer-right">
                <div className="quick-links">
                    <h1>Quick Links</h1>
                    <Link to={'/register'} className='footer-quicklink'>Register</Link>
                    <Link to={'/login'} className='footer-quicklink'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer