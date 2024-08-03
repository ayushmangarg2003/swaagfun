import React from 'react'
import "./GeneratingLoader.css"
import { helix } from 'ldrs'
helix.register()

const GeneratingLoader = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'16px'}} className='genLoader'>
      <l-helix size={75}></l-helix>
      <h1 style={{fontSize:'24px', fontWeight:'700'}}>Getting Things Ready</h1>
    </div>
  )
}

export default GeneratingLoader