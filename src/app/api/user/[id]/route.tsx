import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "user tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const { email, nama, nomerhp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Alamat user wajib diisi" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, nama, nomerhp },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal memperbarui user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE user by ID
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    await prisma.user.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "User berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal menghapus user" },
      { status: 500 }
    );
  }
}
