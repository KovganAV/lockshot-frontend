import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';  
import RegisterPage from './Pages/RegisterPage/RegisterPage';  
import IntroPage from './Pages/IntroPage/IntroPage';

const App = () => {
  return (
    <Router> 
      <CssBaseline />
      <Container>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
