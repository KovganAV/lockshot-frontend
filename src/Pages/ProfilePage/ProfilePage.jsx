import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar, 
  Menu,
  MenuItem,
  IconButton,
  Modal,
  TextField,
  Button,
  CircularProgress,
  Grow,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
    handleMenuClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      setError("Authorization token is missing");
      setIsLoading(false);
      return;
    }

    try {
      const [profileResponse, statsResponse] = await Promise.all([
        axios.get("https://localhost:7044/api/Users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get("https://localhost:7044/api/Hits/statistics", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setProfileData({
        ...profileResponse.data,
        statistics: statsResponse.data
      });
      setNewUsername(profileResponse.data.username);
    } catch (err) {
      console.error("Failed to load profile data:", err);
      setError("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setTimeout(() => setAnchorEl(null), 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    handleMenuClose();
    navigate("/");
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token is missing");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post("https://localhost:7044/api/Users/avatar", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setProfileData(prev => ({
        ...prev,
        avatarUrl: response.data.avatarUrl
      }));

    } catch (err) {
      console.error("Failed to upload avatar:", err);
      setError("Failed to upload avatar");
    }
  };

  const handleProfileSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Token not found");
      return;
    }

    try {
      await axios.put("https://localhost:7044/api/Users/profile", {
        ...profileData,
        username: newUsername
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfileData(prev => ({
        ...prev,
        username: newUsername
      }));
      
      handleEditModalClose();
      await fetchProfileData();
    } catch (err) {
      console.error("Failed to save profile:", err);
      setError("Failed to save changes");
    }
  };

  const handleProfileChange = (field, value) => {
    if (field === 'username') {
      setNewUsername(value);
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography color="error">{error}</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        height: "100vh", 
        position: "fixed", 
        width: "100%", 
        top: 0, 
        left: 0,
        bgcolor: 'background.default',
        color: 'text.primary'
      }}>
        <AuthHeader />
        <Box sx={{ height: "calc(100% - 64px)", display: "flex", flexDirection: "column" }}>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            TransitionComponent={Grow}
            TransitionProps={{ 
              timeout: 500,
              style: { transformOrigin: 'top right' }
            }}
            sx={{
              mt: "3px",
              "& .MuiPaper-root": { 
                width: "250px", 
                top: "56px !important", 
                right: "24px",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden'
              },
              "& .MuiMenuItem-root": {
                padding: "12px 24px",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover"
                }
              }
            }}
          >
            <MenuItem onClick={handleEditModalOpen} sx={{ color: "primary.main" }}>
              <ListItemIcon>
                <EditIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </MenuItem>
            <MenuItem onClick={toggleColorMode}>
              <ListItemIcon>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </ListItemIcon>
              <ListItemText primary={mode === 'dark' ? "Light Theme" : "Dark Theme"} />
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </Menu>
          
          <IconButton
            onClick={handleMenuOpen}
            sx={{ 
              position: "absolute", 
              top: "10%", 
              right: "2%",
              backgroundColor: "background.paper",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "background.paper",
                transform: "scale(1.05)"
              }
            }}
          >
            <SettingsIcon />
          </IconButton>

          <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
            <Paper elevation={6} sx={{ 
              padding: "32px", 
              borderRadius: "12px", 
              maxWidth: "600px", 
              width: "100%",
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              backgroundColor: "background.paper"
            }}>
              <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar
                    src={profileData.avatarUrl || ""}
                    sx={{ width: 150, height: 150, backgroundColor: "grey.500" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight="bold">{profileData.name}</Typography>
                  <Typography variant="subtitle1">ID: {profileData.id}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{profileData.mail}</Typography>
                </Grid>
                <Grid item container spacing={2} justifyContent="center">
                  <Grid item>
                    <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.statistics?.averageScore ? profileData.statistics.averageScore.toFixed(1) : "No data"}
                      </Typography>
                      <Typography>Average Score</Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.statistics?.maxDistance ?? "No data"} m
                      </Typography>
                      <Typography>Max Distance</Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.statistics?.totalShots ?? "No data"}
                      </Typography>
                      <Typography>Total Shots</Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.statistics?.averageMetrics ?? "No data"}
                      </Typography>
                      <Typography>Metrics</Typography>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <Paper
                      elevation={3}
                      sx={{ padding: "16px", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      {profileData.statistics?.mostUsedWeapon === "rifle" ? (
                        <RifleIcon fontSize="large" />
                      ) : (
                        <PistolIcon fontSize="large" />
                      )}
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {profileData.statistics?.mostUsedWeapon === "rifle" ? "Rifle" : "Pistol"}
                        </Typography>
                        <Typography>Weapon Type</Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="h6" fontWeight="bold">AI Personal Advice</Typography>
                  <Typography>{profileData.aiAdvice}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Box>

        <Modal 
          open={isEditModalOpen} 
          onClose={handleEditModalClose}
          closeAfterTransition
          sx={{ transition: 'all 0.3s ease-in-out' }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${isEditModalOpen ? 1 : 0.5})`,
              width: "400px",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: 4,
              opacity: isEditModalOpen ? 1 : 0,
              transition: 'all 0.3s ease-in-out'
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Edit Profile
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={avatarPreview || profileData.avatarUrl}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span">
                  Change Photo
                </Button>
              </label>
            </Box>
            <TextField
              fullWidth
              label="Username"
              value={newUsername}
              onChange={(e) => handleProfileChange("username", e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleProfileSave} fullWidth>
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}

export default ProfilePage;
