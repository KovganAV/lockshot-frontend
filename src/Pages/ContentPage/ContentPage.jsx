import { useState, useEffect } from "react";;
import { Box, Container, Typography, Paper, TextField, ThemeProvider, createTheme, Modal, Button, Link, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import { motion } from "framer-motion";

const ContentPage = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all"); 
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const [mode] = useState(localStorage.getItem('themeMode') || 'light');
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
    borderRadius: 2
  };

  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      },
    },
  };

  const itemVariants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2
      }
    },
    hidden: { 
      opacity: 0, 
      y: 50
    },
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [articlesRes, videosRes] = await Promise.all([
          axios.get("http://localhost:5000/api/content/articles"),
          axios.get("http://localhost:5000/api/content/videos"),
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
    searchFilter === "videos" ? false : article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredVideos = videos.filter((video) =>
    searchFilter === "articles" ? false : video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArticleClick = (article) => setSelectedArticle(article);
  const handleVideoClick = (video) => setSelectedVideo(video);
  const handleCloseModal = () => {
    setSelectedArticle(null);
    setSelectedVideo(null);
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setSearchFilter(newFilter);
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="background.default">
          <Typography>Loading...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container maxWidth="lg" sx={{ py: 4, px: { xs: 3, sm: 4, md: 6 } }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                placeholder="Search articles and videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <ToggleButtonGroup
                value={searchFilter}
                exclusive
                onChange={handleFilterChange}
                aria-label="search filter"
              >
                <ToggleButton value="all" aria-label="all content">
                  All
                </ToggleButton>
                <ToggleButton value="articles" aria-label="articles only">
                  Articles
                </ToggleButton>
                <ToggleButton value="videos" aria-label="videos only">
                  Videos
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {(searchFilter === "all" || searchFilter === "articles") && (
            <>
              <Typography variant="h4" sx={{ mb: 3 }}>Articles</Typography>
              <Box sx={{ mb: 6 }}>
                <motion.div
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '32px'
                  }}
                >
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <motion.div key={article.id} variants={itemVariants}>
                        <Paper
                          onClick={() => handleArticleClick(article)}
                          sx={{
                            p: 3,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              bgcolor: 'action.hover',
                              transform: 'translateY(-4px)',
                              boxShadow: 6
                            },
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                            {article.title}
                          </Typography>
                          <Typography color="text.secondary" sx={{ flex: 1 }}>
                            {article.description}
                          </Typography>
                        </Paper>
                      </motion.div>
                    ))
                  ) : (
                    <Typography color="text.secondary">No articles found.</Typography>
                  )}
                </motion.div>
              </Box>
            </>
          )}

          {(searchFilter === "all" || searchFilter === "videos") && (
            <>
              <Typography variant="h4" sx={{ mb: 3 }}>Videos</Typography>
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '32px'
                }}
              >
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <motion.div key={video.id} variants={itemVariants}>
                      <Paper
                        onClick={() => handleVideoClick(video)}
                        sx={{
                          p: 3,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': { 
                            bgcolor: 'action.hover',
                            transform: 'translateY(-4px)',
                            boxShadow: 6
                          },
                          bgcolor: 'background.paper',
                          borderRadius: 2
                        }}
                      >
                        <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 600 }}>
                          {video.title}
                        </Typography>
                        <Box sx={{ position: 'relative', paddingTop: '56.25%', borderRadius: 1, overflow: 'hidden' }}>
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
                    </motion.div>
                  ))
                ) : (
                  <Typography color="text.secondary">No videos found.</Typography>
                )}
              </motion.div>
            </>
          )}

          <Modal
            open={!!selectedArticle}
            onClose={handleCloseModal}
          >
            <Box sx={modalStyle}>
              {selectedArticle && (
                <>
                  <Typography variant="h4" gutterBottom>
                    {selectedArticle.title}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>
                    {selectedArticle.content}
                  </Typography>
                  <Button 
                    variant="contained" 
                    onClick={handleCloseModal}
                    sx={{ borderRadius: 2 }}
                  >
                    Close
                  </Button>
                </>
              )}
            </Box>
          </Modal>

          <Modal
            open={!!selectedVideo}
            onClose={handleCloseModal}
          >
            <Box sx={modalStyle}>
              {selectedVideo && (
                <>
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', mb: 3, borderRadius: 1, overflow: 'hidden' }}>
                    <iframe
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                      src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                      title={selectedVideo.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedVideo.title}
                  </Typography>
                  <Link 
                    href={selectedVideo.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ 
                      display: 'block', 
                      mb: 3,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Watch on YouTube
                  </Link>
                  <Button 
                    variant="contained" 
                    onClick={handleCloseModal}
                    sx={{ borderRadius: 2 }}
                  >
                    Close
                  </Button>
                </>
              )}
            </Box>
          </Modal>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContentPage;
