import React from 'react';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-accent mb-4">Welcome to ElectroHub!</h2>
      <p className="text-neutral-700">
        This is a demo electronics shop built with Next.js, Tailwind CSS, and Prisma.
      </p>
      <button className="mt-6 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition">
        Start Shopping
      </button>
    </div>
  );
}