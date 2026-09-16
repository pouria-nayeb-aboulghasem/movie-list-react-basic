type GenreItemProps = {
  genre: string;
};

const GenreItem = ({ genre }: GenreItemProps) => {
  return <span className="movie__genre movie__genre--item">{genre}</span>;
};

export default GenreItem;
