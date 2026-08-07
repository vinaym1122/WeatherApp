
import { useState } from 'react'
import {imgurl} from './lib.js'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
   function showAuthentication() {
    window.location.replace("/Authentication");
  }
  return (
   <div id="container">
     <div id="header">
      <img className="headerlogo" src={imgurl + "report image.jpeg"} alt="Header Logo" />
      <div className='headertext'>
        <span>Live</span> Weather Monitoring System
      </div>
      <img className='signinlogo' onClick={showAuthentication} src={imgurl + "user image.jpeg"} alt="Sign In Logo" />
      <div className='signinbutton' onClick={showAuthentication}>
        Sign In
      </div>
     </div>
     <div id="content">
      <img className='personimg' src={imgurl + "person.png"} alt="person Image" />
      <div className='contenttext1'>
        Real-Time Weather Intelligence Powered by IoT
      </div>
      <div className='contenttext2'>
        Monitor temperature, humidity, pressure, wind speed, rainfall, and air quality in real time through an interactive dashboard.Analyze historical trends, receive instant updates, and make informed decisions with accurate environmental data. 
        </div>
      <div className='contenttext3'>
        Live Data | 📊 Interactive Charts | 🌍 Anywhere Access | ⚡ Real-Time Updates
        </div>
      
     </div>
      <div id="footer">
        <div className='footertext'>copy right © 2026 All rights reserved.</div>  
        <img className='socialmedia1' src={imgurl + "facebook.jpeg"} alt="Facebook" />
        <img className='socialmedia2' src={imgurl + "linkedin.jpeg"} alt="LinkedIn" />
        <img className='socialmedia3' src={imgurl + "twitter.jpeg"} alt="Twitter" />
      </div>

   </div>

  )
}

export default App
