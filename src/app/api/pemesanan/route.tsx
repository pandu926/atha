import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua pemesanan
export async function GET() {
  try {
    const pemesanans = await prisma.pemesanan.findMany({
      include: {
        pengguna: true, // Mengambil detail user
        produk: {
          include: {
            produk: true, // Mengambil detail produk dari PemesananProduk
          },
        },
      },
    });
    return NextResponse.json(pemesanans);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data pemesanan" },
      { status: 500 }
    );
  }
}

// POST tambah pemesanan baru
export async function POST(req: Request) {
  try {
    const { id_pengguna, status, keterangan, produk } = await req.json();

    if (!id_pengguna || !status || !produk || produk.length === 0) {
      return NextResponse.json(
        { message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Buat pemesanan baru
    const newPemesanan = await prisma.pemesanan.create({
      data: {
        id_pengguna,
        status,
        keterangan,
      },
    });

    // Tambahkan produk ke dalam pemesanan
    const pemesananProdukData = produk.map((id_produk: number) => ({
      id_pemesanan: newPemesanan.id,
      id_produk,
    }));

    await prisma.pemesananProduk.createMany({
      data: pemesananProdukData,
      skipDuplicates: true, // Mencegah duplikasi
    });

    return NextResponse.json(
      {
        newPemesanan,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saat membuat pemesanan:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server" });
  }
}

// DELETE semua pemesanan
export async function DELETE() {
  try {
    await prisma.pemesanan.deleteMany();
    return NextResponse.json({ message: "Semua pemesanan berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus pemesanan" },
      { status: 500 }
    );
  }
}
