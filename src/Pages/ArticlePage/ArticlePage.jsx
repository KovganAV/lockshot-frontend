import { Container, Typography, Box, Paper } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

const ArticlePage = () => {
  const articleData = {
    title: "Как улучшить свои навыки стрельбы?",
    content: `
      Стрельба — это не только физическое мастерство, но и ментальная дисциплина.
      Чтобы стать лучше, важно регулярно тренироваться, анализировать свои ошибки 
      и использовать современные методы улучшения. 
      
      Вот несколько советов:
      1. Регулярно занимайтесь упражнениями для улучшения устойчивости.
      2. Практикуйтесь с различными видами оружия.
      3. Анализируйте свои результаты после каждой тренировки.
      4. Используйте современные технологии для мониторинга прогресса.
    `,
    date: "23 декабря 2024",
    author: "Автор: Иван Иванов",
    image: "https://source.unsplash.com/800x400/?shooting",
  };

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
