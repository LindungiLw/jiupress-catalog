"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";

interface KF {
  t: number;
  x: number;
  y: number;
}
type Phase = "climb" | "climbR" | "walk";

// INTERFACE DIUPDATE: icon dihapus
export interface CategoryData {
  id: number;
  name: string;
}

const TOTAL_MS = 24000;
const VIEW_W = 680;
const CX = VIEW_W / 2;

const KEYFRAMES: KF[] = [
  { t: 0, x: -80, y: 80 },
  { t: 2800, x: -20, y: 80 },
  { t: 3500, x: -14, y: 60 },
  { t: 4200, x: -8, y: 40 },
  { t: 4900, x: -2, y: 20 },
  { t: 5500, x: 4, y: 0 },
  { t: 8500, x: CX, y: 0 },
  { t: 15000, x: VIEW_W - 4, y: 0 },
  { t: 15700, x: VIEW_W + 2, y: 20 },
  { t: 16400, x: VIEW_W + 8, y: 40 },
  { t: 17100, x: VIEW_W + 14, y: 60 },
  { t: 17800, x: VIEW_W + 20, y: 80 },
  { t: TOTAL_MS, x: VIEW_W + 80, y: 80 },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const eio = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function getPos(e: number) {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i],
      b = KEYFRAMES[i + 1];
    if (e >= a.t && e <= b.t) {
      const raw = (e - a.t) / (b.t - a.t);
      const ease = (i >= 1 && i <= 5) || (i >= 7 && i <= 11);
      const te = ease ? eio(raw) : raw;
      return { x: lerp(a.x, b.x, te), y: lerp(a.y, b.y, te) };
    }
  }
  return { x: VIEW_W + 80, y: 80 };
}

function getSpeed(e: number): number {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i],
      b = KEYFRAMES[i + 1];
    if (e >= a.t && e <= b.t) return Math.abs(b.x - a.x) / ((b.t - a.t) / 1000);
  }
  return 0;
}

function getPhase(e: number): Phase {
  if (e >= 2800 && e <= 5500) return "climb";
  if (e >= 15000 && e <= 17800) return "climbR";
  return "walk";
}

