# Panduan Membangun Aplikasi Android (SRMA 24 Kediri)

Aplikasi ini telah dikonfigurasi menggunakan **Capacitor** untuk diubah menjadi aplikasi Android asli.

## Perbaikan Kendala Build (Node.js 22)

Jika Anda melihat error `The Capacitor CLI requires NodeJS >=22.0.0`, saya telah memperbarui file `.github/workflows/android-build.yml` untuk menggunakan **Node.js 22**. Silakan lakukan `push` ulang untuk mencoba kembali.

## Aset Ikon & Splash Screen

Saya telah menyediakan aset dasar di folder `/assets`:
*   `icon.svg`: Ikon aplikasi.
*   `splash.svg`: Layar pembuka (Splash Screen).

### Cara Menghasilkan Ikon untuk Android:
Gunakan tool `@capacitor/assets` untuk menghasilkan semua ukuran ikon secara otomatis:

1.  Instal tool: `npm install @capacitor/assets --save-dev`
2.  Jalankan perintah: `npx capacitor-assets generate --android`

Ini akan secara otomatis memperbarui folder `android/app/src/main/res` dengan ikon dan splash screen yang sesuai.

File workflow telah dibuat di `.github/workflows/android-build.yml`.
Setiap kali Anda melakukan `push` ke branch `main`, GitHub akan secara otomatis membangun:
1.  **APK (Debug)**: Untuk pengujian langsung di ponsel.
2.  **AAB (Release)**: Untuk diunggah ke Google Play Store.

### Cara Mengunduh Hasil Build:
1.  Buka repositori GitHub Anda.
2.  Klik tab **Actions**.
3.  Pilih workflow **Build Android** terbaru.
4.  Gulir ke bawah ke bagian **Artifacts** untuk mengunduh file `.apk` dan `.aab`.

## Pembuatan Keystore (Kunci Tanda Tangan)

Untuk merilis aplikasi ke Play Store, Anda memerlukan file Keystore. Anda dapat membuatnya sendiri menggunakan perintah berikut di terminal komputer Anda:

```bash
keytool -genkey -v -keystore srma24-release.keystore \
  -alias srma24-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass srma24password \
  -keypass srma24password \
  -dname "CN=SRMA 24, OU=Kediri, O=SRMA, L=Kediri, ST=Jawa Timur, C=ID"
```

### Menambahkan Keystore ke GitHub Secrets:
Agar GitHub Actions dapat menandatangani aplikasi secara otomatis, Anda harus menambahkan rahasia berikut di pengaturan repositori GitHub Anda (**Settings > Secrets and variables > Actions**):

1.  `ANDROID_KEYSTORE`: Isi dengan konten file keystore Anda dalam format Base64.
    *   Cara mendapatkan Base64: `base64 -w 0 srma24-release.keystore`
2.  `ANDROID_KEYSTORE_PASSWORD`: `srma24password`
3.  `ANDROID_KEY_ALIAS`: `srma24-key`
4.  `ANDROID_KEY_PASSWORD`: `srma24password`

## Perintah Pengembangan Lokal

Jika Anda memiliki Android Studio terinstal di komputer Anda:
*   `npm run mobile:build`: Sinkronisasi kode web ke proyek Android.
*   `npm run mobile:open`: Membuka proyek di Android Studio.
*   `npm run mobile:run`: Menjalankan aplikasi langsung di emulator atau perangkat fisik.
