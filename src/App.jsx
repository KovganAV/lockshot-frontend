import IntroPage from "./Pages/IntroPage/IntroPage";
import LoginPage from './Pages/LoginPage/LoginPage';

import { CssBaseline, Container } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <IntroPage/>
        <LoginPage/>

      </Container>
    </>
  );
};

export default App;
