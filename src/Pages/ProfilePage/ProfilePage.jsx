/*import { useEffect, useState } from "react";
import { Box, Container, Typography, Avatar, Paper } from "@mui/material";
import ProfileStatistics from "../../components/ProfileStatistics/ProfileStatistics";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setUserData(response.data.user);
        setStatistics(response.data.statistics);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, borderRadius: "8px" }}>
          <Box display="flex" alignItems="center" gap={4}>
            <Avatar
              src={userData.avatarUrl || "/default-avatar.png"}
              sx={{ width: 120, height: 120 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {userData.name}
              </Typography>
              <Typography color="textSecondary">ID: {userData.id}</Typography>
              <Typography color="textSecondary">
                Статус: {userData.status || "Активный"}
              </Typography>
            </Box>
          </Box>
          <ProfileStatistics statistics={statistics} />
          <Box marginTop={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Персональные советы от AI
            </Typography>
            <Typography>
              {userData.aiAdvice || "Тренируйтесь чаще для улучшения точности."}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
*/
import { useState } from "react";
import { Box, Grid, Paper, Typography, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import RifleIcon from "@mui/icons-material/SportsRugby"; 
import PistolIcon from "@mui/icons-material/SportsHandball"; 

const ProfilePage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const weaponType = "rifle"; 

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff"}}>
      <AuthHeader />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          mt: "3px", 
          "& .MuiPaper-root": { width: "200px", top: "56px !important", right: "24px" },
        }}
      >
        <MenuItem onClick={handleMenuClose}>Тема</MenuItem>
        <MenuItem onClick={handleMenuClose}>Настройки</MenuItem>
        <MenuItem onClick={handleMenuClose}>Выход</MenuItem>
      </Menu>
         <IconButton
          onClick={handleMenuOpen}
          sx={{ position: "absolute", top: "12px", right: "24px"  }}
        >
          <SettingsIcon />
        </IconButton>
      <Grid container justifyContent="center" alignItems="center" sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        <Paper elevation={6} sx={{ padding: "32px", borderRadius: "12px", maxWidth: "600px", width: "100%" }}>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar sx={{ width: 150, height: 150, backgroundColor: "#ccc" }}>150 x 150</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" fontWeight="bold">Test User</Typography>
              <Typography variant="subtitle1">ID: 12345</Typography>
              <Typography variant="subtitle2" color="text.secondary">Статус: Тестовый режим</Typography>
            </Grid>
            <Grid item container spacing={2} justifyContent="center">
              {[
                { label: "Средний результат", value: "9.2" },
                { label: "Выстрелов за неделю", value: "320" },
                { label: "Выстрелов всего", value: "370" },
                { label: "Лучшая серия 5", value: "41" },
                { label: "Лучшая серия 10", value: "76" },
              ].map((item, index) => (
                <Grid item key={index}>
                  <Paper elevation={3} sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                    <Typography>{item.label}</Typography>
                  </Paper>
                </Grid>
              ))}
              <Grid item>
                <Paper elevation={3} sx={{ padding: "16px", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
                  {weaponType === "rifle" ? (
                    <RifleIcon fontSize="large" />
                  ) : (
                    <PistolIcon fontSize="large" />
                  )}
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{weaponType === "rifle" ? "Винтовка" : "Пистолет"}</Typography>
                    <Typography>Тип оружия</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight="bold">Персональные советы от AI</Typography>
              <Typography>Тренируйтесь на короткой дистанции для улучшения точности.</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
