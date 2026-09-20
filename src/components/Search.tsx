import { useState } from "react";

// step 3: define component props type
type SearchProps = {
  filterSearch: (value: string) => void;
};

const Search = ({ filterSearch }: SearchProps) => {
  const [query, setQuery] = useState<string>("");

  function handleSearch(value: string) {
    filterSearch(value);
    setQuery(value);
  }

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
