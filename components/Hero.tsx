"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
interface KF {
  t: number;
  x: number;
  y: number;
}
type Phase = "climbL" | "climbR" | "walk";

// ── Constants ─────────────────────────────────────────────────────────────
const TOTAL_MS = 24000;
const VIEW_W = 680;
const CX = VIEW_W / 2;

// Timeline: y=80 = ground level, y=0 = bar top (figure feet)
const KEYFRAMES: KF[] = [
  { t: 0, x: -90, y: 80 },
  { t: 2800, x: -24, y: 80 }, // arrive at ladder base
  { t: 3500, x: -17, y: 57 }, // rung 1
  { t: 4200, x: -11, y: 36 }, // rung 2
  { t: 4900, x: -5, y: 15 }, // rung 3
  { t: 5500, x: 6, y: 0 }, // step onto bar top
  { t: 8500, x: CX, y: 0 }, // centre (picks up book)
  { t: 15000, x: VIEW_W - 6, y: 0 }, // right edge
  { t: 15700, x: VIEW_W + 5, y: 15 }, // rung 3
  { t: 16400, x: VIEW_W + 11, y: 36 }, // rung 2
  { t: 17100, x: VIEW_W + 17, y: 57 }, // rung 1
  { t: 17800, x: VIEW_W + 24, y: 80 }, // ground right
  { t: TOTAL_MS, x: VIEW_W + 90, y: 80 },
];

// ── Helpers ────────────────────────────────────────────────────────────────
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
  return { x: VIEW_W + 90, y: 80 };
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
  if (e >= 2800 && e <= 5500) return "climbL";
  if (e >= 15000 && e <= 17800) return "climbR";
  return "walk";
}

