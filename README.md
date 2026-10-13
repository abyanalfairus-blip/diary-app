# Diary App: Praktikum Pertemuan 3

Desain UI dengan Flexbox & StyleSheet; Layout Responsif (React Native + Expo).

| | |
|---|---|
| **Nama** | Abyan |
| **NIM** | [isi NIM] |
| **Mata Kuliah** | Mobile Programming, Program Studi Teknik Informatika, UMMI |
| **Repositori** | https://github.com/abyanalfairus-blip/diary-app |

## Cara Menjalankan

```bash
npm install
npx expo start        # tambahkan -c jika perlu membersihkan cache
```

Setelah server berjalan: tekan `a` (Android Emulator), `w` (web), atau scan QR dengan Expo Go.

## Fitur yang Diselesaikan

- [x] **Design tokens** (`src/styles/tokens.js`): warna, spacing, radius, tipografi, breakpoint.
- [x] **StyleSheet konsisten**: seluruh komponen memakai token, tanpa angka/warna yang tersebar.
- [x] **DiaryCard reusable**: dibungkus `Pressable`, ada ripple Android, efek tekan, dan prop `variant` (`list` / `grid`).
- [x] **FlatList responsif**: 1 kolom di ponsel, 2 kolom saat lebar layar >= 600 px.
- [x] **DiaryDetailModal**: hero image (`aspectRatio: 16/9`), judul, tanggal, isi, dan tombol Tutup.
- [x] **Aksesibilitas dasar**: `accessibilityLabel` dan `accessibilityRole`, kontras teks tinggi, target sentuh >= 48 dp.
- [x] **5 entri diary** (3 dari modul + 2 entri baru: "Belajar Flexbox" dan "Akhir Pekan Santai").
- [x] **Empty state** ("Belum ada entri.") dan tombol Back Android menutup modal.

## Struktur Proyek

```
diary-app/
├── App.js
└── src/
    ├── components/
    │   ├── DiaryCard.js
    │   └── DiaryDetailModal.js
    ├── screens/
    │   └── DiaryListScreen.js
    └── styles/
        └── tokens.js
```

## Penjelasan Breakpoint 600 px

`DiaryListScreen` membaca lebar layar dengan `useWindowDimensions()` dan membandingkannya dengan `BREAKPOINTS.tablet` (600):

```js
const { width } = useWindowDimensions();
const twoCols = width >= BREAKPOINTS.tablet;
```

- Jika `width < 600`, `twoCols = false`: `FlatList` memakai `numColumns={1}` dan kartu tampil satu baris penuh (layout ponsel portrait).
- Jika `width >= 600`, `twoCols = true`: `numColumns={2}`, tiap kartu memakai `flex: 1/2` sehingga dua kartu berdampingan (tablet atau ponsel landscape).
- Hook ini ikut diperbarui saat ukuran atau orientasi layar berubah, jadi tampilan berpindah 1 ke 2 kolom secara otomatis.
- `key={keyForCols}` ikut berganti (`list1` / `grid2`) agar `FlatList` dibuat ulang, karena `numColumns` tidak boleh berubah tanpa mengganti `key`.

## Screenshot

**Tampilan 1 kolom (lebar < 600 px)**

[Tempel screenshot di sini]

**Tampilan 2 kolom (lebar >= 600 px)**

[Tempel screenshot di sini]
