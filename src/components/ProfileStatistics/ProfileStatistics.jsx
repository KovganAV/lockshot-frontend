import PropTypes from "prop-types";
import { Box, Grid, Paper, Typography } from "@mui/material";

const ProfileStatistics = ({ statistics }) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Статистика стрельбы
      </Typography>
      <Grid container spacing={2}>
        {statistics.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography color="textSecondary">{stat.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProfileStatistics.propTypes = {
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default ProfileStatistics;
