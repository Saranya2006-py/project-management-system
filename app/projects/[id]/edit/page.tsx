"use client";

import { useEffect, useState } from "react";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();

  const params = useParams();

  const projectId =
    params.id as string;

  const [form, setForm] =
    useState({
      name: "",
      description: "",
      status: "NOT_STARTED",
      startDate: "",
      endDate: "",
    });

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((project) => {
        setForm({
          name: project.name,
          description:
            project.description,
          status:
            project.status,
          startDate:
            project.startDate?.split(
              "T"
            )[0],
          endDate:
            project.endDate?.split(
              "T"
            )[0],
        });
      });
  }, [projectId]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/projects/${projectId}`,
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
      router.push("/projects");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-10 text-white">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Edit Project
        </h1>

        <input
          className="p-3 rounded-xl bg-white/10 border border-white/20 text-white"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
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
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
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
          className="p-3 rounded-xl bg-slate-800 border border-white/20 text-white"
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
          className="p-3 rounded-xl bg-slate-800 border border-white/20 text-white"
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
          className="bg-gradient-to-r from-yellow-500 to-orange-500 py-3 rounded-xl font-semibold"
        >
          Update Project
        </button>
      </form>
    </div>
  );
}