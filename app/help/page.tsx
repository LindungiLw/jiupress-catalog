"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  HelpCircle,
  BookOpen,
  FileText,
} from "lucide-react";

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I publish my book at JIU Press?",
      answer:
        "You can start by consulting with our team via WhatsApp. We will guide you through the manuscript submission, review process, and ISBN registration.",
    },
    {
      question: "Is there a minimum number of copies for printing?",
      answer:
        "No, we use a Print-on-Demand (POD) system, which means you can print as few as one copy according to your needs.",
    },
    {
      question: "How long does the ISBN registration process take?",
      answer:
        "The ISBN registration process usually takes 7-14 working days, depending on the queue at the National Library of Indonesia.",
    },
    {
      question: "Can JIU Press help with book cover design?",
      answer:
        "Yes, we have a professional design team ready to help you create an attractive and representative cover for your academic work.",
    },
    {
      question: "How do I purchase books from the catalog?",
      answer:
        "You can browse our catalog on the homepage, select the book you want, and click the 'Order' button which will direct you to our official marketplace or admin.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col font-[Poppins,sans-serif]">
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-32 pb-20 px-[5%] bg-[#1e2d6b] overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#FFD32B] text-sm font-bold mb-6 backdrop-blur-sm">
            <HelpCircle size={16} /> JIU Press Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            How can we <span className="text-[#FFD32B]">help you?</span>
          </h1>

          {/* Search Bar Help */}
          <div className="relative max-w-xl mx-auto mt-8">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for questions..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white text-[#1e2d6b] font-medium outline-none shadow-xl focus:ring-2 focus:ring-[#FFD32B] transition-all"
            />
          </div>
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

      {/* ─── FAQ SECTION ─── */}
      <section className="py-20 px-[5%]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-black text-[#1e2d6b] mb-10 flex items-center gap-3">
            <FileText className="text-[#FFD32B]" /> Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-[#1e2d6b]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-[#1e2d6b] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-500 leading-relaxed animate-in fade-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT SUPPORT ─── */}
      <section className="pb-20 px-[5%]">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] p-8 md:p-12 border border-gray-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-[#1e2d6b] mb-4">
              Still need help?
            </h2>
            <p className="text-gray-500 max-w-md">
              If you couldn't find the answer you were looking for, please feel
              free to contact our support team directly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="https://wa.me/6281234567890"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <MessageCircle size={20} /> WhatsApp
            </a>
            <a
              href="mailto:library@jiu.ac"
              className="flex items-center justify-center gap-2 bg-[#1e2d6b] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <Mail size={20} /> Email Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
