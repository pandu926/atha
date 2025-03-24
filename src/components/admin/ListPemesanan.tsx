"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Pengguna {
  id: number;
  nama: string;
  email: string;
  nomerhp: string;
}

interface ProdukItem {
  id: number;
  id_pemesanan: number;
  id_produk: number;
  produk: {
    id: number;
    nama: string;
  };
}

interface Pemesanan {
  id: number;
  id_pengguna: number;
  pengguna: Pengguna;
  keterangan: string;
  status: string;
  tanggal: string;
  produk: ProdukItem[];
}

export function ListPemesanan() {
  const [pemesanan, setPemesanan] = useState<Pemesanan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Pemesanan[]>("/api/pemesanan");
        console.log(response.data);
        setPemesanan(response.data);
      } catch (error) {
        console.error("Error fetching pemesanan:", error);
      }
    };
    fetchData();
  }, []);
  const formatTanggal = (tanggal: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(tanggal));
  };
  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-center font-bold text-2xl mb-6">Daftar pemesanan</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nama pemesan</TableHead>

              <TableHead className="text-center">Tanggal</TableHead>
              <TableHead className="text-center ">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pemesanan.length > 0 ? (
              pemesanan.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-gray-50">
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/admin/pemesanan/${item.id}`}>
                      {item.pengguna.nama}
                    </Link>
                  </TableCell>

                  <TableCell className="text-center">
                    {formatTanggal(item.tanggal)} WIB
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Tidak ada pemesanan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
