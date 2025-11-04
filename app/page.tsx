"use client"

import { motion } from "framer-motion";  
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 relative overflow-hidden">
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"
        animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          🎟️ Welcome to Redeem System
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-700 text-lg md:text-xl max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Manage, create, and redeem your exclusive codes easily.  
          Designed for both <span className="font-semibold">Admins</span> and <span className="font-semibold">Users</span>.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <Link href="/login">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="px-6 py-3 rounded-xl border-indigo-600 text-indigo-700 hover:bg-indigo-50">
              Learn More
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <Image
            src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
            alt="Redeem illustration"
            width={200}
            height={400}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      
      <footer className="absolute bottom-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Redeem System — Built with ❤️ by Sanuj Kumar
      </footer>
    </div>
  );
}
