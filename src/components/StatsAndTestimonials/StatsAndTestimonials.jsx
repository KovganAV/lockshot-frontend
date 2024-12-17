
import { Box, Typography, Grid, Paper } from "@mui/material";

const StatsAndTestimonials = () => {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      {/* Заголовок и описание */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Striking Stats and Achievements
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Lockshot is proven track record: thousands of enthusiasts enhancing their
        skills, numerous community interactions, and countless hours of tutorial
        videos watched, showcasing our impact in the shooting sports community.
      </Typography>

      {/* Блок статистики */}
      <Grid container spacing={2} justifyContent="center" mb={6}>
        {[
          { value: "5,000%", label: "Happy Users" },
          { value: "3,500", label: "Shared Posts" },
          { value: "10,000", label: "Videos Played" },
          { value: "5/5", label: "Rating" },
        ].map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Заголовок и описание для отзывов */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Voices from Our Community
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Hear what avid shooters say about Lockshot. Their testimonials highlight
        the transformative impact of our platform on their training and
        engagement in the shooting sports community.
      </Typography>

      {/* Блок отзывов */}
      <Grid container spacing={4} justifyContent="center">
        {[
          {
            title: "Transformative Training Tool",
            content:
              "Lockshot has revolutionized my shooting practice. The detailed analytics and community features have enabled me to engage more deeply with the sport and improve my skills significantly.",
            author: "Evan Smith - Shooter",
          },
          {
            title: "A Community Hub",
            content:
              "Lockshot connects me with like-minded enthusiasts. The ability to share experiences and gain insights from experts has been invaluable for my growth in shooting sports.",
            author: "Taylor - Enthusiast",
          },
          {
            title: "Comprehensive Video Tutorials",
            content:
              "The video tutorials on Lockshot are exceptional. They provide expert guidance and tips that have helped me refine my shooting techniques and achieve better consistency.",
            author: "Riley - Trainer",
          },
        ].map((testimonial, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "left" }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {testimonial.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {testimonial.content}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="text.primary"
                fontWeight="bold"
              >
                {testimonial.author}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsAndTestimonials;
