import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import "chart.js/auto";

const StatisticsPage = () => {
  const [accuracyData, setAccuracyData] = useState([]);
  const [shotsData, setShotsData] = useState([]);
  const [series5Data, setSeries5Data] = useState([]);
  const [series10Data, setSeries10Data] = useState([]);

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

  return (
    <>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box display="grid" gridTemplateColumns="1fr" gap={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Точность</Typography>
            <Line data={generateChartData(accuracyData, "Точность")} options={chartOptions} />
          </Paper>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Количество выстрелов</Typography>
            <Line data={generateChartData(shotsData, "Количество выстрелов")} options={chartOptions} />
          </Paper>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Серии по 5 выстрелов</Typography>
            <Line data={generateChartData(series5Data, "Серии по 5")} options={chartOptions} />
          </Paper>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Серии по 10 выстрелов</Typography>
            <Line data={generateChartData(series10Data, "Серии по 10")} options={chartOptions} />
          </Paper>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h6" fontWeight="bold">Лучшая серия</Typography>
          <Typography>
            Серия из 5: <b>41</b> | Серия из 10: <b>76</b>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default StatisticsPage;


/*
import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import "chart.js/auto";

const StatisticsPage = () => {
  const [accuracyData, setAccuracyData] = useState([]);
  const [shotsData, setShotsData] = useState([]);
  const [series5Data, setSeries5Data] = useState([]);
  const [series10Data, setSeries10Data] = useState([]);
  const [bestSeries, setBestSeries] = useState({ series5: 0, series10: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки данных с бэкенда
  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/statistics"); // Заменить на актуальный URL
      const { accuracy, shots, series5, series10, bestSeries } = response.data;

      // Устанавливаем данные в состояние
      setAccuracyData(accuracy);
      setShotsData(shots);
      setSeries5Data(series5);
      setSeries10Data(series10);
      setBestSeries(bestSeries);
    } catch (err) {
      console.error("Ошибка при загрузке данных статистики:", err);
      setError("Не удалось загрузить статистику. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  // Опции для графиков
  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
  };

  // Генерация данных для графиков
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

  return (
    <>
      <AuthHeader />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Статистика пользователя
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Box display="grid" gridTemplateColumns="1fr" gap={3}>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Точность</Typography>
                <Line data={generateChartData(accuracyData, "Точность")} options={chartOptions} />
              </Paper>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Количество выстрелов</Typography>
                <Line data={generateChartData(shotsData, "Количество выстрелов")} options={chartOptions} />
              </Paper>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Серии по 5 выстрелов</Typography>
                <Line data={generateChartData(series5Data, "Серии по 5")} options={chartOptions} />
              </Paper>
              <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h6" gutterBottom>Серии по 10 выстрелов</Typography>
                <Line data={generateChartData(series10Data, "Серии по 10")} options={chartOptions} />
              </Paper>
            </Box>
            <Box marginTop={4}>
              <Typography variant="h6" fontWeight="bold">Лучшая серия</Typography>
              <Typography>
                Серия из 5: <b>{bestSeries.series5 || "N/A"}</b> | Серия из 10: <b>{bestSeries.series10 || "N/A"}</b>
              </Typography>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default StatisticsPage;

*/