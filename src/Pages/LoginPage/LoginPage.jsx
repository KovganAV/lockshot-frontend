import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Header />
      <Container maxWidth="md">
        <Box sx={{ width: "100%", maxWidth: "400px", marginTop: "20px", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: "16px" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ marginBottom: "16px" }}
            >
              Login
            </Button>
          </form>
          <Link to="/register">
          <Typography variant="body2">
            Dont have an account? Sign up
          </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
