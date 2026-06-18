"use client";

import { useEffect, useState } from "react";

interface AuditLog {
  id: string;
  action: string;
  userId: string;
  createdAt: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    fetch("/api/audit-logs")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLogs(data);
        } else {
          setLogs([]);
        }
      });
  }, []);

  const card =
    "bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl";

  return (
    <div className="min-h-screen p-10 text-white">

      <h1 className="text-5xl font-bold mb-8">
        📜 Audit Logs
      </h1>

      <div className={card + " overflow-hidden"}>

        <table className="w-full">

          <thead>
            <tr className="bg-white/10 text-left">
              <th className="p-4">Action</th>
              <th className="p-4">User ID</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.userId}</td>
                <td className="p-4">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}