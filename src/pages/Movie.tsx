import { getMovie } from "@/services/movieService";
import type { MovieType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

type MovieParams = {
  id: string | undefined;
};

function Movie() {
  const { id } = useParams<MovieParams>();
  const [movie] = useState<MovieType | undefined>(getMovie(id));

  return (
    <div className="container">
      <Link to="/" className="back">
        Back
      </Link>
      <div className="item">
        <figure className="item__figure">
          <img src={movie?.poster} alt={movie?.title} className="item__img" />
        </figure>
        <div className="item__info">
          <h1 className="item__title">{movie?.title}</h1>
          <ul className="item__list">
            {movie?.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
          <p className="item__description">{movie?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Movie;
