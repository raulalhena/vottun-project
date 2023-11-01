import './MetamaskConnection.css';
import { ethers } from 'ethers';
import { Toaster, toast } from 'react-hot-toast';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const MetamaskConnection = () => {

  const connect = () => {
    if(window.ethereum) {
      toast('Metamask detected, connecting...');
    } else {
      toast('Metamask not detected. Is installed?');
    }
  };

  return (
    <div>
        <button className='login-button' onClick={connect}>Login with wallet</button>
        <Toaster />
    </div>
  )
}

export default MetamaskConnection