import { useState, useEffect } from 'react';
import { RootState, useAppDispatch, useTypedSelector } from '../app/store';
import {
  Header,
  FilmList,
  FilmDetails,
  SearchBar,
  SortDropdown,
} from '../components';
import {
  setFilms,
  filterFilms,
  selectFilm,
  sortFilms,
} from '../features/films/slice';
import {
  useGetFilmsQuery,
  useGetFilmDetailsQuery,
} from '../features/films/api';
import type { Film } from '../types';
import { Container } from '@mui/material';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetFilmsQuery();
  const filteredFilms = useTypedSelector(
    (state: RootState) => state.films.filteredFilms,
  );
  const selectedFilm = useTypedSelector(
    (state: RootState) => state.films.selectedFilm,
  );

  const [selectedFilmId, setSelectedFilmId] = useState<number | null>(null);

  const { data: selectedFilmDetails, isLoading: loadingFilmDetails } =
    useGetFilmDetailsQuery(selectedFilmId ?? 0, {
      skip: selectedFilmId === null,
    });

  useEffect(() => {
    if (data) {
      const filmsData: Film[] = data.results;
      dispatch(setFilms(filmsData));
    }
  }, [data, dispatch]);

  const handleSearch = (query: string) => {
    dispatch(filterFilms(query));
  };

  const handleSortChange = (sortKey: string) => {
    dispatch(sortFilms(sortKey));
  };

  const handleFilmSelect = (film: Film) => {
    dispatch(selectFilm(film));
    setSelectedFilmId(film.episode_id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading films.</div>;
  }

  return (
    <Container className="h-screen p-4">
      <Header />
      <div className="flex items-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown onSortChange={handleSortChange} />
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <FilmList films={filteredFilms} onFilmSelect={handleFilmSelect} />
        </div>
        <div className="flex-[2] pl-4">
          <FilmDetails
            film={selectedFilm}
            details={selectedFilmDetails}
            isLoadingDetails={loadingFilmDetails}
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
