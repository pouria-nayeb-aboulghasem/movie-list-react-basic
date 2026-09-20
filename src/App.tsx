import { useState } from "react";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { getMovies } from "@/services";
import type { MovieType } from "@/types";
import NotFound from "@/components/NotFound";
import { textFormat } from "@/utils";

const App = () => {
  const [movies, setMovies] = useState<MovieType[]>(getMovies());

  const filterSearch = (value: string): void => {
    if (value === "") {
      setMovies(getMovies());

      return;
    }

    const filteredMovies = getMovies().filter((movie) =>
      textFormat(movie.title).includes(textFormat(value)),
    );

    setMovies(filteredMovies);
  };

  return (
    <>
      <Search filterSearch={filterSearch} />
      {movies.length === 0 ? <NotFound /> : <MovieList movies={movies} />}
    </>
  );
};

export default App;
