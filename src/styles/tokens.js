// src/styles/tokens.js
// ------------------------------------------------------------
// Design tokens: satu tempat untuk semua nilai desain yang dipakai
// berulang (warna, spacing, radius, tipografi, breakpoint).
// Ubah nilai di sini, seluruh komponen otomatis mengikuti.
// ------------------------------------------------------------

export const COLORS = {
  surface: '#FFFFFF', // latar layar & kartu
  border: '#E5E7EB',  // garis tepi kartu
  text: '#111827',    // teks utama (kontras tinggi di atas putih)
  muted: '#6B7280',   // teks sekunder (tanggal, empty state)
  accent: '#2563EB',  // warna aksen (tombol)
};

export const SPACE = { xs: 4, s: 8, m: 12, l: 16, xl: 24 };

export const RADIUS = { card: 12, avatar: 32 };

export const TYPO = { h1: 24, title: 16, body: 14, caption: 12 };

// Lebar layar (px) minimal agar daftar berubah menjadi 2 kolom
export const BREAKPOINTS = { tablet: 600 };