function calcKnee(fx: number, fy: number, side: number): [number, number] {
  const kx = fx * 0.42 + 2.5 * side;
  const midY = (-18 + fy) / 2;
  const extra = Math.abs(fx) * 0.14;
  return [kx, midY - 2.5 - extra];
}

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
      const moving = speed > 4;
      const phase = getPhase(elapsed);

      $<SVGGElement>("fig")?.setAttribute("transform", `translate(${x},${y})`);

      const shd = $<SVGEllipseElement>("shd");
      if (shd) {
        shd.setAttribute("cy", onBar ? "12" : "5");
        shd.setAttribute("rx", onBar ? "6" : "10");
        shd.setAttribute("opacity", onBar ? "0" : "0.14");
      }

      const walkSpeed = Math.min(speed / 90, 1);
      if (moving) walkRef.current += dt * 0.0042 * (0.4 + walkSpeed * 0.6);
      const W = walkRef.current * Math.PI * 2;
      const sinW = Math.sin(W);
      const cosW = Math.cos(W);

      const atPickup = elapsed >= 7800 && elapsed <= 10000;
      const carrying = elapsed >= 10000 && elapsed <= 15200;

      if (phase === "climbL" || phase === "climbR") {
        const dir = phase === "climbL" ? 1 : -1;
        const prog =
          phase === "climbL"
            ? (elapsed - 2800) / 2700
            : (elapsed - 15000) / 2800;
        const cs = Math.sin(prog * Math.PI * 5);

        const rKx = dir * 5 + cs * 4,
          rKy = -10 + Math.abs(cs) * 3;
        sl("rthigh", 0, -18, rKx, rKy);
        sl("rshin", rKx, rKy, dir * 3 + cs * 2, 0);
        sc("rknee", rKx, rKy);

        const lKx = -dir * 5 - cs * 4,
          lKy = -10 + Math.abs(cs) * 3;
        sl("lthigh", 0, -18, lKx, lKy);
        sl("lshin", lKx, lKy, -dir * 3 - cs * 2, 0);
        sc("lknee", lKx, lKy);

        const aS = Math.sin(prog * Math.PI * 5 + Math.PI);
        sl("ruarm", 0, -39, dir * 7, -46 + aS * 7);
        sl("rfarm", dir * 7, -46 + aS * 7, dir * 5, -37 + aS * 5);
        sc("relbow", dir * 7, -46 + aS * 7);
        sl("luarm", 0, -39, -dir * 7, -46 - aS * 7);
        sl("lfarm", -dir * 7, -46 - aS * 7, -dir * 5, -37 - aS * 5);
        sc("lelbow", -dir * 7, -46 - aS * 7);
      } else {
        const rFx = moving ? sinW * 9 : 3;
        const rLift = moving ? Math.max(0, sinW) * 6 : 0;
        const rFy = -rLift;

        const lFx = moving ? -sinW * 9 : -3;
        const lLift = moving ? Math.max(0, -sinW) * 6 : 0;
        const lFy = -lLift;

        const [rKx, rKy] = calcKnee(rFx, rFy, 1);
        const [lKx, lKy] = calcKnee(lFx, lFy, -1);

        sl("rthigh", 0, -18, rKx, rKy);
        sl("rshin", rKx, rKy, rFx, rFy);
        sc("rknee", rKx, rKy);
        sl("lthigh", 0, -18, lKx, lKy);
        sl("lshin", lKx, lKy, lFx, lFy);
        sc("lknee", lKx, lKy);

        if (carrying) {
          const holdBob = Math.sin(ts * 0.003) * 1.5;
          sl("ruarm", 0, -39, 12, -47 + holdBob);
          sl("rfarm", 12, -47 + holdBob, 15, -55 + holdBob);
          sc("relbow", 12, -47 + holdBob);
          const lSwing = moving ? cosW * 8 : 2;
          sl("luarm", 0, -39, -10, -31 + lSwing * 0.5);
          sl("lfarm", -10, -31 + lSwing * 0.5, -8, -23);
          sc("lelbow", -10, -31 + lSwing * 0.5);
        } else {
          const aSwing = moving ? cosW * 9 : 2;
          sl("ruarm", 0, -39, 11, -31 - aSwing * 0.5);
          sl("rfarm", 11, -31 - aSwing * 0.5, 9, -23);
          sc("relbow", 11, -31 - aSwing * 0.5);
          sl("luarm", 0, -39, -11, -31 + aSwing * 0.5);
          sl("lfarm", -11, -31 + aSwing * 0.5, -9, -23);
          sc("lelbow", -11, -31 + aSwing * 0.5);
        }
      }

      const bk = $<SVGGElement>("bk");
      const bg = $<SVGGElement>("bk-glow");
      const gc = bg?.querySelector("circle");

      if (atPickup) {
        const prog = clamp01((elapsed - 7800) / 2200);
        const floatY = lerp(-28, -56, eio(prog));
        const floatX = lerp(0, 15, eio(prog));
        bk?.setAttribute("opacity", "1");
        bg?.setAttribute("opacity", String(1 - prog * 0.5));
        bk?.setAttribute("transform", `translate(${x + floatX},${y + floatY})`);
        if (gc) {
          gc.setAttribute("cx", String(x + floatX));
          gc.setAttribute("cy", String(y + floatY));
        }
      } else if (carrying) {
        const holdBob = Math.sin(ts * 0.003) * 1.5;
        bk?.setAttribute("opacity", "1");
        bg?.setAttribute("opacity", "0");
        bk?.setAttribute(
          "transform",
          `translate(${x + 15},${y - 55 + holdBob})`,
        );
      } else {
        bk?.setAttribute("opacity", "0");
        bg?.setAttribute("opacity", "0");
      }

      const ll = $<SVGGElement>("lad-l");
      if (ll) {
        const op =
          elapsed > 2000 && elapsed < 5900
            ? clamp01((elapsed - 2000) / 600) * clamp01((5900 - elapsed) / 500)
            : 0;
        ll.setAttribute("opacity", op.toFixed(2));
      }
      const lr = $<SVGGElement>("lad-r");
      if (lr) {
        const op =
          elapsed > 14400 && elapsed < 18200
            ? clamp01((elapsed - 14400) / 600) *
              clamp01((18200 - elapsed) / 500)
            : 0;
        lr.setAttribute("opacity", op.toFixed(2));
      }

      blinkTimerRef.current += dt;
      if (!isBlinkingRef.current && blinkTimerRef.current > 3200) {
        isBlinkingRef.current = true;
        blinkPhaseRef.current = 0;
        blinkTimerRef.current = 0;
      }
      if (isBlinkingRef.current) {
        blinkPhaseRef.current += dt;
        const bp = blinkPhaseRef.current;
        const sc2 =
          bp < 60
            ? lerp(1, 0.06, bp / 60)
            : bp < 120
              ? lerp(0.06, 1, (bp - 60) / 60)
              : 1;
        [$<SVGEllipseElement>("eyr"), $<SVGEllipseElement>("eyl")].forEach(
          (e) => e?.setAttribute("ry", (3 * sc2).toFixed(2)),
        );
        if (bp > 120) isBlinkingRef.current = false;
      }

      $<SVGPathElement>("mouth")?.setAttribute(
        "d",
        carrying ? "M-5,-58 Q0,-51 5,-58" : "M-3.5,-58 Q0,-55 3.5,-58",
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
          Search Knowledge.{" "}
          <span className="relative inline-block text-[#e6b800]">
            Fast.
            <span className="absolute bottom-1 left-0 right-0 h-1.5 rounded bg-[#FFD32B] scale-x-[0.85] origin-left" />
          </span>
        </h1>
        <p className="mx-auto max-w-md text-[clamp(14px,1.5vw,16px)] font-bold leading-relaxed text-[#1e2d6b]/80 drop-shadow-sm">
          Access thousands of JIU University library collections in one place
          easily.
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
            id="search-input"
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

        <div className="absolute top-0 left-0 w-full pointer-events-none z-20">
          <svg
            ref={svgRef}
            viewBox="0 0 680 80"
            preserveAspectRatio="xMidYMid meet"
            className="w-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="lad-l" opacity="0">
              <line
                x1="-52"
                y1="80"
                x2="-8"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-38"
                y1="80"
                x2="6"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="-52"
                y1="80"
                x2="-38"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-40"
                y1="57.6"
                x2="-26"
                y2="57.6"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-28"
                y1="36"
                x2="-14"
                y2="36"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-16"
                y1="14.4"
                x2="-2"
                y2="14.4"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="-8"
                y1="2"
                x2="6"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="-52" cy="80" r="3.5" fill="#1e2d6b" />
              <circle cx="-38" cy="80" r="3.5" fill="#1e2d6b" />
            </g>

            <g id="lad-r" opacity="0">
              <line
                x1="732"
                y1="80"
                x2="688"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="718"
                y1="80"
                x2="674"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="718"
                y1="80"
                x2="732"
                y2="80"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="706"
                y1="57.6"
                x2="720"
                y2="57.6"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="694"
                y1="36"
                x2="708"
                y2="36"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="682"
                y1="14.4"
                x2="696"
                y2="14.4"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="674"
                y1="2"
                x2="688"
                y2="2"
                stroke="#1e2d6b"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="718" cy="80" r="3.5" fill="#1e2d6b" />
              <circle cx="732" cy="80" r="3.5" fill="#1e2d6b" />
            </g>

            <g id="bk-glow" opacity="0">
              <circle cx="340" cy="-20" r="18" fill="#FFD32B" opacity="0.2" />
            </g>

            <g id="bk" opacity="0" transform="translate(340,-20)">
              <rect
                x="-12"
                y="-9"
                width="24"
                height="18"
                rx="2.5"
                fill="#FFD32B"
                stroke="#d4a800"
                strokeWidth="1.2"
              />
              <line
                x1="-1.5"
                y1="-9"
                x2="-1.5"
                y2="9"
                stroke="#d4a800"
                strokeWidth="1.4"
              />
              <rect
                x="-10"
                y="-6"
                width="7"
                height="12"
                rx="1.2"
                fill="#fff"
                opacity="0.55"
              />
              <line
                x1="3"
                y1="-4"
                x2="9"
                y2="-4"
                stroke="#d4a800"
                strokeWidth="1"
              />
              <line
                x1="3"
                y1="0"
                x2="9"
                y2="0"
                stroke="#d4a800"
                strokeWidth="1"
              />
              <line
                x1="3"
                y1="4"
                x2="9"
                y2="4"
                stroke="#d4a800"
                strokeWidth="1"
              />
            </g>

            <g id="fig">
              <ellipse
                id="shd"
                cx="0"
                cy="5"
                rx="10"
                ry="3"
                fill="rgba(30,45,107,0.14)"
              />
              <line
                id="rthigh"
                x1="0"
                y1="-18"
                x2="8"
                y2="-9"
                stroke="#1e2d6b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                id="rshin"
                x1="8"
                y1="-9"
                x2="5"
                y2="0"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle id="rknee" cx="8" cy="-9" r="2.2" fill="#1e2d6b" />
              <line
                id="lthigh"
                x1="0"
                y1="-18"
                x2="-8"
                y2="-9"
                stroke="#1e2d6b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <line
                id="lshin"
                x1="-8"
                y1="-9"
                x2="-5"
                y2="0"
                stroke="#1e2d6b"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle id="lknee" cx="-8" cy="-9" r="2.2" fill="#1e2d6b" />
              <line
                x1="0"
                y1="-18"
                x2="0"
                y2="-46"
                stroke="#1e2d6b"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <rect
                x="-13"
                y="-44"
                width="10"
                height="16"
                rx="2.5"
                fill="#FFD32B"
                stroke="#d4a800"
                strokeWidth="1"
              />
              <rect
                x="-12"
                y="-31"
                width="8"
                height="3.5"
                rx="1"
                fill="#d4a800"
                opacity="0.55"
              />
              <line
                id="ruarm"
                x1="0"
                y1="-39"
                x2="11"
                y2="-31"
                stroke="#1e2d6b"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <line
                id="rfarm"
                x1="11"
                y1="-31"
                x2="9"
                y2="-23"
                stroke="#1e2d6b"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle id="relbow" cx="11" cy="-31" r="1.8" fill="#1e2d6b" />
              <line
                id="luarm"
                x1="0"
                y1="-39"
                x2="-11"
                y2="-31"
                stroke="#1e2d6b"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <line
                id="lfarm"
                x1="-11"
                y1="-31"
                x2="-9"
                y2="-23"
                stroke="#1e2d6b"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle id="lelbow" cx="-11" cy="-31" r="1.8" fill="#1e2d6b" />
              <line
                x1="0"
                y1="-46"
                x2="0"
                y2="-51"
                stroke="#1e2d6b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <circle cx="0" cy="-62" r="12" fill="#1e2d6b" />
              <line
                x1="-4"
                y1="-73"
                x2="-4"
                y2="-79"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="0"
                y1="-74"
                x2="0"
                y2="-81"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <line
                x1="4"
                y1="-73"
                x2="4"
                y2="-79"
                stroke="#1e2d6b"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <ellipse id="eyr" cx="4" cy="-63" rx="2" ry="3" fill="#fff" />
              <ellipse id="eyl" cx="-4" cy="-63" rx="2" ry="3" fill="#fff" />
              <circle id="pur" cx="4.6" cy="-62.5" r="1.2" fill="#1e2d6b" />
              <circle id="pul" cx="-3.4" cy="-62.5" r="1.2" fill="#1e2d6b" />
              <path
                id="mouth"
                d="M-3.5,-58 Q0,-55 3.5,-58"
                stroke="#fff"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Category chips */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 pb-8">
        {[
          { name: "Technology", icon: "💻" },
          { name: "Business", icon: "💼" },
          { name: "Law", icon: "⚖️" },
          { name: "Design", icon: "🎨" },
          { name: "Science", icon: "🧬" },
        ].map((cat) => (
          <button
            key={cat.name}
            type="button"
            onClick={() => {
              setQuery(cat.name);
              window.location.href = `/katalog?q=${encodeURIComponent(cat.name)}`;
            }}
            className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/50 px-5 py-2.5 text-[13px] font-bold text-[#1e2d6b]/90 transition-all hover:bg-[#1e2d6b] hover:text-white hover:border-[#1e2d6b] hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.05)] group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">
              {cat.icon}
            </span>
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
