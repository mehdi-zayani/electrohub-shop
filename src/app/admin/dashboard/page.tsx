"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Box, Plus } from "lucide-react";

interface UserData {
  id: number;
  email: string;
  role: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const resUser = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resUser.ok) {
          router.push("/login");
          return;
        }

        const userData = await resUser.json();
        if (userData.role !== "admin") {
          router.push("/login");
          return;
        }

        setUser(userData);

        const resProducts = await fetch("/api/admin/product", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const productsData = await resProducts.json();
        setProducts(productsData);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
            <Users size={24} />
            Admin Dashboard
          </h2>
          <button className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white rounded-lg px-4 py-2">
            <Plus size={18} /> Add Product
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-100 dark:bg-neutral-700">
              <tr>
                <th className="p-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200">ID</th>
                <th className="p-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200">Name</th>
                <th className="p-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200">Price</th>
                <th className="p-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200">Stock</th>
                <th className="p-3 text-sm font-semibold text-neutral-700 dark:text-neutral-200">Category</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-neutral-200 dark:border-neutral-700">
                  <td className="p-3 text-sm text-neutral-900 dark:text-neutral-50">{product.id}</td>
                  <td className="p-3 text-sm text-neutral-900 dark:text-neutral-50">{product.name}</td>
                  <td className="p-3 text-sm text-neutral-900 dark:text-neutral-50">${product.price}</td>
                  <td className="p-3 text-sm text-neutral-900 dark:text-neutral-50">{product.stock}</td>
                  <td className="p-3 text-sm text-neutral-900 dark:text-neutral-50">{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
