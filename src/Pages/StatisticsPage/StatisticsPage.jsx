import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, Button, TextField, Modal, ThemeProvider, createTheme } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import "chart.js/auto";

const StatisticsPage = () => {
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const [accuracyData, setAccuracyData] = useState([]);
  const [shotsData, setShotsData] = useState([]);
  const [series5Data, setSeries5Data] = useState([]);
  const [series10Data, setSeries10Data] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [newShot, setNewShot] = useState({ date: "", value: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            console.log("Token in localStorage:", localStorage.getItem("authToken"));
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Missing auth token");
            }

            const response = await axios.get("/api/hits", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Server data:", response.data);
            const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
            const shots = data
                .filter(item => item && item.timestamp && item.score !== undefined)
                .map(item => ({
                    date: new Date(item.timestamp).toLocaleDateString(),
                    value: item.score,
                }));

            setShotsData(shots);
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
    if (newShot.date && newShot.value) {
      try {
        const response = await axios.post("/api/Hits", {
          date: newShot.date,
          value: parseInt(newShot.value, 10),
        });
        setAccuracyData((prev) => [...prev, response.data]); 
        setNewShot({ date: "", value: "" });
      } catch (err) {
        console.error("Error adding shot:", err);
        alert("Failed to add shot. Please try again later.");
      }
    }
  };

  const handleAddSeries = async (seriesType) => {
    try {
      const response = await axios.post(`/api/statistics/${seriesType}`);
      if (seriesType === "series5") {
        setSeries5Data((prev) => [...prev, ...response.data]);
      } else if (seriesType === "series10") {
        setSeries10Data((prev) => [...prev, ...response.data]);
      }
      alert(`${seriesType === "series5" ? "5-shot" : "10-shot"} series added!`);
    } catch (err) {
      console.error(`Error adding ${seriesType}:`, err);
      alert("Failed to add series. Please try again later.");
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
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
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Box
            sx={{
              padding: 4,
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
            <Typography variant="h5" sx={{ fontWeight: "bold", color: 'text.primary' }}>
              Shots and Series Management
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
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
                sx={{
                  minWidth: "200px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              />
              <TextField
                label="Accuracy (%)"
                type="number"
                value={newShot.value}
                onChange={(e) => setNewShot({ ...newShot, value: e.target.value })}
                sx={{
                  minWidth: "200px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleAddShot}
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
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 3,
              }}
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleAddSeries("series5")}
                sx={{
                  minWidth: "180px",
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    borderColor: "primary.main",
                  },
                  textTransform: "none",
                }}
              >
                5-Shot Series
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => handleAddSeries("series10")}
                sx={{
                  minWidth: "180px",
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "primary.light",
                    borderColor: "primary.main",
                  },
                  textTransform: "none",
                }}
              >
                10-Shot Series
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={() => window.location.reload()}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  "&:hover": { backgroundColor: "primary.dark" },
                  textTransform: "none",
                }}
              >
                Refresh Data
              </Button>
            </Box>
          </Box>
    
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
            {[{ title: "Accuracy", data: accuracyData },
              { title: "Number of Shots", data: shotsData },
              { title: "5-Shot Series", data: series5Data },
              { title: "10-Shot Series", data: series10Data }].map((chart, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{ 
                  padding: 3, 
                  cursor: "pointer",
                  backgroundColor: "background.paper"
                }}
                onClick={() => handleChartClick(generateChartData(chart.data, chart.title))}
              >
                <Typography variant="h6" gutterBottom color="text.primary">
                  {chart.title}
                </Typography>
                <Line data={generateChartData(chart.data, chart.title)} options={chartOptions} />
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              padding: 4,
              marginTop: 4,
              borderRadius: 3,
              boxShadow: 4,
              backgroundColor: "background.paper",
              textAlign: "center"
            }}
          >
            <Typography variant="h6" sx={{ color: 'text.primary', marginBottom: 2 }}>
              AI Tip
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Based on your data, AI will suggest personalized recommendations to improve your shooting results.
            </Typography>
          </Box>
    
          <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
              }}
            >
              {selectedChart && <Line data={selectedChart} options={chartOptions} />}
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default StatisticsPage;
