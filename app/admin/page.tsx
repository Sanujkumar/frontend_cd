
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/admin/createCode"
          className="p-6 bg-blue-500 text-white rounded-xl text-center hover:bg-blue-600 transition"
        >
          Generate Redeem Code
        </Link>

        
      </div>

    </div>
  );
}
