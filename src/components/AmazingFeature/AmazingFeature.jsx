import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

const AmazingFeature = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Grid container alignItems="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Your Amazing Feature Goes Here
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Here is some more information about this amazing feature. You can use
            basic formatting and also multiple paragraphs.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://via.placeholder.com/500x300"
            alt="Amazing Feature"
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            maxWidth: 600,
          }}
        >
          <Avatar
            src="https://via.placeholder.com/64"
            alt="User"
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              CARASSAVA
            </Typography>
            <Typography variant="body2" fontStyle="italic" color="text.secondary">
              You can add a testimonial from a customer here. This is what we call social proof
              in the industry and it can be great for building customer trust.
            </Typography>
            <Typography variant="caption" color="text.primary" fontWeight="bold" mt={1}>
              You Customer
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              Their Position
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AmazingFeature;
