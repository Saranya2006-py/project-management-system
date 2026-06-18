"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditTaskPage() {
  const router =
    useRouter();

  const params =
    useParams();

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
    fetch(
      `/api/tasks/${taskId}`
    )
      .then((res) =>
        res.json()
      )
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
            task.dueDate
              ?.split("T")[0],
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
        body: JSON.stringify(
          form
        ),
      }
    );

    if (res.ok) {
      router.push(
        "/tasks"
      );
    }
  }

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">
        Edit Task
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="flex flex-col gap-4"
      >
        <input
          className="border p-2"
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
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target
                  .value,
            })
          }
        />

        <select
          className="border p-2"
          value={
            form.priority
          }
          onChange={(e) =>
            setForm({
              ...form,
              priority:
                e.target
                  .value,
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
          value={
            form.status
          }
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target
                  .value,
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
          value={
            form.dueDate
          }
          onChange={(e) =>
            setForm({
              ...form,
              dueDate:
                e.target
                  .value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Update Task
        </button>
      </form>
    </div>
  );
}