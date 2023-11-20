import Webcam from 'react-webcam';
import './WebcamContainer.css';
import { useState } from 'react';

const videoConstraints = {
  width: 720,
  height: 640,
  facingMode: "user"
};

const WebcamContainer = () => {

  const [ image, setImage ] = useState<string>('');

  return (
    !image ? 
      <Webcam 
        audio={false}
        height={640}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      >
      {({ getScreenshot }) => (
        <button onClick={
          () => { 
            const imageSrc = getScreenshot();
            setImage(imageSrc);
        }}>
          Take Picture
        </button>
      )}
      </Webcam>
    :
      <img src={image} />
    )
}

export default WebcamContainer;