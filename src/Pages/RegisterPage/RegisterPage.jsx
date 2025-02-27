import { Box, Container, TextField, Button, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from '../../components/Header/Header';

const RegisterPage = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("https://localhost:7044/api/Users/register", {
        name, 
        email, 
        password,
        role: "User", 
      });

      if (response.status === 200) {
        navigate("/login"); 
      }
    } catch (err) {
      setError(err.response?.data?.title || "Registration failed."); 
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
            Register
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleRegister}>
            <TextField
              label="Name" 
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: "16px" }}
            />
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
