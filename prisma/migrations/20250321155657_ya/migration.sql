/*
  Warnings:

  - A unique constraint covering the columns `[nomerhp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_pengguna` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_produk` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nama` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomerhp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pemesanan" ADD COLUMN     "id_pengguna" INTEGER NOT NULL,
ADD COLUMN     "id_produk" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nama" TEXT NOT NULL,
ADD COLUMN     "nomerhp" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Produk" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nomerhp_key" ON "User"("nomerhp");

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pemesanan" ADD CONSTRAINT "Pemesanan_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
