import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#023374] text-white w-full sticky top-0 z-50 shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 1. Logo Kiri (JIU PRESS Numpuk) */}
          <div className="shrink-0">
            <Link
              href="/"
              className="flex flex-col items-start leading-none group"
            >
              <span className="font-bold text-3xl tracking-tighter transition-colors group-hover:text-[#E9BE2B]">
                JIU
              </span>
              <span className="font-medium text-[10px] tracking-[0.3em] ml-0.5 transition-colors group-hover:text-[#E9BE2B]">
                P R E S S
              </span>
            </Link>
          </div>

          {/* 2. Menu Tengah & Search */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8 px-10">
            <Link
              href="/"
              className="hover:text-[#E9BE2B] transition-colors font-medium text-sm"
            >
              Catalog
            </Link>
            <Link
              href="/categories"
              className="hover:text-[#E9BE2B] transition-colors font-medium text-sm"
            >
              Categories
            </Link>
            <Link
              href="/best-sellers"
              className="hover:text-[#E9BE2B] transition-colors font-medium text-sm"
            >
              Best Sellers
            </Link>

            <div className="relative w-full max-w-xs ml-4">
              <input
                type="text"
                placeholder="Search for books..."
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-full py-1.5 px-4 text-sm focus:outline-none focus:bg-white focus:text-[#023374] transition-all"
              />
            </div>
          </div>

          {/* 3. Menu Kanan */}
          <div className="flex items-center space-x-6">
            <button className="text-xs font-semibold hover:text-[#E9BE2B] transition-colors border border-white/30 px-2 py-1 rounded">
              EN
            </button>
            <a
              href="https://wa.me/628123456789"
              className="bg-[#E9BE2B] text-[#023374] px-4 py-2 rounded-full text-sm font-bold hover:bg-white transition-all flex items-center gap-2"
            >
              <span className="hidden sm:inline">Order via WA</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
