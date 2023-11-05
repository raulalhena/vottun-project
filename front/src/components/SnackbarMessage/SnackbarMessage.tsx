import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Snackbar } from '@mui/material';
import { SnackbarMessageProps } from '../../interfaces/SnackbarMessage';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const SnackbarMessage = ({ message, open, handleClose }: SnackbarMessageProps) => {

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={message.severity} sx={{ width: '100%' }}>
        {message.text}
        </Alert>
    </Snackbar>
  )
}

export default SnackbarMessage;