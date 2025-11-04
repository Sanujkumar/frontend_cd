"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:4000/api/code/history",  
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHistory(res.data.data);
    };  
    fetchHistory();
  }, []);

  return (
    <div>
      
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Redemption History</h2>
        <table className="min-w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Code</th>
              <th className="p-2">User</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.code.code}</td>
                <td className="p-2">{item.user.email}</td>
                <td className="p-2">
                  {new Date(item.redeemedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
