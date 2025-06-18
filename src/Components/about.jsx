import { Dialog,  DialogContent, DialogContentText, DialogActions, Button, TextField, Box, Snackbar, Alert, Divider } from '@mui/material';
import { APP_API_ADMIN_CONFIG } from '../Config/constants';
import { version } from '../Config/configApp';

export default function About({ open, setOpen, about, headerIframe }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: '#eeeeee'
          }
        }}
      >
        <Box
        component="img"
        src={`${APP_API_ADMIN_CONFIG}${headerIframe.url}`}
        alt={headerIframe.alt}
        sx={{ 
            mr: 2,
            padding: 2
        }}
        />
    
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center', whiteSpace: 'pre-line'}}>
           {about}
          </DialogContentText> 
          <Divider sx={{ my: 2 }} />
          <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center', fontWeight: 'bold'}}>
           Versión {version}
          </DialogContentText>   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary" sx={{width: '100%', margin: '10px 0px'}}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    
    </>
  );
}
