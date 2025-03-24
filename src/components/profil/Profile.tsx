"use client";

import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter untuk redirect
import Pemesanan from "../Pemesanan";

interface User {
  id: number;
  email: string;
}

export default function Profile({ user }: { user: User }) {
  const router = useRouter(); // Inisialisasi router untuk navigasi

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/user/${user.id}`);

      // Jika nomor HP kosong/null, redirect ke halaman profil
      if (!response.data.nomerhp) {
        router.push(`profil/${response.data.id}`); // Redirect jika nomerhp tidak ada
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <Pemesanan />
    </div>
  );
}
