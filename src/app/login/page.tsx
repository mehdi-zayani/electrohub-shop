"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", stayConnected: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        router.push("/profile");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-neutral-800 shadow-xl rounded-2xl p-8 relative overflow-hidden"
      >
        {/* Bandeau violet top */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 animate-pulse" />

        <h2 className="text-2xl font-bold mb-6 text-center text-neutral-900 dark:text-neutral-50">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Stay connected and forgot password */}
          <div className="flex justify-between items-center text-sm text-neutral-500 dark:text-neutral-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="stayConnected"
                checked={form.stayConnected}
                onChange={handleChange}
                className="accent-accent"
              />
              Stay connected
            </label>
            <a href="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full py-2 rounded-md text-white font-semibold flex justify-center items-center gap-2",
              "bg-accent hover:bg-accent/90 focus:ring-2 focus:ring-accent focus:outline-none",
              loading && "opacity-70 cursor-not-allowed"
            )}
          >
            <LogIn size={18} />
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-accent hover:underline">
            Register
          </a>
        </div>
      </motion.div>
    </div>
  );
}
