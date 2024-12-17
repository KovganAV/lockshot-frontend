import { Box, Container } from "@mui/material";
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
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
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", 
        textAlign: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Container maxWidth="md">

        <Box
          component="img"
          src="your-image.png"
          alt="Target Image"
          sx={{
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
            display: "block",
          }}
        />
      </Container>
      <Header/>
      <HeroSection />
      <FeaturesSection />
      <StatsAndTestimonials/>
      <AmazingFeature/>
      <ExploreFeatures/>
      <Footer />
    </Box>
  );
};

export default IntroPage;
