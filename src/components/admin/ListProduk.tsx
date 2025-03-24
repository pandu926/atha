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

interface Produk {
  id: number;
  nama: string;
}

export function ListProduk() {
  const [produk, setProduk] = useState<Produk[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Produk[]>("/api/produk");
        console.log(response.data);
        setProduk(response.data);
      } catch (error) {
        console.error("Error fetching produk:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-center font-bold text-2xl mb-6">Daftar Produk</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[80px] text-center">ID</TableHead>
              <TableHead className="text-left">Nama Produk</TableHead>
              <TableHead className="text-center w-[150px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produk.length > 0 ? (
              produk.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-gray-50">
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-left">{item.nama}</TableCell>
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
                  Tidak ada produk.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
