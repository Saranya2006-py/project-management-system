"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditTaskPage() {
  const router = useRouter();

  const params = useParams();

  const taskId =
    params.id as string;

  const [form, setForm] =
    useState({
      name: "",
      description: "",
      priority: "MEDIUM",
      status: "PENDING",
      dueDate: "",
      projectId: "",
    });

  useEffect(() => {
    fetch(`/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then((task) => {
        setForm({
          name: task.name,
          description:
            task.description,
          priority:
            task.priority,
          status:
            task.status,
          dueDate:
            task.dueDate?.split(
              "T"
            )[0],
          projectId:
            task.projectId,
        });
      });
  }, [taskId]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/tasks/${taskId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.push("/tasks");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Edit Task
        </h1>

        <input
          className="p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <textarea
          className="p-3 rounded-xl bg-white/10 border border-white/20 text-white"
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
          className="p-3 rounded-xl bg-slate-800 border border-white/20 text-white"
          value={form.priority}
          onChange={(e) =>
            setForm({
              ...form,
              priority:
                e.target.value,
            })
          }
        >
          <option value="LOW">
            LOW
          </option>

          <option value="MEDIUM">
            MEDIUM
          </option>

          <option value="HIGH">
            HIGH
          </option>
        </select>

        <select
          className="p-3 rounded-xl bg-slate-800 border border-white/20 text-white"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
        >
          <option value="PENDING">
            PENDING
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
          className="p-3 rounded-xl bg-slate-800 border border-white/20 text-white"
          value={form.dueDate}
          onChange={(e) =>
            setForm({
              ...form,
              dueDate:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-semibold"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}