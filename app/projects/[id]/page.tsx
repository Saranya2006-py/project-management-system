"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

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
  const params =
    useParams();

  const id =
    params.id as string;

  const [project, setProject] =
    useState<Project | null>(
      null
    );

  useEffect(() => {
    fetch(
      `/api/projects/${id}`
    )
      .then((res) =>
        res.json()
      )
      .then((data) =>
        setProject(data)
      );
  }, [id]);

  if (!project) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        {project.name}
      </h1>

      <p className="mb-4">
        {
          project.description
        }
      </p>

      <div className="mb-6">
        <p>
          <strong>
            Status:
          </strong>{" "}
          {project.status}
        </p>

        <p>
          <strong>
            Start:
          </strong>{" "}
          {new Date(
            project.startDate
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>
            End:
          </strong>{" "}
          {new Date(
            project.endDate
          ).toLocaleDateString()}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Tasks
      </h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">
              Name
            </th>

            <th className="border p-2">
              Priority
            </th>

            <th className="border p-2">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {project.tasks.map(
            (task) => (
              <tr
                key={task.id}
              >
                <td className="border p-2">
                  {task.name}
                </td>

                <td className="border p-2">
                  {
                    task.priority
                  }
                </td>

                <td className="border p-2">
                  {
                    task.status
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}