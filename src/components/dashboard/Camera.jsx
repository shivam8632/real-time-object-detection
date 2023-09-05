// import React, { useEffect, useRef, useContext, useState } from "react";
// import Webcam from "react-webcam";
// import axios from "axios";

// const videoConstraints = {
//   width: 540,
//   facingMode: "user"
// };

// const Camera = () => {
//   const webcamRef = useRef(null);
//   const[resultImg, setResultImg] = useState();
//   const [url, setUrl] = useState(null)

//   const capturePhoto = React.useCallback(async () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     setUrl(imageSrc)
//     console.log("Image Check", url)

//     console.log("WEBCAM", webcamRef)

//     const formData = new FormData();

//     formData.append('image', imageSrc);
//     formData.append('type','base64');
//     console.log(imageSrc,'ddddddd')
    
//     axios.post('http://54.174.116.79:8000/auth/upload_image/', formData, {
//       'Content-Type': 'multipart/form-data',
//     },
  
//     )
//     .then(
//       function(response) {
//         console.log("Uploaded File",response);
//         console.log("Successsssssssssssssssssssssssssss");
//         setResultImg(response.data.image)
//     }
//     )
//     .catch(function(error) {
//       console.log(error.response);
//     })
//   }, [webcamRef]);

//   const onUserMedia = (e) => {
//     console.log("UserMedia" ,e);
//   };

//   function detectWebcam(callback) {
//     let md = navigator.mediaDevices;
//     if (!md || !md.enumerateDevices) return callback(false);
//     md.enumerateDevices().then(devices => {
//       callback(devices.some(device => 'videoinput' === device.kind));
//     })
//   }
  
//   detectWebcam(function(hasWebcam) {
//     console.log('Webcam: ' + (hasWebcam ? 'yes' : 'no'));
//   })

//   return (
//     <>
    
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/jpeg"
//         videoConstraints={videoConstraints}
//         onUserMedia={onUserMedia}
//         mirrored={true}
//       />

//       <div className="capture-buttons">
//           <button className='btn btn-primary' style={{ marginBottom: 20 }} onClick={capturePhoto}>Capture</button>
//       </div>
      
//         <div className="result" style={{ marginTop: 30}}>
//           <h4 style={{ textAlign: 'center' }}>Result</h4>
//           <img src={resultImg} alt="Screenshot" />
//         </div>
    
//     </>
//   );
// };

// export default Camera;












import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { API } from "../../API";

const videoConstraints = {
  width: 540,
  facingMode: "environment"
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setUrl(imageSrc);

    console.log("Image Check", url)

    console.log("WEBCAM", webcamRef)

    const formData = new FormData();

    formData.append('image', imageSrc);
    formData.append('type','base64');
    console.log(imageSrc,'ddddddd')
    
    axios.post(API.BASE_URL + 'auth/upload_image/', formData, {
      'Content-Type': 'multipart/form-data',
    },
  
    )
    .then(
      function(response) {
        console.log("Uploaded File",response);
        console.log("Successsssssssssssssssssssssssssss");
        setUrl(response.data.image)
    }
    )
    .catch(function(error) {
      console.log(error.response);
    })



  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
      <div className="capture-buttons">
        <button className='btn btn-primary' onClick={capturePhoto}>Capture</button>
        <button className='btn btn-primary' onClick={() => setUrl(null)}>Refresh</button>
      </div>
      
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Camera;
