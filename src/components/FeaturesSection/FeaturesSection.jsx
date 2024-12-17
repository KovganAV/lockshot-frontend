import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import FireIcon from '@mui/icons-material/Whatshot';
import GroupIcon from '@mui/icons-material/Groups';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import BriefcaseIcon from '@mui/icons-material/Work';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LandscapeIcon from '@mui/icons-material/Landscape';

const features = [
  {
    icon: <FireIcon fontSize="large" />,
    title: 'Mark Achievements',
    description:
      'Track every shot on your journey to perfection. Lockshot lets you log and review your hits, helping you analyze your performance and see your progress over time.',
  },
  {
    icon: <GroupIcon fontSize="large" />,
    title: 'Community Connect',
    description:
      'Engage with fellow shooting enthusiasts. Share insights, strategies, and tips with members of the shooting community and learn from seasoned professionals.',
  },
  {
    icon: <VideoLibraryIcon fontSize="large" />,
    title: 'Video Tutorials',
    description:
      'Access a library of training videos from shooting sports masters. Perfect your technique with step-by-step guides and expert advice, available anywhere, anytime.',
  },
  {
    icon: <BriefcaseIcon fontSize="large" />,
    title: 'Item 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
  {
    icon: <VisibilityIcon fontSize="large" />,
    title: 'Item 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
  {
    icon: <LandscapeIcon fontSize="large" />,
    title: 'Item 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Discover Key Features
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Lockshot offers a comprehensive suite of tools to enhance your shooting training experience.
          Explore features that transform your practice sessions into competitive sports training.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
