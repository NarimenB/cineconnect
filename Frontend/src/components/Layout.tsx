import { Outlet } from "@tanstack/react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}