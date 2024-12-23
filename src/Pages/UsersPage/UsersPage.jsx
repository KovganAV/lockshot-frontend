import { useState, useEffect } from "react";
import { Container, Typography, TextField, Avatar, List, ListItemAvatar, ListItem, ListItemText, Grid, Paper, Box, DialogContent, DialogTitle, Dialog,} from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import RifleIcon from "@mui/icons-material/SportsRugby"; 
import PistolIcon from "@mui/icons-material/SportsHandball"; 

const UsersPage = () => {

  const mockUsers = [
    { id: 1, name: "John Doe", email: "johndoe@example.com", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Emily Johnson", email: "emilyj@example.com", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Michael Brown", email: "michaelb@example.com", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Sarah Davis", email: "sarahd@example.com", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Chris Wilson", email: "chrisw@example.com", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Anna Taylor", email: "annat@example.com", avatar: "https://i.pravatar.cc/150?u=7" },
    { id: 8, name: "James Anderson", email: "jamesa@example.com", avatar: "https://i.pravatar.cc/150?u=8" },
    { id: 9, name: "Linda Martinez", email: "lindam@example.com", avatar: "https://i.pravatar.cc/150?u=9" },
    { id: 10, name: "Robert Garcia", email: "robertg@example.com", avatar: "https://i.pravatar.cc/150?u=10" },
    { id: 11, name: "Patricia Rodriguez", email: "patriciar@example.com", avatar: "https://i.pravatar.cc/150?u=11" },
    { id: 12, name: "Daniel Harris", email: "danielh@example.com", avatar: "https://i.pravatar.cc/150?u=12" },
    { id: 13, name: "Susan Clark", email: "susanc@example.com", avatar: "https://i.pravatar.cc/150?u=13" },
    { id: 14, name: "Mark Lewis", email: "markl@example.com", avatar: "https://i.pravatar.cc/150?u=14" },
    { id: 15, name: "Nancy Lee", email: "nancyl@example.com", avatar: "https://i.pravatar.cc/150?u=15" },
  ];
  
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const filteredUsers = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchQuery]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Container maxWidth="md" >
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
        {users.length > 0 ? (
          users.map((user) => (
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
                Статус: Активный
              </Typography>
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
                <Paper
                  elevation={3}
                  sx={{ padding: "16px", textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}
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