import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export default function FixedBottomNavigation() {
  const navigate = useNavigate();

  const handleNavigation = (event, newValue) => {
    switch (newValue) {
      case 'Home':
        navigate('/');
        break;
      case 'About':
        navigate('#about');
        break;
      case 'Menu':
        navigate('/menu');
        break;
      default:
        break;
    }
  };

  return (

    <Box sx={{ pb: 7  }}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation sx={{bgcolor:'#1f1d2a'}} onChange={handleNavigation}>
          <BottomNavigationAction sx={{color:'#f37e6b'}} label="Home" value="Home" icon={<HomeIcon />} />
          <BottomNavigationAction  sx={{color:'#f37e6b'}}  label="About" value="About" icon={<InfoIcon />} />
          <BottomNavigationAction  sx={{color:'#f37e6b'}}   label="Menu" value="Menu" icon={<FastfoodIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
   
  );
}
