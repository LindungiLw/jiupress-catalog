"use client";

import React from "react";
import { ExternalLink, MapPin, Phone, Mail, ShieldCheck } from "lucide-react"; // <-- Instagram sudah dihapus dari sini supaya tidak error

const Footer = () => {
  return (
    <footer className="w-full bg-[#1e2d6b] text-white pt-20 pb-8 font-[Poppins,sans-serif] border-t-[5px] border-[#FFD32B]">
      <div className="mx-auto max-w-7xl px-[5%]">
        {/* ── FOOTER CONTAINER ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-12 mb-12">
          {/* Kolom 1: Logo & QR */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[1.8rem] font-extrabold text-white">
              Dream Blue{" "}
              <span className="font-light text-[#FFD32B]">Library</span>
            </h3>
            <p className="text-[#FFD32B] text-[0.95rem] font-semibold">
              Digital Library JIU
            </p>

            {/* QR Inline Section */}
            <div className="flex items-center gap-3 mt-4 p-2 bg-white/5 border border-white/10 rounded-xl w-fit">
              <div className="relative w-[60px] h-[60px] bg-white p-1 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src="/assets/images/qr-idream.png"
                  alt="QR iDream JIU"
                  className="w-full h-full object-contain"
                />
                <a
                  href="https://uijakarta.perpustakaan.co.id"
                  target="_blank"
                  className="absolute inset-0 bg-[#1e2d6b]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FFD32B]"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="flex flex-col">
                <strong className="text-[0.85rem] text-white font-semibold">
                  iDream Library
                </strong>
                <span className="text-[0.7rem] text-white/60">
                  Scan & Access Digital
                </span>
              </div>
            </div>

            <p className="text-white/70 text-[0.9rem] leading-[1.8] mt-4">
              Integrated digital library to support research and learning at
              JIU.
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div>
            <h4 className="relative text-lg font-bold mb-6 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[3px] after:bg-[#FFD32B] after:rounded-full">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="http://lib.jiu.ac/"
                  className="text-white/70 text-[0.95rem] hover:text-[#FFD32B] hover:translate-x-1 transition-all inline-block"
                >
                  (OPAC) Catalog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-white/70 text-[0.95rem] hover:text-[#FFD32B] hover:translate-x-1 transition-all inline-block"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: External Links */}
          <div>
            <h4 className="relative text-lg font-bold mb-6 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[3px] after:bg-[#FFD32B] after:rounded-full">
              External Links
            </h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://jiu.ac/"
                  target="_blank"
                  className="text-white/70 text-[0.95rem] hover:text-[#FFD32B] hover:translate-x-1 transition-all inline-block"
                >
                  JIU Website
                </a>
              </li>
              <li>
                <a
                  href="https://uijakarta.perpustakaan.co.id/home.ks"
                  target="_blank"
                  className="text-white/70 text-[0.95rem] hover:text-[#FFD32B] hover:translate-x-1 transition-all inline-block"
                >
                  Digital Library
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Contact Us */}
          <div>
            <h4 className="relative text-lg font-bold mb-6 pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[3px] after:bg-[#FFD32B] after:rounded-full">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-4 text-white/70 text-[0.95rem] leading-relaxed">
                <MapPin size={20} className="text-[#FFD32B] mt-1 shrink-0" />
                <span>
                  Jl. Ganesha 2, Lot B1, Deltamas, Pasirranji, Central Cikarang,
                  Bekasi Regency, West Java 17530
                </span>
              </li>
              <li className="flex items-center gap-4 text-white/70 text-[0.95rem]">
                <Phone size={18} className="text-[#FFD32B] shrink-0" />
                <span>(021) 22157254</span>
              </li>
              <li className="flex items-center gap-4 text-white/70 text-[0.95rem]">
                <Mail size={18} className="text-[#FFD32B] shrink-0" />
                <span>library@jiu.ac</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/jiulibrary"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#FFD32B] hover:text-[#1e2d6b] hover:-translate-y-1 transition-all duration-300"
              >
                {/* <-- Ini adalah SVG mentah pengganti icon Instagram dari lucide-react --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── FOOTER BOTTOM ── */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-[0.85rem]">
          <p>
            &copy; 2026 Dream Blue Library, JIU.{" "}
            <span>All rights reserved.</span>
          </p>
          <div className="flex gap-6">
            <a
              href="/admin/login"
              className="flex items-center gap-2 hover:text-[#FFD32B] transition-colors"
            >
              <ShieldCheck size={16} /> Staff Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
