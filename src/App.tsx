import { Provider } from 'react-redux';

import { store } from './app/store';
import Home from './pages/Home';

const App: React.FC = () => (
  <Provider store={store}>
    <Home />
  </Provider>
);

export default App;
