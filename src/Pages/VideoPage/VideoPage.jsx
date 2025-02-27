import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";

const VideoPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/videos/1"); // Замените "/api/videos/1" на актуальный URL
        setVideoData(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке видео:", err);
        setError("Не удалось загрузить данные видео. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="md">
        <AuthHeader />
        <Typography textAlign="center" sx={{ marginTop: 4 }}>
          Загрузка видео...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <AuthHeader />
        <Typography textAlign="center" sx={{ marginTop: 4 }} color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginBottom: 4 }}>
      <AuthHeader />
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, marginTop: 5 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {videoData.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {videoData.date} • {videoData.author}
        </Typography>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            paddingTop: "56.25%",
            borderRadius: 2,
          }}
        >
          <iframe
            src={videoData.videoUrl}
            title={videoData.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          ></iframe>
        </Box>
      </Paper>
    </Container>
  );
};

export default VideoPage;
