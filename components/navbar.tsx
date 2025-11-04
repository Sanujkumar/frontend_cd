"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "./useAuthStor";

export default function Navbar() {
  const router = useRouter();
  const { role, setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    if (storedRole && storedToken) {
      setAuth(storedRole, storedToken);
    }
  }, [setAuth]);   

  const handleLogout = () => {
    localStorage.clear();
    clearAuth();
    router.push("/login");
  };

  
   

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-200 shadow h-16 w-full">
      <Link href="/" className="text-xl font-semibold">
        🎟️ Redeem System
      </Link>

      <div className="flex gap-3">
        {role === "ADMIN" ? (
          <>
            <Button variant="link" onClick={() => router.push("/admin")}>
              Admin Dashboard
            </Button>
           
          </>
        ) : role === "USER" ? (
          <Button variant="link" onClick={() => router.push("/user")}>
            User Dashboard  
          </Button>
        ) : null}

        <Button className="bg-blue-500" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}  