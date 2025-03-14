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
    <AppBar position="static" color="default" elevation={1} sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: "space-between"}}>
        <Link to="/profile">
          <Typography variant="h6" fontWeight="bold" color="text.primary">
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
          <Box>
            {menuItems.map((item) => (
              <Button 
                key={item.path}
                color="inherit" 
                component={Link} 
                to={item.path}
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
