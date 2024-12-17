import { Box, Typography, Button, Stack } from '@mui/material';
const HeroSection = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
        Master Your Shooting Skills
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: '600px', margin: '0 auto', mb: 4 }}>
        Join Lockshot and elevate your shooting experience with advanced training resources 
        and community engagement. Whether you&apos;re a novice or an expert, our platform offers 
        tools to enhance your skills and connect with others in the sport.
      </Typography>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 4 }}>
        <Button variant="contained" color="inherit">Register Now</Button>
        <Button variant="contained" color="warning">Start Free Trial →</Button>
      </Stack>
      <Box
        component="labxsibce4ajm5jc.jpg"
        src="/labxsibce4ajm5jc.jpg.jpg" 
        alt="Shooting field"
        sx={{ width: '100%', maxWidth: '800px', borderRadius: '8px', boxShadow: 3 }}
      />
    </Box>
  );
};

export default HeroSection;
