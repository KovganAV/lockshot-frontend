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
} from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import RifleIcon from "@mui/icons-material/SportsRugby";
import PistolIcon from "@mui/icons-material/SportsHandball";
//import apiClient from "../../utils";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка данных о пользователях
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7044/api/Users");
        setUsers(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке пользователей:", err);
        setError("Не удалось загрузить пользователей. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Фильтрация пользователей по поисковому запросу
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
      <Container maxWidth="md">
        <AuthHeader />
        <Typography textAlign="center" sx={{ marginTop: 4 }}>
          Загрузка пользователей...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <AuthHeader />
        <Typography textAlign="center" sx={{ marginTop: 4 }} color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <AuthHeader />
      <TextField
        label="Поиск пользователя"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2, marginTop: 2 }}
      />
      <List>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                marginBottom: 2,
                "&:hover": {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleUserClick(user)}
            >
              <ListItemAvatar>
                <Avatar src={user.avatar} alt={user.name} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))
        ) : (
          <Typography textAlign="center" color="text.secondary">
            Пользователи не найдены
          </Typography>
        )}
      </List>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{selectedUser?.name}</DialogTitle>
        <DialogContent>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                src={selectedUser?.avatar}
                sx={{ width: 150, height: 150, backgroundColor: "#ccc" }}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">ID: {selectedUser?.id}</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Email: {selectedUser?.email}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Статус: {selectedUser?.status || "Активный"}
              </Typography>
            </Grid>
            <Grid item container spacing={2} justifyContent="center">
              {selectedUser?.statistics?.map((item, index) => (
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
                  sx={{
                    padding: "16px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {selectedUser?.weaponType === "rifle" ? (
                    <RifleIcon fontSize="large" />
                  ) : (
                    <PistolIcon fontSize="large" />
                  )}
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {selectedUser?.weaponType === "rifle" ? "Винтовка" : "Пистолет"}
                    </Typography>
                    <Typography>Тип оружия</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default UsersPage;
