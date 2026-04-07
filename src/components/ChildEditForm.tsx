import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, User, MapPin, Calendar, Hash, Users, Shirt, Footprints, Heart, UserCheck } from 'lucide-react';
import { ChildData } from '../types';

interface ChildEditFormProps {
  data: ChildData;
  onSave: (updatedData: ChildData) => void;
  onCancel: () => void;
}

export default function ChildEditForm({ data, onSave, onCancel }: ChildEditFormProps) {
  const [formData, setFormData] = useState<ChildData>({ ...data });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'umur' || name === 'anakKe' || name === 'jumlahSaudara' || name === 'ukuranSepatu' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none";
  const labelClasses = "block text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1.5 ml-1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-w-2xl w-full mx-auto"
    >
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight">Edit Data Siswa</h2>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">ID: {data.nomor}</p>
          </div>
        </div>
        <button 
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {/* Section: Identitas Diri */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Hash className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Identitas Diri</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>NIK</label>
              <input
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>Tempat Lahir</label>
              <input
                type="text"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Tanggal Lahir</label>
              <input
                type="text"
                name="tanggalLahir"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className={inputClasses}
                placeholder="MM/DD/YYYY"
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Umur</label>
              <input
                type="number"
                name="umur"
                value={formData.umur}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Jenis Kelamin</label>
              <select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Agama</label>
              <input
                type="text"
                name="agama"
                value={formData.agama}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
        </div>

        {/* Section: Alamat */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Alamat</h3>
          </div>
          <div>
            <label className={labelClasses}>Alamat Lengkap</label>
            <input
              type="text"
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelClasses}>RT</label>
              <input
                type="text"
                name="rt"
                value={formData.rt}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>RW</label>
              <input
                type="text"
                name="rw"
                value={formData.rw}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Kelurahan</label>
              <input
                type="text"
                name="kelurahan"
                value={formData.kelurahan}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Kecamatan</label>
              <input
                type="text"
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
        </div>

        {/* Section: Keluarga & Wali */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Keluarga & Wali</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Nama Ayah</label>
              <input
                type="text"
                name="namaAyah"
                value={formData.namaAyah}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Nama Ibu</label>
              <input
                type="text"
                name="namaIbu"
                value={formData.namaIbu}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>Anak Ke</label>
              <input
                type="number"
                name="anakKe"
                value={formData.anakKe}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Jumlah Saudara</label>
              <input
                type="number"
                name="jumlahSaudara"
                value={formData.jumlahSaudara}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Wali Asuh</label>
              <select
                name="waliAsuh"
                value={formData.waliAsuh}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="Bu Erna & Eko Wahyudi">Bu Erna & Eko Wahyudi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section: Ukuran */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Shirt className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-800">Ukuran Pakaian</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Ukuran Baju</label>
              <input
                type="text"
                name="ukuranBaju"
                value={formData.ukuranBaju}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
            <div>
              <label className={labelClasses}>Ukuran Sepatu</label>
              <input
                type="number"
                name="ukuranSepatu"
                value={formData.ukuranSepatu}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all active:scale-95"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 active:scale-95"
          >
            <Save className="w-5 h-5" />
            Simpan Perubahan
          </button>
        </div>
      </form>
    </motion.div>
  );
}
