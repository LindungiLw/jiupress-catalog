"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Keyframe {
  t: number;
  x: number;
  y: number;
}

// ── Constants ─────────────────────────────────────────────────────────────
const TOTAL_MS = 22000;
const VIEW_W = 680;
const CX = VIEW_W / 2; // 340 – horizontal center

// The SVG viewBox for the animation track is 680 × 80.
// y = 80  → ground level  (figure off the bar)
// y = 0   → bar top level (figure walks on bar edge)
const KEYFRAMES: Keyframe[] = [
  { t: 0, x: -80, y: 80 }, // off-screen left, ground
  { t: 3000, x: -22, y: 80 }, // reach left stair base
  { t: 4200, x: 4, y: 40 }, // mid-stair climb
  { t: 5000, x: 14, y: 0 }, // on bar top, left edge
  { t: 8500, x: CX, y: 0 }, // centre (picks up book)
  { t: 14000, x: VIEW_W - 14, y: 0 }, // bar top, right edge
  { t: 15200, x: VIEW_W - 4, y: 40 }, // mid-stair descent
  { t: 16400, x: VIEW_W + 22, y: 80 }, // ground, right side
  { t: TOTAL_MS, x: VIEW_W + 80, y: 80 }, // off-screen right
];

// ── Helpers ────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

function getPos(elapsed: number): { x: number; y: number } {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const kA = KEYFRAMES[i],
      kB = KEYFRAMES[i + 1];
    if (elapsed >= kA.t && elapsed <= kB.t) {
      const span = kB.t - kA.t;
      const raw = (elapsed - kA.t) / span;
      const tE = i >= 2 && i <= 4 ? easeInOut(raw) : raw;
      return { x: lerp(kA.x, kB.x, tE), y: lerp(kA.y, kB.y, tE) };
    }
  }
  return { x: VIEW_W + 80, y: 80 };
}

function getSpeed(elapsed: number): number {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const kA = KEYFRAMES[i],
      kB = KEYFRAMES[i + 1];
    if (elapsed >= kA.t && elapsed <= kB.t) {
      const span = kB.t - kA.t;
      return Math.abs(kB.x - kA.x) / (span / 1000);
    }
  }
  return 0;
}

