// src/screens/DiaryListScreen.js
// ------------------------------------------------------------
// Layar daftar diary yang responsif:
//   - lebar < 600 px  -> 1 kolom (ponsel)
//   - lebar >= 600 px -> 2 kolom (tablet / layar lebar / landscape)
// Menekan kartu membuka DiaryDetailModal.
// ------------------------------------------------------------
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import DiaryCard from '../components/DiaryCard';
import DiaryDetailModal from '../components/DiaryDetailModal';
import { COLORS, SPACE, TYPO, BREAKPOINTS } from '../styles/tokens';

// Data contoh (5 entri: 3 dari modul + 2 entri baru sesuai tugas)
const DATA = [
  {
    id: 1,
    title: 'Pagi yang Tenang',
    date: '2025-10-06',
    preview: 'Hari ini aku bangun lebih pagi dan berjalan kaki 20 menit. Udara terasa sejuk...',
    body: 'Hari ini aku bangun lebih pagi dari biasanya dan berjalan kaki selama 20 menit di sekitar rumah. Udara terasa sejuk, jalanan masih sepi, dan pikiranku terasa jernih. Setelah itu aku sarapan dengan tenang sebelum memulai aktivitas.',
    moodUri: 'https://picsum.photos/seed/happy/200',
    heroUri: 'https://picsum.photos/seed/happyhero/800/450',
  },
  {
    id: 2,
    title: 'Produktif di Kampus',
    date: '2025-10-05',
    preview: 'Menyelesaikan modul praktikum dan berdiskusi dengan tim. Banyak insight baru...',
    body: 'Hari ini aku menyelesaikan modul praktikum dan berdiskusi dengan tim tentang pembagian tugas proyek. Ada banyak insight baru, terutama soal cara menyusun komponen agar bisa dipakai ulang. Kemajuan proyek terasa nyata.',
    moodUri: 'https://picsum.photos/seed/focus/200',
    heroUri: 'https://picsum.photos/seed/focushero/800/450',
  },
  {
    id: 3,
    title: 'Senja di Taman',
    date: '2025-10-04',
    preview: 'Menikmati senja sambil membaca buku favorit. Warna langit sangat indah...',
    body: 'Sore ini aku menikmati senja di taman sambil membaca buku favorit. Warna langit berubah dari jingga ke ungu dan suasananya sangat damai. Refleksi singkat: ternyata istirahat sejenak membuat pikiran lebih ringan.',
    moodUri: 'https://picsum.photos/seed/calm/200',
    heroUri: 'https://picsum.photos/seed/calmhero/800/450',
  },
  {
    id: 4,
    title: 'Belajar Flexbox',
    date: '2025-10-03',
    preview: 'Akhirnya paham cara kerja flexDirection, justifyContent, dan alignItems...',
    body: 'Akhirnya aku paham cara kerja flexDirection, justifyContent, dan alignItems di React Native. Kuncinya adalah memahami sumbu utama dan sumbu silang. Setelah banyak mencoba, tata letak kartu diary jadi jauh lebih rapi.',
    moodUri: 'https://picsum.photos/seed/learn/200',
    heroUri: 'https://picsum.photos/seed/learnhero/800/450',
  },
  {
    id: 5,
    title: 'Akhir Pekan Santai',
    date: '2025-10-02',
    preview: 'Menghabiskan akhir pekan bersama keluarga, makan bersama dan bercerita...',
    body: 'Akhir pekan ini aku menghabiskan waktu bersama keluarga. Kami makan bersama, bercerita tentang kegiatan masing-masing, lalu menonton film. Rasanya menyenangkan bisa sejenak lepas dari tugas kuliah.',
    moodUri: 'https://picsum.photos/seed/weekend/200',
    heroUri: 'https://picsum.photos/seed/weekendhero/800/450',
  },
];

export default function DiaryListScreen() {
  // useWindowDimensions ikut berubah saat ukuran/orientasi layar berubah
  const { width } = useWindowDimensions();
  const twoCols = width >= BREAKPOINTS.tablet;

  // Entri yang sedang dibuka di modal (null = modal tertutup)
  const [selected, setSelected] = useState(null);

  // Key berubah saat jumlah kolom berubah -> FlatList dibuat ulang.
  // Wajib, karena React Native tidak mengizinkan numColumns berubah on-the-fly.
  const keyForCols = useMemo(() => (twoCols ? 'grid2' : 'list1'), [twoCols]);

  const renderItem = ({ item }) => (
    <View style={[styles.itemWrap, twoCols && styles.itemWrap2]}>
      <DiaryCard
        title={item.title}
        date={item.date}
        preview={item.preview}
        moodUri={item.moodUri}
        variant={twoCols ? 'grid' : 'list'}
        onPress={() => setSelected(item)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Buku Harian</Text>

      <FlatList
        key={keyForCols}
        data={DATA}
        numColumns={twoCols ? 2 : 1}
        keyExtractor={(it) => String(it.id)}
        renderItem={renderItem}
        columnWrapperStyle={twoCols ? { gap: SPACE.m } : undefined}
        contentContainerStyle={{
          padding: SPACE.l,
          gap: SPACE.m,
          paddingTop: SPACE.m,
        }}
        ListEmptyComponent={<Text style={styles.empty}>Belum ada entri.</Text>}
      />

      <DiaryDetailModal
        visible={!!selected}
        entry={selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  header: {
    fontSize: TYPO.h1,
    fontWeight: '700',
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    color: COLORS.text,
  },
  itemWrap: { flex: 1 },
  itemWrap2: { flex: 1 / 2 }, // tiap kartu memakai setengah lebar baris
  empty: { textAlign: 'center', color: COLORS.muted, marginTop: 40 },
});
