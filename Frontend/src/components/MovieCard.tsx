
import { Link } from '@tanstack/react-router';

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
  imdbID: string;
}

export function MovieCard({ title, year, poster, imdbID }: MovieCardProps) {
  const posterSrc = poster === 'N/A' ? '/placeholder-movie.svg' : poster;

  return (
    <Link to="/film/$id" params={{ id: imdbID }} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer">
        <div className="aspect-video bg-gray-700 flex items-center justify-center">
          <img
            src={posterSrc}
            alt={`${title} poster`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.svg';
            }}
          />
        </div>
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
          <p className="text-gray-400 text-xs">{year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;