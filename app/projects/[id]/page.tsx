"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
}

export default function ProjectDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [project, setProject] =
    useState<Project | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data));
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10 text-white">
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-4">
          {project.name}
        </h1>

        <p className="text-gray-300 mb-6">
          {project.description}
        </p>

        <div className="space-y-2 mb-8">
          <p>
            <span className="font-semibold text-cyan-300">
              Status:
            </span>{" "}
            {project.status}
          </p>

          <p>
            <span className="font-semibold text-cyan-300">
              Start:
            </span>{" "}
            {new Date(
              project.startDate
            ).toLocaleDateString()}
          </p>

          <p>
            <span className="font-semibold text-cyan-300">
              End:
            </span>{" "}
            {new Date(
              project.endDate
            ).toLocaleDateString()}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Tasks
        </h2>

        <div className="bg-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-white">
            <thead>
              <tr className="bg-white/10 text-cyan-300">
                <th className="p-3">
                  Name
                </th>

                <th className="p-3">
                  Priority
                </th>

                <th className="p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {project.tasks.map(
                (task) => (
                  <tr
                    key={task.id}
                    className="border-t border-white/10"
                  >
                    <td className="p-3">
                      {task.name}
                    </td>

                    <td className="p-3">
                      {task.priority}
                    </td>

                    <td className="p-3">
                      {task.status}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}