"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("Login response status:", res.status, email, password);

      // const result = await res.json();

      // if (!res.ok) {
      //   throw new Error(result.error || "Login failed");
      // }

      // // Save token
      // localStorage.setItem("token", result.token);
      // localStorage.setItem("user", JSON.stringify(result.user));

      // toast.success("Login successful!");
      // router.push("/dashboard");
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Invalid email or password";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const demoUsers = [
    {
      email: "superadmin@fibscollege.com",
      password: "Admin123",
      role: "SUPER_ADMIN",
    },
    {
      email: "eldoretadmin@fibscollege.com",
      password: "Admin123",
      role: "Branch Admin",
    },
    {
      email: "lecturer@fibscollege.com",
      password: "Lecturer123",
      role: "Lecturer",
    },
    {
      email: "accounts@fibscollege.com",
      password: "Accounts123",
      role: "Accountant",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">
            FIBS Technical College
          </h1>
          <p className="text-blue-100 mt-2">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-6">
            <p className="text-sm text-gray-600 text-center mb-3">
              Demo Accounts:
            </p>

            <div className="space-y-2">
              {demoUsers.map((user, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setEmail(user.email);
                    setPassword(user.password);
                  }}
                  className="w-full text-left text-sm px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg"
                >
                  <span className="font-semibold">{user.role}:</span>{" "}
                  {user.email}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
