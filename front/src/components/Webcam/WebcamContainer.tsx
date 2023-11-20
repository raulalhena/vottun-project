import Webcam from 'react-webcam';
import './WebcamContainer.css';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user"
};

const WebcamContainer = () => {

  const [ image, setImage ] = useState<string>('');
  const [ imageSaved, setImageSaved ] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const savePicture = async () => {
    console.log('user ', user)
    user.image = image;
    const resp = await fetch('http://localhost:3000/api/users/save-picture', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const resul = await resp.json();
    // TOAST MESSAGE WITH IMAGE SAVED SUCCESSFULLY
    setImageSaved(resul.success);
    console.log(resul);
  }

  return (
    !image ? 
    <div className='webcam-div'>
      <Webcam 
        className='webcam'
        audio={false}
        height={640}
        screenshotFormat="image/jpeg"
        width={720}
        videoConstraints={videoConstraints}
      >
      {({ getScreenshot }) => (
        <button className='dashboard-button' onClick={
          () => { 
            const imageSrc = getScreenshot();
            setImage(imageSrc);
        }}>
          Take Picture
        </button>
      )}
      </Webcam>
    </div>
    :
    !imageSaved ?
      <div className='webcam-div'>
        <img src={image} className='webcam'/>
        <button className='dashboard-button' onClick={savePicture}>Save Picture</button>
      </div>
    :
      <div className='webcam-div'>
        <img src={image} className='webcam'/>
        <button className='dashboard-button' onClick={savePicture}>Mint NFT</button>
      </div>
    )
}

export default WebcamContainer;