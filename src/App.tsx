import { useState } from "react";
import MovieList from "@/components/MovieList";
import Search from "@/components/Search";
import { getMovies } from "@/services";
import type { MovieType } from "@/types";
import NotFound from "./components/NotFound";

const App = () => {
  const [movies, setMovies] = useState<MovieType[]>(getMovies());

  return (
    <>
      {/* step 1: create search component */}
      <Search setMovies={setMovies} />
      {movies.length === 0 ? <NotFound /> : <MovieList movies={movies} />}
    </>
  );
};

export default App;
