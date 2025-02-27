import { Box, Container } from "@mui/material";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import StatsAndTestimonials from "../../components/StatsAndTestimonials/StatsAndTestimonials";
import AmazingFeature from "../../components/AmazingFeature/AmazingFeature";
import ExploreFeatures from "../../components/ExploreFeatures/ExploreFeatures";
import Footer from "../../components/Footer/Footer";

const IntroPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
      }}
    >
      <Header />
      <HeroSection />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <FeaturesSection />
        <StatsAndTestimonials />
        <AmazingFeature />
        <ExploreFeatures />
      </Container>
      <Footer />
    </Box>
  );
};

export default IntroPage;
