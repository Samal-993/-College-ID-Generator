// src/components/GlowButton.jsx
export default function GlowButton({ label }) {
  return (
    <button
      className="relative px-6 py-3 rounded-xl text-white font-semibold text-lg
                 backdrop-blur-md border border-white/20 bg-white/10
                 hover:bg-white/20 transition-all duration-300
                 shadow-[0_0_15px_rgba(255,255,255,0.35)]
                 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)]">
      {label}
    </button>
  );
}
