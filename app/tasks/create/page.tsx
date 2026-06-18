"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
}

export default function CreateTaskPage() {
  const router = useRouter();

  const [projects, setProjects] =
    useState<Project[]>([]);

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
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (
          data.projects &&
          Array.isArray(data.projects)
        ) {
          setProjects(
            data.projects
          );
        }
      });
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const res = await fetch(
      "/api/tasks",
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
      router.push("/tasks");
    } else {
      const error =
        await res.json();

      alert(
        error.error ||
          "Failed to create task"
      );
    }
  }

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">
        Create Task
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          className="border p-2"
          placeholder="Task Name"
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
          className="border p-2"
          placeholder="Description"
          value={
            form.description
          }
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
          className="border p-2"
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
          className="border p-2"
          value={form.dueDate}
          onChange={(e) =>
            setForm({
              ...form,
              dueDate:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2"
          value={form.projectId}
          onChange={(e) =>
            setForm({
              ...form,
              projectId:
                e.target.value,
            })
          }
        >
          <option value="">
            Select Project
          </option>

          {projects.map(
            (project) => (
              <option
                key={
                  project.id
                }
                value={
                  project.id
                }
              >
                {project.name}
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}