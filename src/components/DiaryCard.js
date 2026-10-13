// src/components/DiaryCard.js
// ------------------------------------------------------------
// Kartu entri diary yang reusable.
// - Dapat ditekan (Pressable) untuk membuka detail.
// - Mendukung dua mode tampilan lewat prop `variant`: 'list' | 'grid'.
// - Semua nilai style diambil dari design tokens.
// ------------------------------------------------------------
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryCard({
  title,
  date,
  preview,
  moodUri,
  onPress,
  variant = 'list',
}) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: COLORS.border }}
      // Efek redup saat kartu ditekan (feedback sentuhan)
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Entri ${title} tanggal ${date}`}
    >
      <View style={[styles.card, variant === 'grid' && styles.cardGrid]}>
        <Image source={{ uri: moodUri }} style={styles.mood} />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.preview} numberOfLines={3} ellipsizeMode="tail">
            {preview}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',      // gambar di kiri, teks di kanan
    gap: SPACE.m,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.surface,
    minHeight: 88,             // target sentuh jauh di atas 44dp
  },
  // Disiapkan untuk penyesuaian khusus mode grid (2 kolom)
  cardGrid: {},
  mood: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.avatar,
    backgroundColor: '#EEF2FF',
  },
  content: { flex: 1 },
  title: { fontSize: TYPO.title, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: 6 },
  preview: { fontSize: TYPO.body, color: COLORS.text },
});
