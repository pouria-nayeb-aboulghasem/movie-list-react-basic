import type { MovieType } from "@/types";
import { useState } from "react";
import { getMovies } from "@/services";
import { textFormat } from "@/utils";

// step 3: define component props type
type SearchProps = {
  setMovies: (movies: MovieType[]) => void;
};

// step 2: feed search component props
const Search = ({ setMovies }: SearchProps) => {
  // step 5: define search component state
  const [query, setQuery] = useState<string>("");

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

  // step 4: define UI
  return (
    <div className="search">
      <label className="search__label" htmlFor="movie-search">
        Search
      </label>

      <input
        id="movie-search"
        className="search__input"
        type="search"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder="Search by title and genre"
      />
    </div>
  );
};

export default Search;
