import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Calendar, Hash, Users, Shirt, Footprints, Heart, Edit2, Trash2, ChevronDown, ChevronUp, Info, ShieldCheck } from 'lucide-react';
import { ChildData } from '../types';

interface ChildCardProps {
  data: ChildData;
  onEdit?: (data: ChildData) => void;
  onDelete?: (id: number) => void;
}

export default function ChildCard({ data, onEdit, onDelete }: ChildCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full"
    >
      {/* Header with Name and ID */}
      <motion.div layout className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white relative">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
            <User className="w-6 h-6" />
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <button 
                onClick={() => onEdit(data)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-md transition-all active:scale-90"
                title="Edit Data"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button 
                onClick={() => onDelete(data.id)}
                className="p-2 bg-white/20 hover:bg-red-500/40 rounded-xl backdrop-blur-md transition-all active:scale-90"
                title="Hapus Data"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <span className="text-xs font-mono bg-white/20 px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">
              ID: {data.nomor}
            </span>
          </div>
        </div>
        <motion.h3 layout="position" className="text-xl font-bold leading-tight mb-1">{data.namaLengkap}</motion.h3>
        <motion.p layout="position" className="text-blue-100 text-sm flex items-center gap-1 opacity-90">
          <Hash className="w-3 h-3" /> NIK: {data.nik}
        </motion.p>
      </motion.div>

      {/* Content */}
      <div className="p-6 flex-grow space-y-6">
        {/* Personal Info Grid */}
        <motion.div layout="position" className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Tempat, Tgl Lahir</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>{data.tempatLahir}, {data.tanggalLahir}</span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Umur & Gender</p>
            <p className="text-sm text-gray-700 font-medium">
              {data.umur} Tahun • {data.jenisKelamin}
            </p>
          </div>
        </motion.div>

        {/* Address Section */}
        <motion.div layout="position" className="space-y-2">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Alamat Domisili</p>
          <div className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
            <MapPin className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-gray-800">{data.alamat}</p>
              <p className="text-xs">RT {data.rt} / RW {data.rw}, {data.kelurahan}</p>
              <p className="text-xs">{data.kecamatan}</p>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-6 pt-2"
            >
              {/* Extra Details for Expanded State */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">Verifikasi Wali Asuh</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-800">{data.waliAsuh}</p>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">AKTIF</span>
                  </div>
                </div>
              </div>

              {/* Family Info */}
              <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Orang Tua</p>
                  <div className="text-xs space-y-1">
                    <p className="flex items-center gap-1 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      Ayah: <span className="font-semibold">{data.namaAyah}</span>
                    </p>
                    <p className="flex items-center gap-1 text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                      Ibu: <span className="font-semibold">{data.namaIbu}</span>
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status Anak</p>
                  <div className="flex items-center justify-end gap-2 text-xs text-gray-700">
                    <Users className="w-4 h-4 text-indigo-500" />
                    <span>Anak ke-{data.anakKe} dari {data.jumlahSaudara}</span>
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div className="flex gap-3">
                <div className="flex-1 bg-blue-50 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shirt className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-800">Baju</span>
                  </div>
                  <span className="text-sm font-bold text-blue-900">{data.ukuranBaju}</span>
                </div>
                <div className="flex-1 bg-indigo-50 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-medium text-indigo-800">Sepatu</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-900">{data.ukuranSepatu}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Data ini merupakan bagian dari program pendampingan SRMA 24 Kediri. Pastikan kerahasiaan data pribadi anak asuh tetap terjaga.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div layout className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          <span>Agama: {data.agama}</span>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isExpanded ? (
            <>Tutup Detail <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Detail Lengkap <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
