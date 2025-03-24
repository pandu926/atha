import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();// Gunakan Prisma singleton dari `lib/prisma.ts`

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const pemesanan = await prisma.pemesanan.findUnique({
      where: { id: parseInt(id) },
      include: {
        pengguna: true, // Mengambil detail user
        produk: {
          include: {
            produk: true, // Mengambil detail produk dari PemesananProduk
          },
        },
      },
    });

    if (!pemesanan) {
      return NextResponse.json({ error: 'pemesanan not found' }, { status: 404 });
    }

    return NextResponse.json(pemesanan);
  } catch (error) {
    console.error('Error fetching pemesanan:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const id = (await params).id;
//     const body = await req.json(); // Simpan hasil JSON agar tidak dipanggil berkali-kali
//     const { name } = body;

//     if (!name) {
//       return NextResponse.json(
//         { error: 'Nama pemesanan wajib diisi' },
//         { status: 400 }
//       );
//     }

//     const updatedpemesanan = await prisma.pemesanan.update({
//       where: { id },
//       data: { name },
//     });

//     return NextResponse.json(updatedpemesanan);
//   } catch (error) {
//     console.error('Error updating pemesanan:', error);
//     return NextResponse.json(
//       { error: 'Gagal memperbarui pemesanan' },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const id = (await params).id;

//     await prisma.pemesanan.delete({ where: { id } });

//     return NextResponse.json({ message: 'pemesanan berhasil dihapus' });
//   } catch (error) {
//     console.error('Error deleting pemesanan:', error);
//     return NextResponse.json(
//       { error: 'Gagal menghapus pemesanan' },
//       { status: 500 }
//     );
//   }
// }