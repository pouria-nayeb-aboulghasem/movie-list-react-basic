import movies from "@/data/movies.json";
import type { MovieType } from "@/types";

// list of movies
function getMovies(): MovieType[] {
  return movies;
}

// movie
function getMovie(id: string | undefined): MovieType | undefined {
  if (typeof id !== "undefined") {
    const uId = parseInt(id);
    return movies.find((m) => m.id === uId);
  }

  return movies.find((m) => m.id === id);
}

export { getMovies, getMovie };
