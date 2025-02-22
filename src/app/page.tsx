import React from "react";
import Mainpage from "./../components/Mainpage";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Mainpage />
      <div className="my-20">
        {/* Hero Section */}
        <section className="bg-[#F5F3F1] text-center py-16 px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#6C2D2D]">
            Atha Advertising
          </h1>
          <p className="text-lg mt-2 text-[#6C2D2D] opacity-80">
            Tegas, Elegan, Berkilau – Huruf Timbul Akrilik Terbaik untuk Bisnis
            Anda!
          </p>
        </section>

        {/* Tentang Kami */}
        <section className="bg-[#6C2D2D] text-white py-16 px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Tentang Kami</h2>
          <div className="max-w-3xl mx-auto text-lg opacity-90">
            <p>
              <span className="font-bold">Atha Advertising</span> adalah
              perusahaan spesialis dalam pembuatan huruf timbul akrilik
              berkualitas tinggi yang memberikan kesan elegan, modern, dan
              profesional untuk berbagai kebutuhan branding bisnis Anda.
            </p>
            <p className="mt-6">
              Kami berkomitmen menghadirkan solusi signage yang inovatif, mulai
              dari konsep, desain, hingga pemasangan dengan hasil yang presisi
              dan memukau. Percayakan identitas visual bisnis Anda kepada{" "}
              <span className="font-bold">Atha Advertising</span>, karena setiap
              huruf memiliki cerita, dan kami siap membuatnya bersinar!
            </p>
          </div>
        </section>

        {/* Visi & Misi */}
        <section className="max-w-4xl mx-auto my-16 px-6 text-center">
          {/* Visi */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#6C2D2D]">
              Visi
            </h3>
            <p className="opacity-80 mt-2">
              Menjadi perusahaan advertising terdepan dalam inovasi signage
              berkualitas tinggi yang membantu meningkatkan citra dan daya saing
              bisnis di seluruh Indonesia.
            </p>
          </div>

          {/* Misi */}
          <div className="mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-[#6C2D2D]">
              Misi
            </h3>
            <ul className="opacity-80 mt-2 space-y-2 text-left max-w-2xl mx-auto">
              <li>✅ Menyediakan produk berkualitas dengan bahan terbaik.</li>
              <li>✅ Memberikan layanan terbaik untuk kepuasan pelanggan.</li>
              <li>
                ✅ Inovasi berkelanjutan dalam desain dan teknik produksi.
              </li>
              <li>
                ✅ Efisiensi dan ketepatan waktu dalam penyelesaian proyek.
              </li>
              <li>✅ Mendukung branding bisnis dengan signage eksklusif.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Produk Kami */}
      <div className="my-20 px-6">
        <div className="bg-gray-100 py-16">
          <h1 className="text-3xl md:text-6xl font-bold text-center">
            Produk Kami
          </h1>

          {/* Grid Produk Responsif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 mx-auto max-w-5xl">
            {/* Item 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md relative">
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                Huruf Timbul
              </span>
              <Image
                src="https://source.unsplash.com/600x400/?sofa"
                alt="Product"
                width={600}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* Item 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://source.unsplash.com/600x400/?sofa"
                alt="Product"
                width={300}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* Item 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://source.unsplash.com/600x400/?sofa"
                alt="Product"
                width={300}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* Item 4 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://source.unsplash.com/600x400/?sofa"
                alt="Product"
                width={600}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* Item 5 */}
            <div className="bg-white p-4 rounded-lg shadow-md relative">
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-md">
                Exclusive
              </span>
              <Image
                src="/image/plakat.jpeg"
                alt="Product"
                width={200}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>

            {/* Item 6 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image
                src="https://source.unsplash.com/600x400/?sofa"
                alt="Product"
                width={600}
                height={250}
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
