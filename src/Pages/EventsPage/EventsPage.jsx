import { useState, useEffect } from "react";
import { Container, CircularProgress, Alert, Box, ThemeProvider, createTheme, Fab, Modal, TextField, Button, Typography, Grow, Zoom, Card, CardContent, Grid } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star'; 
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
  const [favorites, setFavorites] = useState({}); 
  const [page, setPage] = useState(1); 
  const [eventsPerPage] = useState(10); 

  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Event?page=${page}&limit=${eventsPerPage}`);
        const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
        
        const markedEvents = sortedEvents.map(event => ({
          ...event,
          isFavorite: savedFavorites[event.id] || false 
        }));

        const favoriteEvents = markedEvents.filter(event => event.isFavorite);
        const otherEvents = markedEvents.filter(event => !event.isFavorite);
        setEvents([...favoriteEvents, ...otherEvents]);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

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
      setPage(1); 
      handleModalClose();
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again later.");
    }
  };

  const toggleFavorite = (event) => {
    const isFavorite = favorites[event.id];
    const updatedFavorites = {
      ...favorites,
      [event.id]: !isFavorite 
    };
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Обновляем состояние событий, чтобы отразить изменения в избранном
    setEvents(prevEvents => 
      prevEvents.map(evt => 
        evt.id === event.id ? { ...evt, isFavorite: !isFavorite } : evt
      )
    );
  };

  const truncateTitle = (title) => {
    const words = title.split(' ');
    if (words.length > 5) {
      return words.slice(0, 5).join(' ') + '...';
    }
    return title;
  };

  const filteredEvents = events.filter(event => {
    const searchLower = searchQuery.toLowerCase();
    const titleMatch = event.title.toLowerCase().includes(searchLower);
    const locationMatch = event.location.toLowerCase().includes(searchLower);
    const eventDate = new Date(event.date);
    const dateStr = eventDate.toLocaleDateString();
    const dateMatch = dateStr.includes(searchLower);
    
    return titleMatch || locationMatch || dateMatch;
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container sx={{ marginTop: 1 }}>
          <TextField
            fullWidth
            label="Search by title, location or date"
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" gutterBottom color="primary">
                            {truncateTitle(event.title)}
                          </Typography>
                          <Button onClick={(e) => { e.stopPropagation(); toggleFavorite(event); }} sx={{ color: event.isFavorite ? 'blue' : 'gray' }}>
                            <StarIcon sx={{ color: event.isFavorite ? 'blue' : 'gray', transition: 'color 0.3s' }} />
                          </Button>
                        </Box>
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
                    📍 Location: {selectedEvent.location}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    🗓️ Date: {new Date(selectedEvent.date).toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleEventDetailsClose}>Close</Button>
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
