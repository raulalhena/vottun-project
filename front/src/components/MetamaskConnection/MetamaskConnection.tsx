import './MetamaskConnection.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import SnackbarMessage from '../SnackbarMessage/SnackbarMessage';
import { SnackbarMessageProps } from '../../interfaces/SnackbarMessage';
import useAuth from '../../hooks/useAuth';

const MetamaskConnection = () => {

  const { signIn, signOut } = useAuth();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<SnackbarMessageProps>({
    severity: '',
    text: ''
  });

  const showMessage = (message) => {
    setMessage(message)
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [ signer, setSigner ] = useState<ethers.Signer>();
  const [ provider, setProvider ] = useState<ethers.Provider>();
  const [ account, setAccount ] = useState<ethers.Signer.account>();
  const [ isConnected, setIsConnected ] = useState<boolean>(false);

  const login = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer?.getAddress();

      console.log('login provider ', provider);
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setIsConnected(true);
      signIn(address, signer);
      showMessage({ severity: 'success', text: `Loging success with: ${address}` });
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const connect = () => {
    if(window.ethereum) {
      showMessage({ severity: 'info', text: 'Metamask detected, connecting...' });
      login();
    } else {
      showMessage({ severity: 'error', text: 'Metamask not detected. Is it installed?' });
    }
  };

  const logout = () => {
    console.log('logout provider ', provider);
    setIsConnected(false);
    provider.destroy();
    signOut();
    showMessage({ severity: 'warning', text: `Metamask disconnected: ${account}`});
  };

  return (
    <div>
      {!isConnected ?
        <button className='login-button' onClick={connect}>Login with wallet</button>
        :
        <button className='login-button' onClick={logout}>Logout</button>
      }
      <SnackbarMessage message={message} open={open} handleClose={handleClose}/>
    </div>
  )
}

export default MetamaskConnection