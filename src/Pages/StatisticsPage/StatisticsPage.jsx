import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, Button, TextField, Modal, ThemeProvider, createTheme, Fab, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, CircularProgress, useMediaQuery, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import "chart.js/auto";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';

const StatisticsPage = () => {
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [accuracyData, setAccuracyData] = useState([]);
  const [totalShotsData, setTotalShotsData] = useState([]);
  const [distanceData, setDistanceData] = useState([]);
  const [metricsData, setMetricsData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [newShot, setNewShot] = useState({ 
    date: "", 
    weaponType: "",
    score: "",
    distance: "",
    metrics: "meters"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false); 
  const [allShots, setAllShots] = useState([]); 

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

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Missing auth token");
            }

            const response = await axios.get('https://localhost:7044/api/Hits/allHits', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = Array.isArray(response.data) ? response.data : [];
            
            const accuracyProcessed = data.map(item => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                value: item.score
            }));
            setAccuracyData(accuracyProcessed);

            const totalShotsProcessed = data.map(item => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                value: 1 
            }));
            const totalShotsGrouped = totalShotsProcessed.reduce((acc, item) => {
                acc[item.date] = (acc[item.date] || 0) + item.value;
                return acc;
            }, {});
            setTotalShotsData(Object.entries(totalShotsGrouped).map(([date, value]) => ({ date, value })));

            const distanceProcessed = data.map(item => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                value: item.distance
            }));
            setDistanceData(distanceProcessed);

            const metricsProcessed = data.map(item => ({
                date: new Date(item.timestamp).toLocaleDateString(),
                value: Math.round(item.metrics * 100)
            }));
            setMetricsData(metricsProcessed);
            setAllShots(data);

        } catch (err) {
            console.error("Error loading shots data:", err);
            setError("Failed to load shots data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
  }, []);

  const handleAddShot = async () => {
    if (newShot.date && newShot.score && newShot.weaponType && newShot.distance) {
      try {
        const response = await axios.post("https://localhost:7044/api/Hits/Hits", {
          date: newShot.date,
          weaponType: newShot.weaponType,
          score: parseInt(newShot.score, 10),
          distance: parseInt(newShot.distance, 10),
          metrics: newShot.metrics
        });
        setAccuracyData((prev) => [...prev, response.data]); 
        setNewShot({ 
          date: "", 
          weaponType: "",
          score: "",
          distance: "",
          metrics: "meters"
        });
      } catch (err) {
        console.error("Error adding shot:", err);
        alert("Failed to add shot. Please try again later.");
      }
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: isMobile ? false : true,
    plugins: { 
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: isMobile ? 30 : 30,
          minRotation: isMobile ? 30 : 30,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    }
  };

  const generateChartData = (data, label) => ({
    labels: data.map((item) => item.date),
    datasets: [
      {
        label,
        data: data.map((item) => item.value),
        borderColor: mode === 'dark' ? "#90caf9" : "#3f51b5",
        backgroundColor: mode === 'dark' ? "rgba(144, 202, 249, 0.3)" : "rgba(63, 81, 181, 0.3)",
        tension: 0.3,
      },
    ],
  });

  const handleChartClick = (chartData) => {
    setSelectedChart(chartData);
    setModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = newMessage;
    setNewMessage('');
    setChatMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsAiTyping(true);

    try {
      const response = await axios.post('http://localhost:5028/generate', {
        message: userMessage
      });

      setChatMessages(prev => [...prev, { text: response.data, isUser: false }]);
    } catch (err) {
      console.error('Error sending message:', err);
      setChatMessages(prev => [...prev, { text: 'Sorry, I encountered an error. Please try again.', isUser: false }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleOpenHistory = () => {
    setHistoryDialogOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryDialogOpen(false);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
          <Typography>Loading data...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
          <Typography color="error">{error}</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container maxWidth="lg" sx={{ marginTop: 4, px: isMobile ? 1 : 2 }}>
          <Box
            sx={{
              padding: isMobile ? 2 : 4,
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              textAlign: "center",
              marginBottom: 4,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: 'text.primary', fontSize: isMobile ? '1.2rem' : '1.5rem' }}>
              Shooting Statistics
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextField
                label="Date"
                type="date"
                value={newShot.date}
                onChange={(e) => setNewShot({ ...newShot, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth={isMobile}
                sx={{
                  minWidth: isMobile ? "100%" : "200px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              />
              <FormControl fullWidth={isMobile} sx={{ minWidth: isMobile ? "100%" : "100px" }}>
                <InputLabel>Weapon Type</InputLabel>
                <Select
                  value={newShot.weaponType}
                  label="Weapon Type"
                  onChange={(e) => setNewShot({ ...newShot, weaponType: e.target.value })}
                >
                  <MenuItem value="Pistol">Pistol</MenuItem>
                  <MenuItem value="Rifle">Rifle</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Score"
                type="number"
                value={newShot.score}
                onChange={(e) => setNewShot({ ...newShot, score: e.target.value })}
                fullWidth={isMobile}
                sx={{
                  minWidth: isMobile ? "100%" : "200px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              />
              <Box sx={{ display: 'flex', gap: 1, width: isMobile ? "100%" : "auto" }}>
                <TextField
                  label="Distance"
                  type="number"
                  value={newShot.distance}
                  onChange={(e) => setNewShot({ ...newShot, distance: e.target.value })}
                  fullWidth={isMobile}
                  sx={{
                    minWidth: isMobile ? "70%" : "150px",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                    borderRadius: 2,
                  }}
                />
                <FormControl sx={{ minWidth: isMobile ? "30%" : "100px" }}>
                  <InputLabel>Units</InputLabel>
                  <Select
                    value={newShot.metrics}
                    label="Units"
                    onChange={(e) => setNewShot({ ...newShot, metrics: e.target.value })}
                  >
                    <MenuItem value="meters">m</MenuItem>
                    <MenuItem value="yards">yd</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddShot}
                fullWidth={isMobile}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": { backgroundColor: "primary.dark" },
                  boxShadow: "2px 4px 6px rgba(63, 81, 181, 0.4)",
                  textTransform: "none",
                }}
              >
                Add Shot
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleOpenHistory}
                fullWidth={isMobile}
                startIcon={<HistoryIcon />} 
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  textTransform: "none",
                }}
              >
                View History
              </Button>
            </Box>
          </Box>
    
          <Box display="grid" gridTemplateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"} gap={3}>
            {[
              { title: "Accuracy Over Time", data: accuracyData },
              { title: "Total Shots Over Time", data: totalShotsData },
              { title: "Distance Over Time", data: distanceData }, 
              { title: "Metrics Over Time (%)", data: metricsData }
            ].map((chart, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{ 
                  padding: isMobile ? 2 : 3, 
                  cursor: "pointer",
                  backgroundColor: "background.paper"
                }}
                onClick={() => handleChartClick(generateChartData(chart.data, chart.title))}
              >
                <Typography variant="h6" gutterBottom color="text.primary" fontSize={isMobile ? '1rem' : '1.25rem'}>
                  {chart.title}
                </Typography>
                <Line data={generateChartData(chart.data, chart.title)} options={chartOptions} height={isMobile ? 200 : 180} />
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              padding: isMobile ? 2 : 4,
              marginTop: 4,
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "background.paper",
              textAlign: "center"
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.primary', marginBottom: 2, fontSize: isMobile ? '1rem' : '1.25rem' }}>
              AI Assistant
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: isMobile ? '0.875rem' : '1rem' }}>
              Based on your data, AI will provide personalized recommendations to improve your shooting results.
            </Typography>
          </Box>
    
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: isMobile ? "95%" : "80%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: isMobile ? 2 : 4,
                maxHeight: '90vh',
                overflowY: 'auto'
              }}
            >
              {selectedChart && <Line data={selectedChart} options={chartOptions} />}
            </Box>
          </Modal>

          <Dialog 
            open={historyDialogOpen}
            onClose={handleCloseHistory}
            maxWidth="sm"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                margin: isMobile ? '16px' : '32px',
                width: isMobile ? 'calc(100% - 32px)' : undefined
              }
            }}
          >
            <DialogTitle sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>Shooting History</DialogTitle>
            <DialogContent>
              <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {allShots.map((shot, index) => (
                  <ListItem key={index}>
                    <Typography>{`Date: ${new Date(shot.timestamp).toLocaleDateString()}, Weapon: ${shot.weaponType}, Score: ${shot.score}, Distance: ${shot.distance} ${shot.metrics}`}</Typography>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseHistory}>Close</Button>
            </DialogActions>
          </Dialog>

          {showScrollTop && (
            <Fab
              color="primary"
              size="small"
              onClick={scrollToTop}
              sx={{
                position: 'fixed',
                bottom: isMobile ? 120 : 80,
                right: 16
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          )}

          <Fab
            color="primary"
            size="small"
            onClick={() => setAiDialogOpen(true)}
            sx={{
              position: 'fixed',
              bottom: isMobile ? 60 : 16,
              right: 16
            }}
          >
            <SmartToyIcon />
          </Fab>

          <Dialog 
            open={aiDialogOpen}
            onClose={() => setAiDialogOpen(false)}
            maxWidth="sm"
            fullWidth
            sx={{
              '& .MuiDialog-paper': {
                margin: isMobile ? '16px' : '32px',
                width: isMobile ? 'calc(100% - 32px)' : undefined
              }
            }}
          >
            <DialogTitle sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>AI Assistant</DialogTitle>
            <DialogContent>
              <List sx={{ height: isMobile ? '300px' : '400px', overflowY: 'auto' }}>
                {chatMessages.map((message, index) => (
                  <ListItem 
                    key={index}
                    sx={{
                      justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                      mb: 1
                    }}
                  >
                    <Paper
                      sx={{
                        p: isMobile ? 1.5 : 2,
                        maxWidth: isMobile ? '85%' : '70%',
                        bgcolor: message.isUser ? 'primary.main' : 'background.paper',
                        color: message.isUser ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 2
                      }}
                    >
                      <Typography
                        sx={{ 
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          fontSize: isMobile ? '0.875rem' : '1rem'
                        }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                  </ListItem>
                ))}
                {isAiTyping && (
                  <ListItem>
                    <CircularProgress size={isMobile ? 16 : 20} />
                  </ListItem>
                )}
              </List>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  size={isMobile ? "small" : "medium"}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  disabled={isAiTyping}
                  sx={{ minWidth: 'auto' }}
                  size={isMobile ? "small" : "medium"}
                >
                  <SendIcon />
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAiDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StatisticsPage;