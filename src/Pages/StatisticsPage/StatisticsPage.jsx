import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, Button, TextField, Modal } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import "chart.js/auto";

const StatisticsPage = () => {
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
            console.log("Токен в localStorage:", localStorage.getItem("authToken"));
            const token = localStorage.getItem("authToken");
            if (!token) {
                throw new Error("Отсутствует токен авторизации");
            }

            const response = await axios.get("/api/allHits", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Данные с сервера:", response.data);
            const data = Array.isArray(response.data) ? response.data : Object.values(response.data);
            const shots = data
                .filter(item => item && item.timestamp && item.score !== undefined)
                .map(item => ({
                    date: new Date(item.timestamp).toLocaleDateString(),
                    value: item.score,
                }));

            setShotsData(shots);
        } catch (err) {
            console.error("Ошибка при загрузке данных выстрелов:", err);
            setError("Не удалось загрузить данные выстрелов. Попробуйте позже.");
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
        console.error("Ошибка при добавлении выстрела:", err);
        alert("Не удалось добавить выстрел. Попробуйте позже.");
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
      alert(`Серия ${seriesType === "series5" ? "из 5" : "из 10"} добавлена!`);
    } catch (err) {
      console.error(`Ошибка при добавлении ${seriesType}:`, err);
      alert("Не удалось добавить серию. Попробуйте позже.");
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
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63, 81, 181, 0.3)",
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
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Загрузка данных...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Управление выстрелами и сериями
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
              label="Дата"
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
              label="Точность (%)"
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
                backgroundColor: "#050505",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": { backgroundColor: "#3b3b3b" },
                boxShadow: "2px 4px 6px rgba(63, 81, 181, 0.4)",
                textTransform: "none",
              }}
            >
              Добавить выстрел
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
                borderColor: "#4caf50",
                color: "#4caf50",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#e8f5e9",
                  borderColor: "#4caf50",
                },
                textTransform: "none",
              }}
            >
              Серия из 5
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleAddSeries("series10")}
              sx={{
                minWidth: "180px",
                borderColor: "#ff9800",
                color: "#ff9800",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#fff3e0",
                  borderColor: "#ff9800",
                },
                textTransform: "none",
              }}
            >
              Серия из 10
            </Button>
            <Button
              variant="contained"
              size="large"
              onClick={() => window.location.reload()}
              sx={{
                backgroundColor: "#1976d2",
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 20px",
                "&:hover": { backgroundColor: "#1565c0" },
                textTransform: "none",
              }}
            >
              Обновить данные
            </Button>
          </Box>
        </Box>
  
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
          {[{ title: "Точность", data: accuracyData },
            { title: "Количество выстрелов", data: shotsData },
            { title: "Серии по 5 выстрелов", data: series5Data },
            { title: "Серии по 10 выстрелов", data: series10Data }].map((chart, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{ padding: 3, cursor: "pointer" }}
              onClick={() => handleChartClick(generateChartData(chart.data, chart.title))}
            >
              <Typography variant="h6" gutterBottom>
                {chart.title}
              </Typography>
              <Line data={generateChartData(chart.data, chart.title)} options={chartOptions} />
            </Paper>
          ))}
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
    </>
  );
  
};

export default StatisticsPage;