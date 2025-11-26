"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import clsx from "clsx";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'envoi de mail
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-8"
      >
        {/* Bandeau violet */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-t-lg" />

        <h2 className="text-2xl font-bold mb-6 text-center text-neutral-900 dark:text-neutral-50 mt-4">
          Forgot Password
        </h2>

        {submitted ? (
          <p className="text-center text-neutral-600 dark:text-neutral-300 mt-4">
            If an account exists with this email, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-2 rounded-md text-white font-semibold",
                "bg-accent hover:bg-accent/90 focus:ring-2 focus:ring-accent focus:outline-none",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          Remember your password?{" "}
          <a href="/login" className="text-accent hover:underline">
            Log in
          </a>
        </div>
      </motion.div>
    </div>
  );
}
