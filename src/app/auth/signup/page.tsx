"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc"; // Google icon

export default function SignupPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (session) {
      router.push("/about");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await authClient.signUp.email(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          callbackURL: "/about",
        },
        {
          onRequest: () => {
            console.log("loading here ");
          },
          onSuccess: (data) => {
            console.log("Signup successful ✅", data);
            router.push("/about");
          },
          onError: (error) => {
            console.error("Signup failed ❌", error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Google signup handler
  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/about",
      });
    } catch (error) {
      console.error("Google signup failed ❌", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
            Create Account
          </button>
        </form>

        {/* OR divider */}
        <div className="my-4 flex items-center justify-center">
          <div className="h-px w-1/4 bg-gray-300"></div>
          <span className="px-2 text-sm text-gray-500">or</span>
          <div className="h-px w-1/4 bg-gray-300"></div>
        </div>

        {/* Continue with Google */}
        <button
          onClick={handleGoogleSignup}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
