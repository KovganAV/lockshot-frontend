import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ paddingY: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png" 
            alt="Lockshot Logo"
            style={{ width: "40px", marginRight: "8px" }}
          />
        <Link to="/register">
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Lockshot
          </Typography>
        </Link>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/events" variant="contained" color="inherit">
            Events
          </Button>
          <Button component={Link} to="/content" variant="contained" color="inherit">
            Content
          </Button>
          <Button component={Link} to="/statistics" variant="contained" color="inherit">
            Statistics
          </Button>
          <Button component={Link} to="/profile" variant="contained" color="inherit">
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthHeader;
