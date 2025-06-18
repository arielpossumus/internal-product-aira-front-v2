import { Box,  Typography } from '@mui/material'
import logoFooter from "../assets/PoweredByAiraNew.png"
import { version } from '../Config/configApp';
export default function PoweredBy() {

    return (
        <Box 
            sx={{ 
                mt: 'auto',
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: '#fff',
                display: 'flex',
                flexDirection: 'column',
             
            }}
        >
          
            <Box 
                sx={{ 
                    mt: 'auto',
                    borderTop: '1px solid', 
                    borderColor: 'divider', 
                    bgcolor: '#e3e3e3'
                }}
            >
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    px: 3,
                    py: 2
                }}>
                    <Typography 
                        sx={{
                            fontSize: '0.8rem',
                            fontStyle: 'italic'
                        }}
                    >
                        Vrs {version}
                    </Typography>
                    <Box
                        component="img"
                        src={logoFooter}
                        alt={"Powered by Aira"}
                        sx={{ 
                            width: "40%",
                            display: 'block'
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
