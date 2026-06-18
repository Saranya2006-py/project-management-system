"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Task {
  id: string;
  name: string;
  priority: string;
  status: string;
  dueDate: string;
  project: {
    name: string;
  };
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else if (Array.isArray(data)) {
          setTasks(data);
        }
      });
  }, []);

  async function deleteTask(id: string) {
    const confirmed = confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTasks(tasks.filter((t) => t.id !== id));
    } else {
      alert("Failed to delete task");
    }
  }

  const card =
    "bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl";

  return (
    <div className="min-h-screen p-10 text-white">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          🎯 Tasks
        </h1>

        <Link
          href="/tasks/create"
          className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-2xl transition"
        >
          ➕ Create Task
        </Link>
      </div>

      <div className={card + " overflow-hidden"}>

        <table className="w-full">

          <thead>
            <tr className="bg-white/10 text-left">
              <th className="p-4">Task</th>
              <th className="p-4">Project</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{task.name}</td>
                <td className="p-4">{task.project?.name}</td>
                <td className="p-4">{task.priority}</td>
                <td className="p-4">{task.status}</td>
                <td className="p-4">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>

                <td className="p-4 flex gap-2">
                  <Link
                    href={`/tasks/${task.id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-xl"
                  >
                    ✏ Edit
                  </Link>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-xl"
                  >
                    🗑 Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}