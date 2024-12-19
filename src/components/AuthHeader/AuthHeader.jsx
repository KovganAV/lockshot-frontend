import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const HeaderAuthorized = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between"}}>
        <Link to = "/profile">
          <Typography variant="h6" fontWeight="bold">
            Lockshot
          </Typography>
        </Link>
        <Box>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
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
