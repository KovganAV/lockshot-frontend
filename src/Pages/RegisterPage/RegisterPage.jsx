import { Box, Container, TextField, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header'; 

const RegisterPage = () => {
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
        <Container maxWidth="md" container direction="column" alignItems="center" spacing={2}>
        <Box sx={{width: "400px", marginTop: "200px", marginLeft: "200px", justifyContent: "center", alignItems: "center"}}>
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
