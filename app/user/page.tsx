

"use client";
import Link from "next/link";
export default function AdminDashboard() {


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/user/reedem"
          className="p-6 bg-blue-500 text-white rounded-xl text-center hover:bg-blue-600 transition"
        >
          Reedem
        </Link>

         <Link
          href="/user/history"
          className="p-6 bg-green-500 text-white rounded-xl text-center hover:bg-blue-600 transition"
        >
          history
        </Link>
        
      </div>

    </div>
  );
}
