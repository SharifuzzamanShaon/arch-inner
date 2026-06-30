"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const BAT =
  "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD.";
const DIU = "/images/DIU";
const FERV =
  "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION";
const DBPLC = "/images/DBPlc%20Kalatia%20Branch%20Presentation";
const IELTS = "/images/IELTS";

const slides = [
  {
    src: `${BAT}/VIEW%20FROM%20ENTRY%20GATE.png`,
    label: "BAT Farmer Station · Kushtia",
    tag: "Exterior",
  },
  {
    src: `${FERV}/RECEPTION.png`,
    label: "Fervent Chairman Floor · Dhaka",
    tag: "Reception",
  },
  {
    src: `${DIU}/DEAN%20ROOM.png`,
    label: "University of Dhaka · Interior",
    tag: "Dean's Suite",
  },
  {
    src: `${IELTS}/WORKING%20ZONE.png`,
    label: "Servisol ITES · Khilkhet",
    tag: "Workspace",
  },
  {
    src: `${DBPLC}/image.png`,
    label: "Dhaka Bank PLC · Kalatia",
    tag: "Branch Interior",
  },
  {
    src: `${BAT}/FARMERS%20LOUNGE%20COURTYARD%20ARCHEGROUND%20LTD.png`,
    label: "BAT Farmer Station · Kushtia",
    tag: "Courtyard",
  },
  {
    src: `${FERV}/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png`,
    label: "Fervent Chairman Floor · Dhaka",
    tag: "Chairman's Room",
  },
  {
    src: `${DIU}/CONFERENCE%20ROOM.png`,
    label: "University of Dhaka · Interior",
    tag: "Conference Room",
  },
  {
    src: `${IELTS}/WAITING%20AREA%20OP-1.png`,
    label: "Servisol ITES · Khilkhet",
    tag: "Waiting Area",
  },
  {
    src: `${DBPLC}/image%20copy.png`,
    label: "Dhaka Bank PLC · Kalatia",
    tag: "Banking Floor",
  },
  {
    src: `${BAT}/LOUNGE%20INTERIOR.png`,
    label: "BAT Farmer Station · Kushtia",
    tag: "Lounge Interior",
  },
  {
    src: `${IELTS}/DIRECTORS%20RM%20FRONT.png`,
    label: "Servisol ITES · Khilkhet",
    tag: "Director's Room",
  },
];

const INTERVAL = 6000;

// Cinematic Ken Burns — slow camera-like pan/zoom for video feel
const KB = [
  // Slow pull-back: zooms out from close-up, slight upward drift
  (el) =>
    gsap.fromTo(
      el,
      { scale: 1.12, x: "1.5%", y: "1%" },
      { scale: 1.0, x: "0%", y: "-0.5%", duration: 8, ease: "power1.inOut" },
    ),
  // Slow pan across: lateral camera move with gentle zoom
  (el) =>
    gsap.fromTo(
      el,
      { scale: 1.07, x: "4%", y: "0.5%" },
      { scale: 1.04, x: "-4%", y: "-0.5%", duration: 8, ease: "power1.inOut" },
    ),
  // Slow push-in: zooms into the scene from wide, slight rightward drift
  (el) =>
    gsap.fromTo(
      el,
      { scale: 1.0, x: "-1.5%", y: "0.5%" },
      { scale: 1.12, x: "0.5%", y: "-1%", duration: 8, ease: "power1.inOut" },
    ),
  // Diagonal drift: camera drifts diagonally like a floating drone shot
  (el) =>
    gsap.fromTo(
      el,
      { scale: 1.06, x: "-3%", y: "2%" },
      { scale: 1.1, x: "1.5%", y: "-1.5%", duration: 8, ease: "none" },
    ),
];

