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
import { useEffect, useState } from "react";
import { Box, Container, Typography, Avatar, Paper } from "@mui/material";
import ProfileStatistics from "../../components/ProfileStatistics/ProfileStatistics";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [statistics, setStatistics] = useState([]);

  const mockUser = {
    id: "12345",
    name: "Test User",
    status: "Тестовый режим",
    avatarUrl: "https://via.placeholder.com/150", 
    aiAdvice: "Тренируйтесь на короткой дистанции для улучшения точности.",
  };

  const mockStatistics = [
    { label: "Точность", value: "90%" },
    { label: "Попадания", value: "150" },
    { label: "Выстрелов за неделю", value: "320" },
    { label: "Средний результат", value: "9.2" },
  ];

  useEffect(() => {
    const fetchTestData = () => {
      setTimeout(() => {
        setUserData(mockUser);
        setStatistics(mockStatistics);
      }, 500); 
    };

    fetchTestData();
  }, []);

  if (!userData) return <Typography>Loading...</Typography>;

  return (
    <>
      <AuthHeader />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", 
          backgroundColor: "#f9f9f9",
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={4}
            sx={{
              padding: 6,
              borderRadius: "12px",
            }}
          >
            <Box display="flex" alignItems="center" gap={4}>
              <Avatar
                src={userData.avatarUrl}
                sx={{ width: 150, height: 150 }} 
              />
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {userData.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  ID: {userData.id}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Статус: {userData.status}
                </Typography>
              </Box>
            </Box>
            <Box marginTop={4}>
              <ProfileStatistics statistics={statistics} />
            </Box>
            <Box marginTop={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Персональные советы от AI
              </Typography>
              <Typography>{userData.aiAdvice}</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
