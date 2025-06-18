import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { initialIframeWidth, initialIframeHeight } from '../Config/configApp';
import { APP_URL_APP, APP_API_ADMIN_CONFIG } from '../Config/constants';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function ConfigureIframe({ open, setOpen, headerIframe, slug }) {

  const [iframeWidth, setIframeWidth] = useState(initialIframeWidth);
  const [iframeHeight, setIframeHeight] = useState(initialIframeHeight);
  const [showToast, setShowToast] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleWidthChange = (event) => {
    setIframeWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    setIframeHeight(event.target.value);
  };

  const handleCopyToClipboard = () => {
    const iframeCode = `<iframe src="${APP_URL_APP}/${slug}/iframe" width="${iframeWidth}" height="${iframeHeight}" style="border: none;"></iframe>`;
    navigator.clipboard.writeText(iframeCode);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
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
        <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center'}}>
          ¿Necesitas que ayude a tus visitantes?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center'}}>
           Podés usar mi widget en tu web. Configura el ancho y el alto del mismo de acuerdo a tus necesidades, copia el código y pégalo en el lugar que quieras que aparezca.
          </DialogContentText>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            my: 2, 
            justifyContent: 'center',
            alignItems: 'center',
            margin: "30px 0px"
          }}>
            <TextField
              label="Ancho (px)"
              value={iframeWidth}
              type="number"
              onChange={handleWidthChange}
              size="small"
              sx={{ width: '120px' }}
            />
            <TextField
              label="Alto (px)"
              value={iframeHeight}
              type="number"
              onChange={handleHeightChange}
              size="small"
              sx={{ width: '120px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flex: 1, backgroundColor: '#e3e3e3', padding: 2, fontSize: '12px' }}>
              <code>
                {`<iframe src="${APP_URL_APP}/${slug}/iframe" width="${iframeWidth}" height="${iframeHeight}" style="border: none;"></iframe>`}
              </code>
            </Box>
            <Button
              onClick={handleCopyToClipboard}
              startIcon={<ContentCopyIcon />}
              variant="contained"
              size="small"
            >
              Copiar
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary" sx={{width: '100%', margin: '10px 0px'}}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={showToast} 
        autoHideDuration={3000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ 
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.modal + 1
        }}
      >
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          Código copiado al portapapeles
        </Alert>
      </Snackbar>
    </>
  );
}
