/*import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

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
*/
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderAuthorized = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Lockshot
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/events">
            Events
          </Button>
          <Button color="inherit" component={Link} to="/content">
            Content
          </Button>
          <Button color="inherit" component={Link} to="/statistics">
            Statistics
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderAuthorized;
