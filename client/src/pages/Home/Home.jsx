import React, { useState } from 'react'
import "./Home.css"
import { IMAGES, IMAGES2 } from "../../utils/constants"
import Slider from '../../components/Slider/Slider'
import { Link } from 'react-router-dom'
import 'react-awesome-slider/dist/styles.css';
import { Input } from '@chakra-ui/react'
import { Typewriter } from 'react-simple-typewriter'

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {

  const [user, setUser] = useState(false)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true)
    } else {
      setUser(false)
    }
  });

  const [homePrompt, setHomePrompt] = useState("")

  return (
    <div className='homePage'>
      <div className="home-container">
        <div className="home-left">
          <div className="home-left-upper">
            <h4 class="upper-head">Try it out now</h4>
            <h1 class="home-head">Create Fun Swaags which are
              <p><Typewriter words={["Creative!", "Unique!"]}
                loop
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000} /> </p></h1>
          </div>
          <div className='input-btn-parent'>
            <Input height={'50px'} value={homePrompt} placeholder='Enter Prompt Here' size={'lg'} onChange={(e) => setHomePrompt(e.target.value)} />
            <Link className='home-btn' to={user ? '/create' : '/login'}><i class="fa-solid fa-arrow-right-long"></i></Link>
          </div>
        </div>
        <div className="home-right">
          <Slider images={IMAGES} />
          <Slider images={IMAGES2} />
        </div>
      </div>
    </div >
  )
}

export default Home