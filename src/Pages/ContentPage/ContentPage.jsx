import { useState, useEffect } from "react";
import { Box, Container, Typography, Paper, TextField, ThemeProvider, createTheme, Modal, Button, Link, ToggleButton, ToggleButtonGroup, Fab } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ContentPage = () => {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [contentType, setContentType] = useState("article");
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    videoId: ''
  });
  
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
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 100
      }
    },
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.2
      }
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [articlesRes, videosRes] = await Promise.all([
          axios.get("http://localhost:5000/api/content/articles"),
          axios.get("http://localhost:5000/api/content/videos"),
        ]);
        setArticles([...articlesRes.data].sort((a, b) => b.id - a.id));
        setVideos([...videosRes.data].sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
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

  const handleModalOpen = () => {
    setOpenModal(true);
    setNewContent({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      videoId: ''
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setNewContent({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      videoId: ''
    });
  };

  const handleContentTypeChange = (event, newType) => {
    if (newType !== null) {
      setContentType(newType);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const extractVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async () => {
    try {
      if (contentType === "article") {
        await axios.post("http://localhost:5000/api/content/articles", {
          title: newContent.title,
          description: newContent.description,
          content: newContent.content
        });
        const response = await axios.get("http://localhost:5000/api/content/articles");
        setArticles([...response.data].sort((a, b) => b.id - a.id));
      } else {
        const videoId = extractVideoId(newContent.videoUrl);
        if (!videoId) {
          alert("Please enter a valid YouTube URL");
          return;
        }
        await axios.post("http://localhost:5000/api/content/videos", {
          title: newContent.title,
          videoUrl: newContent.videoUrl,
          videoId: videoId
        });
        const response = await axios.get("http://localhost:5000/api/content/videos");
        setVideos([...response.data].sort((a, b) => b.id - a.id));
      }
      handleModalClose();
    } catch (error) {
      console.error("Error creating content:", error);
      alert("Failed to create content. Please try again.");
    }
  };

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

  const getFirstFourWords = (text) => {
    return text.split(' ').slice(0, 4).join(' ') + '...';
  };

  const createInterleavedContent = () => {
    const result = [];
    const maxLength = Math.max(filteredArticles.length, filteredVideos.length);
    
    for (let i = 0; i < maxLength; i += 10) {
      const articleChunk = filteredArticles.slice(i, i + 10);
      if (articleChunk.length > 0) {
        result.push({
          type: 'articles',
          items: articleChunk
        });
      }

      const videoChunk = filteredVideos.slice(i, i + 10);
      if (videoChunk.length > 0) {
        result.push({
          type: 'videos',
          items: videoChunk
        });
      }
    }
    
    return result;
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

  const interleavedContent = createInterleavedContent();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AuthHeader />
        <Container maxWidth="lg" sx={{ py: 3, px: { xs: 3, sm: 4, md: 6 } }}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                placeholder={`Search ${searchFilter === 'articles' ? 'articles' : searchFilter === 'videos' ? 'videos' : 'articles and videos'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  bgcolor: 'background.paper',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 2
                    }
                  }
                }}
              />
              <ToggleButtonGroup
                value={searchFilter}
                exclusive
                onChange={handleFilterChange}
                aria-label="search filter"
                sx={{
                  '& .MuiToggleButton-root': {
                    transition: 'all 0.2s ease',
                    '&.Mui-selected': {
                      transform: 'scale(1.05)',
                      fontWeight: 'bold'
                    }
                  }
                }}
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

          {interleavedContent.map((section, index) => (
            <Box key={index} sx={{ mb: 6 }}>
              {section.type === 'articles' && (searchFilter === "all" || searchFilter === "articles") && (
                <>
                  <AnimatePresence>
                    <motion.div
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px'
                      }}
                    >
                      {section.items.map((article) => (
                        <motion.div 
                          key={article.id} 
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <Paper
                            onClick={() => handleArticleClick(article)}
                            sx={{
                              p: 3,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                bgcolor: 'action.hover',
                                transform: 'translateY(-4px) scale(1.02)',
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
                              {getFirstFourWords(article.description)}
                            </Typography>
                          </Paper>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}

              {section.type === 'videos' && (searchFilter === "all" || searchFilter === "videos") && (
                <>
                  <AnimatePresence>
                    <motion.div
                      variants={listVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px'
                      }}
                    >
                      {section.items.map((video) => (
                        <motion.div 
                          key={video.id} 
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          <Paper
                            onClick={() => handleVideoClick(video)}
                            sx={{
                              p: 3,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': { 
                                bgcolor: 'action.hover',
                                transform: 'translateY(-4px) scale(1.02)',
                                boxShadow: 6
                              },
                              bgcolor: 'background.paper',
                              borderRadius: 2
                            }}
                          >
                            <Typography 
                              variant="h6" 
                              gutterBottom 
                              color="text.primary" 
                              sx={{ 
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
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
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </Box>
          ))}

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
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedArticle.description}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3 }}>
                    {selectedArticle.content}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      onClick={handleCloseModal}
                      sx={{ borderRadius: 2 }}
                    >
                      Close
                    </Button>
                  </Box>
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
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      onClick={handleCloseModal}
                      sx={{ borderRadius: 2 }}
                    >
                      Close
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Modal>

          <Modal
            open={openModal}
            onClose={handleModalClose}
          >
            <Box sx={modalStyle}>
              <Typography variant="h5" gutterBottom>
                Add New Content
              </Typography>
              
              <ToggleButtonGroup
                value={contentType}
                exclusive
                onChange={handleContentTypeChange}
                sx={{ mb: 3, display: 'flex' }}
              >
                <ToggleButton value="article" sx={{ flex: 1 }}>
                  Article
                </ToggleButton>
                <ToggleButton value="video" sx={{ flex: 1 }}>
                  Video
                </ToggleButton>
              </ToggleButtonGroup>

              <TextField
                fullWidth
                label="Title"
                name="title"
                value={newContent.title}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />

              {contentType === "article" ? (
                <>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={newContent.description}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Content"
                    name="content"
                    value={newContent.content}
                    onChange={handleInputChange}
                    multiline
                    rows={6}
                    sx={{ mb: 3 }}
                  />
                </>
              ) : (
                <TextField
                  fullWidth
                  label="YouTube Video URL"
                  name="videoUrl"
                  value={newContent.videoUrl}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
                  helperText="Enter the full YouTube video URL"
                />
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button 
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ borderRadius: 2 }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Modal>

          <Fab
            color="primary"
            size="small"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 80,
              right: 16,
              opacity: showScrollTop ? 1 : 0,
              transition: 'opacity 0.3s',
              pointerEvents: showScrollTop ? 'auto' : 'none'
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>

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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ContentPage;
