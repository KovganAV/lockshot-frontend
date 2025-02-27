import { Box, Container, TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; 
import axios from "axios";
import Header from '../../components/Header/Header';

const LoginPage = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("authToken"); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7044/api/Users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data; 
        localStorage.setItem("authToken", token);
        navigate("/profile"); 
      }
    } catch (err) {
      setError(err.response?.data?.title || "Login failed."); 
    }
  };

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
        <Box sx={{ width: "400px", margin: "200px auto 0 auto", textAlign: "center" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              Don’t have an account? Sign up
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;
