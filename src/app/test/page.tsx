import { auth } from "../../auth";
import { PrismaClient } from "@prisma/client";
import Profile from "@/components/profil/Profile"; // Import Client Component

const prisma = new PrismaClient();

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user?.email) return null;

  // Ambil data user dari database berdasarkan email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return <p>User tidak ditemukan</p>;

  return <Profile user={user} />;
}
