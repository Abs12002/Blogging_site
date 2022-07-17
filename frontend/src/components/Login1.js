import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import { dividerClasses } from '@mui/material';
import {Button}from '@mui/material'

export default function IconAlerts() {
  const [open,setOpen]=React.useState();

  React.useEffect(() => {
   
    setOpen(true);
  }, [])
  const handleClick=()=>{
    setOpen(false);
  }
  
  return (
    <div>
    {open&&<Stack sx={{ width: '100%' }} spacing={2}>
      
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        Login successfully !!
      </Alert>
      <Button onClick={handleClick}>X</Button>
     
    </Stack>

  }
  </div>
  );
}
