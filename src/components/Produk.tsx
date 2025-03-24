import Image from "next/image";

export default function Produk() {
  return (
    <div>
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
