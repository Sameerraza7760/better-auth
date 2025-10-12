"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
          callbackURL: "/about",
        },
        {
          onRequest: () => {
            console.log("Signing in...");
          },
          onSuccess: (data) => {
            console.log("Signin successful ✅", data);
            router.push("/about");
          },
          onError: (error) => {
            console.error("Signin failed ❌", error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
