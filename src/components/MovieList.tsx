import MovieItem from "@/components/MovieItem";
import type { MovieType } from "@/types";

type MovieListProps = {
  movies: MovieType[];
};

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie">
      <ul className="movie__list">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
