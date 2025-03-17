import { useState, useEffect } from "react";
import {
  Box,
  Grid,
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
  Card,
  CardContent,
  Divider,
  useMediaQuery,
  useTheme as useMuiTheme
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SpeedIcon from '@mui/icons-material/Speed';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
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
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
        minHeight: "100vh",
        width: "100%",
        bgcolor: 'background.default',
        color: 'text.primary',
        overflow: 'auto'
      }}>
        <AuthHeader />
        <Box sx={{ 
          p: isMobile ? 2 : 3,
          pt: isMobile ? '80px' : '64px'
        }}>
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
                width: isMobile ? "200px" : "250px",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden'
              },
              "& .MuiMenuItem-root": {
                padding: isMobile ? "8px 16px" : "12px 24px",
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
              position: "fixed", 
              top: isMobile ? "70px" : "80px",
              right: isMobile ? "16px" : "24px",
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

          <Card elevation={8} sx={{ 
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto",
            borderRadius: isMobile ? "16px" : "20px",
            background: theme.palette.background.paper,
            backdropFilter: "blur(10px)",
          }}>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar
                  src={profileData.avatarUrl || ""}
                  sx={{ 
                    width: isMobile ? 120 : 180, 
                    height: isMobile ? 120 : 180, 
                    border: '4px solid',
                    borderColor: 'primary.main',
                    mb: 2
                  }}
                />
                <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom align="center">
                  {profileData.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  ID: {profileData.id}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" align="center">
                  {profileData.mail}
                </Typography>
              </Box>

              <Divider sx={{ mb: 4 }} />

              <Grid container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: isMobile ? "12px !important" : 2
                    }}>
                      <SpeedIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                          {profileData.statistics?.averageScore !== undefined ? profileData.statistics.averageScore.toFixed(1) : "N/A"}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Average Score
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: isMobile ? "12px !important" : 2
                    }}>
                      <GpsFixedIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                          {profileData.statistics?.maxDistance !== undefined ? profileData.statistics.maxDistance.toFixed(1) : "N/A"}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Max Distance (m)
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Card sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: isMobile ? "12px !important" : 2
                    }}>
                      <TrackChangesIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                          {profileData.statistics?.totalShots !== undefined ? profileData.statistics.totalShots : "N/A"}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Shots
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: isMobile ? "12px !important" : 2
                    }}>
                      <EqualizerIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                          {profileData.statistics?.averageMetrics !== undefined ? profileData.statistics.averageMetrics.toFixed(1) : "N/A"}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Average Metrics
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Card sx={{ 
                    height: '100%',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: isMobile ? "12px !important" : 2
                    }}>
                      {profileData.statistics?.mostUsedWeapon === "rifle" ? (
                        <RifleIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      ) : (
                        <PistolIcon color="primary" sx={{ fontSize: isMobile ? 32 : 40 }} />
                      )}
                      <Box>
                        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
                          {profileData.statistics?.mostUsedWeapon === "rifle" ? "Rifle" : "Pistol"}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          Preferred Weapon
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  AI Personal Advice
                </Typography>
                <Card sx={{ 
                  p: isMobile ? 1.5 : 2, 
                  background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                }}>
                  <Typography variant="body1">
                    {profileData.aiAdvice}
                  </Typography>
                </Card>
              </Box>
            </CardContent>
          </Card>
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
              width: isMobile ? "90%" : "400px",
              bgcolor: "background.paper",
              borderRadius: "8px",
              boxShadow: 24,
              p: isMobile ? 2 : 4,
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
                sx={{ width: isMobile ? 80 : 100, height: isMobile ? 80 : 100, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span" size={isMobile ? "small" : "medium"}>
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
              size={isMobile ? "small" : "medium"}
            />
            <Button 
              variant="contained" 
              onClick={handleProfileSave} 
              fullWidth
              size={isMobile ? "small" : "medium"}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
    );
}

export default ProfilePage;
