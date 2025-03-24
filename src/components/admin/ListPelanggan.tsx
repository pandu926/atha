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

interface Pelanggan {
  id: number;
  email: string;
  nomerhp: string;
  nama: string;
}

export function ListPelanggan() {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Pelanggan[]>("/api/user");
        console.log(response.data);
        setPelanggan(response.data);
      } catch (error) {
        console.error("Error fetching pelanggan:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="text-center font-bold text-2xl mb-6">Daftar pelanggan</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="text-center">ID</TableHead>
              <TableHead className="text-center">Nama pelanggan</TableHead>
              <TableHead className="text-center">E-Mail</TableHead>
              <TableHead className="text-center">Nomer HP</TableHead>
              <TableHead className="text-center ">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pelanggan.length > 0 ? (
              pelanggan.map((item) => (
                <TableRow key={item.id} className="border-b hover:bg-gray-50">
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">{item.nama}</TableCell>
                  <TableCell className="text-center">{item.email}</TableCell>
                  <TableCell className="text-center">{item.nomerhp}</TableCell>
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
                  Tidak ada pelanggan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
