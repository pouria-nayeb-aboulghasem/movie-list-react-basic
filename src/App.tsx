import { useState } from "react";
import MovieList from "@/components/MovieList";
import { getMovies } from "@/services";
import type { MovieType } from "@/types";

const App = () => {
  const [movies] = useState<MovieType[]>(getMovies());

  return <MovieList movies={movies} />;
};

export default App;
