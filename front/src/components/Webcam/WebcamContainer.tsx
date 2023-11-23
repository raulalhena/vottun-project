import Webcam from 'react-webcam';
import './WebcamContainer.css';
import { useState } from 'react';
import { CONTRACT_ADDRESS } from '../../data/onchain_info';

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user"
};

console.log('APP_ID ', import.meta.env.VITE_APP_ID);

const WebcamContainer = () => {

  const [ image, setImage ] = useState<string>('');
  const [ imageSaved, setImageSaved ] = useState<boolean>(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const savePicture = async () => {
    console.log('user ', image)
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
    user.image = image;
    console.log('user or image', user.image);
  }

  const getBase64String = () => {

  };

  const base64toBlob = (base64Data, contentType): Blob => {
    console.log('in base64tob ', base64Data)
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(image);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  const [ hashFile, setHashFile ] = useState<string>('');

  const uploadFileToIPFS = async () => {
    console.log('user in upload file ', Object.values(user))
    const formData = new FormData();
    formData.append('filename', user.address);
    formData.append('file', base64toBlob(image, ''));
    const resp = await fetch('https://ipfsapi-v2.vottun.tech/ipfs/v2/file/upload', {
        method: 'POST',
        headers: {
          'x-application-vkn': import.meta.env.VITE_APP_ID,
          'Authorization': import.meta.env.VITE_API_KEY,
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
    });

    const result = await resp.json();
    console.log(result.hash);
    setHashFile(result.hash);

  };

  const mintNFT = async () => {
    console.log('image base 64 ', typeof user)
    await uploadFileToIPFS();
    if(hashFile) {
      const resp = await fetch('https://api.vottun.tech/erc/v1/erc721/mint', {
        method: 'POST',
        headers: {
          'x-application-vkn': import.meta.env.VITE_APP_ID,
          'Authorization': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "recipientAddress": WALLET_ADDRESS,
          "tokenId": 4,
          "ipfsUri": `https://ipfsgw.vottun.tech/ipfs/${hashFile}`,
          "ipfsHash": hashFile,
          "blockchainNetwork": 80001,
          "contractAddress": CONTRACT_ADDRESS,
          "royaltyPercentage": 10,
          "gas": 3000000
        })
      });

      const result = await resp.json();
      console.log(result);
    }
  };

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
        <button className='dashboard-button' onClick={mintNFT}>Mint NFT</button>
      </div>
    )
}

export default WebcamContainer;