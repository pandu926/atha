import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua produk
export async function GET() {
  try {
    const produks = await prisma.produk.findMany();
    return NextResponse.json(produks);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// POST tambah produk baru
export async function POST(req: Request) {
  try {
    const { nama } = await req.json();

    if (!nama) {
      return NextResponse.json(
        { error: "Alamat produk wajib diisi" },
        { status: 400 }
      );
    }

    const newproduk = await prisma.produk.create({
      data: { nama },
    });

    return NextResponse.json(newproduk, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambahkan produk" },
      { status: 500 }
    );
  }
}

// DELETE semua produk
export async function DELETE() {
  try {
    await prisma.produk.deleteMany();
    return NextResponse.json({ message: "Semua produk berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
