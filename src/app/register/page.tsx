"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../components/Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/auth/register', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      setAlert({ message: "Registration successful!", type: "success" });
      router.push("/");
    } else {
      setAlert({ message: response.statusText || "Registration failed", type: "error" });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat 
    bg-gradient-to-r from-gray-200 to-gray-400 p-6"
      style={{ backgroundImage: "url('/images/aneis.webp')" }}>
      {alert && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Register</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