const Hero = ({ categories = [] }: { categories?: CategoryData[] }) => {
  const [query, setQuery] = useState("");

  // STATE BARU UNTUK SWIPER KATEGORI
  const [catIndex, setCatIndex] = useState(0);
  const [isHoveringCat, setIsHoveringCat] = useState(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const walkRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const isBlinkRef = useRef(false);
  const blinkPhaseRef = useRef(0);
  const lastTsRef = useRef(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim())
      window.location.href = `/katalog?q=${encodeURIComponent(query)}`;
  };

  // LOGIKA AUTO-SWIPE (Setiap 2 detik)
  useEffect(() => {
    // Jika kategori kurang dari 5 atau sedang di-hover, jangan auto-swipe
    if (!categories || categories.length <= 5 || isHoveringCat) return;

    const interval = setInterval(() => {
      setCatIndex((prev) => (prev + 1) % categories.length);
    }, 2000); // 2000ms = 2 detik

    return () => clearInterval(interval);
  }, [categories, isHoveringCat]);

  // Ambil maksimal 5 kategori saja untuk ditampilkan
  const visibleCategories =
    categories?.length <= 5
      ? categories
      : Array.from({ length: 5 }).map(
          (_, i) => categories[(catIndex + i) % categories.length],
        );

  const $ = useCallback(
    <T extends SVGElement>(id: string) =>
      svgRef.current?.getElementById(id) as T | null,
    [],
  );

  const sl = useCallback(
    (id: string, x1: number, y1: number, x2: number, y2: number) => {
      const el = $<SVGLineElement>(id);
      if (!el) return;
      el.setAttribute("x1", String(x1));
      el.setAttribute("y1", String(y1));
      el.setAttribute("x2", String(x2));
      el.setAttribute("y2", String(y2));
    },
    [$],
  );

  const sc = useCallback(
    (id: string, cx: number, cy: number) => {
      const el = $<SVGCircleElement>(id);
      if (el) {
        el.setAttribute("cx", String(cx));
        el.setAttribute("cy", String(cy));
      }
    },
    [$],
  );

  const animate = useCallback(
    (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % TOTAL_MS;
      const dt = Math.min(ts - lastTsRef.current, 50);
      lastTsRef.current = ts;

      const { x, y } = getPos(elapsed);
      const onBar = elapsed >= 5500 && elapsed <= 15000;
      const speed = getSpeed(elapsed);
      const moving = speed > 3;
      const phase = getPhase(elapsed);

      $<SVGGElement>("fig")?.setAttribute("transform", `translate(${x},${y})`);

      // Shadow
      const shd = $<SVGEllipseElement>("shd");
      if (shd) {
        shd.setAttribute("rx", onBar ? "5" : "9");
        shd.setAttribute("opacity", onBar ? "0" : "0.12");
      }

      if (moving) walkRef.current += dt * 0.004;
      const s = Math.sin(walkRef.current * Math.PI * 2);
      const c = Math.cos(walkRef.current * Math.PI * 2);

      const atPickup = elapsed >= 7800 && elapsed <= 10000;
      const carrying = elapsed >= 10000 && elapsed <= 15000;

      // ── CLIMBING ──────────────────────────────────────────────────────
      if (phase === "climb" || phase === "climbR") {
        const dir = phase === "climb" ? 1 : -1;
        const prog =
          phase === "climb"
            ? (elapsed - 2800) / 2700
            : (elapsed - 15000) / 2800;
        const cs = Math.sin(prog * Math.PI * 4);

        const rKx = dir * 5 + cs * 3;
        sl("rthigh", 2, -18, rKx, -10);
        sl("rshin", rKx, -10, dir * 3 + cs * 2, 0);
        sc("rknee", rKx, -10);
        const lKx = -dir * 5 - cs * 3;
        sl("lthigh", -2, -18, lKx, -10);
        sl("lshin", lKx, -10, -dir * 3 - cs * 2, 0);
        sc("lknee", lKx, -10);

        const aS = Math.sin(prog * Math.PI * 4 + Math.PI) * 0.6;
        sl("ruarm", 0, -36, dir * 8, -42 + aS * 5);
        sl("rfarm", dir * 8, -42 + aS * 5, dir * 6, -36 + aS * 3);
        sc("relbow", dir * 8, -42 + aS * 5);
        sl("luarm", 0, -36, -dir * 8, -42 - aS * 5);
        sl("lfarm", -dir * 8, -42 - aS * 5, -dir * 6, -36 - aS * 3);
        sc("lelbow", -dir * 8, -42 - aS * 5);

        // ── WALK — calm, low amplitude ─────────────────────────────────
      } else {
        const amp = moving ? 5 : 0;
        const lift = moving ? 4 : 0;

        // Right leg
        const rFx = 2 + s * amp;
        const rLift = moving ? Math.max(0, s) * lift : 0;
        const rKx = lerp(2, rFx, 0.5) + 1.5;
        const rKy = lerp(-18, 0, 0.5) - 2 - rLift * 0.3;
        sl("rthigh", 2, -18, rKx, rKy);
        sl("rshin", rKx, rKy, rFx, -rLift);
        sc("rknee", rKx, rKy);

        // Left leg
        const lFx = -2 - s * amp;
        const lLift = moving ? Math.max(0, -s) * lift : 0;
        const lKx = lerp(-2, lFx, 0.5) - 1.5;
        const lKy = lerp(-18, 0, 0.5) - 2 - lLift * 0.3;
        sl("lthigh", -2, -18, lKx, lKy);
        sl("lshin", lKx, lKy, lFx, -lLift);
        sc("lknee", lKx, lKy);

        // Arms — gentle swing only
        const armAmp = moving ? 5 : 0;
        if (carrying) {
          // Right arm holds book near chest
          sl("ruarm", 0, -36, 10, -40);
          sl("rfarm", 10, -40, 12, -48);
          sc("relbow", 10, -40);
          // Left arm: very light swing
          sl("luarm", 0, -36, -9, -29 + c * 2);
          sl("lfarm", -9, -29 + c * 2, -7, -22);
          sc("lelbow", -9, -29 + c * 2);
        } else {
          sl("ruarm", 0, -36, 9, -29 - c * armAmp * 0.4);
          sl("rfarm", 9, -29 - c * armAmp * 0.4, 7, -22);
          sc("relbow", 9, -29 - c * armAmp * 0.4);
          sl("luarm", 0, -36, -9, -29 + c * armAmp * 0.4);
          sl("lfarm", -9, -29 + c * armAmp * 0.4, -7, -22);
          sc("lelbow", -9, -29 + c * armAmp * 0.4);
        }
      }

      // ── BOOK ──────────────────────────────────────────────────────────
      const bk = $<SVGGElement>("bk");
      const bg = $<SVGGElement>("bk-glow");
      const gc = bg?.querySelector("circle");

      if (atPickup) {
        const p = clamp01((elapsed - 7800) / 2200);
        const bY = lerp(-22, -48, eio(p));
        const bX = lerp(0, 12, eio(p));
        bk?.setAttribute("opacity", "1");
        bg?.setAttribute("opacity", String(lerp(0.6, 0, eio(p))));
        bk?.setAttribute("transform", `translate(${x + bX},${y + bY})`);
        if (gc) {
          gc.setAttribute("cx", String(x + bX));
          gc.setAttribute("cy", String(y + bY));
        }
      } else if (carrying) {
        bk?.setAttribute("opacity", "1");
        bg?.setAttribute("opacity", "0");
        bk?.setAttribute("transform", `translate(${x + 12},${y - 48})`);
      } else {
        bk?.setAttribute("opacity", "0");
        bg?.setAttribute("opacity", "0");
      }

      // ── LADDERS ───────────────────────────────────────────────────────
      const ll = $<SVGGElement>("lad-l");
      if (ll) {
        const op =
          elapsed > 2000 && elapsed < 5900
            ? clamp01((elapsed - 2000) / 500) * clamp01((5900 - elapsed) / 400)
            : 0;
        ll.setAttribute("opacity", op.toFixed(2));
      }
      const lr = $<SVGGElement>("lad-r");
      if (lr) {
        const op =
          elapsed > 14400 && elapsed < 18200
            ? clamp01((elapsed - 14400) / 500) *
              clamp01((18200 - elapsed) / 400)
            : 0;
        lr.setAttribute("opacity", op.toFixed(2));
      }

      // ── BLINK ─────────────────────────────────────────────────────────
      blinkTimerRef.current += dt;
      if (!isBlinkRef.current && blinkTimerRef.current > 3500) {
        isBlinkRef.current = true;
        blinkPhaseRef.current = 0;
        blinkTimerRef.current = 0;
      }
      if (isBlinkRef.current) {
        blinkPhaseRef.current += dt;
        const bp = blinkPhaseRef.current;
        const scl =
          bp < 60
            ? lerp(1, 0.05, bp / 60)
            : bp < 120
              ? lerp(0.05, 1, (bp - 60) / 60)
              : 1;
        [$<SVGEllipseElement>("eyr"), $<SVGEllipseElement>("eyl")].forEach(
          (e) => e?.setAttribute("ry", (2.5 * scl).toFixed(2)),
        );
        if (bp > 120) isBlinkRef.current = false;
      }

      // Mouth: small smile always, bigger when carrying book
      $<SVGPathElement>("mouth")?.setAttribute(
        "d",
        carrying ? "M-3.5,-52 Q0,-49 3.5,-52" : "M-3,-52 Q0,-50 3,-52",
      );

      rafRef.current = requestAnimationFrame(animate);
    },
    [$, sl, sc],
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  return (
    <section
      id="hero-search"
      className="relative min-h-[560px] w-full flex flex-col items-center justify-center overflow-hidden px-6 pb-0 pt-20 font-[Poppins,sans-serif]"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/catalog.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
      </div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[#FFD32B]/25 blur-[80px] pointer-events-none z-0" />

      {/* Headline */}
      <div className="relative z-10 mb-6 text-center mt-8">
        <h1
          className="mb-3 text-[clamp(32px,5vw,56px)] font-black leading-[1.1] tracking-tight text-[#1e2d6b] drop-shadow-sm"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Dream Blue Library{" "}
        </h1>
        <p className="mx-auto max-w-md text-[clamp(14px,1.5vw,16px)] font-bold leading-relaxed text-[#1e2d6b]/80 drop-shadow-sm">
          Literacy Freely, Legacy Fully.
        </p>
      </div>

      {/* Search stage */}
      <div className="relative z-10 w-full max-w-[680px] mb-8">
        <form
          onSubmit={handleSearch}
          className="relative z-10 flex h-[72px] w-full items-center rounded-[20px] border border-[#1e2d6b]/12 bg-white/90 backdrop-blur-md p-2 pl-6 shadow-[0_8px_32px_rgba(30,45,107,0.15),0_1.5px_4px_rgba(30,45,107,0.08)] transition-all focus-within:border-[#1e2d6b] focus-within:shadow-[0_8px_40px_rgba(30,45,107,0.2)]"
        >
          <span className="mr-3.5 flex-shrink-0 text-[#1e2d6b]/40">
            <Search size={22} strokeWidth={2.2} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections, journals, or authors…"
            className="w-full flex-1 bg-transparent text-base font-semibold text-[#1e2d6b] outline-none placeholder:font-normal placeholder:text-[#1e2d6b]/50"
          />
          <button
            type="submit"
            className="flex h-[52px] flex-shrink-0 items-center gap-2 rounded-[14px] bg-[#1e2d6b] px-7 text-[15px] font-bold text-white transition-all hover:bg-[#2d3f8e] active:scale-[0.97] shadow-md"
          >
            Search
          </button>
        </form>

        {/* SVG overlay */}
        <div className="absolute top-0 left-0 w-full pointer-events-none z-20">
          <svg
            ref={svgRef}
            viewBox="0 0 680 80"
            preserveAspectRatio="xMidYMid meet"
            className="w-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left ladder — perspective leaning, near rail thicker */}
            <g id="lad-l" opacity="0">
              <line
                x1="-50"
                y1="80"
                x2="-12"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity={0.6}
              />
              <line
                x1="-34"
                y1="80"
                x2="2"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                x1="-50"
                y1="80"
                x2="-34"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-41"
                y1="61"
                x2="-25"
                y2="61"
                stroke="#1e2d6b"
                strokeWidth="1.9"
                strokeLinecap="round"
                opacity={0.85}
              />
              <line
                x1="-31"
                y1="41"
                x2="-16"
                y2="41"
                stroke="#1e2d6b"
                strokeWidth="1.7"
                strokeLinecap="round"
                opacity={0.75}
              />
              <line
                x1="-22"
                y1="21"
                x2="-7"
                y2="21"
                stroke="#1e2d6b"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.65}
              />
              <line
                x1="-12"
                y1="1"
                x2="2"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity={0.55}
              />
              <circle cx="-50" cy="80" r="3" fill="#1e2d6b" />
              <circle cx="-34" cy="80" r="3" fill="#1e2d6b" />
            </g>

            {/* Right ladder — mirrored */}
            <g id="lad-r" opacity="0">
              <line
                x1="730"
                y1="80"
                x2="692"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity={0.6}
              />
              <line
                x1="714"
                y1="80"
                x2="678"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                x1="714"
                y1="80"
                x2="730"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="705"
                y1="61"
                x2="721"
                y2="61"
                stroke="#1e2d6b"
                strokeWidth="1.9"
                strokeLinecap="round"
                opacity={0.85}
              />
              <line
                x1="696"
                y1="41"
                x2="711"
                y2="41"
                stroke="#1e2d6b"
                strokeWidth="1.7"
                strokeLinecap="round"
                opacity={0.75}
              />
              <line
                x1="687"
                y1="21"
                x2="702"
                y2="21"
                stroke="#1e2d6b"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity={0.65}
              />
              <line
                x1="678"
                y1="1"
                x2="692"
                y2="1"
                stroke="#1e2d6b"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity={0.55}
              />
              <circle cx="730" cy="80" r="3" fill="#1e2d6b" />
              <circle cx="714" cy="80" r="3" fill="#1e2d6b" />
            </g>

            {/* Book glow */}
            <g id="bk-glow" opacity="0">
              <circle
                id="gc"
                cx="340"
                cy="-18"
                r="16"
                fill="#FFD32B"
                opacity="0.15"
              />
            </g>

            {/* Book — simple, clean */}
            <g id="bk" opacity="0" transform="translate(340,-20)">
              <rect
                x="-10"
                y="-8"
                width="20"
                height="16"
                rx="2"
                fill="#FFD32B"
                stroke="#c49000"
                strokeWidth="1.2"
              />
              <line
                x1="0"
                y1="-8"
                x2="0"
                y2="8"
                stroke="#c49000"
                strokeWidth="1.4"
              />
              <rect
                x="-8"
                y="-5"
                width="6"
                height="10"
                rx="1"
                fill="#fff"
                opacity="0.4"
              />
            </g>

            {/* Stick figure — clean, minimal */}
            <g id="fig">
              <ellipse
                id="shd"
                cx="0"
                cy="4"
                rx="9"
                ry="2.5"
                fill="rgba(30,45,107,0.12)"
              />
              {/* Legs */}
              <line
                id="rthigh"
                x1="2"
                y1="-18"
                x2="7"
                y2="-9"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                id="rshin"
                x1="7"
                y1="-9"
                x2="4"
                y2="0"
                stroke="#1e2d6b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle id="rknee" cx="7" cy="-9" r="2" fill="#1e2d6b" />
              <line
                id="lthigh"
                x1="-2"
                y1="-18"
                x2="-7"
                y2="-9"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                id="lshin"
                x1="-7"
                y1="-9"
                x2="-4"
                y2="0"
                stroke="#1e2d6b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle id="lknee" cx="-7" cy="-9" r="2" fill="#1e2d6b" />
              {/* Body */}
              <line
                x1="0"
                y1="-18"
                x2="0"
                y2="-42"
                stroke="#1e2d6b"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Bag */}
              <rect
                x="-11"
                y="-40"
                width="8"
                height="13"
                rx="2.5"
                fill="#FFD32B"
                stroke="#c49000"
                strokeWidth="1"
              />
              {/* Arms */}
              <line
                id="ruarm"
                x1="0"
                y1="-36"
                x2="9"
                y2="-29"
                stroke="#1e2d6b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                id="rfarm"
                x1="9"
                y1="-29"
                x2="7"
                y2="-22"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle id="relbow" cx="9" cy="-29" r="1.6" fill="#1e2d6b" />
              <line
                id="luarm"
                x1="0"
                y1="-36"
                x2="-9"
                y2="-29"
                stroke="#1e2d6b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                id="lfarm"
                x1="-9"
                y1="-29"
                x2="-7"
                y2="-22"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <circle id="lelbow" cx="-9" cy="-29" r="1.6" fill="#1e2d6b" />
              {/* Neck */}
              <line
                x1="0"
                y1="-42"
                x2="0"
                y2="-46"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Head */}
              <circle cx="0" cy="-56" r="10" fill="#1e2d6b" />
              {/* Eyes */}
              <ellipse
                id="eyr"
                cx="3.5"
                cy="-57"
                rx="1.8"
                ry="2.5"
                fill="#fff"
              />
              <ellipse
                id="eyl"
                cx="-3.5"
                cy="-57"
                rx="1.8"
                ry="2.5"
                fill="#fff"
              />
              <circle id="pur" cx="4" cy="-56.5" r="1" fill="#1e2d6b" />
              <circle id="pul" cx="-3" cy="-56.5" r="1" fill="#1e2d6b" />
              {/* Mouth */}
              <path
                id="mouth"
                d="M-3,-52 Q0,-50 3,-52"
                stroke="#fff"
                strokeWidth="1.3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Category SWIPER */}
      <div
        className="relative z-10 flex flex-wrap justify-center gap-3 pb-8 min-h-[60px]"
        onMouseEnter={() => setIsHoveringCat(true)}
        onMouseLeave={() => setIsHoveringCat(false)}
      >
        {visibleCategories.map((cat, index) => (
          <button
            // Key ini penting agar animasi slide-in ter-trigger tiap kali daftar bergeser
            key={`${cat.id}-${catIndex}-${index}`}
            type="button"
            onClick={() => {
              setQuery(cat.name);
              window.location.href = `/katalog?category=${encodeURIComponent(cat.name)}`;
            }}
            className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 px-6 py-2.5 text-[14px] font-bold text-[#1e2d6b]/90 transition-all hover:bg-[#1e2d6b] hover:text-white hover:border-[#1e2d6b] hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.05)] animate-in fade-in slide-in-from-right-4 duration-500"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
