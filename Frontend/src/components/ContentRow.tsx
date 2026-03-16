
import { Movie } from '../data/movies';

export function ContentRow({ title, movies }: { title: string; movies: Movie[] }) {
  return (
    <section className="px-4 md:px-12">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-3 rounded-md">
            <div className="text-white font-semibold">{movie.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ContentRow;
