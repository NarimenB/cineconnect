import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <nav className="bg-black/90 text-white p-4 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-red-600">
            CineConnect
          </Link>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-red-400 transition-colors"
              activeProps={{ className: "text-red-400" }}
            >
              Accueil
            </Link>
            <Link
              to="/films"
              className="hover:text-red-400 transition-colors"
              activeProps={{ className: "text-red-400" }}
            >
              Films
            </Link>
            <Link
              to="/browse"
              className="hover:text-red-400 transition-colors"
              activeProps={{ className: "text-red-400" }}
            >
              Explorer
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher un film..."
              className="bg-zinc-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 w-64"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;;