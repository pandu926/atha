"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Mainpage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession(); // Ambil data sesi pengguna

  return (
    <div className="bg-white text-black">
      {/* Header */}
      <header className="flex justify-between px-10 md:px-20 items-center border-b py-4 relative">
        <div className="text-xl font-bold flex-shrink-0">
          <Image
            width={150}
            height={70}
            src="/image/loo11.png"
            alt="Logo"
            className="w-20 md:w-36 object-contain"
          />
        </div>

        {/* Menu Desktop */}
        <nav className="md:flex space-x-6 font-bold hidden">
          <a href="#tentang" className="text-gray-600 hover:text-black">
            Tentang
          </a>
          <a href="#portofolio" className="text-gray-600 hover:text-black">
            Portofolio
          </a>
          <a href="#pemesanan" className="text-gray-600 hover:text-black">
            Pemesanan
          </a>
          <a href="#kontak" className="text-gray-600 hover:text-black">
            Kontak
          </a>
          <Link href={session ? "/profil" : "/login"}>
            <Button className="bg-[#6C2D2D]">
              {session ? "Dashboard" : "Login"}
            </Button>
          </Link>
        </nav>

        {/* Menu Mobile */}
        <button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"} {/* Ikon menu/tutup */}
        </button>

        {/* Dropdown Mobile */}
        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-white shadow-md py-4 flex flex-col items-center space-y-4 md:hidden">
            <a href="#" className="text-gray-600 hover:text-black">
              Tentang
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Portofolio
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Pemesanan
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              Kontak
            </a>
            <Link href={session ? "/profil" : "/login"}>
              <Button className="bg-[#6C2D2D]">
                {session ? "Dashboard" : "Login"}
              </Button>
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="px-3 md:px-20 p-6">
        <h1 className="text-3xl md:text-7xl font-bold leading-tight">
          Atha Advertising
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Ciptakan Kesan Mewah dan Berkelas dengan Akrilik dan Huruf Timbul
          Berkualitas Premium!
        </p>

        {/* Section dengan gambar */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="border p-6">
            <h2 className="text-lg font-semibold capitalize">
              Spesialis akrilik dan huruf timbul Wonosobo
            </h2>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              fugiat quo placeat ipsa ipsum rem quam vero est, voluptatum,
              commodi dolore vitae dolores! Provident necessitatibus, facere
              asperiores et dolorum natus!
            </p>
            <a href="#" className="inline-block text-black font-semibold mt-6">
              Scroll untuk lebih detail →
            </a>
          </div>

          {/* Gambar hanya muncul di md ke atas */}
          <div className="hidden md:block">
            <Image
              width={500}
              height={500}
              src="/image/tim.webp"
              alt="Brown Chair"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mainpage;
