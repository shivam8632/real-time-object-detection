import React, { useRef } from "react";
import Webcam from "react-webcam";
 
const AllCameras = () => {
  const [devices, setDevices] = React.useState([]);
 
  const handleDevices = React.useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
 
  React.useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      // Firefox 38+ seems having support of enumerateDevicesx
      navigator.enumerateDevices = function(callback) {
          navigator.mediaDevices.enumerateDevices().then(handleDevices);
      };
  }
    // navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);
 
  return (
    <>
      {devices.map((device, key) => (
        <div key={key}>
          <Webcam
            audio={false}
            videoConstraints={{ deviceId: device.deviceId }}
          />
          {device.label || `Device ${key + 1}`}
        </div>
      ))}
    </>
  );
};
 
export default AllCameras;