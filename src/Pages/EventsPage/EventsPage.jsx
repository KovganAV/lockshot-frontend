import { useState, useEffect } from "react";
import { Container, Typography, CircularProgress, Alert } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import EventList from "../../components/EventCard/EventCard";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке событий:", err);
        setError("Не удалось загрузить события. Попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <AuthHeader />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          События
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <EventList events={events} />
        )}
      </Container>
    </>
  );
};

export default EventsPage;
