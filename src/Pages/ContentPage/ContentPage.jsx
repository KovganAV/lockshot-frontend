import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, Paper, TextField, ThemeProvider, createTheme } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";

const ContentPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [articlesRes, videosRes] = await Promise.all([
          axios.get("http://localhost:5000/api/articles"),
          axios.get("http://localhost:5000/api/videos"),
        ]);
        setArticles(articlesRes.data);
        setVideos(videosRes.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArticleClick = (id) => navigate(`/articles/${id}`);
  const handleVideoClick = (id) => navigate(`/videos/${id}`);

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
          <Typography>Загрузка...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container maxWidth="lg" sx={{ py: 3, px: { xs: 3, sm: 4, md: 6 } }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Поиск статей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ bgcolor: 'background.paper' }}
            />
          </Box>

          <Box sx={{ mb: 5 }}>
            <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Paper
                    key={article.id}
                    onClick={() => handleArticleClick(article.id)}
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                      bgcolor: 'background.paper'
                    }}
                  >
                    <Typography variant="h6" color="primary" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {article.description}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography color="text.secondary">Ничего не найдено.</Typography>
              )}
            </Box>
          </Box>

          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={3}>
            {videos.map((video) => (
              <Paper
                key={video.id}
                onClick={() => handleVideoClick(video.id)}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'action.hover' },
                  bgcolor: 'background.paper'
                }}
              >
                <Typography variant="h6" gutterBottom color="text.primary">
                  {video.title}
                </Typography>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </Box>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContentPage;
