"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditUserPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nomerhp, setNomerhp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${id}`);
      const user = response.data;
      setNama(user.nama || "");
      setNomerhp(user.nomerhp || "");
      setEmail(user.email);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/api/user/${id}`, { email, nama, nomerhp });
      alert("Data berhasil diperbarui!");
      router.push("/pemesanan"); // Redirect setelah update sukses
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      alert("Gagal memperbarui data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Profil</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-medium">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Nomor HP</label>
          <input
            type="text"
            value={nomerhp}
            onChange={(e) => setNomerhp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}
