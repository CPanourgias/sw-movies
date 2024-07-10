import React from 'react';
import MoviesList from './features/movies/MoviesList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Star Wars Movies</h1>
      <MoviesList />
    </div>
  );
};

export default App;
