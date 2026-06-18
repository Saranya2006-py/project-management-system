"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  projectsInProgress: number;
  overdueTasks: number;
}

export default function DashboardPage() {
  const [data, setData] =
    useState<DashboardData | null>(
      null
    );

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) =>
        setData(data)
      );
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  const taskData = [
    {
      name: "Completed",
      value: data.completedTasks,
    },
    {
      name: "Pending",
      value: data.pendingTasks,
    },
    {
      name: "Overdue",
      value: data.overdueTasks,
    },
  ];

  const projectData = [
    {
      name: "Projects",
      count: data.totalProjects,
    },
    {
      name: "In Progress",
      count:
        data.projectsInProgress,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  const cardStyle =
    "bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6";

  return (
    <div className="min-h-screen p-10 text-white">

      <h1 className="text-5xl font-bold mb-10">
        🎮 Mission Dashboard
      </h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className={cardStyle}>
          <h2 className="text-lg">
            🚀 Total Projects
          </h2>

          <p className="text-5xl font-bold mt-3">
            {data.totalProjects}
          </p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg">
            ⚡ Projects In Progress
          </h2>

          <p className="text-5xl font-bold mt-3">
            {data.projectsInProgress}
          </p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg">
            📋 Total Tasks
          </h2>

          <p className="text-5xl font-bold mt-3">
            {data.totalTasks}
          </p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg">
            🏆 Completed Tasks
          </h2>

          <p className="text-5xl font-bold mt-3 text-green-400">
            {data.completedTasks}
          </p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg">
            🚧 Pending Tasks
          </h2>

          <p className="text-5xl font-bold mt-3 text-yellow-400">
            {data.pendingTasks}
          </p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg">
            ⏰ Overdue Tasks
          </h2>

          <p className="text-5xl font-bold mt-3 text-red-400">
            {data.overdueTasks}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-6">
            📊 Task Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {taskData.map(
                  (
                    entry,
                    index
                  ) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={cardStyle}>
          <h2 className="text-2xl font-bold mb-6">
            🚀 Project Overview
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={projectData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#3b82f6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  );
}