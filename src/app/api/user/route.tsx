import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

// POST tambah user baru
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Alamat user wajib diisi" },
        { status: 400 }
      );
    }

    const newuser = await prisma.user.create({
      data: { email },
    });

    return NextResponse.json(newuser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambahkan user" },
      { status: 500 }
    );
  }
}

// DELETE semua user
export async function DELETE() {
  try {
    await prisma.user.deleteMany();
    return NextResponse.json({ message: "Semua user berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
