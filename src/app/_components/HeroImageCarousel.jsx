"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const BAT   = "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD.";
const DIU   = "/images/DIU";
const FERV  = "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION";
const DBPLC = "/images/DBPlc%20Kalatia%20Branch%20Presentation";
const IELTS = "/images/IELTS";

const slides = [
  { src: `${BAT}/VIEW%20FROM%20ENTRY%20GATE.png`,                         label: "BAT Farmer Station · Kushtia",    tag: "Exterior" },
  { src: `${FERV}/RECEPTION.png`,                                         label: "Fervent Chairman Floor · Dhaka",  tag: "Reception" },
  { src: `${DIU}/DEAN%20ROOM.png`,                                        label: "University of Dhaka · Interior",  tag: "Dean's Suite" },
  { src: `${IELTS}/WORKING%20ZONE.png`,                                   label: "Servisol ITES · Khilkhet",        tag: "Workspace" },
  { src: `${DBPLC}/image.png`,                                            label: "Dhaka Bank PLC · Kalatia",        tag: "Branch Interior" },
  { src: `${BAT}/FARMERS%20LOUNGE%20COURTYARD%20ARCHEGROUND%20LTD.png`,  label: "BAT Farmer Station · Kushtia",    tag: "Courtyard" },
  { src: `${FERV}/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png`,                label: "Fervent Chairman Floor · Dhaka",  tag: "Chairman's Room" },
  { src: `${DIU}/CONFERENCE%20ROOM.png`,                                  label: "University of Dhaka · Interior",  tag: "Conference Room" },
  { src: `${IELTS}/WAITING%20AREA%20OP-1.png`,                           label: "Servisol ITES · Khilkhet",        tag: "Waiting Area" },
  { src: `${DBPLC}/image%20copy.png`,                                     label: "Dhaka Bank PLC · Kalatia",        tag: "Banking Floor" },
  { src: `${BAT}/LOUNGE%20INTERIOR.png`,                                  label: "BAT Farmer Station · Kushtia",    tag: "Lounge Interior" },
  { src: `${IELTS}/DIRECTORS%20RM%20FRONT.png`,                          label: "Servisol ITES · Khilkhet",        tag: "Director's Room" },
];

const INTERVAL = 5000;

// Ken Burns variants — animates the .kb inner wrapper
const KB = [
  (el) => gsap.fromTo(el,
    { scale: 1.0, x: "0%",   y: "0%"   },
    { scale: 1.09, x: "0%",  y: "-2%",  duration: 6.5, ease: "none" }
  ),
  (el) => gsap.fromTo(el,
    { scale: 1.05, x: "3.5%", y: "0%"  },
    { scale: 1.05, x: "-3.5%", y: "0%", duration: 6.5, ease: "none" }
  ),
  (el) => gsap.fromTo(el,
    { scale: 1.09, x: "2%",  y: "1.5%" },
    { scale: 1.0,  x: "0%",  y: "0%",   duration: 6.5, ease: "none" }
  ),
];

export default function HeroImageCarousel({ fullWidth = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef  = useRef(0);
  const slideEls   = useRef([]);
  const kbEls      = useRef([]);
  const labelRef   = useRef(null);
  const kbTween    = useRef(null);
  const timerRef        = useRef(null);
  const didMount        = useRef(false);
  const taglineWordsRef = useRef([]);

  const goTo = useCallback((nextIdx) => {
    const prevIdx   = activeRef.current;
    if (nextIdx === prevIdx) return;

    const prevSlide = slideEls.current[prevIdx];
    const nextSlide = slideEls.current[nextIdx];
    const nextKb    = kbEls.current[nextIdx];

    // Kill running Ken Burns
    kbTween.current?.kill();

    // Position incoming slide ready for wipe reveal
    gsap.set(nextSlide, { zIndex: 3, clipPath: "inset(0 100% 0 0)", opacity: 1 });

    // Wipe in — premium CustomEase cubic bezier
    gsap.to(nextSlide, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "arch.wipe",
      onComplete: () => {
        gsap.set(prevSlide, { opacity: 0, zIndex: 1 });
        gsap.set(nextSlide, { zIndex: 2 });
      },
    });

    // Outgoing slide fades behind the wipe
    gsap.to(prevSlide, { opacity: 0, duration: 0.7, delay: 1.0, ease: "power2.in" });

    // Ken Burns on incoming image
    kbTween.current = KB[nextIdx % 3](nextKb);

    // SplitText: animate out current label chars
    if (labelRef.current) {
      const splitOut = new SplitText(labelRef.current, { type: "chars" });
      gsap.to(splitOut.chars, {
        y: -7,
        opacity: 0,
        duration: 0.22,
        stagger: 0.025,
        ease: "power2.in",
        onComplete: () => {
          splitOut.revert();
          activeRef.current = nextIdx;
          setActiveIndex(nextIdx); // triggers useEffect to animate in
        },
      });
    } else {
      activeRef.current = nextIdx;
      setActiveIndex(nextIdx);
    }
  }, []);

  // SplitText animate-in whenever activeIndex updates
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
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
      }
    );
    return () => { tween.kill(); split.revert(); };
  }, [activeIndex]);

  const next = useCallback(() => {
    goTo((activeRef.current + 1) % slides.length);
  }, [goTo]);

  // Bootstrap
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("arch.wipe", "M0,0 C0.77,0 0.175,1 1,1");

    // Init slides — first visible, rest hidden
    slideEls.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, {
        opacity: i === 0 ? 1 : 0,
        zIndex:  i === 0 ? 2 : 1,
        clipPath: "inset(0 0% 0 0)",
      });
    });

    // Init Ken Burns elements
    kbEls.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 1, x: "0%", y: "0%" });
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
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.14, ease: "power3.out", delay: 0.7 }
    );

    timerRef.current = setInterval(next, INTERVAL);

    return () => {
      clearInterval(timerRef.current);
      kbTween.current?.kill();
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
            ref={(el) => { slideEls.current[i] = el; }}
            className="slide"
          >
            {/* Ken Burns wrapper — slightly oversized for pan/scale headroom */}
            <div
              ref={(el) => { kbEls.current[i] = el; }}
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

        {/* Tagline */}
        <div className="tagline">
          {["Think", "design", "build"].map((word, i) => (
            <span
              key={word}
              ref={(el) => { taglineWordsRef.current[i] = el; }}
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
          height: clamp(260px, 75vh, 100vh);
        }

        /* Mobile: match landscape image proportions so object-cover doesn't crop */
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
            rgba(15, 14, 13, 0.50) 0%,
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
          bottom: 20px;
          left: 0;
          right: 0;
          z-index: 15;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 0.35em;
          pointer-events: none;
        }
        .carousel-root.full-width .tagline {
          bottom: 32px;
        }

        .tword {
          display: inline-block;
          font-size: clamp(1.2rem, 3vw, 1.9rem);
          font-weight: 300;
          letter-spacing: 0.03em;
          color: rgba(255, 255, 255, 0.88);
          opacity: 0;
        }

        /* Top bar */
        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          padding: 16px 18px;
        }
        .carousel-root.full-width .top-bar {
          padding: 20px 32px;
        }

        .top-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
