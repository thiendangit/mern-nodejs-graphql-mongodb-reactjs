import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link as RouterLink} from 'react-router-dom';

export const MenuBar: React.FC = () => {
  return (
    <Box sx={{flexGrow: 1}} >
      <AppBar position="static" >
        <Toolbar >
          <Typography variant="h6" component={RouterLink} sx={{flexGrow: 1}} to='/' >
            Home
          </Typography >
          <Button color="inherit" component={RouterLink} to='/login' >Login</Button >
          <Button color="inherit" component={RouterLink} to='/register' >Register</Button >
        </Toolbar >
      </AppBar >
    </Box >
  );
}
