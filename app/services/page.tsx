import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayananPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] flex flex-col font-[Poppins,sans-serif]">
      <Navbar />

      {/* ─── CALL TO ACTION (CTA) ONLY ─── */}
      <section className="flex-1 flex flex-col justify-center items-center py-32 px-[5%] mt-10">
        <div className="w-full max-w-5xl bg-[#1e2d6b] rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Ornamen Cahaya Kuning */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD32B] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tight">
            Punya Naskah yang Siap Diterbitkan?
          </h2>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Jangan biarkan karya Anda hanya tersimpan di dalam laptop. Mari
            konsultasikan dengan tim JIU Press sekarang juga untuk proses
            penerbitan yang cepat dan profesional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <a
              // JANGAN LUPA GANTI NOMOR WA DI BAWAH INI
              href="https://wa.me/6281234567890?text=Halo%20Admin%20JIU%20Press,%20saya%20ingin%20konsultasi%20mengenai%20penerbitan%20buku."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-lg md:text-xl hover:bg-white hover:text-[#25D366] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_25px_rgba(37,211,102,0.4)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
