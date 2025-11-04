"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Url } from "@/lib/url";


export function CreateCodeForm() {
  const [loading, setLoading] = useState(false);
  const codeRef = useRef<HTMLInputElement>(null);
  const limitRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);

  const router = useRouter();  

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const code = codeRef.current?.value;
    const redemptionLimit = limitRef.current?.value;
    const expiryAt = expiryRef.current?.value;
    const type = typeRef.current?.value;

    if (!code || !type || !expiryAt)
      return toast.error("Please fill all required fields!");

    try {
      setLoading(true);
      const res = await axios.post(
        `${Url}/api/code/create`,     
        { code, type, redemptionLimit, expiryAt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Code created successfully!");
      router.push("/admin");  
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create code!");
    } finally {
      setLoading(false);  
    }
  };

  return (
    <form
      onSubmit={handleCreate}
      className="p-6 bg-white rounded-xl shadow w-96 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold text-center">Create New Code</h2>
      <Input ref={codeRef} placeholder="Enter code name" required />
      <select ref={typeRef} className="border p-2 rounded-md" required>
        <option value="COMMON">COMMON</option>
        <option value="UNIQUE">UNIQUE</option>
      </select>
      <Input
        ref={limitRef}
        type="number"
        placeholder="Redemption limit (for common)"
      />
      <Input ref={expiryRef} type="datetime-local" required />
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Code"}
      </Button>
    </form>
  );
}
    