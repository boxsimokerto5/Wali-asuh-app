export interface ChildData {
  id: number;
  nik: string;
  nomor: string;
  namaLengkap: string;
  tempatLahir: string;
  tanggalLahir: string;
  umur: number;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  agama: string;
  kecamatan: string;
  kelurahan: string;
  alamat: string;
  rt: string;
  rw: string;
  anakKe: number;
  jumlahSaudara: number;
  namaAyah: string;
  namaIbu: string;
  ukuranBaju: string;
  ukuranSepatu: number;
  waliAsuh: 'Bu Erna & Eko Wahyudi';
}
