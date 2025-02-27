import "./EventCard.css";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";

const EventCard = ({ event }) => (
  <Card sx={{ marginBottom: 2 }}>
    <CardContent>
      <Typography variant="h6" fontWeight="bold">
        {event.title}
      </Typography>
      <Typography color="text.secondary">{event.date}</Typography>
      <Typography>{event.location}</Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        {event.description}
      </Typography>
    </CardContent>
  </Card>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
