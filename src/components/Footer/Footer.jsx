import { Box, Container, Grid, Typography, Link, Divider } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f9fa",
        py: 4,
        mt: 6,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lockshot is dedicated to helping shooting enthusiasts refine
              their skills with innovative tools, assessments, and feedback.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block" mb={1}>
              Home
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" mb={1}>
              Features
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" mb={1}>
              Events
            </Link>
            <Link href="#" color="inherit" underline="none" display="block" mb={1}>
              Contact Us
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="none"
              display="block"
              mb={1}
            >
              Facebook
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              display="block"
              mb={1}
            >
              Instagram
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              display="block"
              mb={1}
            >
              Twitter
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="none"
              display="block"
              mb={1}
            >
              LinkedIn
            </Link>
          </Grid>
        </Grid>

        {/* Разделительная линия */}
        <Divider sx={{ my: 4 }} />

        {/* Нижняя строка с копирайтом */}
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Lockshot. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
