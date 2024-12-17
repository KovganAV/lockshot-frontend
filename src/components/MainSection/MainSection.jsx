import { Box, Typography, Button } from '@mui/material';

const MainSection = () => (
  <Box
    sx={{
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f5f5f5',
    }}
  >
    <Typography variant="h2" gutterBottom>
      Welcome to Lockshot
    </Typography>
    <Typography variant="h6" color="textSecondary" gutterBottom>
      The best tool for managing your channels and bots.
    </Typography>
    <Button variant="contained" color="primary" size="large" sx={{ marginTop: '1rem' }}>
      Get Started
    </Button>
  </Box>
);

export default MainSection;
