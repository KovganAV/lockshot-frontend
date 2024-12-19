import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';  
import RegisterPage from './Pages/RegisterPage/RegisterPage';  
import IntroPage from './Pages/IntroPage/IntroPage';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import StatisticsPage from './Pages/StatisticsPage/StatisticsPage';
import EventsPage from './Pages/EventsPage/EventsPage';
import ContentPage from './Pages/ContentPage/ContentPage';
import UsersPage from './Pages/UsersPage/UsersPage'

const App = () => {
  return (
    <Router> 
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/statistics" element ={<StatisticsPage/>} />
          <Route path="/events" element ={<EventsPage/>} />
          <Route path="/content" element ={<ContentPage/>} />
          <Route path="/users" element ={<UsersPage/>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;