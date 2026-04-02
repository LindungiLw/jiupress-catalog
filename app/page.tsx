// app/page.tsx
import Hero from "../components/Hero"; // Pastikan path-nya benar
// HAPUS IMPORT NAVBAR DI SINI!

export default function Home() {
  return (
    <main>
      {/* Navbar JANGAN dipanggil di sini lagi karena sudah ada di layout.tsx */}
      <Hero />

      {/* Nanti di bawah sini tinggal tambah Section Layanan, Berita, dll */}
    </main>
  );
}
