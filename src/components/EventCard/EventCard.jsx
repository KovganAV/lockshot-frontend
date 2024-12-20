/*import EventCard from "./EventCard";
import "./EventList.css";
import PropTypes from "prop-types";

const EventList = ({ events }) => {
  if (events.length === 0) {
    return <p className="event-list__empty">Нет доступных событий</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          date={event.date}
          location={event.location}
          description={event.description}
        />
      ))}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventList;
*/

import "./EventCard.css";
import PropTypes from "prop-types";

const EventList = ({ event }) => {
  return (
    <div className="event-card">
      <h2 className="event-card__title">{event.title}</h2>
      <p className="event-card__description">{event.description}</p>
      <span className="event-card__date">{event.date}</span>
    </div>
  );
};

EventList.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventList;
