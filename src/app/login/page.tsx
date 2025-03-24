import { signIn } from "@/auth";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen capitalize">
      <div className="bg-white p-8 sm:p-10 md:p-16 rounded-lg  w-full max-w-3xl">
        <h2 className="md:text-3xl text-2xl font-bold mb-20 text-center">
          selamat datang kembali
        </h2>
        <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mb-8">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button className="flex items-center justify-center w-full sm:w-auto py-3 px-5 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 mb-4 sm:mb-0">
              <Image
                alt="Google logo"
                src="/icon/google.png"
                className="mr-3"
                height={30}
                width={30}
              />
              Masuk Dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
