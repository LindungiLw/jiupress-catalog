"use client"; // Wajib di Next.js karena kita pakai state (useState)

import React, { useState } from "react";
import { User, Menu, X, Globe } from "lucide-react"; // Search dihapus dari import
import Link from "next/link";

const Navbar = () => {
  // State untuk mengontrol menu HP (terbuka/tertutup)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi toggle menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={styles.navContainer}>
      {/* 1. KIRI: LOGO */}
      <div style={styles.logo}>
        <Link href="/" style={{ color: "#FFFFFF", textDecoration: "none" }}>
          JIU Library
        </Link>
      </div>

      {/* 2. TENGAH: MENU DESKTOP */}
      <ul style={styles.desktopMenu}>
        <li>
          <Link href="/" style={styles.link}>
            Beranda
          </Link>
        </li>
        <li>
          <Link href="/layanan" style={styles.link}>
            Layanan
          </Link>
        </li>
        <li>
          <Link href="/tentang" style={styles.link}>
            Tentang Kami
          </Link>
        </li>
      </ul>

      {/* 3. KANAN: ACTIONS (Tanpa Tombol Search) */}
      <div style={styles.desktopActions}>
        {/* Tombol Pengaturan Bahasa */}
        <button style={styles.iconButton} aria-label="Ganti Bahasa">
          <Globe size={22} color="#FFFFFF" />
          <span
            style={{
              color: "#FFFFFF",
              marginLeft: "4px",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            ID
          </span>
        </button>

        {/* Tombol Login Admin */}
        <button style={styles.iconButton} aria-label="Login Admin">
          <User size={22} color="#FFFFFF" />
        </button>
      </div>

      {/* 4. TOMBOL HAMBURGER (Tampil di HP) */}
      <button style={styles.mobileMenuButton} onClick={toggleMenu}>
        {isMobileMenuOpen ? (
          <X size={28} color="#FFFFFF" />
        ) : (
          <Menu size={28} color="#FFFFFF" />
        )}
      </button>

      {/* 5. DROPDOWN MENU MOBILE */}
      {isMobileMenuOpen && (
        <div style={styles.mobileDropdown}>
          <Link href="/" style={styles.mobileLink} onClick={toggleMenu}>
            Beranda
          </Link>
          <Link href="/layanan" style={styles.mobileLink} onClick={toggleMenu}>
            Layanan
          </Link>
          <Link href="/tentang" style={styles.mobileLink} onClick={toggleMenu}>
            Tentang Kami
          </Link>

          <div style={styles.mobileActions}>
            <button
              style={{
                ...styles.iconButton,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Globe size={20} color="#FFFFFF" /> Bahasa (ID)
            </button>
            <button
              style={{
                ...styles.iconButton,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <User size={20} color="#FFFFFF" /> Login Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// CSS-in-JS dengan tipe data React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#273374", // Primary JIU Navy
    padding: "1rem 5%",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  desktopMenu: {
    display: "flex",
    gap: "2.5rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
    fontFamily: "Pretendard, sans-serif",
  },
  link: {
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  },
  desktopActions: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
  },
  mobileMenuButton: {
    display: "none", // Munculkan lewat media query CSS nanti
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  mobileDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#273374",
    display: "flex",
    flexDirection: "column",
    padding: "1rem 5%",
    borderTop: "1px solid rgba(255,255,255,0.1)",
  },
  mobileLink: {
    color: "#FFFFFF",
    textDecoration: "none",
    padding: "1rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    fontFamily: "Pretendard, sans-serif",
  },
  mobileActions: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingTop: "1rem",
  },
};

export default Navbar;
