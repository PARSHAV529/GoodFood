import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link,useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';


export default function PositionedMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleuserLogin = () => {
    setAnchorEl(null);
    navigate('/Login')
  };
  const handleUserignup = () => {
    setAnchorEl(null);
    navigate('user/register')
  };
  const handleProviderLogin = () => {
    setAnchorEl(null);
    navigate('/Login')

   
  };
  const handleProvidersignup = () => {
    setAnchorEl(null);
    navigate('provider/register')

   
  };

  const handleClose =()=>{
    setAnchorEl(null);

  }

  return (
    <div >
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='!text-[#fff]'
      >
                  <div className='scale-110 '   ><AccountCircleIcon  /></div>

      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleuserLogin}>Login</MenuItem>
        <MenuItem onClick={handleUserignup}>user registration</MenuItem>

        {/* <MenuItem onClick={handleProviderLogin}> Login</MenuItem> */}
        <MenuItem onClick={handleProvidersignup}>Provider registration</MenuItem>
      </Menu>
    </div>
  );
}