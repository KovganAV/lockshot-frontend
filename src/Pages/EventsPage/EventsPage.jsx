import { useState, useEffect } from "react";
import { Container, CircularProgress, Alert, Box, ThemeProvider, createTheme, Fab, Modal, TextField, Button, Typography, Grow, Zoom, Card, CardContent, Grid } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
    date: ''
  });
  
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Event");
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    setNewEvent({ title: '', description: '', location: '', date: '' });
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const handleEventDetailsClose = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/Event", newEvent);
      const response = await axios.get("http://localhost:5000/api/Event");
      const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
      handleModalClose();
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again later.");
    }
  };

  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container sx={{ marginTop: 4 }}>
          <TextField
            fullWidth
            label="Search events"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            sx={{ mb: 3 }}
          />
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Grid container spacing={3}>
              {filteredEvents.map((event, index) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Grow in={true} timeout={500 + index * 200}>
                    <Card 
                      onClick={() => handleEventClick(event)}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 8,
                        }
                      }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom color="primary">
                          {truncateTitle(event.title)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          📍 {event.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          🗓️ {new Date(event.date).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
              {filteredEvents.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" textAlign="center" color="text.secondary">
                    No events found 😢
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Container>
        <Zoom in={showScrollTop}>
          <Fab 
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 76,
              right: 16
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Zoom>
        <Zoom in={true}>
          <Fab 
            color="primary"
            size="small"
            onClick={handleModalOpen}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Zoom in={openModal}>
            <Box sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400
            }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Create New Event ✨
              </Typography>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newEvent.description}
                onChange={handleInputChange}
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Date and Time"
                name="date"
                type="datetime-local"
                value={newEvent.date}
                onChange={handleInputChange}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={handleModalClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Create 🎉</Button>
              </Box>
            </Box>
          </Zoom>
        </Modal>

        <Modal
          open={showEventDetails}
          onClose={handleEventDetailsClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Zoom in={showEventDetails}>
            <Box sx={{
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              {selectedEvent && (
                <>
                  <Typography variant="h5" component="h2" gutterBottom color="primary">
                    {selectedEvent.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {selectedEvent.description}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    📍 Место: {selectedEvent.location}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    🗓️ Дата: {new Date(selectedEvent.date).toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleEventDetailsClose}>Закрыть</Button>
                  </Box>
                </>
              )}
            </Box>
          </Zoom>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default EventsPage;
