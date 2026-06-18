"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (
          Array.isArray(data.projects)
        ) {
          setProjects(data.projects);
        }
      });
  }, []);

  async function deleteProject(
    id: string
  ) {
    const confirmed = confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    const res = await fetch(
      `/api/projects/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      setProjects(
        projects.filter(
          (project) =>
            project.id !== id
        )
      );
    } else {
      alert(
        "Failed to delete project"
      );
    }
  }

  return (
    <div className="min-h-screen p-10 text-white">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          🚀 Projects
        </h1>

        <Link
          href="/projects/create"
          className="
          bg-green-500
          hover:bg-green-600
          px-5
          py-3
          rounded-2xl
          font-semibold
          transition
          shadow-lg
          "
        >
          ➕ Create Project
        </Link>

      </div>

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        overflow-hidden
        shadow-2xl
        "
      >
        <table className="w-full">

          <thead>
            <tr className="bg-white/10">

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Start Date
              </th>

              <th className="p-4 text-left">
                End Date
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {projects.map(
              (project) => (
                <tr
                  key={project.id}
                  className="
                  border-t
                  border-white/10
                  hover:bg-white/5
                  transition
                  "
                >
                  <td className="p-4">
                    {project.name}
                  </td>

                  <td className="p-4">
                    {project.status}
                  </td>

                  <td className="p-4">
                    {new Date(
                      project.startDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(
                      project.endDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4 flex gap-2">

                    <Link
                      href={`/projects/${project.id}`}
                      className="
                      bg-blue-500
                      hover:bg-blue-600
                      px-3
                      py-1
                      rounded-xl
                      transition
                      "
                    >
                      👁 View
                    </Link>

                    <Link
                      href={`/projects/${project.id}/edit`}
                      className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      px-3
                      py-1
                      rounded-xl
                      transition
                      "
                    >
                      ✏ Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProject(
                          project.id
                        )
                      }
                      className="
                      bg-red-500
                      hover:bg-red-600
                      px-3
                      py-1
                      rounded-xl
                      transition
                      "
                    >
                      🗑 Delete
                    </button>

                  </td>
                </tr>
              )
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}