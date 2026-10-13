// src/components/DiaryDetailModal.js
// ------------------------------------------------------------
// Modal detail entri: hero image, judul, tanggal, isi, tombol Tutup.
// Props:
//   visible : boolean  -> modal tampil atau tidak
//   onClose : function -> dipanggil saat modal ditutup
//   entry   : object   -> { title, date, body, heroUri, moodUri }
// ------------------------------------------------------------
import React from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { COLORS, SPACE, RADIUS, TYPO } from '../styles/tokens';

export default function DiaryDetailModal({ visible, onClose, entry }) {
  if (!entry) return null;

  const { title, date, body, heroUri, moodUri } = entry;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose} // tombol Back di Android menutup modal
    >
      <View style={styles.container}>
        <ScrollView>
          {/* aspectRatio menjaga proporsi 16:9 di semua lebar layar */}
          <Image source={{ uri: heroUri || moodUri }} style={styles.hero} />

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.body}>{body}</Text>

            <Pressable
              onPress={onClose}
              style={styles.button}
              accessibilityRole="button"
              accessibilityLabel="Tutup detail entri"
            >
              <Text style={styles.buttonText}>Tutup</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.surface },
  hero: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#DDDDDD',
    borderBottomLeftRadius: RADIUS.card,
    borderBottomRightRadius: RADIUS.card,
  },
  content: { padding: SPACE.l, gap: SPACE.s },
  title: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  date: { fontSize: TYPO.caption, color: COLORS.muted, marginBottom: SPACE.s },
  body: { fontSize: TYPO.body, color: COLORS.text, lineHeight: 20 },
  button: {
    marginTop: SPACE.l,
    padding: SPACE.m,
    minHeight: 48,             // target sentuh nyaman
    justifyContent: 'center',
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  buttonText: { color: '#FFFFFF', fontWeight: '700' },
});
