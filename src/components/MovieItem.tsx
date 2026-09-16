import GenreList from "@/components/GenreList";
import type { MovieType } from "@/types";

type MovieItemProps = {
  movie: MovieType;
};

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <li className="movie__item">
      <figure className="movie__figure">
        <img src={movie.poster} alt={movie.title} className="movie__img" />
      </figure>

      <div className="movie__info">
        <h5 className="movie__title">{movie.title}</h5>

        <GenreList genres={movie.genres} />

        <p className="movie__description">{movie.description}</p>
      </div>
    </li>
  );
};

export default MovieItem;
