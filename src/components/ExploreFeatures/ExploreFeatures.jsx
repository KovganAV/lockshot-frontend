import { Box, Typography, Grid, Paper } from "@mui/material";

const features = [
  {
    title: "Personalized Feedback",
    description:
      "Receive detailed insights and feedback on your shooting techniques. Tailored advice helps pinpoint areas for improvement, enhancing your progress.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Event Listings",
    description:
      "Stay updated with the latest shooting events and competitions. Our calendar ensures you never miss an opportunity to witness or participate in the action.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Skill Assessments",
    description:
      "Regular assessments help track your development. Lockshot's specialized approach ensures you are evaluated on key shooting metrics for optimal growth.",
    image: "https://via.placeholder.com/300x200",
  },
  {
    title: "Interactive Drills",
    description:
      "Engage in interactive drills that simulate real-life shooting scenarios. Practice under varied conditions to refine your accuracy and boost confidence.",
    image: "https://via.placeholder.com/300x200",
  },
];

const ExploreFeatures = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Explore Innovative Features
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Delve into Lockshot’s feature-rich platform designed to enhance your
          training experience with tools that make practice efficient and
          rewarding.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
              }}
            >
              <Box
                component="img"
                src={feature.image}
                alt={feature.title}
                sx={{ width: "100%", maxWidth: 250, mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExploreFeatures;
