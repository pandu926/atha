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

import Link from "next/link";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
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

export default function ListPemesanan() {
  const [pemesanan, setPemesanan] = useState<Pemesanan[]>([]);
  const { data: session } = useSession();
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
  console.log(session)
  return (
    <div className="w-full px-4 py-6">
        <div className="mb-10 capitalize text-xl flex justify-between mx-20">
            <div> selamat datang kembali , {session?.user?.name}</div>
            <div className="mb-10 capitalize text-xl flex justify-between mx-20 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className="h-10 w-10 rounded-full bg-cover   mr-5"
            style={{
              backgroundImage: `url("${session?.user?.image ?? "https://github.com/shadcn.png"}")`,
            }}
          ></div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/profil/${session?.user?.id }`}>Edit Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
        </div>
      <h1 className="text-center font-bold text-2xl mb-6">Daftar pemesanan</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Produk Pesanan</TableHead>

              <TableHead className="text-center">Tanggal</TableHead>
              <TableHead className="text-center ">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pemesanan.length > 0 ? (
              pemesanan.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-gray-50">
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/admin/pemesanan/${item.id}`}>
                    {item.produk.map((item) => (
                   
                      <span key={item.id}  className="text-center">{item.produk.nama},   </span>
                   
                  ))}
                    </Link>
                  </TableCell>

                  <TableCell className="text-center">
                    {formatTanggal(item.tanggal)} WIB
                  </TableCell>
                  <TableCell className="text-center flex justify-center gap-2">
                  {item.status}
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
