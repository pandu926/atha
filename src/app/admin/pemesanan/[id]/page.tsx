"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

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


export default function PemesananPage() {
  const { id } = useParams();
  const [pemesanan, setPemesanan] = useState<Pemesanan| null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Pemesanan>(`/api/pemesanan/${id}`);
    
        setPemesanan(response.data);
      } catch (error) {
        console.error("Error fetching pemesanan:", error);
      }
    };
    fetchData();
  }, [id]);
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

  // Ambil elemen pertama dari array pemesanan
 

  return (
    <div>
    <p className="opacity-0">
    Lorem ipsum dolor sit hhamet consectetur, adipisicing elit. Obcaecati
    iusto minima quod tempora unde quasi dicta nesciunt eum quas earum
    nostrum quos, repudiandae officiis dolorem hic sit consectetur corporis
    animi.
  </p>
    <div className="max-w-4xl mx-auto p-8 min-h-screen flex flex-col items-center">
    
      <Card className="w-full shadow-lg rounded-xl bg-white p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Detail Pemesanan #{pemesanan?.id ?? "Loading..."}
          </CardTitle>
          <p className="text-gray-500 text-sm">
            {pemesanan ? formatTanggal(pemesanan.tanggal) + " WIB" : "Memuat..."}
          </p>
        </CardHeader>
        <CardContent>
          {pemesanan ? (
            <>
              <div className="mb-6 space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-700">Pemesan</h2>
                  <Separator className="my-2" />
                  <p><strong>Nama:</strong> {pemesanan.pengguna.nama}</p>
                  <p><strong>Email:</strong> {pemesanan.pengguna.email}</p>
                  <p><strong>Nomor HP:</strong> {pemesanan.pengguna.nomerhp}</p>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-700">Detail Pemesanan</h2>
                  <Separator className="my-2" />
                  <p><strong>Keterangan:</strong> {pemesanan.keterangan}</p>
                  <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <Badge variant="secondary" className="text-sm px-3 py-1">{pemesanan.status}</Badge>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Produk Dipesan</h2>
              <Table className="shadow-md rounded-lg overflow-hidden">
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead className="text-center">ID Produk</TableHead>
                    <TableHead className="text-center">Nama Produk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pemesanan.produk.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-100">
                      <TableCell className="text-center">{item.produk.id}</TableCell>
                      <TableCell className="text-center">{item.produk.nama}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="destructive" className="px-6 py-2 text-lg">Hapus</Button>
                <Button variant="default" className="px-6 py-2 text-lg">Edit</Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Memuat data...</p>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
