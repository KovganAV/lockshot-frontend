import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'; 

const RegisterPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container maxWidth="md">
        <Header />
        <Box sx={{ width: "100%", maxWidth: "400px", marginTop: "20px" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Register
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
            <TextField
              label="Confirm Password"
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
              Register
            </Button>
          </form>
          <Link to="/login">
          <Typography variant="body2">
            Already have an account? Log in
          </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
