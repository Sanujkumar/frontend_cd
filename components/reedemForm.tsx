"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Url } from "@/lib/url";
import { useRouter } from "next/navigation";

export function RedeemForm() {
  const [loading, setLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = codeRef.current?.value;
    const token = localStorage.getItem("token");

    if (!code) return toast.error("Enter a code!");

    try {
      setLoading(true);
      const res = await axios.post(
        `${Url}/api/code/reedem`,  
        { code },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      router.push("/user/history");    
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to redeem!");
    } finally {
      setLoading(false);
    }
  };   

  return (
    <form
      onSubmit={handleRedeem}
      className="p-6 bg-white rounded-xl shadow w-96 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-center">Redeem Your Code</h2>
      <Input ref={codeRef} placeholder="Enter your redeem code" required />
      <Button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Redeem"}
      </Button>
    </form>
  );
}
