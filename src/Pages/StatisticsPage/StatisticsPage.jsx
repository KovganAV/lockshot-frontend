import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, Button, TextField, Modal } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "chart.js/auto";

const StatisticsPage = () => {
  const [accuracyData, setAccuracyData] = useState([]);
  const [shotsData, setShotsData] = useState([]);
  const [series5Data, setSeries5Data] = useState([]);
  const [series10Data, setSeries10Data] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  const [newShot, setNewShot] = useState({ date: "", value: "" })

  useEffect(() => {
    setAccuracyData([
      { date: "2024-12-01", value: 75 },
      { date: "2024-12-02", value: 78 },
      { date: "2024-12-03", value: 80 },
      { date: "2024-12-04", value: 82 },
      { date: "2024-12-05", value: 84 },
      { date: "2024-12-06", value: 85 },
      { date: "2024-12-07", value: 87 },
      { date: "2024-12-08", value: 88 },
      { date: "2024-12-09", value: 89 },
      { date: "2024-12-10", value: 90 },
      { date: "2024-12-11", value: 91 },
      { date: "2024-12-12", value: 93 },
    ]);
    setShotsData([
      { date: "2024-12-01", value: 120 },
      { date: "2024-12-02", value: 130 },
      { date: "2024-12-03", value: 140 },
      { date: "2024-12-04", value: 145 },
      { date: "2024-12-05", value: 150 },
      { date: "2024-12-06", value: 155 },
      { date: "2024-12-07", value: 160 },
      { date: "2024-12-08", value: 170 },
      { date: "2024-12-09", value: 180 },
      { date: "2024-12-10", value: 190 },
      { date: "2024-12-11", value: 200 },
      { date: "2024-12-12", value: 210 },
    ]);
    setSeries5Data([
      { date: "2024-12-01", value: 20 },
      { date: "2024-12-02", value: 25 },
      { date: "2024-12-03", value: 28 },
      { date: "2024-12-04", value: 30 },
      { date: "2024-12-05", value: 32 },
      { date: "2024-12-06", value: 34 },
      { date: "2024-12-07", value: 36 },
      { date: "2024-12-08", value: 38 },
      { date: "2024-12-09", value: 39 },
      { date: "2024-12-10", value: 40 },
      { date: "2024-12-11", value: 42 },
      { date: "2024-12-12", value: 45 },
    ]);
    setSeries10Data([
      { date: "2024-12-01", value: 50 },
      { date: "2024-12-02", value: 55 },
      { date: "2024-12-03", value: 58 },
      { date: "2024-12-04", value: 60 },
      { date: "2024-12-05", value: 62 },
      { date: "2024-12-06", value: 65 },
      { date: "2024-12-07", value: 67 },
      { date: "2024-12-08", value: 70 },
      { date: "2024-12-09", value: 72 },
      { date: "2024-12-10", value: 75 },
      { date: "2024-12-11", value: 78 },
      { date: "2024-12-12", value: 80 },
    ]);
  }, []);

  
  const handleAddShot = () => {
    if (newShot.date && newShot.value) {
      const updatedData = [
        ...accuracyData,
        { date: newShot.date, value: parseInt(newShot.value, 10) },
      ];
      setAccuracyData(updatedData);
      setNewShot({ date: "", value: "" });
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

  return (
    <>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Box
          sx={{
            padding: 4,
            borderRadius: 3,
            boxShadow: 4,
            backgroundColor: "f9f9f9",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            textAlign: "center",
            marginBottom: 4,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold"}}>
            Управление выстрелами и сериями
          </Typography>
          <Typography variant="body1" sx={{ color: "#757575", maxWidth: 600 }}>
            Добавьте одиночные выстрелы или запишите прогресс серий по 5 или 10 выстрелов. Это поможет отслеживать вашу точность и достижения.
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
              placeholder="Например, 85"
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
              onClick={() => alert("Серия из 5 добавлена!")}
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
              <span style={{ fontSize: "1.2em", marginRight: "8px" }}>🏅</span>
              Серия из 5
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => alert("Серия из 10 добавлена!")}
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
              <span style={{ fontSize: "1.2em", marginRight: "8px" }}>🎯</span>
              Серия из 10
            </Button>
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3}>
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
      </Container>
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
    </>
  );
};

export default StatisticsPage;

