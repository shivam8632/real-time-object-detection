
import React, { useState } from "react";
import LogInImage from '../../assets/img/login.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast } from 'react-toastify';
import { API } from "../../API";

const Auth = () => {
  let [authMode, setAuthMode] = useState("signin");
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const notify = () => toast.success("Signed Up Successfully!");
  
  const wrongData = () => toast.warn("Please enter correct Email or Password");
  const emptyData = () => toast.warn("Please fill out all the fields");

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "firstName"){
        setFirstName(value);
        console.log(firstName);
    }
    if(id === "email"){
        setEmail(value);
        console.log(email);
    }
    if(id === "password"){
        setPassword(value);
        console.log(password);
    }
    if(id === "password2"){
      setConfirmPassword(value);
      console.log(confirmPassword);
  }

  }
const register = (e) => {
  e.preventDefault();
  console.log(firstName)
  axios.post(API.BASE_URL + 'auth/register/', {
      username: firstName,
      email: email,
      password: password,
      password2: confirmPassword
  })
  .then(function(response) {
      console.log("gugui",response);
      console.log("Success");
      notify();
      navigate('/login')
  })
  .catch(function(error) {
    if(error.response.data.msg = "Please Enter Valid email or password") {
      wrongData();
      console.log(error)
    }
    else if(error.response.data.email[0] == "This field may not be null." || error.response.data.password[0] == "This field may not be null." || error.response.data.password2[0] == "This field may not be null." || error.response.data.username[0] == "This field may not be null.") {
      emptyData();
    }

    else {
      console.log(error.response);
    }
      
  })
}

  return (
    
    <div className="signup-main">
	
      <h2 className="smart">Smart Billing</h2>
	      <div className="signup">
      <div className="Auth-form-container">
      <div className="auth-form-main">
        <div className="auth-image">
            <img src={LogInImage} alt="login" />
          </div>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="text-center">
              Already registered?{" "}
              <Link to='/login'>
                <span className="link-primary">
                  Sign In
                </span>
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                id="firstName"
                value={firstName}
                onChange = {(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                id="email" 
                value={email}
                onChange = {(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Password"
                id="password" 
                value={password}
                onChange = {(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Confirm Password"
                id="password2" 
                value={confirmPassword}
                onChange = {(e) => handleInputChange(e)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" onClick={register} className="btn btn-primary">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
      </div>
	  </div>
    </div>
  )
}

export default Auth