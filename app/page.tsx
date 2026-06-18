import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center relative overflow-hidden">

      <div className="absolute w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 top-10 left-10" />

      <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 bottom-10 right-10" />

      <div className="text-center z-10 max-w-3xl px-6">

        <div className="mb-6 text-6xl">
          🚀
        </div>

        <h1 className="text-6xl font-bold text-white mb-4">
          Project Quest
        </h1>

        <p className="text-gray-300 text-xl mb-10">
          Level up your productivity.
          Manage projects, complete
          missions, and track progress
          like a pro.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Start Adventure
          </Link>

          <Link
            href="/login"
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-xl"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}