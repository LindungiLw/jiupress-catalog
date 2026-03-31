export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section Sederhana */}
      <section className="max-w-7xl mx-auto px-4 pt-16 pb-24 text-center">
        <h1 className="text-5xl font-bold text-[#023374] mb-6">
          Premium Academic Bookstore
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Discover our curated collection of scholarly publications and academic
          resources from Jakarta International University.
        </p>

        {/* Tombol Aksi */}
        <div className="flex justify-center gap-4">
          <button className="bg-[#023374] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#034494] transition-all">
            Browse Catalog
          </button>
          <button className="border-2 border-[#023374] text-[#023374] px-8 py-3 rounded-lg font-semibold hover:bg-[#023374] hover:text-white transition-all">
            Special Offers
          </button>
        </div>
      </section>

      {/* Area untuk Grid Buku (Nanti kita isi BookCard di sini) */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#023374] mb-12 italic underline decoration-[#E9BE2B]">
            Recent Publications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Kepingan Lego BookCard akan masuk di sini nanti */}
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              Book Slot 1
            </div>
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              Book Slot 2
            </div>
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              Book Slot 3
            </div>
            <div className="p-10 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              Book Slot 4
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
