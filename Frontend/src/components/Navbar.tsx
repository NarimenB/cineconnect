
import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="bg-gray-900 text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        <div className="text-lg font-bold">
          <Link to="/">CineConnect</Link>
        </div>

        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>

          <Link to="/films" className="hover:underline">
            Films
          </Link>

          <Link to="/discussion" className="hover:underline">
            Discussion
          </Link>

          <Link to="/profil" className="hover:underline">
            Profil
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;