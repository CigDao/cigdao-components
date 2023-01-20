import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

export default function BraveAlert() {
    const cookies = new Cookies();
	function isBrave() {
		const win = window as any;
		if (win.navigator.brave != undefined) {
		  if (win.navigator.brave.isBrave.name == "isBrave") {
			return true;
		  } else {
			return false;
		  }
		} else {
		  return false;
		}
	  }
	  const [open, setOpen] = useState(false);

	  const handleClickOpen = () => {
		const goneForever = cookies.get('cigdao-brave-gone');
		if (!goneForever)
			setOpen(true);
	  };
	
	  const handleClose = () => {
		setOpen(false);
	  };

	  const handleCloseForever = () => {
		cookies.set('cigdao-brave-gone', 'true', { path: '/' });
		setOpen(false);
	  };

	useEffect(()=>{
		if (isBrave()) {
			handleClickOpen();
		}
	},[]);
    return (
		<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you using brave browser?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Some functionality might not work on this dapp with brave browser. 
			You need to switch to a different browser or turn shield off.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' variant='contained' onClick={handleClose}>
            Close
          </Button>
		  <Button color='error' variant='contained' onClick={handleCloseForever}>
            Close Forever
          </Button>
        </DialogActions>
      </Dialog>
    );
}