import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Lockshot
        </Typography>
        <Box>
          <Button color="inherit" sx={{ marginRight: 1 }}>Sign Up</Button>
          <Button variant="outlined" color="inherit">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
/*
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from '../../Pages/LoginPage/LoginPage';  
import RegisterPage from '../../Pages/RegisterPage/RegisterPage';  
const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Lockshot
        </Typography>
        <Box>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Link to="/register">
          <Button color="inherit" sx={{ marginRight: 1 }}>Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button variant="outlined" color="inherit">Login</Button>
        </Link>
        </Router>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
*/