"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleRegister() {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        if (
          typeof data.error ===
          "string"
        ) {
          setError(data.error);
        } else if (
          data.error?.fieldErrors
        ) {
          const firstError =
            Object.values(
              data.error.fieldErrors
            )[0];

          setError(
            Array.isArray(firstError)
              ? String(firstError[0])
              : "Validation error"
          );
        } else {
          setError(
            "Registration failed"
          );
        }

        return;
      }

      alert(
        "Account created successfully!"
      );

      window.location.href =
        "/login";
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden">

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-10 animate-pulse -translate-x-1/2 -translate-y-1/2" />

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl z-10">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            🚀
          </div>

          <h1 className="text-3xl font-bold text-white">
            Start Your Quest
          </h1>

          <p className="text-gray-300 mt-2">
            Create your account and
            begin managing projects
            like a pro.
          </p>

        </div>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Start Adventure"}
          </button>

        </div>
      </div>
    </main>
  );
}