export default function GameBackground() {
  return (
    <>
      {/* Blue Glow */}

      <div
        className="
          fixed
          top-20
          left-10
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-600/20
          blur-[140px]
          pointer-events-none
        "
      />

      {/* Purple Glow */}

      <div
        className="
          fixed
          bottom-10
          right-10
          w-[500px]
          h-[500px]
          rounded-full
          bg-purple-600/20
          blur-[140px]
          pointer-events-none
        "
      />

      {/* Center Glow */}

      <div
        className="
          fixed
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[400px]
          h-[400px]
          rounded-full
          bg-indigo-600/10
          blur-[120px]
          pointer-events-none
        "
      />
    </>
  );
}