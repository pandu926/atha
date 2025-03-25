"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      alert("Login gagal! Periksa email atau password.");
    } else {
      window.location.href = "/admin"; // Redirect ke dashboard
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 sm:p-10 md:p-16 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Selamat Datang Kembali
        </h2>

        {/* Google Login */}
        <Button
          onClick={() => signIn("google")}
          className="flex items-center space-x-3 w-full justify-center bg-blue-600 text-white hover:bg-blue-700 mb-4"
        >
          <Image alt="Google logo" src="/icon/google.png" height={24} width={24} />
          <span>Masuk Dengan Google</span>
        </Button>

        <div className="text-center text-gray-500 my-3">atau</div>

        {/* Form Login Credential */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full bg-gray-900 text-white hover:bg-gray-800">
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
}
