import { useState } from "react";
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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";

const ProfilePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "Test User",
    id: "12345",
    status: "Тестовый режим",
    avatarUrl: "",
    weaponType: "rifle",
    statistics: [
      { label: "Средний результат", value: "9.2" },
      { label: "Выстрелов за неделю", value: "320" },
      { label: "Выстрелов всего", value: "370" },
      { label: "Лучшая серия 5", value: "41" },
      { label: "Лучшая серия 10", value: "76" },
    ],
    aiAdvice: "Тренируйтесь на короткой дистанции для улучшения точности.",
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

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
          <MenuItem onClick={handleEditModalOpen}>Настройки</MenuItem>
          <MenuItem onClick={handleMenuClose}>Выход</MenuItem>
        </Menu>
        <IconButton
          onClick={handleMenuOpen}
          sx={{ position: "absolute", top: "12px", right: "24px" }}
        >
          <SettingsIcon />
        </IconButton>

        <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
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
                <Typography variant="subtitle2" color="text.secondary">
                  Статус: {profileData.status}
                </Typography>
              </Grid>
              <Grid item container spacing={2} justifyContent="center">
                {profileData.statistics.map((item, index) => (
                  <Grid item key={index}>
                    <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                      <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                      <Typography>{item.label}</Typography>
                    </Paper>
                  </Grid>
                ))}
                <Grid item>
                  <Paper
                    elevation={3}
                    sx={{ padding: "16px", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    {profileData.weaponType === "rifle" ? (
                      <RifleIcon fontSize="large" />
                    ) : (
                      <PistolIcon fontSize="large" />
                    )}
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {profileData.weaponType === "rifle" ? "Винтовка" : "Пистолет"}
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

      {/* Модальное окно для редактирования профиля */}
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
            label="Статус"
            value={profileData.status}
            onChange={(e) => handleProfileChange("status", e.target.value)}
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
          <Button variant="contained" onClick={handleEditModalClose} fullWidth>
            Сохранить
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ProfilePage;
