/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scanner tous les fichiers React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E1E2F",    // Bleu foncé / background principal
        secondary: "#FF5A5F",  // Rouge/orange accent pour boutons secondaires
        accent: "#FFD700",     // Doré pour les étoiles et accents
        dark: "#121212",       // Mode sombre
        light: "#F5F5F5",      // Mode clair / backgrounds neutres
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],   // Texte général
        display: ["'Bebas Neue'", "cursive"],           // Titres
      },
      borderRadius: {
        DEFAULT: "0.5rem",  // coins arrondis standard pour boutons, badges
        lg: "0.75rem",
      },
      boxShadow: {
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};