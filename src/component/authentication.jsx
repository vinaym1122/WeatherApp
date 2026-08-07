import React, {Component} from 'react';
import './authentication.css'
import {imgurl} from '../lib'

class Authentication extends Component {
  render() {
    return (
        <div id="auth">
           <div className='container'>
              <div className='container_header'>
                <label className='header-label1'>Login</label>
                <img src={imgurl + "weather.jpg"}  alt="" />
              </div> 
              <div className='container_content'> 
                <label>User Name*</label>
                <div className='user-input'>
                  <img src={imgurl + "user image.jpeg"} alt="" />
                  <input type="text" placeholder='Enter your username' />
                </div>
                <label>Password*</label>
                <div className='user-input'>
                  <img src={imgurl + "lock.jpg"} alt="" />
                  <input type="password" placeholder='Enter your password' />
                </div>
                <p>Forgot <span>Password?</span></p>
                <button>Let Me In</button>

                <label>Don't have an account? <span>Sign Up</span></label>
                
              </div>
              <div className='container_footer'>Copyright © 2026 Weather App. All rights reserved.</div>
           </div>
        </div>
    );
  } 
}

export default Authentication;