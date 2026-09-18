import { useState } from "react";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { getMovies } from "@/services";
import type { MovieType } from "@/types";

const App = () => {
  const [movies, setMovies] = useState<MovieType[]>(getMovies());

  return (
    <>
      <Search setMovies={setMovies} />
      <MovieList movies={movies} />
    </>
  );
};

export default App;
