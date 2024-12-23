import { Container, Typography, Box, Paper } from "@mui/material";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

const VideoPage = () => {
  const videoData = {
    title: "Советы по стрельбе с пистолетом",
    date: "23 декабря 2024",
    author: "Автор: Анна Петрова",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", 
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: 4 }}>
      <AuthHeader />
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 ,  marginTop: 5}}>
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