// ── Component ──────────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const [query, setQuery] = useState("");
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const walkRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const blinkPhaseRef = useRef(0);
  const lastTsRef = useRef(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim())
      window.location.href = `/katalog?q=${encodeURIComponent(query)}`;
  };

  // ── SVG refs (populated after mount) ───────────────────────────────────
  const $ = useCallback(
    <T extends SVGElement>(id: string) =>
      svgRef.current?.getElementById(id) as T | null,
    [],
  );

  // ── Animation loop ─────────────────────────────────────────────────────
  const animate = useCallback(
    (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % TOTAL_MS;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const { x, y } = getPos(elapsed);
      const onBar = elapsed >= 5000 && elapsed <= 14000;
      const speed = getSpeed(elapsed);
      const moving = speed > 5;

      // ── position figure ────────────────────────────────────────────────
      const fig = $<SVGGElement>("fig");
      if (fig) fig.setAttribute("transform", `translate(${x},${y})`);

      const shadow = $<SVGEllipseElement>("shadow");
      if (shadow) {
        shadow.setAttribute("cy", String(80 - y));
        shadow.setAttribute("rx", onBar ? "7" : "10");
        shadow.setAttribute("opacity", onBar ? "0.08" : "0.13");
      }

      // ── walk cycle ─────────────────────────────────────────────────────
      if (moving) walkRef.current += dt * 0.005;
      const wS = Math.sin(walkRef.current * Math.PI * 2);
      const legSwing = moving ? 14 * wS : 0;

      const legR = $<SVGLineElement>("leg-r");
      const legL = $<SVGLineElement>("leg-l");
      if (legR) legR.setAttribute("x2", String(legSwing));
      if (legL) legL.setAttribute("x2", String(-legSwing));

      const armR = $<SVGLineElement>("arm-r");
      const armL = $<SVGLineElement>("arm-l");
      const armSwing = moving ? 10 * wS : 3;
      if (armR) armR.setAttribute("x2", String(9 - armSwing * 0.8));
      if (armL) armL.setAttribute("x2", String(-9 + armSwing * 0.8));

      // ── book visibility ────────────────────────────────────────────────
      const nearCenter = elapsed >= 7000 && elapsed <= 12000;
      const bk = $<SVGGElement>("book");
      const bkGlow = $<SVGGElement>("book-glow");
      const bkFloatY = nearCenter
        ? Math.abs(x - CX) < 30
          ? 5 + Math.sin(ts * 0.003) * 2
          : -8
        : -8;
      if (bk) {
        bk.setAttribute("opacity", nearCenter ? "1" : "0");
        bk.setAttribute("transform", `translate(${x},${y - 28 + bkFloatY})`);
      }
      if (bkGlow) {
        bkGlow.setAttribute("opacity", nearCenter ? "1" : "0");
        const gc = bkGlow.querySelector("circle");
        if (gc) {
          gc.setAttribute("cx", String(x));
          gc.setAttribute("cy", String(y - 28 + bkFloatY));
        }
      }

      // ── stairs visibility ──────────────────────────────────────────────
      const ls = $<SVGGElement>("left-stairs");
      if (ls) {
        const op =
          elapsed > 2000 && elapsed < 5500
            ? Math.min(1, (elapsed - 2000) / 600) *
              Math.min(1, (5500 - elapsed) / 400)
            : 0;
        ls.setAttribute("opacity", op.toFixed(2));
      }
      const rs = $<SVGGElement>("right-stairs");
      if (rs) {
        const op =
          elapsed > 13500 && elapsed < 17000
            ? Math.min(1, (elapsed - 13500) / 600) *
              Math.min(1, (17000 - elapsed) / 400)
            : 0;
        rs.setAttribute("opacity", op.toFixed(2));
      }

      // ── blink ──────────────────────────────────────────────────────────
      blinkTimerRef.current += dt;
      if (!isBlinkingRef.current && blinkTimerRef.current > 2800) {
        isBlinkingRef.current = true;
        blinkPhaseRef.current = 0;
        blinkTimerRef.current = 0;
      }
      if (isBlinkingRef.current) {
        blinkPhaseRef.current += dt;
        const bp = blinkPhaseRef.current;
        const scaleY =
          bp < 60
            ? lerp(1, 0.1, bp / 60)
            : bp < 120
              ? lerp(0.1, 1, (bp - 60) / 60)
              : 1;
        [$<SVGEllipseElement>("eye-r"), $<SVGEllipseElement>("eye-l")].forEach(
          (e) => {
            e?.setAttribute("ry", (3 * scaleY).toFixed(2));
          },
        );
        if (bp > 120) isBlinkingRef.current = false;
      }

      // ── smile boost near book ──────────────────────────────────────────
      const smileEl = $<SVGPathElement>("smile");
      if (smileEl) {
        smileEl.setAttribute(
          "d",
          nearCenter && Math.abs(x - CX) < 60
            ? "M -5 25 Q 0 31 5 25"
            : "M -4 25 Q 0 29 4 25",
        );
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    [$],
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <section
      id="hero-search"
      className="relative min-h-[560px] w-full flex flex-col items-center justify-center overflow-hidden bg-[#f8fafc] px-6 pb-28 pt-20 font-[Plus_Jakarta_Sans,sans-serif]"
    >
      {/* ── BACKGROUND MODERN BLOBS (Biar terasa lebih hidup) ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#FFD32B]/15 blur-[80px] pointer-events-none"></div>

      {/* Radial hero glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,45,107,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Headline (Font dikecilkan jadi maks 56px) ── */}
      <div className="relative z-10 mb-8 text-center mt-8">
        <h1
          className="mb-3 text-[clamp(32px,5vw,56px)] font-black leading-[1.1] tracking-tight text-[#1e2d6b]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Cari Ilmu.{" "}
          <span className="relative inline-block text-[#e6b800]">
            Cepat.
            <span className="absolute bottom-1 left-0 right-0 h-1.5 rounded bg-[#FFD32B] scale-x-[0.85] origin-left" />
          </span>
        </h1>
        <p className="mx-auto max-w-md text-[clamp(14px,1.5vw,16px)] font-medium leading-relaxed text-[#1e2d6b]/60">
          Akses ribuan koleksi perpustakaan JIU University dalam satu tempat
          dengan mudah.
        </p>
      </div>

      {/* ── Search stage ── */}
      <div className="relative z-10 w-full max-w-[680px]">
        {/* Animation track — sits flush on top of search bar */}
        <div className="relative h-20 w-full">
          <svg
            ref={svgRef}
            viewBox="0 0 680 80"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── Left stairs ── */}
            <g id="left-stairs" opacity="0">
              <rect
                x="-48"
                y="56"
                width="52"
                height="24"
                rx="3"
                fill="#e8eaf4"
                stroke="#d0d3e8"
                strokeWidth="0.8"
              />
              <rect
                x="-22"
                y="40"
                width="26"
                height="40"
                rx="3"
                fill="#eef0f7"
                stroke="#d0d3e8"
                strokeWidth="0.8"
              />
            </g>

            {/* ── Right stairs ── */}
            <g id="right-stairs" opacity="0">
              <rect
                x="676"
                y="40"
                width="26"
                height="40"
                rx="3"
                fill="#eef0f7"
                stroke="#d0d3e8"
                strokeWidth="0.8"
              />
              <rect
                x="696"
                y="56"
                width="52"
                height="24"
                rx="3"
                fill="#e8eaf4"
                stroke="#d0d3e8"
                strokeWidth="0.8"
              />
            </g>

            {/* ── Book glow ── */}
            <g id="book-glow" opacity="0">
              <circle cx="340" cy="8" r="14" fill="#FFD32B" opacity="0.18" />
            </g>

            {/* ── Book icon ── */}
            <g id="book" opacity="0" transform="translate(340,8)">
              <rect
                x="-11"
                y="-8"
                width="22"
                height="16"
                rx="2"
                fill="#FFD32B"
                stroke="#e6b800"
                strokeWidth="1"
              />
              <line
                x1="-1"
                y1="-8"
                x2="-1"
                y2="8"
                stroke="#e6b800"
                strokeWidth="1.2"
              />
              <rect
                x="-9"
                y="-5"
                width="6"
                height="10"
                rx="1"
                fill="#fff"
                opacity="0.5"
              />
            </g>

            {/* ── Stick figure ── */}
            <g id="fig">
              {/* Shadow on ground */}
              <ellipse
                id="shadow"
                cx="0"
                cy="80"
                rx="10"
                ry="3"
                fill="rgba(30,45,107,0.12)"
              />

              {/* Legs */}
              <line
                id="leg-r"
                x1="0"
                y1="62"
                x2="6"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                id="leg-l"
                x1="0"
                y1="62"
                x2="-6"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Body */}
              <line
                x1="0"
                y1="35"
                x2="0"
                y2="62"
                stroke="#1e2d6b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Backpack */}
              <rect
                x="-10"
                y="37"
                width="9"
                height="14"
                rx="2.5"
                fill="#FFD32B"
                stroke="#e6b800"
                strokeWidth="1"
              />
              <rect
                x="-9"
                y="48"
                width="7"
                height="3"
                rx="1"
                fill="#e6b800"
                opacity="0.6"
              />

              {/* Arms */}
              <line
                id="arm-r"
                x1="0"
                y1="42"
                x2="9"
                y2="55"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                id="arm-l"
                x1="0"
                y1="42"
                x2="-9"
                y2="55"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Neck */}
              <line
                x1="0"
                y1="28"
                x2="0"
                y2="35"
                stroke="#1e2d6b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Head */}
              <circle cx="0" cy="21" r="13" fill="#1e2d6b" />
              <circle cx="11" cy="21" r="3" fill="#2d3f8e" />
              <circle cx="-11" cy="21" r="3" fill="#2d3f8e" />

              {/* Eyes */}
              <ellipse id="eye-r" cx="4" cy="20" rx="2.2" ry="3" fill="#fff" />
              <ellipse id="eye-l" cx="-4" cy="20" rx="2.2" ry="3" fill="#fff" />
              <circle id="pupil-r" cx="4.5" cy="20.5" r="1.2" fill="#1e2d6b" />
              <circle id="pupil-l" cx="-3.5" cy="20.5" r="1.2" fill="#1e2d6b" />

              {/* Smile */}
              <path
                id="smile"
                d="M -4 25 Q 0 29 4 25"
                stroke="#fff"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* ── Search bar ── */}
        <form
          onSubmit={handleSearch}
          className="relative z-10 flex h-[72px] w-full items-center rounded-[20px] border border-[#1e2d6b]/12 bg-white p-2 pl-6 shadow-[0_8px_32px_rgba(30,45,107,0.10),0_1.5px_4px_rgba(30,45,107,0.06)] transition-all focus-within:border-[#1e2d6b] focus-within:shadow-[0_8px_40px_rgba(30,45,107,0.16)]"
        >
          <span className="mr-3.5 flex-shrink-0 text-[#1e2d6b]/35">
            <Search size={22} strokeWidth={2.2} />
          </span>
          <input
            id="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari koleksi, jurnal, atau penulis…"
            className="w-full flex-1 bg-transparent text-base font-semibold text-[#1e2d6b] outline-none placeholder:font-normal placeholder:text-[#1e2d6b]/38"
          />
          <button
            type="submit"
            className="flex h-[52px] flex-shrink-0 items-center gap-2 rounded-[14px] bg-[#1e2d6b] px-7 text-[15px] font-bold text-white transition-all hover:bg-[#2d3f8e] active:scale-[0.97]"
          >
            <Search size={16} strokeWidth={2.5} />
            Cari
          </button>
        </form>

        {/* ── Hint chips ── */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            "Basis Data",
            "Kecerdasan Buatan",
            "Hukum Bisnis",
            "Statistika",
          ].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setQuery(chip)}
              className="rounded-full bg-white/60 border border-[#1e2d6b]/5 px-4 py-1.5 text-[13px] font-semibold text-[#1e2d6b]/60 transition-all hover:bg-[#1e2d6b]/10 hover:text-[#1e2d6b]"
            >
              {chip}
            </button>
          ))}
        </div>

        <p className="mt-5 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-[#1e2d6b]/40">
          5.000 koleksi tersedia
        </p>
      </div>

      {/* ── Wave divider ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full leading-none z-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-12 w-full fill-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
