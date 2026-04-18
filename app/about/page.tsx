"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info, Target, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col font-[Poppins,sans-serif]">
      <Navbar />

      {/* ─── HERO SECTION ABOUT ─── */}
      <section className="relative pt-32 pb-20 px-[5%] bg-[#1e2d6b] overflow-hidden text-center">
        {/* Background Ornaments */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[10%] -left-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#FFD32B]/10 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto mt-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            About <span className="text-[#FFD32B]">JIU Press</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed font-medium">
            The official publication unit of Jakarta International University,
            dedicated to disseminating knowledge, academic works, and university
            identity through digital literacy.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full leading-none z-10 translate-y-[1px]">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="h-12 w-full fill-[#fcfcfc]"
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
          </svg>
        </div>
      </section>

      {/* ─── CORE VALUES SECTION ─── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group text-center">
              <div className="w-14 h-14 bg-[#f4f6fc] text-[#1e2d6b] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1e2d6b] group-hover:text-[#FFD32B] transition-all">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-black text-[#1e2d6b] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To become an innovative and trusted university publication
                platform on an international scale.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group text-center">
              <div className="w-14 h-14 bg-[#f4f6fc] text-[#1e2d6b] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1e2d6b] group-hover:text-[#FFD32B] transition-all">
                <Info size={28} />
              </div>
              <h3 className="text-xl font-black text-[#1e2d6b] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                To facilitate lecturers and students in publishing high-quality
                and easily accessible academic manuscripts.
              </p>
            </div>

            {/* Quality */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group text-center">
              <div className="w-14 h-14 bg-[#f4f6fc] text-[#1e2d6b] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#1e2d6b] group-hover:text-[#FFD32B] transition-all">
                <Award size={28} />
              </div>
              <h3 className="text-xl font-black text-[#1e2d6b] mb-4">
                Our Quality
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Prioritizing high standards in the editing, design, and printing
                process of every manuscript we handle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION (CTA) ─── */}
      <section className="pb-20 px-[5%]">
        <div className="max-w-5xl mx-auto bg-[#1e2d6b] rounded-[40px] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD32B] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <h2 className="text-3xl font-black text-white mb-6 relative z-10">
            Start Publishing With Us
          </h2>
          <div className="flex justify-center relative z-10">
            <a
              href="https://wa.me/6281234567890?text=Hello%20JIU%20Press%20Admin,%20I%20would%20like%20to%20inquire%20further%20about%20your%20publication%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#FFD32B] text-[#1e2d6b] px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-lg"
            >
              Contact Admin <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
