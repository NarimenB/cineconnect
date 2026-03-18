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
    <Link to="/film/$id" params={{ id: String(movieId) }} className="group block">
      <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
        <img
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/w500${posterPath}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={title}
          className="h-[340px] w-full object-cover"
        />
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-bold text-white">{title}</h3>
          <p className="mt-2 text-sm text-zinc-400">{year}</p>
        </div>
      </div>
    </Link>
  );
}

