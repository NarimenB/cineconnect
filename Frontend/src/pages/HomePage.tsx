
import Hero from "../components/Hero.tsx";
import ContentRow from "../components/ContentRow.tsx";
import { movies, categories } from "../data/movies.ts";

export default function Home() {
  const featuredMovie = movies.find((m) => m.isFeatured) || movies[0];

  return (
    <div className="bg-black min-h-screen">
      
      <Hero movie={featuredMovie} />

      <div className="relative -mt-32 space-y-12 pb-20">
        {categories.map((category) => {
          const categoryMovies = movies.filter((movie) =>
            category.movieIds.includes(movie.id)
          );
          return (
            <ContentRow
              key={category.id}
              title={category.name}
              movies={categoryMovies}
            />
          );
        })}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-4 md:px-12 py-8 text-gray-500 text-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <a href="#" className="block hover:underline">
                FAQ
              </a>
              <a href="#" className="block hover:underline">
                Relations investisseurs
              </a>
              <a href="#" className="block hover:underline">
                Confidentialité
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="block hover:underline">
                Centre d'aide
              </a>
              <a href="#" className="block hover:underline">
                Recrutement
              </a>
              <a href="#" className="block hover:underline">
                Préférences de cookies
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="block hover:underline">
                Compte
              </a>
              <a href="#" className="block hover:underline">
                Nous contacter
              </a>
              <a href="#" className="block hover:underline">
                Mentions légales
              </a>
            </div>
            <div className="space-y-2">
              <a href="#" className="block hover:underline">
                Presse
              </a>
              <a href="#" className="block hover:underline">
                Conditions d'utilisation
              </a>
            </div>
          </div>
          <p className="text-xs">© 2026 NetStream, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
