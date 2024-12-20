import { useState, useEffect } from "react";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import EventList from "../../components/EventCard/EventCard";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const mockData = [
          {
            id: 1,
            title: "Чемпионат мира по стрельбе",
            description: "Международное соревнование для профессионалов.",
            date: "2024-01-15",
            location: "Берлин, Германия",
          },
          {
            id: 2,
            title: "Открытый чемпионат города",
            description: "Турнир для любителей.",
            date: "2024-02-10",
            location: "Москва, Россия",
          },
          {
            id: 3,
            title: "Кубок Европы",
            description: "Соревнование для команд из Европы.",
            date: "2024-03-20",
            location: "Париж, Франция",
          },
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEvents(mockData); 
      } catch (err) {
        setError("Ошибка при загрузке событий.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <>
        <AuthHeader />
        <div className="events-page">
          <p>Загрузка событий...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AuthHeader />
        <div className="events-page">
          <h1 className="events-page__title">События</h1>
          <p>Ошибка: {error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AuthHeader />
      <div className="events-page">
        <h1 className="events-page__title">События</h1>
        <EventList events={events} /> 
      </div>
    </>
  );
};

export default EventsPage;
