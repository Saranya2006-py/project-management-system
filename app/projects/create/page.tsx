"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "NOT_STARTED",
    startDate: "",
    endDate: "",
  });

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.push("/projects");
    }
  }

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">
        Create Project
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          className="border p-2"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <textarea
          className="border p-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
        >
          <option value="NOT_STARTED">
            NOT_STARTED
          </option>

          <option value="IN_PROGRESS">
            IN_PROGRESS
          </option>

          <option value="COMPLETED">
            COMPLETED
          </option>
        </select>

        <input
          type="date"
          className="border p-2"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate:
                e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-2"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}