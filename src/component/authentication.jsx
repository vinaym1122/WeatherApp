
import { useState } from 'react';
import './authentication.css';
import { imgurl, apiUrl, callApi } from '../lib';


function Authentication() {
  const [issignin, setIssignin] = useState(true);

  const [errors, setErrors] = useState({
    username: false,
    password: false
  });

  const [signupErrors, setSignupErrors] = useState({
    fullname: false,
    mobile: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const [signinData, setSigninData] = useState({
    username: "",
    password: "" 
  });

  const [signupData, setSignupData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function switchwindow() {
    setIssignin(pre => !pre);

    setSigninData({
      username: "",
      password: ""
    });

    setSignupData({
      fullname: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

    setErrors({
      username: false,
      password: false
    });

    setSignupErrors({
      fullname: false,
      mobile: false,
      email: false,
      password: false,
      confirmPassword: false
    });
    setPasswordMessage("");
  }

  function handleSigninData(e) {
    const { name, value } = e.target;

    setSigninData({
      ...signinData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: false
    });
  }

 function handleSignupData(e) {
  const { name, value } = e.target;

  setSignupData({
    ...signupData,
    [name]: value
  });

  setSignupErrors({
    ...signupErrors,
    [name]: false
  });

  if (name === "password" || name === "confirmPassword") {
    setPasswordMessage("");
  }
}

  function signin() {
    const newErrors = {
      username: signinData.username.trim() === "",
      password: signinData.password.trim() === ""
    };

    setErrors(newErrors);

    if (newErrors.username || newErrors.password) {
      return;
    }

    const loginIdentifier = signinData.username.trim();
    const loginPayload = {
      password: signinData.password,
      ...(loginIdentifier.includes('@') ? { email: loginIdentifier } : { username: loginIdentifier }),
      ...(/^\d+$/.test(loginIdentifier) ? { mobile: loginIdentifier } : {})
    };

    callApi("POST", apiUrl("user/login"), loginPayload, null, signinResponseHandler);
  }

  function signinResponseHandler(res) {
    const response = res && typeof res === 'object' ? res : {};
    const message = response.message || 'Login failed';

    if (response.code !== 200 && response.success !== true) {
      alert(message);
      return;
    }
  else{
    localStorage.setItem("token", response.token);
    window.location.replace("/homepage");
  }
  }

 function signup() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const newErrors = {
    fullname: signupData.fullname.trim() === "",
    mobile: signupData.mobile.trim() === "",
    email:
      signupData.email.trim() === "" ||
      !emailRegex.test(signupData.email),
    password: signupData.password.trim() === "",
    confirmPassword: signupData.confirmPassword.trim() === ""
  };

  setPasswordMessage("");

  if (
    signupData.password !== signupData.confirmPassword &&
    signupData.confirmPassword.trim() !== ""
  ) {
    newErrors.confirmPassword = true;
    setPasswordMessage("Passwords do not match");
  }

  setSignupErrors(newErrors);

  if (Object.values(newErrors).some(error => error)) {
    return;
  }

  const userData = {
    fullname: signupData.fullname.trim(),
    mobile: signupData.mobile.trim(),
    email: signupData.email.trim(),
    password: signupData.password
  };

  callApi("POST", apiUrl("user/register"), userData, null, signupResponseHandler);

  function signupResponseHandler(res) {
    const response = res && typeof res === "object" ? res : {};
    const message = response.message || "Signup successful";

    if (response.success === false || response.status === false || response.code === 400) {
      alert(message);
      return;
    }

    alert(message);
    setSignupData({
      fullname: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    setIssignin(true);
  }
}


  return (
    <div id="auth">
      <div className="container">

        <div className="container_header">
          <label className="header-label1">
            {issignin ? "Login" : "Sign Up"}
          </label>

          <img src={imgurl + "weather.jpg"} alt="" />
        </div>

        <div className="container_content">

          {issignin ? (
            <>
              <label>User Name*</label>

              <div className="user-input">
                <img src={imgurl + "user image.jpeg"} alt="" />

                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={signinData.username}
                  onChange={handleSigninData}
                  className={errors.username ? "input-error" : ""}
                />
              </div>

              <label>Password*</label>

              <div className="user-input">
                <img src={imgurl + "lock.jpg"} alt="" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={signinData.password}
                  onChange={handleSigninData}
                  className={errors.password ? "input-error" : ""}
                />
              </div>

              <p>
                Forgot <span>Password?</span>
              </p>

              <button onClick={signin}>
                Let's Start
              </button>

              <label>
                Don't have an account?
                <span onClick={switchwindow}> Sign Up</span>
              </label>
            </>
          ) : (
            <>
              <label>Full Name*</label>

              <div className="user-input">
                <img src={imgurl + "edit.jpeg"} alt="" />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="fullname"
                  value={signupData.fullname}
                  onChange={handleSignupData}
                  className={signupErrors.fullname ? "input-error" : ""}
                />
              </div>

              <label>Mobile Number*</label>

              <div className="user-input">
                <img src={imgurl + "phone.webp"} alt="" />

                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  name="mobile"
                  value={signupData.mobile}
                  onChange={handleSignupData}
                  className={signupErrors.mobile ? "input-error" : ""}
                />
              </div>

              <label>Email*</label>

              <div className="user-input">
                <img src={imgurl + "mail.jpg"} alt="" />

                <input
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupData}
                  className={signupErrors.email ? "input-error" : ""}
                />
              </div>

              <label>Password*</label>

              <div className="user-input">
                <img src={imgurl + "lock.jpg"} alt="" />

                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupData}
                  className={signupErrors.password ? "input-error" : ""}
                />
              </div>

             <label>Confirm Password*</label>

                  <div className="user-input">
                    <img src={imgurl + "lock.jpg"} alt="" />

                   <input
                      type="password"
                      placeholder="Confirm your password"
                      name="confirmPassword"
                       value={signupData.confirmPassword}
                       onChange={handleSignupData}
                        className={signupErrors.confirmPassword ? "input-error" : ""}
                   />
                      </div>

             {passwordMessage && (
              <p className="error-message">
                {passwordMessage}
                    </p>
                             )}

              <button onClick={signup}>
                Create Account
              </button>

              <label>
                Already have an account?
                <span onClick={switchwindow}> Sign In</span>
              </label>
            </>
          )}

        </div>

        <div className="container_footer">
          Copyright © 2026 Weather App. All rights reserved.
        </div>

      </div>
    </div>
  );
}

export default Authentication;
