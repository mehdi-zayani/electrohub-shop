"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          router.push("/login");
          return;
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-50">
        <p className="text-neutral-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // au cas où, mais router push gère la redirection
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          Welcome, {user.email}
        </h1>
        <p className="text-neutral-600 mb-6">Role: {user.role}</p>

        {user.role === "admin" && (
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="w-full bg-accent hover:bg-accent-dark text-white py-2 rounded-lg font-medium transition"
          >
            Go to Admin Dashboard
          </button>
        )}
      </motion.div>
    </div>
  );
}
