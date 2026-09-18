import type { MovieType } from "@/types";
import { useState } from "react";
import { getMovies } from "@/services";
import { textFormat } from "@/utils";

type SearchProps = {
  setMovies: (movies: MovieType[]) => void;
};

const Search = ({ setMovies }: SearchProps) => {
  const [query, setQuery] = useState("");

  function resetMovies(value: string): void {
    if (value === "") {
      setMovies(getMovies());
      setQuery("");

      return;
    }
  }

  function handleSearch(value: string) {
    resetMovies(value);

    setQuery(value);

    const filteredMovies = getMovies().filter((m) =>
      textFormat(m.title).includes(textFormat(value)),
    );

    setMovies(filteredMovies);
  }

  return (
    <div className="search">
      <label className="search__label" htmlFor="movie-search">
        Search
      </label>

      <input
        id="movie-search"
        className="search__input"
        type="text"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search by title and genre"
      />
    </div>
  );
};

export default Search;
