import { useState, useEffect } from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

const ArticlePage = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticleData(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (!articleData) return <Typography>Article not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <AuthHeader />
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          {articleData.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {articleData.date} • {articleData.author}
        </Typography>
        {articleData.image && (
          <Box
            component="img"
            src={articleData.image}
            alt={articleData.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              marginBottom: 2,
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        )}
        <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap" }}>
          {articleData.content}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ArticlePage;
