import React, { useState } from 'react'
import axios from 'axios';
import { API } from '../../API';
import { Link } from "react-router-dom";
import './admin.css'

export default function Admin() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedPath, setUploadedPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  let pathh;

  const onImageChange = event => {
    setSelectedImage(event.target.files[0]);
    console.log("nfognon" ,event.target.files[0])
  };

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "title"){
        setTitle(value);
        console.log(title);
    }
    if(id === "price"){
        setPrice(value);
        console.log(price);
    }
  }

  const onImageUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image',selectedImage);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('type','normal');
    console.log("FORMM",selectedImage)
    setLoading(true)
    
    axios.post(API.BASE_URL + 'auth/addproduct/',formData, {
      'Content-Type': 'multipart/form-data',
    })
    .then(
      function(response) {
        console.log("Uploaded File",response);
        console.log("Success");
        pathh = API.BASE_URL + 'media/images/products_images/'
        console.log('Pathhhh', pathh + selectedImage.name)
        setLoading(false);
        setUploadedPath(API.BASE_URL + 'media/images/products_images/' + selectedImage.name)
    }
    )
    .catch(function(error) {
      setLoading(false);
      console.log(error.response);
    })
  }

  return (
    <div className="dashboard-main admin-main">
    <h2 className="smart">Add Product</h2>
      <div className="Auth-form-container">
        <div className="auth-form-main">
          <div className="dash-form-content">
            <div className="product-details">
                <div className="input-container">
                    <label>Title</label>
                    <input type="text"
                        id='title'
                        value={title}
                        onChange = {(e) => handleInputChange(e)}
                        required 
                    />
                </div>
                <div className="input-container">
                    <label>Price</label>
                    <input
                        type="number"
                        id='price'
                        value={price}
                        onChange = {(e) => handleInputChange(e)}
                        required 
                    />
                </div>
            </div>
            <div className="upload-img">
                <form>
                    <input
                        type="file"
                        id="contained-button-file"
                        onChange={onImageChange}
                    />
                    <label htmlFor="contained-button-file">
                      <button className='btn btn-primary' onClick={onImageUpload} >
                          {loading ? <>Loading..</> : <>Upload</>}
                      </button>
                      
                    </label>
                    <Link className='product-link' to="/adminproducts">Go to Product List</Link>
                </form>
                
            </div>
        </div>
        </div>
	    </div>
    </div>
  )
}
