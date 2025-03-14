import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Avatar,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Box,
  DialogContent,
  DialogTitle,
  Dialog,
  ThemeProvider,
  createTheme,
  Zoom,
  Grow,
  IconButton,
  Button,
} from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode,
      text: {
        username: '#000000'
      }
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7044/api/Users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error loading users:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <Container maxWidth="md">
            <AuthHeader />
            <Typography textAlign="center" sx={{ marginTop: 4 }} color="text.primary">
              Loading users...
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <Container maxWidth="xl">
            <AuthHeader />
            <Typography textAlign="center" sx={{ marginTop: 4 }} color="error">
              {error}
            </Typography>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <AuthHeader />
          <TextField
            label="Search user"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2, mt: 3 }}
          />
          <List>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <Grow in={true} timeout={500 + index * 100} key={user.id}>
                  <ListItem
                    sx={{
                      border: "1px solid",
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2,
                      bgcolor: 'background.paper',
                      "&:hover": {
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        cursor: "pointer",
                        transform: "scale(1.02)",
                        transition: "transform 0.2s ease-in-out",
                      },
                    }}
                    onClick={() => handleUserClick(user)}
                  >
                    <ListItemAvatar>
                      <Avatar src={user.avatar} alt={user.name} />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={<Typography sx={{ color: theme.palette.text.username }}>{user.name}</Typography>}
                      secondary={user.email}
                    />
                  </ListItem>
                </Grow>
              ))
            ) : (
              <Typography textAlign="center" color="text.secondary">
                No users found
              </Typography>
            )}
          </List>
          <Dialog 
            open={isModalOpen} 
            onClose={handleCloseModal} 
            fullWidth 
            maxWidth="sm"
            TransitionComponent={Zoom}
          >
            <DialogTitle>
              <Typography sx={{ color: theme.palette.text.username }}>{selectedUser?.name}</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar
                    src={selectedUser?.avatar}
                    sx={{ width: 150, height: 150, bgcolor: "#ccc" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.text.username }}>ID: {selectedUser?.id}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email: {selectedUser?.email}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status: {selectedUser?.status || "Active"}
                  </Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                  {selectedUser?.statistics?.map((item, index) => (
                    <Grow in={true} timeout={500 + index * 100} key={index}>
                      <Grid item>
                        <Paper elevation={3} sx={{ p: 2, textAlign: "center", bgcolor: 'background.paper' }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.username }}>{item.value}</Typography>
                          <Typography color="text.secondary">{item.label}</Typography>
                        </Paper>
                      </Grid>
                    </Grow>
                  ))}
                  <Grow in={true} timeout={800}>
                    <Grid item>
                      <Paper
                        elevation={3}
                        sx={{
                          p: 2,
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: 'background.paper'
                        }}
                      >
                        {selectedUser?.weaponType === "rifle" ? (
                          <RifleIcon fontSize="large" />
                        ) : (
                          <PistolIcon fontSize="large" />
                        )}
                        <Box>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.username }}>
                            {selectedUser?.weaponType === "rifle" ? "Rifle" : "Pistol"}
                          </Typography>
                          <Typography color="text.secondary">Weapon Type</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grow>
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          <Zoom in={showScrollTop}>
            <IconButton
              size="small"
              onClick={scrollToTop}
              sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                width: 32,
                height: 32
              }}
            >
              <KeyboardArrowUpIcon fontSize="small" />
            </IconButton>
          </Zoom>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default UsersPage;
