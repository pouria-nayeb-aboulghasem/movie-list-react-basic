import movies from "@/data/movies.json";
import type { MovieType } from "@/types";

// list of movies
function getMovies(): MovieType[] {
  return movies;
}

// movie
function getMovie(id: number): MovieType | undefined {
  return movies.find((m) => m.id === id);
}

export { getMovies, getMovie };
