import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 2200);
    const t2 = setTimeout(() => onComplete(), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandLine {
          from { width: 0; }
          to   { width: 120px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }
        .animate-expandLine {
          animation: expandLine 1s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }
      `}</style>

      <div
        className={`
          fixed inset-0 z-50
          bg-[#1a1a1a]
          flex items-center justify-center
          transition-opacity duration-700
          ${fadeOut ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="flex flex-col items-center gap-4">

          {/* Logo */}
          <div
            className="animate-slideUp text-white font-bold tracking-tight"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 52,
              letterSpacing: -1,
            }}
          >
            Bytes.
          </div>

          {/* Line */}
          <div
            className="animate-expandLine h-px bg-[#444]"
          />

          {/* Tagline */}
          <div
            className="animate-fadeIn text-[#888] uppercase tracking-[3px] text-xs"
            style={{ fontFamily: "sans-serif" }}
          >
            where writers meet readers
          </div>

        </div>
      </div>
    </>
  );
};