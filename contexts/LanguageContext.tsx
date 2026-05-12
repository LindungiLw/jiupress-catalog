"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "EN" | "ID";

// ─── KAMUS TERJEMAHAN ───
const dictionaries = {
  EN: {
    // NAVBAR
    services: "Services",
    about: "About Us",
    help: "Help?",
    search: "Search",
    books: "Books",
    authors: "Authors",
    genres: "Genres",

    // ConditionalNavbar / Auth
    adminPanelDesc: "Please log in to manage the JIU Press catalog",
    usernamePlaceholder: "Enter admin username",
    verifying: "Verifying...",
    loginToDashboard: "Login to Dashboard",
    serverError: "A server error occurred. Please try again.",

    // HERO
    heroHeadline: "Literacy Freely, Legacy Fully",
    heroPlaceholder: "Search collections, journals, or authors…",

    // NewBooks
    newBooks: "New Books",

    // PopularBooks
    popularBooks: "Popular Books",
    exploreAllBooks: "Explore All Books",

    // DiscountBooks
    limitedOffer: "Limited Offer",
    discountBooks: "Discount Books",

    // Catalog/id
    backToCatalog: "Back to Catalog",
    generalCategory: "General Category",
    authorLabel: "Author",
    isbnLabel: "ISBN",
    publishedDate: "Published Date",
    synopsis: "Synopsis / Description",
    noDescription: "No description added for this book yet.",
    officialPrice: "Official Price",
    choosePurchaseMethod: "Choose Purchase Method:",
    buyAtShopee: "Buy on Shopee",
    notAvailable: "Not Available",
    orderViaWa: "Order via WA",

    // API Error Codes (Login)
    INVALID_CREDENTIALS: "Invalid Username or Password!",
    RATE_LIMIT_EXCEEDED:
      "Too many attempts! Account temporarily locked. Try again in",
    SERVER_ERROR: "A server error occurred. Please try again.",

    // API Error Codes (Categories)
    FETCH_CATEGORY_FAILED: "Failed to fetch categories data.",
    CREATE_CATEGORY_FAILED: "Failed to create new category.",
    MISSING_CATEGORY_ID: "Category ID is missing.",
    DELETE_CATEGORY_SUCCESS: "Category deleted successfully.",
    DELETE_CATEGORY_FAILED: "Failed to delete category.",

    // API Error Codes (Books)
    FETCH_BOOKS_FAILED: "Failed to fetch books data.",
    CREATE_BOOK_FAILED: "Failed to save new book.",
    MISSING_BOOK_ID: "Book ID is missing.",
    UPDATE_BOOK_FAILED: "Failed to update book data.",
    DELETE_BOOK_SUCCESS: "Book deleted successfully.",
    DELETE_BOOK_FAILED: "Failed to delete book.",

    // Admin Dashboard
    dashboardOverview: "Dashboard Overview",
    welcomeBackAdmin:
      "Welcome back! Here is the summary of the JIU Press system today.",
    totalBooksLabel: "Total Books",
    totalCategoriesLabel: "Total Categories",

    // Admin Layout
    mainMenu: "Main Menu",
    menuDashboard: "Dashboard",
    menuCatalog: "Product Catalog",
    menuCategories: "Categories",
    logout: "Logout",
    adminPanel: "Admin Panel",
    managerRole: "Manager",

    // Admin Members
    libraryMembers: "Library Members",
    studentId: "Student ID / NIDN",
    fullName: "Full Name",
    studyProgram: "Study Program",
    statusLabel: "Status",
    infoSystems: "Information Systems",
    activeStatus: "Active",

    // Admin Circulation
    bookCirculation: "Book Circulation",
    borrowing: "Borrowing",
    studentIdLabel: "Student ID",
    scanCardPlaceholder: "Scan Card / Type ID",
    bookIdLabel: "Book ID",
    scanBarcodePlaceholder: "Scan Book Barcode",
    processBorrow: "Process Borrow",
    returning: "Returning",
    fineStatus: "Fine Status:",
    autoCalculateFine: "Automatically calculated when book is scanned.",
    processReturn: "Process Return",

    // Admin Books
    productCatalog: "Product Catalog",
    manageBooksDesc: "Manage the list of books displayed on the main page.",
    searchBookPlaceholder: "Search title / author...",
    addBook: "Add Book",
    allTab: "All",
    showing: "Showing",
    products: "products",
    colTitleAuthor: "Title & Author",
    colCategory: "Category",
    colPrice: "Price",
    colAction: "Action",
    noDataBook: "No matching book data found.",
    editBookTitle: "Edit Book Data",
    addBookTitle: "Add New Book",
    editBookDesc: "Update book metadata information.",
    addBookDesc: "Complete the form to add to the catalog.",
    formTitleLabel: "Book Title *",
    formSubtitleLabel: "Subtitle",
    formAuthorLabel: "Author *",
    formCategoryLabel: "Category *",
    selectCategory: "-- Select Category --",
    formCoverLabel: "Book Cover / Image",
    previewCover: "Cover Preview",
    formPriceLabel: "Price (Rp) *",
    formDiscountLabel: "Discount Price",
    formPhysicalDateLabel: "Physical Release Date",
    formWebScheduleLabel: "Web Display Schedule *",
    formSynopsisLabel: "Synopsis / Description",
    cancelBtn: "Cancel",
    savingBtn: "Saving...",
    updateBtn: "Update Data",
    saveBtn: "Save Book",
    confirmDelete:
      "Are you sure you want to delete this book from the catalog?",
    alertErrorSave: "An error occurred while saving data.",
    alertErrorDelete: "An error occurred while deleting the book.",

    // Admin Categories
    categoryManagement: "Category Management",
    categoryDesc: "Add or remove book classifications in the catalog.",
    categoryPlaceholder: "Category Name (e.g. Technology, Business...)",
    addCategoryBtn: "Add Category",
    categoryIdLabel: "CATEGORY ID",
    noCategoriesYet: "No categories have been created yet.",
    fillCategoryAlert: "Please fill in the category name first!",
    failedSaveServer: "Failed to save to server",
    confirmDeleteCategory: "Are you sure you want to delete this category?",

    // Services
    servicesHeadline: "Have a Manuscript Ready to Publish?",
    servicesDesc:
      "Don't let your work stay hidden in your laptop. Consult with the JIU Press team today for a fast and professional publishing process.",
    contactViaWA: "Contact via WhatsApp",
    waMessage:
      "Hello%20JIU%20Press%20Admin,%20I%20would%20like%20to%20consult%20about%20publishing%20a%20book.",

    // About Page
    aboutTitle: "About ",
    aboutDesc:
      "The official publication unit of Jakarta International University, dedicated to disseminating knowledge, academic works, and university identity through digital literacy.",
    ourVision: "Our Vision",
    visionDesc:
      "To become an innovative and trusted university publication platform on an international scale.",
    ourMission: "Our Mission",
    missionDesc:
      "To facilitate lecturers and students in publishing high-quality and easily accessible academic manuscripts.",
    ourQuality: "Our Quality",
    qualityDesc:
      "Prioritizing high standards in the editing, design, and printing process of every manuscript we handle.",
    startPublishing: "Start Publishing With Us",
    contactAdmin: "Contact Admin",
    waMessageAbout:
      "Hello%20JIU%20Press%20Admin,%20I%20would%20like%20to%20inquire%20further%20about%20your%20publication%20services.",

    // Footer
    digitalLibJIU: "Digital Library JIU",
    scanAccess: "Scan & Access Digital",
    footerAbout:
      "Integrated digital library to support research and learning at JIU.",
    quickLinks: "Quick Links",
    opacCatalog: "(OPAC) Catalog",
    faq: "FAQ",
    externalLinks: "External Links",
    jiuWebsite: "JIU Website",
    libraryWebsite: "Library Website",
    digitalLibrary: "Digital Library",
    contactUs: "Contact Us",
    allRightsReserved: "All rights reserved.",
  },

  ID: {
    // NAVBAR
    services: "Layanan",
    about: "Tentang Kami",
    help: "Bantuan?",
    search: "Cari",
    books: "Buku",
    authors: "Penulis",
    genres: "Kategori",

    // ConditionalNavbar / Auth
    adminPanelDesc: "Silakan login untuk mengelola katalog JIU Press",
    usernamePlaceholder: "Masukkan username admin",
    verifying: "Memverifikasi...",
    loginToDashboard: "Masuk ke Dashboard",
    serverError: "Terjadi kesalahan pada server. Silakan coba lagi.",

    // HERO
    heroHeadline: "Literasi Bebas, Warisan Berkelas",
    heroPlaceholder: "Cari koleksi, jurnal, atau penulis…",

    // NewBooks
    newBooks: "Buku Baru",

    // PopularBooks
    popularBooks: "Buku Terpopuler",
    exploreAllBooks: "Jelajahi Semua Buku",

    // DiscountBooks
    limitedOffer: "Penawaran Terbatas",
    discountBooks: "Buku Diskon",

    // Catalog/id
    backToCatalog: "Kembali ke Katalog",
    generalCategory: "Kategori Umum",
    authorLabel: "Penulis",
    isbnLabel: "ISBN",
    publishedDate: "Tanggal Terbit",
    synopsis: "Sinopsis / Deskripsi",
    noDescription: "Belum ada deskripsi yang ditambahkan untuk buku ini.",
    officialPrice: "Harga Resmi",
    choosePurchaseMethod: "Pilih Metode Pembelian:",
    buyAtShopee: "Beli di Shopee",
    notAvailable: "Belum Tersedia",
    orderViaWa: "Pesan via WA",

    // API Error Codes (Login)
    INVALID_CREDENTIALS: "Username atau Password salah!",
    RATE_LIMIT_EXCEEDED:
      "Terlalu banyak percobaan! Akun dikunci sementara. Coba lagi dalam",
    SERVER_ERROR: "Terjadi kesalahan pada server. Silakan coba lagi.",

    // API Error Codes (Categories)
    FETCH_CATEGORY_FAILED: "Gagal mengambil data kategori.",
    CREATE_CATEGORY_FAILED: "Gagal menambahkan kategori baru.",
    MISSING_CATEGORY_ID: "ID Kategori tidak ditemukan.",
    DELETE_CATEGORY_SUCCESS: "Kategori berhasil dihapus.",
    DELETE_CATEGORY_FAILED: "Gagal menghapus kategori.",

    // API Error Codes (Books)
    FETCH_BOOKS_FAILED: "Gagal mengambil data buku.",
    CREATE_BOOK_FAILED: "Gagal menyimpan buku baru.",
    MISSING_BOOK_ID: "ID Buku diperlukan.",
    UPDATE_BOOK_FAILED: "Gagal mengupdate data buku.",
    DELETE_BOOK_SUCCESS: "Buku berhasil dihapus.",
    DELETE_BOOK_FAILED: "Gagal menghapus buku.",

    // Admin Dashboard
    dashboardOverview: "Ringkasan Dasbor",
    welcomeBackAdmin:
      "Selamat datang kembali! Berikut adalah ringkasan sistem JIU Press hari ini.",
    totalBooksLabel: "Total Buku",
    totalCategoriesLabel: "Total Kategori",

    // Admin Layout
    mainMenu: "Menu Utama",
    menuDashboard: "Dasbor",
    menuCatalog: "Katalog Produk",
    menuCategories: "Kategori",
    logout: "Keluar",
    adminPanel: "Panel Admin",
    managerRole: "Manajer",

    // Admin Members
    libraryMembers: "Anggota Perpustakaan",
    studentId: "NIM / NIDN",
    fullName: "Nama Lengkap",
    studyProgram: "Program Studi",
    statusLabel: "Status",
    infoSystems: "Sistem Informasi",
    activeStatus: "Aktif",

    // Admin Circulation
    bookCirculation: "Sirkulasi Buku",
    borrowing: "Peminjaman",
    studentIdLabel: "NIM Mahasiswa",
    scanCardPlaceholder: "Scan Kartu / Ketik NIM",
    bookIdLabel: "ID Buku",
    scanBarcodePlaceholder: "Scan Barcode Buku",
    processBorrow: "Proses Pinjam",
    returning: "Pengembalian",
    fineStatus: "Status Denda:",
    autoCalculateFine: "Otomatis dihitung saat buku di-scan.",
    processReturn: "Proses Kembali",

    // Admin Books
    productCatalog: "Katalog Produk",
    manageBooksDesc: "Kelola daftar buku yang tampil di halaman utama.",
    searchBookPlaceholder: "Cari judul / penulis...",
    addBook: "Tambah Buku",
    allTab: "Semua",
    showing: "Menampilkan",
    products: "produk",
    colTitleAuthor: "Judul & Penulis",
    colCategory: "Kategori",
    colPrice: "Harga",
    colAction: "Aksi",
    noDataBook: "Tidak ada data buku yang sesuai.",
    editBookTitle: "Edit Data Buku",
    addBookTitle: "Tambah Buku Baru",
    editBookDesc: "Perbarui informasi metadata buku.",
    addBookDesc: "Lengkapi form untuk menambah katalog.",
    formTitleLabel: "Judul Buku *",
    formSubtitleLabel: "Sub Judul",
    formAuthorLabel: "Penulis *",
    formCategoryLabel: "Kategori *",
    selectCategory: "-- Pilih Kategori --",
    formCoverLabel: "Gambar / Cover Buku",
    previewCover: "Preview Cover",
    formPriceLabel: "Harga (Rp) *",
    formDiscountLabel: "Harga Diskon",
    formPhysicalDateLabel: "Tgl Rilis Fisik",
    formWebScheduleLabel: "Jadwal Tampil Web *",
    formSynopsisLabel: "Deskripsi Sinopsis",
    cancelBtn: "Batal",
    savingBtn: "Menyimpan...",
    updateBtn: "Update Data",
    saveBtn: "Simpan Buku",
    confirmDelete: "Yakin ingin menghapus buku ini dari katalog?",
    alertErrorSave: "Terjadi kesalahan saat menyimpan data.",
    alertErrorDelete: "Terjadi kesalahan saat menghapus buku.",

    // Admin Categories
    categoryManagement: "Manajemen Kategori",
    categoryDesc: "Tambahkan atau hapus pengelompokan jenis buku di katalog.",
    categoryPlaceholder: "Nama Kategori (Contoh: Teknologi, Bisnis...)",
    addCategoryBtn: "Tambah Kategori",
    categoryIdLabel: "ID KATEGORI",
    noCategoriesYet: "Belum ada kategori yang dibuat.",
    fillCategoryAlert: "Isi nama kategori terlebih dahulu!",
    failedSaveServer: "Gagal menyimpan ke server",
    confirmDeleteCategory: "Yakin ingin menghapus kategori ini?",

    // Services
    servicesHeadline: "Punya Naskah yang Siap Diterbitkan?",
    servicesDesc:
      "Jangan biarkan karya Anda hanya tersimpan di dalam laptop. Mari konsultasikan dengan tim JIU Press sekarang juga untuk proses penerbitan yang cepat dan profesional.",
    contactViaWA: "Hubungi via WhatsApp",
    waMessage:
      "Halo%20Admin%20JIU%20Press,%20saya%20ingin%20konsultasi%20mengenai%20penerbitan%20buku.",

    // About Page
    aboutTitle: "Tentang ",
    aboutDesc:
      "Unit publikasi resmi Jakarta International University, berdedikasi untuk menyebarluaskan pengetahuan, karya akademik, dan identitas universitas melalui literasi digital.",
    ourVision: "Visi Kami",
    visionDesc:
      "Menjadi platform publikasi universitas yang inovatif dan terpercaya di kancah internasional.",
    ourMission: "Misi Kami",
    missionDesc:
      "Memfasilitasi dosen dan mahasiswa dalam menerbitkan naskah akademik yang berkualitas dan mudah diakses.",
    ourQuality: "Kualitas Kami",
    qualityDesc:
      "Mengutamakan standar tinggi dalam proses penyuntingan, desain, dan pencetakan setiap naskah yang kami tangani.",
    startPublishing: "Mulai Menerbitkan Bersama Kami",
    contactAdmin: "Hubungi Admin",
    waMessageAbout:
      "Halo%20Admin%20JIU%20Press,%20saya%20ingin%20bertanya%20lebih%20lanjut%20mengenai%20layanan%20publikasi%20Anda.",

    // Footer
    digitalLibJIU: "Perpustakaan Digital JIU",
    scanAccess: "Pindai & Akses Digital",
    footerAbout:
      "Perpustakaan digital terintegrasi untuk mendukung penelitian dan pembelajaran di JIU.",
    quickLinks: "Tautan Cepat",
    opacCatalog: "Katalog (OPAC)",
    faq: "Tanya Jawab (FAQ)",
    externalLinks: "Tautan Luar",
    jiuWebsite: "Situs Web JIU",
    libraryWebsite: "Situs Web Perpustakaan",
    digitalLibrary: "Perpustakaan Digital",
    contactUs: "Hubungi Kami",
    allRightsReserved: "Hak cipta dilindungi undang-undang.",
  },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof typeof dictionaries.EN) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const savedLang = localStorage.getItem("jiupress_lang") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "EN" ? "ID" : "EN";
    setLanguage(newLang);
    localStorage.setItem("jiupress_lang", newLang);
  };

  const t = (key: keyof typeof dictionaries.EN) => {
    return dictionaries[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage harus digunakan di dalam LanguageProvider");
  }
  return context;
};
