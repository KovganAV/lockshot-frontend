import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Link to="/">
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Lockshot
        </Typography>
      </Link>
        <Box>
          <Link to="/register">
            <Button color="inherit" sx={{ marginRight: 1 }}>Sign Up</Button>
          </Link>
          <Link to="/login">
            <Button variant="outlined" color="inherit">Login</Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
