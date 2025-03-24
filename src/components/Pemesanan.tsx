"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";

interface Produk {
  id: number;
  nama: string;
}

export default function Pemesanan() {
  const { data: session } = useSession();
  const router = useRouter();
  const [idPengguna, setIdPengguna] = useState<number | null>(null);
  const [produkTerpilih, setProdukTerpilih] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("PENDING");
  const [keterangan, setKeterangan] = useState<string>("");
  const [produkList, setProdukList] = useState<Produk[]>([]);
  const [error, setError] = useState<string>("");
  console.log(session);
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get<Produk[]>("/api/produk");
        setProdukList(response.data);
      } catch (error) {
        console.error("Error fetching produk:", error);
      }
    };
    fetchProduk();
  }, []);

  const handleProdukChange = (produkId: number) => {
    setProdukTerpilih((prev) =>
      prev.includes(produkId)
        ? prev.filter((id) => id !== produkId)
        : [...prev, produkId]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (produkTerpilih.length === 0) {
      setError("Harap pilih setidaknya satu produk.");
      return;
    }

    try {
      const response = await axios.post("/api/pemesanan", {
        id_pengguna: session?.user?.id,
        status,
        keterangan,
        produk: produkTerpilih,
      });
      alert("Pemesanan berhasil!");
      router.push(`/tiket/detail?id=${response.data.newPemesanan.id}`);
    } catch (error) {
      console.error("Gagal menyimpan pemesanan:", error);
      alert("Gagal menyimpan data pemesanan.");
    }
  };

  return (
    <div className="mb-20 capitalize">
      <h2 className="mb-16 text-xl font-bold text-center mt-10">Pemesanan</h2>
      <div className="px-2 mb-5 md:px-10">
        <div className="mb-6">
          <div className="mb-10">
            Cek pesanan Anda?{" "}
            <span className="text-red-400">
              <Link href="/tiket/cek">Cek Disini</Link>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="mb-2 font-bold text-red-400">Detail Pesanan</h1>
          <div className="flex flex-col">
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Pilih Produk
              </label>
              {produkList.map((prod) => (
                <div key={prod.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={prod.id}
                    checked={produkTerpilih.includes(prod.id)}
                    onChange={() => handleProdukChange(prod.id)}
                  />
                  <span>{prod.nama}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Keterangan Pesanan
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Masukkan keterangan pesanan..."
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 text-red-500 text-sm">
              <strong>{error}</strong>
            </div>
          )}

          <div className="flex justify-center w-full mt-10">
            <button
              type="submit"
              className="w-3/6 px-4 py-2 mt-10 text-sm text-white bg-red-500 rounded-md md:py-3 md:text-base"
            >
              Pesan Tiket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
