import '../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'ElectroHub Shop',
  description: 'Demo electronics store with Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold text-gray-900">ElectroHub</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-white shadow-inner p-4 mt-8 text-center text-neutral-500">
          © 2025 ElectroHub
        </footer>
      </body>
    </html>
  );
}