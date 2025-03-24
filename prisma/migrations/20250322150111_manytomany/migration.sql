/*
  Warnings:

  - You are about to drop the column `id_produk` on the `Pemesanan` table. All the data in the column will be lost.
  - Added the required column `keterangan` to the `Pemesanan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pemesanan" DROP CONSTRAINT "Pemesanan_id_produk_fkey";

-- AlterTable
ALTER TABLE "Pemesanan" DROP COLUMN "id_produk",
ADD COLUMN     "keterangan" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PemesananProduk" (
    "id" SERIAL NOT NULL,
    "id_pemesanan" INTEGER NOT NULL,
    "id_produk" INTEGER NOT NULL,

    CONSTRAINT "PemesananProduk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PemesananProduk_id_pemesanan_id_produk_key" ON "PemesananProduk"("id_pemesanan", "id_produk");

-- AddForeignKey
ALTER TABLE "PemesananProduk" ADD CONSTRAINT "PemesananProduk_id_pemesanan_fkey" FOREIGN KEY ("id_pemesanan") REFERENCES "Pemesanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PemesananProduk" ADD CONSTRAINT "PemesananProduk_id_produk_fkey" FOREIGN KEY ("id_produk") REFERENCES "Produk"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
