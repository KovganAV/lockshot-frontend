import { useState, useEffect } from "react";
import { Container, Typography, TextField, Avatar, List, ListItemAvatar, ListItem, ListItemText} from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();

  // Mock data for testing
  const mockUsers = [
    { id: 1, name: "John Doe", email: "johndoe@example.com", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Emily Johnson", email: "emilyj@example.com", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Michael Brown", email: "michaelb@example.com", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Sarah Davis", email: "sarahd@example.com", avatar: "https://i.pravatar.cc/150?u=5" },
  ];

  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Filter users based on the search query
    const filteredUsers = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchQuery]);

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <AuthHeader />
      <Typography variant="h4" gutterBottom textAlign="center">
      </Typography>
      <TextField
        label="Поиск пользователя"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 4 }}
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
                '&:hover': {
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                },
              }}
              onClick={() => handleUserClick(user.id)}
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
    </Container>
  );
};

export default UsersPage;
