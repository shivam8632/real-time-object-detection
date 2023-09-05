import React, { useState } from 'react'
import LogInImage from '../../assets/img/login.png';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {toast } from 'react-toastify';
import { API } from '../../API';

export default function Login() {
    let [authMode, setAuthMode] = useState("signin");
    const [lgemail,setLgemail] = useState(null);
    const [lgpass,setLgpass] = useState(null);


    const notify = () => toast.success("Logged In Successfully!");
    const wrongData = () => toast.warn("Please enter correct Email or Password");
    const emptyData = () => toast.warn("Please fill out all the fields");

    const navigate = useNavigate()

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "lgemail"){
      setLgemail(value);
      console.log(lgemail);
  }
  if(id === "lgpass"){
    setLgpass(value);
    console.log(lgemail);
}

  }
  const login = (e) => {
    e.preventDefault();
    axios.post(API.BASE_URL + 'auth/login/', {
        email: lgemail,
        password: lgpass,
    })
    .then(function(response) {
        console.log(response);
        console.log("Success");
        localStorage.setItem("loginToken" ,response.data.token.access);
        notify();
        navigate('/dashboard')

    })
    .catch(function(error) {
      if(error.response.data.msg = "Please Enter Valid email or password") {
        wrongData();
        console.log(error)
      }
      else if(error.response.data.email == "This field may not be null." || error.response.data.password == "This field may not be null.") {
        emptyData();
      }

      else {
        console.log(error.response);
      }
        
    })
  }
  return (
    <div className="login">
      <h2 className="smart">Smart Billing</h2>
      <div className="Auth-form-container">
        <div className="auth-form-main">
          <div className="auth-image">
            <img src={LogInImage} alt="login" />
          </div>
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <Link to="/">
                    <span className="link-primary">
                    Sign Up
                    </span>
                </Link>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  id="lgemail"
                  value={lgemail} onChange = {(e) => handleInputChange(e)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  id="lgpass" 
                  value={lgpass} onChange = {(e) => handleInputChange(e)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" onClick={login} className="btn btn-primary">
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
  )
}
