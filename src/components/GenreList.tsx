import GenreItem from "@/components/GenreItem";

type GenreListProps = {
  genres: string[];
};

const GenreList = ({ genres }: GenreListProps) => {
  return (
    <div className="movie__genre movie__genre--list">
      {genres.map((genre) => (
        <GenreItem key={genre} genre={genre} />
      ))}
    </div>
  );
};

export default GenreList;
