import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert, Box, ThemeProvider, createTheme } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import EventList from "../../components/EventCard/EventCard";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container sx={{ marginTop: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
            Events
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <EventList events={events} />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default EventsPage;