export default function HeroImageCarousel({ fullWidth = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const slideEls = useRef([]);
  const kbEls = useRef([]);
  const labelRef = useRef(null);
  const kbTween = useRef(null);
  const timerRef = useRef(null);
  const didMount = useRef(false);
  const taglineWordsRef = useRef([]);
  const progressRef = useRef(null);
  const progressTween = useRef(null);

  const goTo = useCallback((nextIdx) => {
    const prevIdx = activeRef.current;
    if (nextIdx === prevIdx) return;

    const prevSlide = slideEls.current[prevIdx];
    const nextSlide = slideEls.current[nextIdx];
    const nextKb = kbEls.current[nextIdx];
    const prevKb = kbEls.current[prevIdx];

    kbTween.current?.kill();

    // Place incoming behind outgoing, invisible, with KB start position
    gsap.set(nextSlide, { zIndex: 3, opacity: 0, x: "0%" });
    gsap.set(nextKb, { scale: 1.12, x: "1.5%", y: "1%" });

    // Start Ken Burns on incoming immediately so it's in motion when it fades in
    kbTween.current = KB[nextIdx % KB.length](nextKb);

    // Cinematic crossfade: incoming fades in over outgoing
    gsap.to(nextSlide, {
      opacity: 1,
      duration: 1.8,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(prevSlide, { opacity: 0, zIndex: 1, x: "0%" });
        gsap.set(nextSlide, { zIndex: 2 });
      },
    });

    // Outgoing continues its KB motion and fades out (no jump, smooth dissolve)
    gsap.to(prevSlide, {
      opacity: 0,
      duration: 1.8,
      ease: "power2.inOut",
    });

    // Subtle push-out on outgoing KB (camera continues moving as scene dissolves)
    gsap.to(prevKb, {
      scale: "+=0.04",
      duration: 1.8,
      ease: "power2.in",
    });

    // SplitText: animate out current label chars
    if (labelRef.current) {
      const splitOut = new SplitText(labelRef.current, { type: "chars" });
      gsap.to(splitOut.chars, {
        y: -6,
        opacity: 0,
        duration: 0.28,
        stagger: 0.02,
        ease: "power2.in",
        onComplete: () => {
          splitOut.revert();
          activeRef.current = nextIdx;
          setActiveIndex(nextIdx);
        },
      });
    } else {
      activeRef.current = nextIdx;
      setActiveIndex(nextIdx);
    }
  }, []);

  // SplitText animate-in whenever activeIndex updates
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!labelRef.current) return;

    const split = new SplitText(labelRef.current, { type: "chars" });
    const tween = gsap.fromTo(
      split.chars,
      { y: 7, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.035,
        ease: "power3.out",
        onComplete: () => split.revert(),
      },
    );
    return () => {
      tween.kill();
      split.revert();
    };
  }, [activeIndex]);

  const startProgress = useCallback(() => {
    if (!progressRef.current) return;
    progressTween.current?.kill();
    gsap.set(progressRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    progressTween.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: INTERVAL / 1000,
      ease: "none",
    });
  }, []);

  const next = useCallback(() => {
    goTo((activeRef.current + 1) % slides.length);
  }, [goTo]);

  // Restart progress bar whenever slide changes
  useEffect(() => {
    startProgress();
  }, [activeIndex, startProgress]);

  // Bootstrap
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText);

    // Init slides — first visible, rest hidden
    slideEls.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        zIndex: i === 0 ? 2 : 1,
        x: "0%",
      });
    });

    // Init Ken Burns elements
    kbEls.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 1.12, x: "1.5%", y: "1%" });
    });

    // Start KB on slide 0
    if (kbEls.current[0]) {
      kbTween.current = KB[0](kbEls.current[0]);
    }

    // Animate tagline words in on mount
    const words = taglineWordsRef.current.filter(Boolean);
    gsap.fromTo(
      words,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        stagger: 0.14,
        ease: "power3.out",
        delay: 0.7,
      },
    );

    timerRef.current = setInterval(next, INTERVAL);

    return () => {
      clearInterval(timerRef.current);
      kbTween.current?.kill();
      progressTween.current?.kill();
    };
  }, [next]);

  return (
    <div className={`carousel-root${fullWidth ? " full-width" : ""}`}>
      {/* Tag label */}
      <div className="top-bar">
        <span ref={labelRef} className="top-label">
          {slides[activeIndex].tag}
        </span>
      </div>

      {/* Stage */}
      <div className="stage">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            className="slide"
          >
            {/* Ken Burns wrapper — slightly oversized for pan/scale headroom */}
            <div
              ref={(el) => {
                kbEls.current[i] = el;
              }}
              className="kb"
            >
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                className="object-cover grayscale"
                sizes={fullWidth ? "100vw" : "(max-width: 768px) 100vw, 560px"}
                priority={i === 0}
              />
            </div>
          </div>
        ))}

        <div className="gradient" />

        {/* Video-style progress bar */}
        <div className="progress-track">
          <div ref={progressRef} className="progress-fill" />
        </div>

        {/* Tagline */}
        <div className="tagline">
          {["Think", "Design", "Build"].map((word, i) => (
            <span
              key={word}
              ref={(el) => {
                taglineWordsRef.current[i] = el;
              }}
              className="tword"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .carousel-root {
          position: relative;
          width: 100%;
          max-width: 560px;
          border-radius: 20px;
          overflow: hidden;
          background: #1a1918;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.35);
        }
        .carousel-root.full-width {
          max-width: 100%;
          border-radius: 0;
          box-shadow: none;
        }

        /* Stage */
        .stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }
        .carousel-root.full-width .stage {
          aspect-ratio: unset;
          height: 100vh;
          height: 100dvh;
        }

        /* Mobile: show the full landscape image instead of a full-height crop */
        @media (max-width: 767px) {
          .carousel-root.full-width .stage {
            height: auto;
            aspect-ratio: 16 / 9;
          }
        }

        /* Individual slide */
        .slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          will-change: clip-path, opacity;
        }

        /* Ken Burns wrapper — extra 12% on all sides for movement headroom */
        .kb {
          position: absolute;
          top: -6%;
          left: -6%;
          width: 112%;
          height: 112%;
          will-change: transform;
        }

        /* Overlay gradient — darkens top for tag + bottom for tagline */
        .gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 14, 13, 0.5) 0%,
            transparent 35%,
            transparent 50%,
            rgba(15, 14, 13, 0.65) 100%
          );
          z-index: 10;
          pointer-events: none;
        }

        /* Tagline */
        .tagline {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 15;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: flex-end;
          gap: 0 0.9em;
          padding: 0 18px 44px;
          pointer-events: none;
        }
        .carousel-root.full-width .tagline {
          padding: 0 32px 72px;
        }

        .tword {
          display: inline-block;
          font-size: clamp(2.6rem, 8vw, 6rem);
          font-weight: 500;
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: #fff;
          opacity: 0;
          white-space: nowrap;
        }

        /* Tag label — bottom left */
        .top-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          padding: 16px 18px;
        }
        .carousel-root.full-width .top-bar {
          padding: 28px 32px;
        }

        .top-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
        }

        /* Video progress bar */
        .progress-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.12);
          z-index: 20;
          pointer-events: none;
        }
        .progress-fill {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.7);
          transform-origin: left center;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
}
