# 📖 BacaBaca — Membaca Jadi Menyenangkan

Platform membaca web mandiri (*standalone*) yang dirancang untuk **semua kalangan (lintas usia)** dengan pendekatan membaca yang santai, menenangkan, dan menyenangkan (*Zen & Cozy Reading Experience*).

---

## ✨ Fitur Utama

### 1. 🧘 Zen & Cozy Reader (Membaca Bebas Distraksi)
- **Tiga Pilihan Tema Ramah Mata**:
  - ☕ **Kertas Hangat (Warm Sepia)**: Bernuansa novel/buku fisik klasik, nyaman untuk mata lelah.
  - ☀️ **Siang Bersih (Clean Light)**: Tampilan jernih dan kontras seimbang.
  - 🌙 **Malam Nyaman (Midnight Dark)**: Kontras lembut untuk kenyamanan membaca di tempat redup.
- **Tipografi Buku Berkualitas**:
  - Pilihan gaya huruf: **Serif Buku Klasik (*Merriweather*)** dan **Sans Modern (*Plus Jakarta Sans*)**.
  - Pengatur ukuran teks responsif (`A-` hingga `A+++`).
- **Garis Pemandu Baca (*Reading Focus Ruler*)**:
  - Garis bantu fokus horizontal yang mengikuti pandangan/kursor untuk meningkatkan konsentrasi baris demi baris.

### 2. 🌧️ Generator Suara Suasana (*Ambient Soundscapes*)
- Efek suara latar sintetis menggunakan **Web Audio API** bawaan browser (100% lokal, tanpa perlu download file audio besar):
  - 🌧️ **Hujan Rintik**: Suara rintik hujan lembut di kaca jendela.
  - 🔥 **Perapian Hangat**: Gemeretak kayu dan api yang menenangkan.
  - 🌊 **Deburan Ombak**: Irama pasang surut laut yang damai.
  - 🔇 **Hening**: Mode senyap.
- Dilengkapi slider pengatur volume terpisah.

### 3. 🎧 Narasi Interaktif & Suara Fonik (Text-to-Speech)
- Fitur pembacaan audio alami dalam **Bahasa Indonesia (`id-ID`)** via Web Speech API.
- **Sorot Kata Aktif (*Karaoke Word Highlight*)**: Kata yang sedang dibacakan akan tersorot secara langsung.
- **Ketuk Kata (*Tap-to-Pronounce*)**: Ketuk kata apa pun di dalam teks untuk mendengarkan pelafalannya.
- Kontrol kecepatan narasi: `0.8x (Santai)`, `1.0x (Normal)`, `1.2x (Cepat)`.

### 4. 💎 Galeri Kutipan Mutiara (*Quote Collector*)
- Sorot kalimat bermakna saat membaca dan simpan ke galeri kartu kutipan pribadi.
- Fitur salin teks kutipan (*copy to clipboard*) dengan satu klik.

### 5. 🎯 Gamifikasi Santai & Ruang Refleksi
- **Streak Membaca Harian**: Menghitung konsistensi membaca harian.
- **Level & XP**: Mengumpulkan poin pengalaman dari membaca cerita, menjawab refleksi, dan menyimpan kutipan.
- **Koleksi Lencana Pencapaian (*Badges*)**: Dari *"Langkah Pertama"*, *"Pembaca Zen"*, hingga *"Pemetik Hikmah"*.
- **Ruang Refleksi Akhir**: Kuis pemahaman santai tanpa tekanan dengan penjelasan filosofis dan bahan renungan batin.

---

## 📚 Katalog Cerita Awal
1. **Secangkir Kopi dan Waktu yang Hilang** *(Filosofis)*: Kisah seorang arsitek sibuk yang belajar menghargai momen saat ini dari seorang barista tua.
2. **Mercusuar di Ujung Samudra** *(Petualangan)*: Kisah penjaga mercusuar muda yang memandu kapal nelayan di tengah badai kabut.
3. **Malam Ketika Hutan Lupa Bernyanyi** *(Fabel Modern)*: Dongeng tentang burung hantu dan kunang-kunang yang mengembalikan keharmonisan suara rimba.
4. **Bintang Jatuh di Halaman Belakang** *(Inspirasi)*: Percakapan hangat seorang nenek dan cucunya tentang menemukan keajaiban dalam rutinitas sehari-hari.
5. **Rahasia Jam Pasir Kayu Jati** *(Sains & Alam)*: Kisah tentang menghargai makna di setiap detik yang kita jalani.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Lucide Icons + Canvas Confetti
- **Audio Engines**:
  - Web Audio API (Synthesized Ambient Noise)
  - Web Speech API (SpeechSynthesis id-ID)
- **State & Storage**: LocalStorage persistence (semua progres tersimpan otomatis di browser tanpa perlu server/database).

---

## 🚀 Cara Menjalankan Proyek

1. **Instal dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan development server**:
   ```bash
   npm run dev
   ```

3. **Build untuk produksi**:
   ```bash
   npm run build
   npm run preview
   ```

Aplikasi dapat diakses di `http://localhost:5173` (dev) atau `http://localhost:4173` (preview).
