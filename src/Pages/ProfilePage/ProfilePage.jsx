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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("Отсутствует токен авторизации.");
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await axios.get("https://localhost:7044/api/Users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          }          
        });
  
        setProfileData(response.data);
  
        const statsResponse = await axios.get(`https://localhost:7044/api/Hits/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log("Статистика выстрелов:", statsResponse.data);
        
  
        setProfileData((prev) => ({
          ...(prev || {}), 
          statistics: statsResponse.data,
        }));
      } catch (err) {
        console.error("Ошибка при загрузке данных профиля:", err);
        setError("Не удалось загрузить данные профиля.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProfileData();
  }, []);
  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    localStorage.removeItem("authToken"); 
    setAnchorEl(null);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Токен не найден.");
      return;
    }

    try {
      await axios.put("https://localhost:7044//api/Users/profile", profileData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Ошибка при сохранении профиля:", err);
      setError("Не удалось сохранить изменения.");
    }
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <AuthHeader />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff" }}>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            mt: "3px",
            "& .MuiPaper-root": { width: "200px", top: "56px !important", right: "24px" },
          }}
        >
          <MenuItem onClick={handleEditModalOpen}><Button>Редактировать профиль</Button></MenuItem>
          <MenuItem onClick={handleMenuClose}> <Button component={Link} to="/"> Выход </Button></MenuItem>
        </Menu>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ position: "absolute", top: "10%", right: "2%" }}
        >
          <SettingsIcon />
        </IconButton>

        <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1 }}>
          <Paper elevation={6} sx={{ padding: "32px", borderRadius: "12px", maxWidth: "600px", width: "100%" }}>
            <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
                <Avatar
                  src={profileData.avatarUrl || ""}
                  sx={{ width: 150, height: 150, backgroundColor: "#ccc" }}
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
                    <Typography variant="h6" fontWeight="bold"> {profileData.statistics?.averageScore ? profileData.statistics.averageScore.toFixed(1) : "Нет данных"}</Typography>
                    <Typography>Средний счет</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">{profileData.statistics?.maxDistance?? "Нет данных"} м.</Typography>
                    <Typography>Макс. дистанция</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">{profileData.statistics?.totalShots?? "Нет данных"}</Typography>
                    <Typography>Кол-во выстрелов</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">{profileData.statistics?.averageMetrics?? "Нет данных"}</Typography>
                    <Typography>Метрики</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper
                    elevation={3}
                    sx={{ padding: "16px", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    {profileData.mostUsedWeapon === "rifle" ? (
                      <RifleIcon fontSize="large" />
                    ) : (
                      <PistolIcon fontSize="large" />
                    )}
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.statistics?.mostUsedWeapon === "rifle" ? "Винтовка" : "Пистолет"}
                      </Typography>
                      <Typography>Тип оружия</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="h6" fontWeight="bold">Персональные советы от AI</Typography>
                <Typography>{profileData.aiAdvice}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>

      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Редактировать профиль
          </Typography>
          <TextField
            fullWidth
            label="Имя"
            value={profileData.name}
            onChange={(e) => handleProfileChange("name", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="URL аватара"
            value={profileData.avatarUrl}
            onChange={(e) => handleProfileChange("avatarUrl", e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Button
              variant={profileData.weaponType === "rifle" ? "contained" : "outlined"}
              onClick={() => handleProfileChange("weaponType", "rifle")}
            >
              Винтовка
            </Button>
            <Button
              variant={profileData.weaponType === "pistol" ? "contained" : "outlined"}
              onClick={() => handleProfileChange("weaponType", "pistol")}
            >
              Пистолет
            </Button>
          </Box>
          <Button variant="contained" onClick={handleProfileSave} fullWidth>
            Сохранить
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default ProfilePage;
