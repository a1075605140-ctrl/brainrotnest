export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <style>{`
        @keyframes brainrot-bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        @keyframes brainrot-cycle {
          0%, 28% { opacity: 1; }
          33%, 94% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes brainrot-cycle-2 {
          0%, 28% { opacity: 0; }
          33%, 61% { opacity: 1; }
          66%, 100% { opacity: 0; }
        }
        @keyframes brainrot-cycle-3 {
          0%, 61% { opacity: 0; }
          66%, 94% { opacity: 1; }
          100% { opacity: 0; }
        }
        .emoji-1 { animation: brainrot-cycle 2.4s ease-in-out infinite, brainrot-bounce 0.8s ease-in-out infinite; }
        .emoji-2 { animation: brainrot-cycle-2 2.4s ease-in-out infinite, brainrot-bounce 0.8s ease-in-out infinite 0.1s; }
        .emoji-3 { animation: brainrot-cycle-3 2.4s ease-in-out infinite, brainrot-bounce 0.8s ease-in-out infinite 0.2s; }
        @keyframes dots {
          0%, 20% { content: "."; }
          40% { content: ".."; }
          60%, 100% { content: "..."; }
        }
        .loading-dots::after {
          content: "...";
          animation: dots 1.5s steps(1, end) infinite;
        }
      `}</style>

      {/* Cycling emoji carousel */}
      <div className="relative h-24 w-24 mb-8" aria-hidden="true">
        <span className="emoji-1 absolute inset-0 flex items-center justify-center text-6xl">
          🧠
        </span>
        <span className="emoji-2 absolute inset-0 flex items-center justify-center text-6xl">
          💀
        </span>
        <span className="emoji-3 absolute inset-0 flex items-center justify-center text-6xl">
          🐊
        </span>
      </div>

      <p
        className="text-xl font-bold loading-dots"
        style={{ fontFamily: "var(--font-fredoka), cursive", color: "var(--color-text-muted)" }}
      >
        Loading brainrot
      </p>
    </div>
  );
}
