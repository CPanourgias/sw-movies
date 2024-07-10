import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Movie {
  title: string;
  // Add other character properties as needed
}

export const fetchMovies = createAsyncThunk<Movie[]>(
  'movies/fetchMovies',
  async () => {
    const response = await axios.get('https://swapi.dev/api/films');
    return response.data.results;
  }
);
