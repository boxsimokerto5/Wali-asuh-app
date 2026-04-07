/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Users, LayoutGrid, List, Filter, Download, Plus, UserCheck, Menu, X, ChevronRight, ChevronDown, User, Trash2 } from 'lucide-react';
import { childrenData as initialChildrenData } from './data';
import ChildCard from './components/ChildCard';
import ChildEditForm from './components/ChildEditForm';
import ChildAddForm from './components/ChildAddForm';
import { ChildData } from './types';

export default function App() {
  const [children, setChildren] = useState<ChildData[]>(initialChildrenData);
  const [selectedChildId, setSelectedChildId] = useState<number>(initialChildrenData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [openGuardians, setOpenGuardians] = useState<string[]>(['Bu Erna & Eko Wahyudi']);

  const selectedChild = useMemo(() => {
    return children.find(c => c.id === selectedChildId) || children[0];
  }, [selectedChildId, children]);

  const groupedChildren = useMemo(() => {
    return children.reduce((acc, child) => {
      const guardian = child.waliAsuh;
      if (!acc[guardian]) acc[guardian] = [];
      acc[guardian].push(child);
      return acc;
    }, {} as Record<string, ChildData[]>);
  }, [children]);

  const stats = useMemo(() => {
    const total = children.length;
    const female = children.filter(c => c.jenisKelamin === 'Perempuan').length;
    const male = children.filter(c => c.jenisKelamin === 'Laki-laki').length;
    return { total, female, male };
  }, [children]);

  const selectChild = (id: number) => {
    setSelectedChildId(id);
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  };

  const toggleGuardian = (name: string) => {
    setOpenGuardians(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const handleSaveEdit = (updatedData: ChildData) => {
    setChildren(prev => prev.map(c => c.id === updatedData.id ? updatedData : c));
    setIsEditing(false);
  };

  const handleAddStudent = (newData: ChildData) => {
    setChildren(prev => [...prev, newData]);
    setSelectedChildId(newData.id);
    setIsAdding(false);
  };

  const handleDeleteStudent = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      const newChildren = children.filter(c => c.id !== id);
      setChildren(newChildren);
      if (selectedChildId === id && newChildren.length > 0) {
        setSelectedChildId(newChildren[0].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Edit Modal Overlay */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <div className="relative z-10 w-full max-w-2xl">
              <ChildEditForm 
                data={selectedChild} 
                onSave={handleSaveEdit} 
                onCancel={() => setIsEditing(false)} 
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Modal Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <div className="relative z-10 w-full max-w-2xl">
              <ChildAddForm 
                onSave={handleAddStudent} 
                onCancel={() => setIsAdding(false)} 
                nextId={children.length > 0 ? Math.max(...children.map(c => c.id)) + 1 : 1}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-[70] flex flex-col border-r border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <h2 className="font-black text-slate-900 tracking-tight text-lg">Wali Asuh</h2>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Daftar Anak Per Wali</p>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm border border-slate-200"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {(Object.entries(groupedChildren) as [string, ChildData[]][]).map(([guardian, children]) => (
                  <div key={guardian} className="space-y-2">
                    <button
                      onClick={() => toggleGuardian(guardian)}
                      className="w-full flex items-center justify-between p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-black text-slate-800">{guardian}</span>
                        <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full">{children.length}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openGuardians.includes(guardian) ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openGuardians.includes(guardian) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-1 pl-2"
                        >
                          {children.map((child) => (
                            <div
                              key={child.id}
                              onClick={() => selectChild(child.id)}
                              className={`w-full flex items-center justify-between p-3 rounded-xl group transition-all border cursor-pointer ${selectedChildId === child.id ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-blue-50 border-transparent text-slate-700'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${selectedChildId === child.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-600 group-hover:text-white'}`}>
                                  {child.id}
                                </div>
                                <div>
                                  <p className={`text-xs font-bold line-clamp-1 ${selectedChildId === child.id ? 'text-white' : 'text-slate-700 group-hover:text-blue-700'}`}>
                                    {child.namaLengkap}
                                  </p>
                                  <p className={`text-[9px] font-medium ${selectedChildId === child.id ? 'text-blue-100' : 'text-slate-400'}`}>ID: {child.nomor}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteStudent(child.id);
                                  }}
                                  className={`p-1.5 rounded-lg transition-colors ${selectedChildId === child.id ? 'hover:bg-white/20 text-white' : 'hover:bg-red-50 text-slate-300 hover:text-red-500'}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <ChevronRight className={`w-3 h-3 ${selectedChildId === child.id ? 'text-white' : 'text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1'}`} />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    setIsAdding(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Siswa Baru
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all active:scale-90 group"
              >
                <Menu className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                  <h1 className="text-base font-black text-white tracking-tighter">SRMA 24 Kediri</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsAdding(true)}
                className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8">
        {/* Quick Stats Summary */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total</p>
            <p className="text-xl font-black text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pria</p>
            <p className="text-xl font-black text-slate-700">{stats.male}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Wanita</p>
            <p className="text-xl font-black text-pink-500">{stats.female}</p>
          </div>
        </div>

        {/* Dropdown Selector */}
        <div className="mb-8 relative">
          <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2 ml-1">
            Pilih Data Siswa
          </label>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{selectedChild.namaLengkap}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ID: {selectedChild.nomor}</p>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <p className="text-[10px] text-blue-600 font-black uppercase tracking-wider">Wali: {selectedChild.waliAsuh}</p>
                </div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-40 max-h-80 overflow-y-auto custom-scrollbar p-2"
              >
                {(Object.entries(groupedChildren) as [string, ChildData[]][]).map(([guardian, children]) => (
                  <div key={guardian} className="mb-2 last:mb-0">
                    <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 rounded-lg mb-1">
                      Wali: {guardian}
                    </div>
                    {children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => selectChild(child.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left cursor-pointer ${selectedChildId === child.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-600'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${selectedChildId === child.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {child.id}
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-none mb-1">{child.namaLengkap}</p>
                          <p className="text-[10px] opacity-60 font-medium">NIK: {child.nik}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(child.id);
                          }}
                          className={`ml-auto p-2 rounded-lg transition-colors ${selectedChildId === child.id ? 'hover:bg-white/20 text-white' : 'hover:bg-red-50 text-slate-300 hover:text-red-500'}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Selected Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedChild.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          >
            <ChildCard 
              data={selectedChild} 
              onEdit={() => setIsEditing(true)}
              onDelete={handleDeleteStudent}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="max-w-xl mx-auto px-4 py-12 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          © 2026 SRMA 24 Kediri
        </p>
      </footer>
    </div>
  );
}
