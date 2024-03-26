import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import logo2 from '../images/Untitled design1.png'
import { auth } from "../firebase";
import LogoutIcon from '@mui/icons-material/Logout';
import DropdownMenu from './DropdownMenu';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  // console.log(props.cartCount.length)
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        //   console.log(user.displayName);
      } else setUserName("");
    });
  }, []);






  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Good-Food
      </Typography>
      <Divider />




    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className='navbar'>


    <Box  sx={{  display: 'flex', height: '3rem' }}>
      <CssBaseline />
      <AppBar component="nav" >
        <Toolbar sx={{   bgcolor:"#fff", display: 'flex', justifyContent: 'space-between', color: '#ffbc0d', fontSize: '1.3rem' }}>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg: text">
            <img  alt="logo" className="w-[9rem]   h-13 object-cover rounded" />
          </Link>



          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <div className="flex  items-center gap-5	 ">
              <Link to="/cart" className=" relative">
                <div className='scale-150'>                <ShoppingCartIcon  />
</div>

                {props.cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-sm text-white inline-flex justify-center items-center w-5 h-5 absolute -top-0.5 -right-1">{props.cartCount}</div> : null}

              </Link>
              

              {userName ? <Link to="/logout"><div className='scale-150'><LogoutIcon /> </div>
              </Link> : <DropdownMenu />}

              


            </div>


          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

      </Box>
    </Box>
    </div>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;