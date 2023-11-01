import './MetamaskConnection.css';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MetamaskConnection = () => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({
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
      console.log('login')
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer?.getAddress();

      console.log(provider);
      setProvider(provider);
      setSigner(signer);
      setAccount(address);
      setIsConnected(true);
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
    console.log(provider);
    setIsConnected(false);
    provider.destroy();
    showMessage({ severity: 'warning', text: `Metamask disconnected: ${account}`});
  };

  return (
    <div>
      {!isConnected ?
        <button className='login-button' onClick={connect}>Login with wallet</button>
        :
        <button className='login-button' onClick={logout}>Logout</button>
      }
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
            {message.text}
          </Alert>
        </Snackbar>
    </div>
  )
}

export default MetamaskConnection