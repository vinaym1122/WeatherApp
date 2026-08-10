
import React, {useState} from 'react';
import './authentication.css'
import {imgurl} from '../lib'

function Authentication() {
  const [issignin, setIssignin] = useState(true);

  function switchwindow(){
    setIssignin(pre => !pre);
  }
  

  return (
    <div id="auth">
           <div className='container'>
              <div className='container_header'>
                <label className='header-label1'>{issignin ? "Login" : "Sign Up"}</label>
                <img src={imgurl + "weather.jpg"}  alt="" />
              </div> 
              <div className='container_content'> 
                {issignin ?
                <>
               
            
                <label>User Name*</label>
                <div className='user-input'>
                  <img src={imgurl + "user image.jpeg"} alt="" />
                  <input type="text" placeholder='Enter your username' name="username" />
                </div>
                <label>Password*</label>
                <div className='user-input'>
                  <img src={imgurl + "lock.jpg"} alt="" />
                  <input type="password" placeholder='Enter your password' name="password" />
                </div>
                <p>Forgot <span>Password?</span></p>
                <button>Let's Start</button>

                <label>Don't have an account? <span onClick={switchwindow}>Sign Up</span></label>
                </>
                : 
                <>
                 <label>Full Name*</label>
                <div className='user-input'>
                  <img src={imgurl + "edit.jpeg"} alt="" />
                  <input type="text" placeholder='Enter your full name' name="fullname" />
                </div>
                 <label>Mobile Number*</label>
                <div className='user-input'>
                  <img src={imgurl + "phone.webp"} alt="" />
                  <input type="text" placeholder='Enter your mobile number' name="mobile" />
                </div>
                 <label>Email*</label>
                <div className='user-input'>
                  <img src={imgurl + "mail.jpg"} alt="" />
                  <input type="text" placeholder='Enter your email' name="email" />
                </div>
                 <label>Password*</label>
                <div className='user-input'>
                  <img src={imgurl + "lock.jpg"} alt="" />
                  <input type="password" placeholder='Enter your password' name="password" />
                </div>
                 <label>Confirm Password*</label>
                <div className='user-input'>
                  <img src={imgurl + "lock.jpg"} alt="" />
                  <input type="password" placeholder='Confirm your password' name="confirmPassword" />
                </div>
                  <button>Create Account</button>

                <label>Already have an account? <span onClick={switchwindow}>Sign In</span></label>
                </>
                }
              </div>
              <div className='container_footer'>Copyright © 2026 Weather App. All rights reserved.</div>
           </div>
        </div>
  );
}

export default Authentication;