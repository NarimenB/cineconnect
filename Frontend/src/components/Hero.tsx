
import { Movie } from '../data/movies';

export function Hero({ movie }: { movie: Movie }) {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${movie.backdropUrl ?? ''})` }}
    >
      <div className="bg-black/50 p-10">
        <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
        <p className="mt-4 text-gray-200">{movie.overview}</p>
      </div>
    </section>
  );
}

export default Hero;
