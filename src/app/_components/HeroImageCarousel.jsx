"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const BAT    = "/images/BAT%20KUSHTIA_BD-FARMER%20WAITING%20STATION%20AND%20TRAINING%20CENTER%20AT%20MLD.";
const DIU    = "/images/DIU";
const FERV   = "/images/FERVENT%20CHAIRMAN%20FLOOR%20INTERIOR%20DESIGN%20PRESENTATION";
const DBPLC  = "/images/DBPlc%20Kalatia%20Branch%20Presentation";
const IELTS  = "/images/IELTS";

const slides = [
  { src: `${BAT}/VIEW%20FROM%20ENTRY%20GATE.png`,                          label: "BAT Farmer Station · Kushtia",       tag: "Exterior" },
  { src: `${FERV}/RECEPTION.png`,                                          label: "Fervent Chairman Floor · Dhaka",     tag: "Reception" },
  { src: `${DIU}/DEAN%20ROOM.png`,                                         label: "University of Dhaka · Interior",     tag: "Dean's Suite" },
  { src: `${IELTS}/WORKING%20ZONE.png`,                                    label: "Servisol ITES · Khilkhet",           tag: "Workspace" },
  { src: `${DBPLC}/image.png`,                                             label: "Dhaka Bank PLC · Kalatia",           tag: "Branch Interior" },
  { src: `${BAT}/FARMERS%20LOUNGE%20COURTYARD%20ARCHEGROUND%20LTD.png`,   label: "BAT Farmer Station · Kushtia",       tag: "Courtyard" },
  { src: `${FERV}/INTERIOR%20VIEW%20CHAIRMAN%20ROOM.png`,                 label: "Fervent Chairman Floor · Dhaka",     tag: "Chairman's Room" },
  { src: `${DIU}/CONFERENCE%20ROOM.png`,                                   label: "University of Dhaka · Interior",     tag: "Conference Room" },
  { src: `${IELTS}/WAITING%20AREA%20OP-1.png`,                            label: "Servisol ITES · Khilkhet",           tag: "Waiting Area" },
  { src: `${DBPLC}/image%20copy.png`,                                      label: "Dhaka Bank PLC · Kalatia",           tag: "Banking Floor" },
  { src: `${BAT}/LOUNGE%20INTERIOR.png`,                                   label: "BAT Farmer Station · Kushtia",       tag: "Lounge Interior" },
  { src: `${IELTS}/DIRECTORS%20RM%20FRONT.png`,                           label: "Servisol ITES · Khilkhet",           tag: "Director's Room" },
];


export default function HeroImageCarousel({ fullWidth = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className={`carousel-root${fullWidth ? " full-width" : ""}`}>
      {/* Top info bar — overlaid on the image */}
      <div className="top-bar">
        <span className="top-label">{slides[activeIndex].tag}</span>
      </div>

      {/* Image */}
      <div className="stage">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="h-full w-full"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i} className="h-full">
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                className="object-cover grayscale"
                sizes={fullWidth ? "100vw" : "(max-width: 768px) 100vw, 560px"}
                priority={i === 0}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Subtle top-to-bottom gradient so text stays legible */}
        <div className="gradient" />
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

        /* ── Stage ── */
        .stage {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }

        .carousel-root.full-width .stage {
          aspect-ratio: unset;
          height: clamp(260px, 75vh, 100vh);
        }

        .gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 14, 13, 0.45) 0%,
            transparent 30%
          );
          z-index: 2;
          pointer-events: none;
        }

        /* ── Top bar ── */
        .top-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        }

        .top-counter {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.06em;
        }

        .sep {
          color: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  );
}
