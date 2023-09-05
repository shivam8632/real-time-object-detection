import React, { useState } from 'react'
import Dashbaord from '../../assets/img/dashboard.webp';
import axios from 'axios';
import Camera from './Camera';
import AllCameras from './AllCameras'
import { API } from '../../API';
// import { CartState } from "../context/UserContext";

import '../../App.css'

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePath, setImagePath] = useState('');
  const [loading, setLoading] = useState(false);
  // const { state: { products }, captureImg, setCaptureImg } = CartState();
  let pathh;

  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0])
    // console.log("HHJKJN",selectedFile.name)
  };

  const onFileUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image',selectedFile);
    formData.append('type','normal');
    console.log(formData)
    setLoading(true)
    
    axios.post(API.BASE_URL + 'auth/upload_image/',  formData, {
      'Content-Type': 'multipart/form-data',
    },
  
    )
    .then(
      function(response) {
        console.log("Uploaded File",response);
        console.log("Success");
        pathh = API.BASE_URL + 'media/images/train/'
        console.log('Pathhhh', pathh + selectedFile.name)
        setLoading(false);
        setImagePath(API.BASE_URL + 'media/images/train/' + selectedFile.name)
    }
    )
    .catch(function(error) {
      setLoading(false);
      console.log(error.response);
    })
  }

  return (
    <div className="dashboard-main">
    <h2 className="smart">Smart Billing</h2>
      <div className="Auth-form-container">
        <div className="auth-form-main">
          <div className="auth-image">
              <img src={Dashbaord} alt="login" />
            </div>
          <div className="dash-form-content">
            <h2>Upload Your Image</h2>
            <form action="">
            <input
              type="file"
              // accept="image/*, video/*"
              // style={{ display: 'none' }}
              id="contained-button-file"
              onChange={onFileChange}
            />
            <label htmlFor="contained-button-file">
              <button className='btn btn-primary' onClick={onFileUpload} >
              {loading ? <>Loading..</> : <>Upload</>}
              </button>
            </label>
            </form>
            <div className="dynamic-img">
              <img src={imagePath} alt="" />
            </div>
        </div>
        </div>
        {/* <AllCameras />   */}
        <Camera/>
	    </div>
    </div>
  )
}
