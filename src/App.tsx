import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from './app/store';
import Home from './pages/Home';
import { Container } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container className="h-screen" maxWidth="xl">
        <Home />
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;
