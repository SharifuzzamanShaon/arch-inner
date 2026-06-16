"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoader() {
  const [phase, setPhase] = useState("visible"); // visible | hiding | hidden

  useEffect(() => {
    const hideTimer = setTimeout(() => setPhase("hiding"), 2200);
    const removeTimer = setTimeout(() => setPhase("hidden"), 3000);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="page-loader"
      data-phase={phase}
      aria-hidden="true"
    >
      <div className="loader-inner">
        <div className="logo-wrap">
          <Image
            src="/images/footer-logo.png"
            alt="Arch Inner"
            width={140}
            height={56}
            className="object-contain"
            priority
          />
        </div>

        <div className="progress-track">
          <span className="progress-fill" />
        </div>

        <p className="loader-label">Architecture &amp; Interior Design</p>
      </div>

      <style jsx>{`
        .page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0F0E0D;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .page-loader[data-phase="hiding"] {
          opacity: 0;
          transform: translateY(-100%);
        }

        .loader-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        /* Logo fade-up entrance */
        .logo-wrap {
          opacity: 0;
          transform: translateY(16px);
          animation: logoIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        @keyframes logoIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Thin progress bar */
        .progress-track {
          width: 200px;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
          opacity: 0;
          animation: trackIn 0.5s ease 0.7s forwards;
        }

        @keyframes trackIn {
          to { opacity: 1; }
        }

        .progress-fill {
          display: block;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #FE5443, #ff8a7e);
          border-radius: 1px;
          animation: fillProgress 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
        }

        @keyframes fillProgress {
          0%   { width: 0; opacity: 1; }
          70%  { width: 90%; opacity: 1; }
          90%  { width: 98%; opacity: 1; }
          100% { width: 100%; opacity: 0.6; }
        }

        /* Subtle label */
        .loader-label {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
          margin: 0;
          opacity: 0;
          animation: labelIn 0.8s ease 1s forwards;
        }

        @keyframes labelIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
