import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const HeaderAuthorized = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Users', path: '/users' },
    { text: 'Events', path: '/events' },
    { text: 'Content', path: '/content' },
    { text: 'Statistics', path: '/statistics' },
    { text: 'Profile', path: '/profile' }
  ];

  return (
    <AppBar position="static" color="primary" elevation={3} sx={{ width: '100%', backgroundColor: '#3f51b5' }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: '0 20px', height: '64px' }}>
        <Link to="/profile" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold" color="white">
            Lockshot
          </Typography>
        </Link>
        
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ height: '100%' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path} 
                  component={Link} 
                  to={item.path}
                  onClick={handleClose}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                component={Link} 
                to={item.path}
                sx={{ margin: '0 10px', '&:hover': { backgroundColor: '#5c6bc0' }, height: '100%', display: 'flex', alignItems: 'center' }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthorized;
