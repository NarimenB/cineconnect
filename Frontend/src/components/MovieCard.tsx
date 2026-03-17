import { Link } from "@tanstack/react-router";

type MovieCardProps = {
  title: string;
  year: string;
  posterPath: string | null;
  movieId: number;
};

export default function MovieCard({
  title,
  year,
  posterPath,
  movieId,
}: MovieCardProps) {
  return (
    <Link to="/film/$id" params={{ id: String(movieId) }}>
      <div className="overflow-hidden rounded-xl bg-zinc-900">
        <img
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={title}
          className="h-[420px] w-full object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-gray-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}
